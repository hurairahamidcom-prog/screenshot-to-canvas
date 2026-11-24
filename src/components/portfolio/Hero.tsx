import { ArrowRight, Github, Mail, Sparkles } from "lucide-react";

import { profile } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { Particles } from "./Particles";
import { TypingText } from "./TypingText";

export function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pb-20 pt-32">
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" aria-hidden />
      <div className="glow-orb absolute -left-40 top-20 h-[480px] w-[480px] animate-pulse-glow rounded-full" aria-hidden />
      <div className="glow-orb absolute -right-40 bottom-0 h-[420px] w-[420px] animate-pulse-glow rounded-full [animation-delay:1.5s]" aria-hidden />
      <Particles />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 px-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-accent px-4 py-1.5 text-sm text-accent-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Open to opportunities
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] sm:text-6xl lg:text-7xl">
            Hi, I'm <span className="text-gradient text-glow">{profile.name}</span>
          </h1>

          <p className="mt-5 font-display text-2xl font-semibold text-heading sm:text-3xl">
            <TypingText words={profile.roles} />
          </p>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">{profile.intro}</p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Button asChild variant="hero" size="xl">
              <a href="#contact">
                Hire Me <ArrowRight />
              </a>
            </Button>
            <Button asChild variant="glass" size="xl">
              <a href="#projects">
                <Sparkles /> View My Projects
              </a>
            </Button>
          </div>

          <div className="mt-10 flex items-center gap-4 text-sm text-muted-foreground">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              className="grid h-10 w-10 place-items-center rounded-full border border-border transition-all hover:border-primary/60 hover:text-primary"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Send email"
              className="grid h-10 w-10 place-items-center rounded-full border border-border transition-all hover:border-primary/60 hover:text-primary"
            >
              <Mail className="h-4 w-4" />
            </a>
            <span className="font-mono">{profile.website}</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm animate-in fade-in zoom-in-95 duration-1000">
          <div className="absolute -inset-6 animate-spin-slow rounded-full border border-dashed border-primary/30" aria-hidden />
          <div className="absolute -inset-12 rounded-full border border-primary/10" aria-hidden />
          <div className="relative aspect-square animate-float overflow-hidden rounded-full bg-gradient-primary p-[3px] shadow-glow-lg">
            <div className="h-full w-full overflow-hidden rounded-full bg-surface">
              {profile.photo ? (
                <img src={profile.photo} alt={profile.name} className="h-full w-full object-cover" />
              ) : (
                <div className="bg-grid relative grid h-full w-full place-items-center">
                  <span className="text-gradient text-glow font-display text-8xl font-extrabold">HH</span>
                  <span className="absolute bottom-[18%] font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    Your photo here
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="glass absolute -left-4 top-10 rounded-2xl px-4 py-3 shadow-glow sm:-left-10">
            <p className="font-mono text-xs text-muted-foreground">{"<role>"}</p>
            <p className="text-sm font-semibold text-heading">Software Engineer</p>
          </div>
          <div className="glass absolute -right-2 bottom-8 rounded-2xl px-4 py-3 shadow-glow sm:-right-8">
            <p className="font-mono text-xs text-muted-foreground">{"<stack>"}</p>
            <p className="text-sm font-semibold text-heading">React · Tailwind</p>
          </div>
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About"
        className="absolute bottom-8 left-1/2 hidden h-10 w-6 -translate-x-1/2 justify-center rounded-full border border-border pt-2 md:flex"
      >
        <span className="h-2 w-1 animate-bounce rounded-full bg-primary" />
      </a>
    </section>
  );
}
