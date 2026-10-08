import type { LucideIcon } from 'lucide-react';
import {
  Atom as ReactIcon,
  FileCode2,
  Braces,
  Globe,
  Palette,
  Layers,
  Server,
  Cloud,
  GitBranch,
  Github as GithubIcon,
  Code2,
  MousePointer2,
  Boxes,
  Database,
  Zap,
} from 'lucide-react';

export const personalInfo = {
  name: 'Darshana Jain',
  role: 'Software Developer',
  heroHeadline: "Hi, I'm Darshana Jain",
  heroSubtext:
    "Building modern, responsive and user-focused web applications with React, TypeScript and modern web technologies.",
  aboutText:
    "I'm a software developer with a focus on frontend development, passionate about building clean, performant, and user-centric web applications. I work primarily with React, TypeScript, and modern state management tools like Redux Toolkit and RTK Query. My experience spans the full frontend ecosystem — from semantic HTML and CSS to component libraries like Ant Design and utility-first frameworks like Tailwind CSS. I also have backend exposure through Node.js and cloud platforms like AWS, and I use Git and GitHub daily for version control and collaboration. I enjoy turning complex problems into simple, elegant interfaces and continuously learning new tools to improve my craft.",
  email: 'darshana.jain@example.com',
  resumeUrl: '/resume.pdf',
  resumeAvailable: true,
};

export const socialLinks = {
  github: 'https://github.com/Darshujain',
  linkedin: 'https://www.linkedin.com/in/darshana-jain-052a891b6/',
  email: 'darshana.jain@example.com',
};

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export interface SkillCategory {
  title: string;
  skills: { name: string; icon: LucideIcon }[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    skills: [
      { name: 'React.js', icon: ReactIcon },
      { name: 'TypeScript', icon: FileCode2 },
      { name: 'JavaScript', icon: Braces },
      { name: 'HTML5', icon: Globe },
      { name: 'CSS3', icon: Palette },
      { name: 'Tailwind CSS', icon: Layers },
      { name: 'Ant Design', icon: Boxes },
    ],
  },
  {
    title: 'State Management',
    skills: [
      { name: 'Redux Toolkit', icon: Layers },
      { name: 'RTK Query', icon: Zap },
    ],
  },
  {
    title: 'Backend / Cloud',
    skills: [
      { name: 'Node.js', icon: Server },
      { name: 'AWS', icon: Cloud },
      { name: 'REST APIs', icon: Database },
    ],
  },
  {
    title: 'Tools',
    skills: [
      { name: 'Git', icon: GitBranch },
      { name: 'GitHub', icon: GithubIcon },
      { name: 'VS Code', icon: Code2 },
      { name: 'Cursor', icon: MousePointer2 },
    ],
  },
];

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  summary?: string;
}

export const experiences: ExperienceItem[] = [
  {
    role: 'Software Developer',
    company: 'Tech Potato',
    period: '2024 – Present',
  },
  {
    role: 'Trainee Engineer Intern',
    company: 'Hustlebee Softwares Private Limited',
    period: '1 Jul 2024 – 30 Jun 2025',
    summary:
      'Part of the Software Engineering Team, contributing to end-to-end product development activities.',
  },
];

export interface Project {
  name: string;
  date: string | null;
  description: string;
  technologies: string[];
  githubUrl: string | null;
  liveUrl: string | null;
  imageUrl: string | null;
  mockupType: 'dashboard' | 'product' | 'ecommerce' | 'weather' | 'edtech' | 'backend' | 'mobile';
}

export const projects: Project[] = [
  {
    name: 'NextGen Devs',
    date: 'Oct 2026',
    description:
      'A career-training platform for full stack and QA automation learners — course catalog, instructors, mentorship, practice and mock-interview flows, with light/dark theming.',
    technologies: ['React', 'TypeScript', 'React Router', 'Tailwind CSS', 'Vite'],
    githubUrl: null,
    liveUrl: '/demos/nextgen/',
    imageUrl: null,
    mockupType: 'edtech',
  },
  {
    name: 'ArcForge (CloudArc v2)',
    date: 'Sep 2026',
    description:
      'A backend starter monorepo with two copy-and-go kits — a TypeScript AWS Lambda + CDK stack and a Python FastAPI stack — with Postgres/Redis, auth, files and AI modules.',
    technologies: ['TypeScript', 'Node.js', 'AWS Lambda', 'AWS CDK', 'Python', 'FastAPI', 'Docker'],
    githubUrl: null,
    liveUrl: null,
    imageUrl: null,
    mockupType: 'backend',
  },
  {
    name: 'ClipX',
    date: 'Sep 2026',
    description:
      'A modern browser-based video editing studio with a multi-track timeline, media library, clip controls, audio layers, and fast export workflows.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Ant Design', 'Video Editing UI'],
    githubUrl: null,
    liveUrl: '/?demo=clipx',
    imageUrl: 'https://images.pexels.com/photos/12969403/pexels-photo-12969403.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    mockupType: 'product',
  },
  {
    name: 'Gesture Controller',
    date: 'Aug 2026',
    description:
      'A hands-free mobile app that reacts to voice commands and device motion — shake detection and speech control built on native sensors.',
    technologies: ['Ionic', 'React', 'Capacitor', 'Motion API', 'Speech Recognition'],
    githubUrl: null,
    liveUrl: '/demos/gesture-controller/',
    imageUrl: null,
    mockupType: 'mobile',
  },
  {
    name: 'Oriana Order Tracking',
    date: null,
    description:
      'A modern order and purchase order tracking application featuring a dashboard-based workflow for monitoring order status, filtering, and real-time updates.',
    technologies: ['React', 'TypeScript', 'Redux Toolkit', 'RTK Query', 'Ant Design', 'Node.js', 'AWS'],
    githubUrl: null,
    liveUrl: null,
    imageUrl: 'https://images.pexels.com/photos/4921260/pexels-photo-4921260.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    mockupType: 'dashboard',
  },
  {
    name: 'E-commerce Website',
    date: 'Jan 2025',
    description:
      'A clean e-commerce interface with product browsing, cart functionality, and a streamlined checkout experience.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    githubUrl: null,
    liveUrl: null,
    imageUrl: 'https://images.pexels.com/photos/6214474/pexels-photo-6214474.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    mockupType: 'ecommerce',
  },
  {
    name: 'Weather Website',
    date: 'Dec 2024',
    description:
      'A weather application that displays current conditions and forecasts with a clean, intuitive interface.',
    technologies: ['React', 'TypeScript', 'REST APIs'],
    githubUrl: null,
    liveUrl: null,
    imageUrl: null,
    mockupType: 'weather',
  },
];

export const contactInfo = {
  heading: "Let's Connect",
  subtext:
    "I'm open to discussing software development opportunities, projects and collaborations.",
  email: socialLinks.email,
  linkedin: socialLinks.linkedin,
  github: socialLinks.github,
};

