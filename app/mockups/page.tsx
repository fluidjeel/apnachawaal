import Link from "next/link";

export default function MockupIndex() {
  return (
    <main className="min-h-[100dvh] bg-[#14080E] px-[6vw] py-16 text-[#F4E6C8]">
      <p className="font-sans text-[0.68rem] uppercase tracking-[0.28em] text-[#E2B657]">ApnaChawal</p>
      <h1 className="mt-8 max-w-[14ch] font-sans text-5xl font-light leading-[0.95] tracking-tight">
        The maroon and gold page.
      </h1>
      <p className="mt-6 max-w-md font-sans text-lg leading-snug text-[#F4E6C8]/75">
        Grain falls behind the wordmark. This is not the live homepage yet.
      </p>
      <ul className="mt-16 max-w-xl border-t border-[#E2B657]/30">
        <li className="border-b border-[#E2B657]/30">
          <Link href="/mockups/modern" className="block py-7">
            <span className="font-sans text-3xl font-light">Modern</span>
            <span className="mt-2 block font-sans text-sm text-[#F4E6C8]/65">
              The first maroon and gold page. Grain falls behind the wordmark.
            </span>
          </Link>
        </li>
      </ul>
    </main>
  );
}
