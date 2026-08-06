import { createFileRoute } from "@tanstack/react-router";
import { PartnerOnboarding } from "@/components/onboarding/PartnerOnboarding";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Partner onboarding — First Batch Co." },
      {
        name: "description",
        content:
          "Join the First Batch partner network in two short steps — partner details first, then a profile tailored to what you actually do.",
      },
      { property: "og:title", content: "Partner onboarding — First Batch Co." },
      {
        property: "og:description",
        content:
          "Contract manufacturers, ingredient suppliers, food technologists and labs — one seamless two-step onboarding.",
      },
    ],
  }),
  component: Index,
});

const VALUE_CARDS = [
  {
    title: "No tyre-kickers",
    body: "Every brand we introduce has filled a brief, taken a call with us and knows their category, format and rough volumes.",
    bg: "bg-lilac",
  },
  {
    title: "Matched to your line",
    body: "We only send briefs that match your equipment, categories and minimums.",
    bg: "bg-mint",
  },
  {
    title: "Brands that convert",
    body: "First-time brands become repeat customers. We stay involved through the first batch, which means fewer misunderstandings and smoother runs for you.",
    bg: "bg-peach",
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section className="bg-cream">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
            <div className="mb-6 flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-butter" />
              <span className="h-2.5 w-2.5 rounded-full bg-peach" />
              <span className="h-2.5 w-2.5 rounded-full bg-mint" />
              <span className="h-2.5 w-2.5 rounded-full bg-lilac" />
            </div>
            <p className="eyebrow flex items-center gap-3">
              <span className="h-px w-6 bg-accent-warm" />
              For manufacturers, suppliers, technologists &amp; labs
            </p>
            <h1 className="mt-5 max-w-3xl text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
              We bring you brands who are actually ready.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              One application, two short steps. We ask the right questions for what you do — and
              nothing twice.
            </p>
            <a
              href="#join"
              className="mt-8 inline-flex rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground transition-colors hover:bg-accent-warm"
            >
              Join the network →
            </a>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <div className="grid gap-5 md:grid-cols-3">
            {VALUE_CARDS.map((c) => (
              <div key={c.title} className={`rounded-3xl p-7 ${c.bg}`}>
                <h3 className="text-lg font-bold">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/70">{c.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="join" className="scroll-mt-20 bg-cream">
          <div className="mx-auto max-w-6xl px-6 pt-20 sm:pt-24">
            <p className="eyebrow">Join the network</p>
            <h2 className="mt-3 text-4xl sm:text-5xl">Tell us what you do.</h2>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Contract manufacturers, ingredient suppliers, food technologists, R&amp;D and NPD
              consultants, and testing labs. Pick what you are and we'll ask the right questions.
            </p>
          </div>
          <div className="bg-gradient-to-b from-cream to-background px-6 pb-20 pt-12 sm:pb-28">
            <PartnerOnboarding />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 py-4">
        <a href="/" className="min-w-0 truncate font-mono text-base font-bold tracking-tight">
          First Batch Co.
        </a>
        <nav className="flex items-center gap-6 text-sm">
          <span className="hidden text-muted-foreground sm:inline">The network</span>
          <span className="hidden text-muted-foreground sm:inline">About</span>
          <a
            href="#join"
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-accent-warm"
          >
            For partners
          </a>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-6xl gap-4 px-6 py-12 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
        <div className="min-w-0">
          <p className="font-mono text-base font-bold">First Batch Co.</p>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            We connect food brands with the manufacturers, suppliers and specialists who can
            actually make their first batch.
          </p>
        </div>
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Partner onboarding prototype
        </p>
      </div>
    </footer>
  );
}
