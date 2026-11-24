import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Github, Loader2, Mail, Phone, Send } from "lucide-react";
import { toast } from "sonner";

import { profile } from "@/data/portfolio";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";
import { submitContactMessage } from "@/lib/contact.functions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const empty: ContactInput = { fullName: "", email: "", subject: "", message: "" };
type Errors = Partial<Record<keyof ContactInput, string>>;

const fields: { name: keyof ContactInput; label: string; type?: string; autoComplete?: string; full?: boolean }[] = [
  { name: "fullName", label: "Full Name", autoComplete: "name" },
  { name: "email", label: "Email Address", type: "email", autoComplete: "email" },
  { name: "subject", label: "Subject", full: true },
];

const inputClass =
  "w-full rounded-2xl border border-input bg-secondary/50 px-4 py-3 text-heading placeholder:text-muted-foreground/70 outline-none transition-all duration-300 focus:border-primary focus:shadow-glow";

export function Contact() {
  const submit = useServerFn(submitContactMessage);
  const [values, setValues] = useState<ContactInput>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const update = (name: keyof ContactInput, value: string) => {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof ContactInput;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      toast.error("Please fix the highlighted fields.");
      return;
    }
    setStatus("sending");
    try {
      await submit({ data: parsed.data });
      setStatus("sent");
      setValues(empty);
      toast.success("Message sent! I'll get back to you soon.");
    } catch {
      setStatus("error");
      toast.error("Your message couldn't be sent. Please try again or email me directly.");
    }
  };

  const contacts = [
    { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { icon: Phone, label: "Phone", value: profile.phone, href: profile.phoneHref },
    { icon: Github, label: "GitHub", value: profile.githubHandle, href: profile.github },
  ];

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="glow-orb absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full opacity-50" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Contact"
          title="Let's Work Together"
          description="Have a project in mind or want to collaborate? Feel free to contact me. I'm always interested in discussing new opportunities and creative ideas."
        />

        <div className="grid gap-6 lg:grid-cols-5">
          <div className="grid content-start gap-4 lg:col-span-2">
            {contacts.map((c, i) => {
              const Icon = c.icon;
              return (
                <Reveal key={c.label} delay={i * 90}>
                  <a
                    href={c.href}
                    target={c.label === "GitHub" ? "_blank" : undefined}
                    rel={c.label === "GitHub" ? "noreferrer" : undefined}
                    className="card-surface card-hover group flex items-center gap-4 rounded-3xl p-5"
                  >
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent text-primary transition-all duration-500 group-hover:bg-gradient-primary group-hover:text-primary-foreground">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-mono text-xs uppercase tracking-widest text-muted-foreground">{c.label}</span>
                      <span className="block truncate font-medium text-heading">{c.value}</span>
                    </span>
                  </a>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="lg:col-span-3" delay={100}>
            <form onSubmit={onSubmit} noValidate className="card-surface rounded-3xl p-6 sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                {fields.map((f) => (
                  <div key={f.name} className={cn(f.full && "sm:col-span-2")}>
                    <label htmlFor={f.name} className="mb-2 block text-sm font-medium text-heading">
                      {f.label}
                    </label>
                    <input
                      id={f.name}
                      name={f.name}
                      type={f.type ?? "text"}
                      autoComplete={f.autoComplete}
                      value={values[f.name]}
                      onChange={(e) => update(f.name, e.target.value)}
                      aria-invalid={!!errors[f.name]}
                      aria-describedby={errors[f.name] ? `${f.name}-error` : undefined}
                      className={cn(inputClass, errors[f.name] && "border-destructive")}
                    />
                    {errors[f.name] ? (
                      <p id={`${f.name}-error`} className="mt-1.5 text-sm text-destructive">
                        {errors[f.name]}
                      </p>
                    ) : null}
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-heading">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={values.message}
                    onChange={(e) => update("message", e.target.value)}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    className={cn(inputClass, "resize-none", errors.message && "border-destructive")}
                  />
                  {errors.message ? (
                    <p id="message-error" className="mt-1.5 text-sm text-destructive">
                      {errors.message}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div aria-live="polite" className="text-sm">
                  {status === "sent" ? (
                    <span className="flex items-center gap-2 text-primary">
                      <CheckCircle2 className="h-4 w-4" /> Thanks! Your message has been sent.
                    </span>
                  ) : status === "error" ? (
                    <span className="text-destructive">Something went wrong. Please try again.</span>
                  ) : null}
                </div>
                <Button type="submit" variant="hero" size="xl" disabled={status === "sending"}>
                  {status === "sending" ? <Loader2 className="animate-spin" /> : <Send />}
                  {status === "sending" ? "Sending..." : "Send Message"}
                </Button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
