import { Building2, CalendarClock, GraduationCap } from "lucide-react";

import { education } from "@/data/portfolio";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Education() {
  return (
    <section id="education" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading eyebrow="Academics" title="My Education" />
        <Reveal>
          <article className="card-surface card-hover group relative overflow-hidden rounded-3xl p-8 sm:p-10">
            <div className="glow-orb absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-60 transition-opacity duration-500 group-hover:opacity-100" aria-hidden />
            <div className="relative flex flex-col gap-8 sm:flex-row sm:items-center">
              <div className="grid h-20 w-20 shrink-0 place-items-center rounded-3xl bg-gradient-primary text-primary-foreground shadow-glow transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105">
                <GraduationCap className="h-10 w-10" />
              </div>
              <div className="flex-1">
                <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                  {education.status}
                </span>
                <h3 className="mt-3 text-2xl font-bold sm:text-3xl">{education.degree}</h3>
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground sm:text-base">
                  <span className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-primary" />
                    {education.institution}
                  </span>
                  <span className="flex items-center gap-2">
                    <CalendarClock className="h-4 w-4 text-primary" />
                    {education.duration}
                  </span>
                </div>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
