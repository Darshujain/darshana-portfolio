import { Github, Linkedin, Code2, ArrowUp } from 'lucide-react';
import { personalInfo, socialLinks } from '@/data/portfolio';

export function Footer() {
  const handleNavClick = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-ink-200/70 bg-white/40 backdrop-blur-xl dark:border-white/5 dark:bg-ink-950/40">
      <div className="section-container py-12">
        <div className="flex flex-col items-center gap-8 text-center">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
            className="flex items-center gap-2.5 text-lg font-bold font-display text-ink-900 dark:text-white"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 via-accent-500 to-cyan-400 text-white shadow-lg shadow-brand-500/40">
              <Code2 className="h-5 w-5" />
            </span>
            {personalInfo.name}
          </a>

          <p className="text-sm text-ink-500 dark:text-ink-400">{personalInfo.role}</p>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="icon-btn"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="icon-btn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>

          {/* Back to top */}
          <button
            onClick={() => handleNavClick('#home')}
            className="inline-flex items-center gap-2 text-sm font-medium text-ink-500 transition-colors hover:text-brand-600 dark:text-ink-400 dark:hover:text-brand-400"
          >
            <ArrowUp className="h-4 w-4" />
            Back to top
          </button>

          {/* Copyright */}
          <div className="w-full border-t border-ink-200/70 pt-6 dark:border-white/5">
            <p className="font-mono text-xs text-ink-400 dark:text-ink-500">
              &copy; 2026 {personalInfo.name} · Crafted with React, TypeScript & a little AI ✦
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
