import { randomBytes } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import type { Gateway } from "@/lib/payments";
import { seedProducts, type Product } from "@/lib/shop-catalog";

export type OrderStatus =
  | "pending_payment"
  | "payment_failed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "return_requested"
  | "returned";

export type OrderItem = {
  slug: string;
  brand: string;
  qtyKg: number;
  pricePaise: number;
};

export type Order = {
  id: string;
  customer: { name: string; phone: string; email: string };
  items: OrderItem[];
  status: OrderStatus;
  gateway: Gateway;
  paymentSessionId?: string;
  totalPaise: number;
  createdAt: string;
  updatedAt: string;
  history: { at: string; status: OrderStatus; note: string }[];
};

export type Review = {
  id: string;
  slug: string;
  name: string;
  rating: number;
  text: string;
  createdAt: string;
};

type Database = {
  overrides: Record<string, Partial<Product>>;
  extras: Product[];
  orders: Order[];
  reviews: Review[];
};

const empty = (): Database => ({ overrides: {}, extras: [], orders: [], reviews: [] });

const dataFile = path.join(process.cwd(), "data", "store.json");
const tmpFile = path.join("/tmp", "apnachawal-store.json");

let memory: Database | null = null;
let chain: Promise<unknown> = Promise.resolve();

function enqueue<T>(work: () => Promise<T>): Promise<T> {
  const run = chain.then(work, work);
  chain = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

async function readDatabase(): Promise<Database> {
  if (memory) return memory;
  for (const file of [dataFile, tmpFile]) {
    try {
      const next = { ...empty(), ...JSON.parse(await readFile(file, "utf8")) };
      memory = next;
      return next;
    } catch {
      /* try the next location */
    }
  }
  memory = empty();
  return memory;
}

async function writeDatabase(db: Database) {
  memory = db;
  const body = JSON.stringify(db, null, 2);
  try {
    await mkdir(path.dirname(dataFile), { recursive: true });
    await writeFile(dataFile, body);
  } catch {
    await writeFile(tmpFile, body);
  }
}

export function listProducts(includeArchived = false): Promise<Product[]> {
  return enqueue(async () => {
    const db = await readDatabase();
    const seeded = seedProducts().map((product) => ({ ...product, ...db.overrides[product.slug] }));
    const products = [...seeded, ...db.extras];
    return includeArchived ? products : products.filter((product) => !product.archived);
  });
}

export function findProduct(slug: string, includeArchived = false) {
  return listProducts(includeArchived).then((products) => products.find((product) => product.slug === slug));
}

export function saveProduct(product: Product) {
  return enqueue(async () => {
    const db = await readDatabase();
    const seeded = seedProducts().some((item) => item.slug === product.slug);
    if (seeded) db.overrides[product.slug] = product;
    else {
      db.extras = db.extras.filter((item) => item.slug !== product.slug);
      db.extras.push(product);
    }
    await writeDatabase(db);
    return product;
  });
}

function id(prefix: string) {
  return `${prefix}_${randomBytes(4).toString("hex")}`;
}

export function listOrders() {
  return enqueue(async () => (await readDatabase()).orders);
}

export function findOrder(orderId: string) {
  return listOrders().then((orders) => orders.find((order) => order.id === orderId));
}

export function createOrder(input: {
  customer: Order["customer"];
  items: OrderItem[];
  gateway: Gateway;
}) {
  return enqueue(async () => {
    const db = await readDatabase();
    const products = [
      ...seedProducts().map((product) => ({ ...product, ...db.overrides[product.slug] })),
      ...db.extras,
    ];
    for (const item of input.items) {
      const product = products.find((entry) => entry.slug === item.slug && !entry.archived);
      if (!product) throw new Error(`Unknown rice: ${item.slug}`);
      if (product.stockKg < item.qtyKg) throw new Error(`${product.brand} has ${product.stockKg} kg left`);
    }
    const now = new Date().toISOString();
    const order: Order = {
      id: id("ord"),
      customer: input.customer,
      items: input.items,
      gateway: input.gateway,
      status: "pending_payment",
      totalPaise: input.items.reduce((sum, item) => sum + item.pricePaise * item.qtyKg, 0),
      createdAt: now,
      updatedAt: now,
      history: [{ at: now, status: "pending_payment", note: "Order placed. Waiting for placeholder payment." }],
    };
    db.orders.unshift(order);
    await writeDatabase(db);
    return order;
  });
}

function stamp(order: Order, status: OrderStatus, note: string) {
  const at = new Date().toISOString();
  order.status = status;
  order.updatedAt = at;
  order.history.push({ at, status, note });
}

async function changeStock(db: Database, items: OrderItem[], direction: 1 | -1) {
  for (const item of items) {
    const seeded = seedProducts().find((product) => product.slug === item.slug);
    const current = seeded
      ? { ...seeded, ...db.overrides[item.slug] }
      : db.extras.find((product) => product.slug === item.slug);
    if (!current) continue;
    const next = { ...current, stockKg: Math.max(0, current.stockKg + direction * item.qtyKg) };
    if (seeded) db.overrides[item.slug] = next;
    else db.extras = db.extras.map((product) => (product.slug === item.slug ? next : product));
  }
}

export function setOrderStatus(orderId: string, status: OrderStatus, note: string) {
  return enqueue(async () => {
    const db = await readDatabase();
    const order = db.orders.find((entry) => entry.id === orderId);
    if (!order) return undefined;
    const paid = ["processing", "shipped", "delivered", "return_requested"].includes(order.status);
    if (status === "processing" && order.status === "pending_payment") await changeStock(db, order.items, -1);
    if ((status === "cancelled" || status === "returned") && paid) await changeStock(db, order.items, 1);
    stamp(order, status, note);
    await writeDatabase(db);
    return order;
  });
}

export function attachPayment(orderId: string, sessionId: string) {
  return enqueue(async () => {
    const db = await readDatabase();
    const order = db.orders.find((entry) => entry.id === orderId);
    if (!order) return undefined;
    order.paymentSessionId = sessionId;
    await writeDatabase(db);
    return order;
  });
}

export function listReviews(slug?: string) {
  return enqueue(async () => {
    const reviews = (await readDatabase()).reviews;
    return slug ? reviews.filter((review) => review.slug === slug) : reviews;
  });
}

export function addReview(input: { slug: string; name: string; rating: number; text: string }) {
  return enqueue(async () => {
    const db = await readDatabase();
    const review: Review = { id: id("rev"), createdAt: new Date().toISOString(), ...input };
    db.reviews.unshift(review);
    await writeDatabase(db);
    return review;
  });
}
