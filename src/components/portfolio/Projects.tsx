import { ExternalLink, Github } from "lucide-react";

import { projects, type Project } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

function ProjectLink({ href, label, icon: Icon, variant }: { href: string | null; label: string; icon: typeof Github; variant: "hero" | "chip" }) {
  if (!href) {
    return (
      <Button variant={variant} size="sm" disabled title="Link coming soon" className="h-9 px-4">
        <Icon /> {label}
      </Button>
    );
  }
  return (
    <Button asChild variant={variant} size="sm" className="h-9 px-4">
      <a href={href} target="_blank" rel="noreferrer">
        <Icon /> {label}
      </a>
    </Button>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const hasLinks = project.liveUrl || project.githubUrl;
  return (
    <article className="card-surface card-hover group flex h-full flex-col overflow-hidden rounded-3xl">
      <div className="relative aspect-[16/10] overflow-hidden bg-surface">
        <img
          src={project.image}
          alt={`${project.title} preview`}
          loading="lazy"
          width={1000}
          height={625}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent opacity-80" aria-hidden />
        <span className="glass absolute left-4 top-4 rounded-full px-3 py-1 font-mono text-xs text-heading">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-semibold transition-colors group-hover:text-primary">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li key={tag} className="rounded-full bg-accent px-3 py-1 font-mono text-xs text-accent-foreground">
              {tag}
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-border pt-5">
          <ProjectLink href={project.liveUrl} label="View Project" icon={ExternalLink} variant="hero" />
          <ProjectLink href={project.githubUrl} label="GitHub" icon={Github} variant="chip" />
          {!hasLinks ? <span className="ml-auto text-xs text-muted-foreground">Links coming soon</span> : null}
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Portfolio" title="My Featured Projects" description="A selection of things I've built while learning and growing as a developer." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={(i % 3) * 100}>
              <ProjectCard project={project} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
