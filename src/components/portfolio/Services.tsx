import { services } from "@/data/portfolio";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Services" title="What I Can Do" description="Practical, well-crafted work across the web and data." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.title} delay={(i % 4) * 80}>
                <article className="card-surface card-hover group relative h-full overflow-hidden rounded-3xl p-6">
                  <div className="absolute inset-x-0 top-0 h-px scale-x-0 bg-gradient-primary transition-transform duration-500 group-hover:scale-x-100" aria-hidden />
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-accent text-primary transition-all duration-500 group-hover:scale-110 group-hover:bg-gradient-primary group-hover:text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{service.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
