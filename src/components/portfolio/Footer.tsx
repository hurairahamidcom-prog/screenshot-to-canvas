import { Github, Mail } from "lucide-react";

import { navLinks, profile } from "@/data/portfolio";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-border bg-surface/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <a href="#home" className="flex items-center gap-2 font-display text-xl font-bold text-heading">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary font-mono text-sm text-primary-foreground">H</span>
            {profile.name}
          </a>
          <p className="mt-3 text-sm text-muted-foreground">{profile.title}</p>
        </div>
        <nav aria-label="Footer">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Quick links</p>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="text-foreground transition-colors hover:text-primary">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Connect</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={profile.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 transition-colors hover:text-primary">
                <Github className="h-4 w-4" /> GitHub
              </a>
            </li>
            <li>
              <a href={`mailto:${profile.email}`} className="flex items-center gap-2 break-all transition-colors hover:text-primary">
                <Mail className="h-4 w-4 shrink-0" /> {profile.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-sm text-muted-foreground">
        © {year} {profile.name}. All rights reserved.
      </div>
    </footer>
  );
}
