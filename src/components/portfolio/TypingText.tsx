import { useEffect, useState } from "react";

type TypingTextProps = { words: string[] };

/** Types and deletes each word in turn. */
export function TypingText({ words }: TypingTextProps) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length] ?? "";
    let delay = deleting ? 45 : 90;
    if (!deleting && text === word) delay = 1600;
    if (deleting && text === "") delay = 350;

    const timer = setTimeout(() => {
      if (!deleting && text === word) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      } else {
        setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [text, deleting, index, words]);

  return (
    <span className="inline-flex items-center">
      <span className="text-gradient">{text || "\u00A0"}</span>
      <span aria-hidden className="ml-1 inline-block h-[0.9em] w-[3px] animate-caret rounded-full bg-primary" />
      <span className="sr-only">{words.join(", ")}</span>
    </span>
  );
}
