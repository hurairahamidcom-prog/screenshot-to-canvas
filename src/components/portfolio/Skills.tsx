import { skillCategories } from "@/data/portfolio";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Toolkit"
          title="My Technical Skills"
          description="The languages, frameworks and tools I use to design, build and analyse."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <Reveal key={cat.title} delay={i * 90} className={i === 0 ? "lg:row-span-1" : ""}>
                <div className="card-surface card-hover group h-full rounded-3xl p-7">
                  <div className="flex items-center gap-4">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-accent text-primary transition-all duration-500 group-hover:bg-gradient-primary group-hover:text-primary-foreground">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{cat.title}</h3>
                      <p className="font-mono text-xs text-muted-foreground">{cat.skills.length} skills</p>
                    </div>
                  </div>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {cat.skills.map((skill, j) => (
                      <li
                        key={skill}
                        className="rounded-full border border-border bg-secondary/60 px-3 py-1.5 text-sm text-heading transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/60 hover:text-primary"
                        style={{ transitionDelay: `${j * 15}ms` }}
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
