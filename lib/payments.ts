export const gateways = ["razorpay", "stripe", "laserpay"] as const;
export type Gateway = (typeof gateways)[number];

export function isGateway(value: string): value is Gateway {
  return (gateways as readonly string[]).includes(value);
}

/** Placeholder credentials only. Nothing here is called. */
export function gatewayPublicConfig(gateway: Gateway) {
  if (gateway === "razorpay") {
    return {
      gateway,
      label: "Razorpay",
      keyId: process.env.RAZORPAY_KEY_ID || "rzp_test_placeholder",
      endpoint: "https://api.razorpay.com/v1/orders",
      note: "UPI, cards, and netbanking once a real key replaces the placeholder.",
    };
  }
  if (gateway === "stripe") {
    return {
      gateway,
      label: "Stripe",
      keyId: process.env.STRIPE_PUBLISHABLE_KEY || "pk_test_placeholder",
      endpoint: "https://api.stripe.com/v1/checkout/sessions",
      note: "Card checkout. India coverage is limited until a live account is connected.",
    };
  }
  return {
    gateway,
    label: "LaserPay",
    keyId: process.env.LASERPAY_API_KEY || "laserpay_test_placeholder",
    endpoint: process.env.LASERPAY_ENDPOINT || "https://placeholder.laserpay.invalid/v1/checkout",
    note: "Placeholder gateway. Swap the endpoint and key when the account exists.",
  };
}

export function createPlaceholderSession(orderId: string, gateway: Gateway, amountPaise: number) {
  const config = gatewayPublicConfig(gateway);
  return {
    mode: "placeholder" as const,
    gateway,
    label: config.label,
    sessionId: `ph_${gateway}_${orderId}`,
    amountPaise,
    publishableKey: config.keyId,
    endpoint: config.endpoint,
    note: config.note,
  };
}
