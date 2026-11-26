import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Bot, MessageCircle, Send, Sparkles, X } from "lucide-react";

import { profile } from "@/data/portfolio";
import {
  answerPortfolioQuestion,
  SUGGESTED_QUESTIONS,
  type ChatAction,
} from "@/lib/portfolio-chat";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Message = {
  id: string;
  sender: "bot" | "user";
  text: string;
  action?: ChatAction;
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: "welcome",
    sender: "bot",
    text: `Welcome! Thanks for visiting ${profile.name}'s portfolio. Looking to build a website, hire a developer, or explore past work? Ask me anything and I'll help right away.`,
  },
];

export function PortfolioChatbot() {
  const [open, setOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, open]);

  useEffect(() => {
    if (open) {
      setShowWelcome(false);
      inputRef.current?.focus();
    }
  }, [open]);

  const sendQuestion = (question: string) => {
    const trimmed = question.trim();
    if (!trimmed) return;

    const reply = answerPortfolioQuestion(trimmed);
    const stamp = Date.now().toString(36);
    setMessages((prev) => [
      ...prev,
      { id: `u-${stamp}-${prev.length}`, sender: "user", text: trimmed },
      {
        id: `b-${stamp}-${prev.length + 1}`,
        sender: "bot",
        text: reply.text,
        ...(reply.action ? { action: reply.action } : {}),
      },
    ]);
    setInput("");
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendQuestion(input);
  };

  return (
    <div className="fixed bottom-6 right-4 z-50 flex flex-col items-end sm:right-6">
      {!open && showWelcome ? (
        <div className="glass mb-3 flex max-w-[280px] items-start gap-2.5 rounded-2xl px-3.5 py-2.5 text-xs shadow-glow animate-in fade-in slide-in-from-bottom-2 duration-500">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="text-left leading-relaxed text-heading transition-colors hover:text-primary"
          >
            <span className="font-semibold text-primary">Welcome!</span> Have a project in mind or questions about{" "}
            {profile.firstName}&apos;s work? Chat with me.
          </button>
          <button
            type="button"
            onClick={() => setShowWelcome(false)}
            aria-label="Dismiss welcome message"
            className="mt-0.5 shrink-0 text-muted-foreground transition-colors hover:text-heading"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : null}

      {open ? (
        <section
          aria-label="Portfolio assistant chat"
          className="glass mb-3 flex h-[min(72vh,520px)] w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-3xl shadow-glow-lg animate-in fade-in slide-in-from-bottom-4 duration-300 sm:w-[380px]"
        >
          <header className="flex items-center justify-between border-b border-border bg-surface/80 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center overflow-hidden rounded-full bg-gradient-primary p-[2px] shadow-glow">
                {profile.photo ? (
                  <img
                    src={profile.photo}
                    alt={profile.name}
                    className="h-full w-full rounded-full object-cover object-top"
                  />
                ) : (
                  <Bot className="h-4 w-4 text-primary-foreground" />
                )}
              </div>
              <div>
                <p className="font-display text-sm font-semibold text-heading">
                  {profile.firstName} Assistant
                </p>
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Portfolio Q&amp;A · Instant
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="grid h-8 w-8 place-items-center rounded-full border border-border bg-secondary/60 text-heading transition-colors hover:border-primary/60 hover:text-primary"
            >
              <X className="h-4 w-4" />
            </button>
          </header>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn("flex flex-col", msg.sender === "user" ? "items-end" : "items-start")}
              >
                <div
                  className={cn(
                    "max-w-[85%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                    msg.sender === "user"
                      ? "rounded-br-sm bg-gradient-primary font-medium text-primary-foreground shadow-glow"
                      : "rounded-bl-sm border border-border bg-surface/90 text-foreground",
                  )}
                >
                  {msg.text}
                </div>
                {msg.action ? (
                  <a
                    href={msg.action.href}
                    target={msg.action.href.startsWith("http") ? "_blank" : undefined}
                    rel={msg.action.href.startsWith("http") ? "noreferrer" : undefined}
                    onClick={() => {
                      if (msg.action?.href.startsWith("#")) setOpen(false);
                    }}
                    className="mt-1.5 inline-flex items-center gap-1 rounded-full border border-primary/30 bg-accent px-3 py-1 text-xs font-medium text-accent-foreground transition-colors hover:border-primary"
                  >
                    {msg.action.label}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                ) : null}
              </div>
            ))}
          </div>

          <div className="border-t border-border bg-surface/60 px-3 py-2">
            <div className="flex gap-1.5 overflow-x-auto pb-2">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => sendQuestion(q)}
                  className="inline-flex shrink-0 items-center gap-1 rounded-full border border-border bg-secondary/70 px-2.5 py-1 text-xs text-heading transition-colors hover:border-primary/60 hover:text-primary"
                >
                  <Sparkles className="h-3 w-3 text-primary" />
                  {q}
                </button>
              ))}
            </div>

            <form onSubmit={onSubmit} className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about skills, projects, contact..."
                aria-label="Ask a question about the portfolio"
                className="h-10 flex-1 rounded-full border border-input bg-secondary/60 px-4 text-sm text-heading placeholder:text-muted-foreground/70 outline-none transition-colors focus:border-primary"
              />
              <Button
                type="submit"
                variant="hero"
                size="icon"
                disabled={!input.trim()}
                aria-label="Send message"
                className="h-10 w-10 shrink-0 rounded-full"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </section>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Close portfolio assistant" : "Open portfolio assistant"}
        aria-expanded={open}
        className="flex h-12 items-center gap-2.5 rounded-full bg-gradient-primary px-4 font-display text-sm font-semibold text-primary-foreground shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow-lg"
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
        <span>{open ? "Close" : "Ask Me"}</span>
      </button>
    </div>
  );
}
