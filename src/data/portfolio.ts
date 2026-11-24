import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Code2,
  Compass,
  Database,
  LayoutDashboard,
  LineChart,
  Monitor,
  PenTool,
  Rocket,
  Smartphone,
  TrendingUp,
  Wrench,
  FlaskConical,
  Atom,
  Layers,
  Terminal,
} from "lucide-react";

import portfolioImg from "@/assets/projects/portfolio.webp";
import dashboardImg from "@/assets/projects/dashboard.webp";
import calculatorImg from "@/assets/projects/calculator.webp";
import studentsImg from "@/assets/projects/students.webp";
import todoImg from "@/assets/projects/todo.webp";
import weatherImg from "@/assets/projects/weather.webp";
import ecommerceImg from "@/assets/projects/ecommerce.webp";
import authImg from "@/assets/projects/auth.webp";

/* ---------- Personal info (edit here) ---------- */
export const profile = {
  name: "Huraira Hamid",
  firstName: "Huraira",
  title: "Software Engineer & Web Developer",
  email: "hurairahamid.com@gmail.com",
  phone: "+92 311 1689934",
  phoneHref: "tel:+923111689934",
  website: "hurairahamid.com",
  github: "https://github.com/hurairahamidcom-prog",
  githubHandle: "hurairahamidcom-prog",
  /** Replace with an imported image (e.g. import photo from "@/assets/me.jpg") to show your photo. */
  photo: null as string | null,
  roles: ["Software Engineer", "Web Developer", "Frontend Developer", "Data Analyst"],
  intro:
    "I'm a passionate Software Engineer and Web Developer who enjoys building modern, responsive, and user-friendly websites. I love turning creative ideas into functional digital experiences and continuously improving my technical skills.",
};

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "services", label: "Services" },
  { id: "process", label: "How I Deliver" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const;

/* ---------- About ---------- */
export const about = {
  text: "I'm Huraira Hamid, a Software Engineer and Web Developer passionate about technology, programming, and modern web development. I enjoy creating responsive websites, developing practical applications, and transforming ideas into meaningful digital solutions. I am continuously learning new technologies and improving my development skills.",
  interests: [
    "Modern frontend development with React",
    "Responsive, accessible user interfaces",
    "Turning data into clear visual insights",
    "Clean, component-based architecture",
  ],
  goals:
    "My goal is to grow into a well-rounded software engineer who ships reliable, user-focused products — contributing to real-world teams while deepening my expertise in web development and data.",
};

/* Factual stats only — counts come straight from the content on this site. */
export const stats = [
  { value: "8", label: "Projects showcased" },
  { value: "5", label: "Skill categories" },
  { value: "8", label: "Services offered" },
  { value: "BS", label: "Software Engineering" },
];

/* ---------- Education (edit institution here) ---------- */
export const education = {
  degree: "BS Software Engineering",
  institution: "Your University",
  status: "Currently Enrolled",
  duration: "In Progress",
};

/* ---------- Skills ---------- */
export type SkillCategory = { title: string; icon: LucideIcon; skills: string[] };

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend Development",
    icon: Monitor,
    skills: ["HTML5", "CSS3", "JavaScript", "React.js", "Responsive Web Design", "JSX", "Tailwind CSS"],
  },
  {
    title: "Programming & Development",
    icon: Code2,
    skills: ["JavaScript", "React", "Vite", "Component-Based Development", "API Integration"],
  },
  {
    title: "Database",
    icon: Database,
    skills: ["SQL", "Database Fundamentals", "Data Management"],
  },
  {
    title: "Data Analysis",
    icon: BarChart3,
    skills: ["Data Analysis", "Data Visualization", "Microsoft Excel", "Data Interpretation", "Dashboard Development"],
  },
  {
    title: "Tools & Technologies",
    icon: Terminal,
    skills: ["Git", "GitHub", "VS Code", "npm", "Vercel", "Chrome DevTools", "Microsoft Office"],
  },
];

