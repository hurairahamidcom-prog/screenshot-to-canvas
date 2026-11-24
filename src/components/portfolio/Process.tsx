import { processSteps } from "@/data/portfolio";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Process() {
  return (
    <section id="process" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Process" title="How I Deliver" description="A clear six-step path from idea to a product that keeps growing." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step, i) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.title} delay={(i % 3) * 100}>
                <article className="card-surface card-hover group relative h-full overflow-hidden rounded-3xl p-7">
                  <span className="pointer-events-none absolute -right-2 -top-6 font-display text-[7rem] font-extrabold leading-none text-primary/10 transition-colors duration-500 group-hover:text-primary/20">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="relative flex items-center gap-3">
                    <span className="rounded-full border border-primary/40 bg-accent px-3 py-1 font-mono text-xs font-semibold text-accent-foreground">
                      Step {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="relative mt-6 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow transition-transform duration-500 group-hover:rotate-6">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="relative mt-5 text-xl font-semibold">{step.title}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
