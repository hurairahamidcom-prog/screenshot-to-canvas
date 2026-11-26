import {
  about,
  education,
  processSteps,
  profile,
  projects,
  services,
  skillCategories,
  stats,
} from "@/data/portfolio";

export type ChatAction = {
  label: string;
  href: string;
};

export type ChatReply = {
  text: string;
  action?: ChatAction;
};

export const SUGGESTED_QUESTIONS = [
  "What services do you offer?",
  "Tell me about your projects",
  "What are your skills?",
  "How can I hire or contact you?",
] as const;

type TopicEntry = {
  id: string;
  keywords: string[];
  buildReply: (normalizedQuery: string) => ChatReply;
};

function normalize(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s.#+-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function includesAny(query: string, terms: string[]): boolean {
  return terms.some((term) => new RegExp(`(^|\\s)${escapeRegex(term)}(\\s|$)`).test(query));
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function formatProjectReply(project: (typeof projects)[number]): ChatReply {
  const details = [
    `${project.title}: ${project.description}`,
    `Technologies: ${project.tags.join(", ")}.`,
  ];
  if (project.githubUrl) {
    details.push(`Repository: ${project.githubUrl}`);
  } else if (project.liveUrl) {
    details.push(`Live link: ${project.liveUrl}`);
  } else {
    details.push("Public links for this project are coming soon.");
  }

  return {
    text: details.join("\n"),
    action: project.githubUrl
      ? { label: "Open GitHub Repo", href: project.githubUrl }
      : { label: "View Projects", href: "#projects" },
  };
}

function matchSpecificSkill(query: string): ChatReply | null {
  const matched: { category: string; skill: string }[] = [];
  for (const cat of skillCategories) {
    for (const skill of cat.skills) {
      const normalizedSkill = normalize(skill);
      const tokens = normalizedSkill.split(/[\s.]+/).filter((t) => t.length >= 3);
      if (
        includesAny(query, [normalizedSkill]) ||
        (tokens.length > 0 && includesAny(query, tokens))
      ) {
        matched.push({ category: cat.title, skill });
      }
    }
  }

  if (matched.length === 0) return null;

  const uniqueSkills = Array.from(new Set(matched.map((m) => `${m.skill} (${m.category})`)));
  return {
    text: `Yes — Huraira works with ${uniqueSkills.join(", ")}.`,
    action: { label: "See All Skills", href: "#skills" },
  };
}

function matchSpecificProject(query: string): ChatReply | null {
  const genericWords = new Set(["application", "system", "website", "frontend", "data", "analysis"]);
  for (const project of projects) {
    const titleWords = normalize(project.title)
      .split(" ")
      .filter((w) => w.length >= 4 && !genericWords.has(w));
    if (query.includes(normalize(project.title)) || includesAny(query, titleWords)) {
      return formatProjectReply(project);
    }
  }
  return null;
}

function matchSpecificService(query: string): ChatReply | null {
  for (const service of services) {
    const titleWords = normalize(service.title)
      .split(" ")
      .filter((w) => w.length >= 4 && w !== "development" && w !== "website");
    if (query.includes(normalize(service.title)) || (titleWords.length > 0 && includesAny(query, titleWords))) {
      return {
        text: `${service.title}: ${service.description}`,
        action: { label: "View Services", href: "#services" },
      };
    }
  }
  return null;
}

const TOPICS: TopicEntry[] = [
  {
    id: "greeting",
    keywords: [
      "hi",
      "hello",
      "hey",
      "welcome",
      "salam",
      "assalam",
      "good morning",
      "good afternoon",
      "good evening",
      "help",
    ],
    buildReply: () => ({
      text: `Welcome! Great to have you here. I'm ${profile.firstName}'s portfolio assistant — ask me about services, projects, technical skills, education, delivery process, or how to start a project together.`,
      action: { label: "Start a Project", href: "#contact" },
    }),
  },
  {
    id: "email",
    keywords: ["email", "mail", "gmail"],
    buildReply: () => ({
      text: `You can email ${profile.name} directly at ${profile.email}, or use the contact form on this page.`,
      action: { label: "Go to Contact", href: "#contact" },
    }),
  },
  {
    id: "phone",
    keywords: ["phone", "call", "number", "whatsapp", "mobile"],
    buildReply: () => ({
      text: `${profile.name}'s phone number is ${profile.phone}.`,
      action: { label: "Go to Contact", href: "#contact" },
    }),
  },
  {
    id: "github",
    keywords: ["github", "git", "repo", "repository", "code", "source"],
    buildReply: () => {
      const portfolioProject = projects.find((p) => p.githubUrl);
      const repoNote = portfolioProject?.githubUrl
        ? ` The Personal Portfolio Website repository is at ${portfolioProject.githubUrl}.`
        : "";
      return {
        text: `${profile.name}'s GitHub profile is ${profile.github} (@${profile.githubHandle}).${repoNote}`,
        action: { label: "Open GitHub", href: profile.github },
      };
    },
  },
  {
    id: "contact",
    keywords: [
      "contact",
      "hire",
      "reach",
      "available",
      "availability",
      "message",
      "work together",
      "opportunity",
      "freelance",
      "client",
      "quote",
      "pricing",
      "price",
      "cost",
      "budget",
    ],
    buildReply: () => ({
      text: `${profile.name} is open to new projects and opportunities. Share your idea via the Contact form, email (${profile.email}), phone (${profile.phone}), or GitHub (${profile.github}).`,
      action: { label: "Contact Me", href: "#contact" },
    }),
  },
  {
    id: "education",
    keywords: ["education", "degree", "university", "college", "study", "studying", "academic", "bs", "qualification"],
    buildReply: () => ({
      text: `${profile.name} is pursuing a ${education.degree} at ${education.institution} (${education.status} — ${education.duration}).`,
      action: { label: "View Education", href: "#education" },
    }),
  },
  {
    id: "process",
    keywords: ["process", "deliver", "workflow", "steps", "approach", "methodology"],
    buildReply: () => ({
      text: `${profile.firstName} follows a 6-step delivery process:\n${processSteps
        .map((s, idx) => `${idx + 1}. ${s.title} — ${s.description}`)
        .join("\n")}`,
      action: { label: "How I Deliver", href: "#process" },
    }),
  },
  {
    id: "skills",
    keywords: ["skill", "skills", "tech", "stack", "technology", "technologies", "tools", "languages", "frameworks"],
    buildReply: () => ({
      text: `${profile.firstName}'s technical skills span ${skillCategories.length} categories:\n${skillCategories
        .map((c) => `• ${c.title}: ${c.skills.join(", ")}`)
        .join("\n")}`,
      action: { label: "View Skills", href: "#skills" },
    }),
  },
  {
    id: "services",
    keywords: ["service", "services", "offer", "what can you do", "what do you do", "help with"],
    buildReply: () => ({
      text: `Here is what ${profile.firstName} can help you with (${services.length} services):\n${services
        .map((s) => `• ${s.title}: ${s.description}`)
        .join("\n")}`,
      action: { label: "View Services", href: "#services" },
    }),
  },
  {
    id: "projects",
    keywords: ["project", "projects", "work", "built", "showcase", "apps", "examples"],
    buildReply: () => ({
      text: `There are ${projects.length} featured projects in this portfolio: ${projects
        .map((p) => p.title)
        .join(", ")}. Ask about any project by name for details.`,
      action: { label: "Browse Projects", href: "#projects" },
    }),
  },
  {
    id: "about",
    keywords: ["who", "about", "huraira", "hamid", "bio", "background", "yourself", "role", "roles", "goal", "goals", "interest", "interests"],
    buildReply: (query) => {
      if (includesAny(query, ["goal", "goals"])) {
        return { text: about.goals, action: { label: "About Me", href: "#about" } };
      }
      if (includesAny(query, ["interest", "interests"])) {
        return {
          text: `${profile.firstName}'s core interests include:\n${about.interests.map((i) => `• ${i}`).join("\n")}`,
          action: { label: "About Me", href: "#about" },
        };
      }
      const summaryStats = stats.map((s) => `${s.value} ${s.label}`).join(" · ");
      return {
        text: `${about.text}\nRoles: ${profile.roles.join(", ")}.\nHighlights: ${summaryStats}.`,
        action: { label: "About Me", href: "#about" },
      };
    },
  },
];

/**
 * Answers visitor questions strictly from the local portfolio data in `src/data/portfolio.ts`
 * without calling any external AI/OpenAI API.
 */
export function answerPortfolioQuestion(rawInput: string): ChatReply {
  const query = normalize(rawInput);
  if (!query) {
    return {
      text: "Ask a question about Huraira's skills, projects, services, education, or contact info.",
    };
  }

  // Specific entity matches take precedence over broad category responses when relevant.
  const specificProject = matchSpecificProject(query);
  if (specificProject && !includesAny(query, ["all projects", "how many projects", "list projects"])) {
    return specificProject;
  }

  let bestTopic: TopicEntry | null = null;
  let bestScore = 0;

  for (const topic of TOPICS) {
    let score = 0;
    for (const kw of topic.keywords) {
      if (includesAny(query, [kw])) {
        score += kw.includes(" ") ? 2 : 1;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestTopic = topic;
    }
  }

  if (bestTopic && bestScore > 0) {
    if (bestTopic.id === "skills") {
      const specificSkill = matchSpecificSkill(query);
      if (specificSkill) return specificSkill;
    }
    return bestTopic.buildReply(query);
  }

  const specificSkill = matchSpecificSkill(query);
  if (specificSkill) {
    return specificSkill;
  }

  const specificService = matchSpecificService(query);
  if (specificService) {
    return specificService;
  }

  return {
    text: `I can only answer questions based on ${profile.name}'s portfolio (about, skills, services, delivery process, projects, education, and contact info). For anything else, feel free to email ${profile.email} or use the Contact section.`,
    action: { label: "Ask via Contact", href: "#contact" },
  };
}