/* ---------- Services ---------- */
export const services: { title: string; icon: LucideIcon; description: string }[] = [
  { title: "Web Development", icon: Code2, description: "Fast, modern websites built with clean, maintainable code from first idea to launch." },
  { title: "Frontend Development", icon: Layers, description: "Polished interfaces with smooth interactions, built on reusable components." },
  { title: "Responsive Website Design", icon: Smartphone, description: "Layouts that look and work great on phones, tablets, laptops and desktops." },
  { title: "React Development", icon: Atom, description: "Interactive single-page apps with React, hooks and a component-driven structure." },
  { title: "Website Maintenance", icon: Wrench, description: "Updates, fixes and improvements that keep your site secure, fast and current." },
  { title: "Data Analysis", icon: LineChart, description: "Cleaning and exploring data to find the trends and answers that matter." },
  { title: "Dashboard Development", icon: LayoutDashboard, description: "Clear dashboards that turn raw numbers into visuals you can act on." },
  { title: "UI Implementation", icon: PenTool, description: "Turning designs into pixel-accurate, accessible and responsive pages." },
];

/* ---------- Process ---------- */
export const processSteps: { title: string; icon: LucideIcon; description: string }[] = [
  { title: "Strategize", icon: Compass, description: "Understand your goals, audience and requirements to plan the right solution." },
  { title: "Design", icon: PenTool, description: "Map the structure and user flow into a clean, modern interface." },
  { title: "Develop", icon: Code2, description: "Build with reusable components and clean, readable, maintainable code." },
  { title: "Test", icon: FlaskConical, description: "Check functionality, responsiveness and performance across devices." },
  { title: "Launch", icon: Rocket, description: "Deploy the project and make sure everything runs smoothly in production." },
  { title: "Scale", icon: TrendingUp, description: "Iterate, improve and add features as your needs grow." },
];

/* ---------- Projects (add your links here; null = not published yet) ---------- */
export type Project = {
  title: string;
  description: string;
  tags: string[];
  image: string;
  liveUrl: string | null;
  githubUrl: string | null;
};

export const projects: Project[] = [
  {
    title: "Personal Portfolio Website",
    description: "A responsive personal portfolio showcasing professional information, technical skills, and projects.",
    tags: ["HTML", "CSS", "JavaScript"],
    image: portfolioImg,
    liveUrl: null,
    githubUrl: null,
  },
  {
    title: "Data Analysis Dashboard",
    description: "A dashboard that analyzes data and presents meaningful information through visualizations.",
    tags: ["SQL", "Excel", "Data Analysis"],
    image: dashboardImg,
    liveUrl: null,
    githubUrl: null,
  },
  {
    title: "Calculator Application",
    description: "An interactive calculator for performing mathematical operations.",
    tags: ["HTML", "CSS", "JavaScript"],
    image: calculatorImg,
    liveUrl: null,
    githubUrl: null,
  },
  {
    title: "Student Record Management System",
    description: "An application for managing student information and academic records.",
    tags: ["React", "JavaScript", "CSS"],
    image: studentsImg,
    liveUrl: null,
    githubUrl: null,
  },
  {
    title: "To-Do List Application",
    description: "A task management application that allows users to add, complete, and delete tasks.",
    tags: ["React", "JavaScript", "CSS"],
    image: todoImg,
    liveUrl: null,
    githubUrl: null,
  },
  {
    title: "Weather Application",
    description: "A weather application that displays weather information using a weather API.",
    tags: ["React", "JavaScript", "API Integration"],
    image: weatherImg,
    liveUrl: null,
    githubUrl: null,
  },
  {
    title: "E-commerce Frontend",
    description: "A modern online shopping interface with product cards, navigation, and shopping cart UI.",
    tags: ["React", "CSS", "JavaScript"],
    image: ecommerceImg,
    liveUrl: null,
    githubUrl: null,
  },
  {
    title: "Login and Registration UI",
    description: "A modern authentication interface with login and registration forms.",
    tags: ["HTML", "CSS", "JavaScript"],
    image: authImg,
    liveUrl: null,
    githubUrl: null,
  },
];
