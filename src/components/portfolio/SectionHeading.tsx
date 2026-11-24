import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <Reveal className="mx-auto mb-14 max-w-2xl text-center">
      <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-accent px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-accent-foreground">
        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
        {eyebrow}
      </span>
      <h2 className="mt-5 text-3xl font-bold sm:text-4xl md:text-5xl">{title}</h2>
      {description ? <p className="mt-4 text-base text-muted-foreground sm:text-lg">{description}</p> : null}
    </Reveal>
  );
}
