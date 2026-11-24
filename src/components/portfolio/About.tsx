import { CheckCircle2, Target, User } from "lucide-react";

import { about, stats } from "@/data/portfolio";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Who I am" title="About Me" />

        <div className="grid gap-6 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <div className="card-surface card-hover h-full rounded-3xl p-8">
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-accent text-primary">
                <User className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold">Professional introduction</h3>
              <p className="mt-4 text-base leading-relaxed sm:text-lg">{about.text}</p>
            </div>
          </Reveal>

          <div className="grid gap-6 lg:col-span-2">
            <Reveal delay={100}>
              <div className="card-surface card-hover rounded-3xl p-7">
                <h3 className="text-lg font-semibold">Development interests</h3>
                <ul className="mt-4 space-y-3">
                  {about.interests.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm sm:text-base">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="card-surface card-hover rounded-3xl p-7">
                <div className="flex items-center gap-3">
                  <Target className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">Career goals</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed sm:text-base">{about.goals}</p>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 80}>
              <div className="card-surface card-hover rounded-3xl p-6 text-center">
                <p className="text-gradient font-display text-4xl font-extrabold sm:text-5xl">{stat.value}</p>
                <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
