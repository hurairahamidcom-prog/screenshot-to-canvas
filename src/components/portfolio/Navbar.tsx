import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { navLinks, profile } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav
        aria-label="Main"
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-6",
          scrolled ? "glass shadow-glow" : "border border-transparent",
        )}
      >
        <a href="#home" className="group flex items-center gap-2 font-display text-xl font-bold text-heading">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary font-mono text-sm text-primary-foreground shadow-glow transition-transform duration-300 group-hover:rotate-6">
            H
          </span>
          <span>
            {profile.firstName}
            <span className="text-primary">.</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={cn(
                  "relative rounded-full px-3 py-2 text-sm font-medium transition-colors duration-300",
                  active === link.id ? "text-primary" : "text-muted-foreground hover:text-heading",
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute inset-x-3 -bottom-0.5 h-px bg-primary transition-transform duration-300",
                    active === link.id ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild variant="hero" size="sm" className="hidden h-10 px-5 sm:inline-flex">
            <a href="#contact">Hire Me</a>
          </Button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-secondary/60 text-heading lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <div
        className={cn(
          "glass mx-auto mt-3 max-w-6xl overflow-hidden rounded-3xl transition-all duration-500 lg:hidden",
          open ? "max-h-[80vh] opacity-100" : "pointer-events-none max-h-0 opacity-0",
        )}
      >
        <ul className="flex flex-col p-3">
          {navLinks.map((link, i) => (
            <li
              key={link.id}
              className={cn("transition-all duration-500", open ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0")}
              style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
            >
              <a
                href={`#${link.id}`}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center justify-between rounded-2xl px-4 py-3 text-base font-medium transition-colors",
                  active === link.id ? "bg-accent text-primary" : "text-heading hover:bg-secondary",
                )}
              >
                {link.label}
                <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
              </a>
            </li>
          ))}
          <li className="p-2">
            <Button asChild variant="hero" className="h-11 w-full">
              <a href="#contact" onClick={() => setOpen(false)}>
                Hire Me
              </a>
            </Button>
          </li>
        </ul>
      </div>
    </header>
  );
}
