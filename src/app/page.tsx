import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <section className="rounded-3xl border bg-white p-8 shadow-sm">
        <h1 className="text-4xl font-semibold tracking-tight">Dominat8</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 opacity-80">
          AI Website Builder — generate a full website from a short brief, then publish fast.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white" href="/templates">
            Browse templates
          </Link>
          <Link className="rounded-xl border px-5 py-3 text-sm font-medium" href="/pricing">
            View pricing
          </Link>
        </div>
      </section>
    </main>
  );
}