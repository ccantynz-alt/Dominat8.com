import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CTA } from "@/components/cta";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="mx-auto flex max-w-3xl flex-col items-center justify-center px-6 py-40 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
          404
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.025em] md:text-5xl">
          Page not found.
        </h1>
        <p className="mt-4 max-w-md text-base text-[var(--color-fg-2)]">
          The page you&rsquo;re looking for doesn&rsquo;t exist, or has moved.
        </p>
        <div className="mt-8">
          <CTA href="/" variant="primary" size="md">
            Back to home
          </CTA>
        </div>
      </main>
      <Footer />
    </>
  );
}
