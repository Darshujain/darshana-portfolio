import { useEffect, useState } from 'react';
import { Github, Linkedin, Download, ArrowRight, Sparkles, ArrowUp } from 'lucide-react';
import { personalInfo, socialLinks } from '@/data/portfolio';
import { HeroIllustration } from './HeroIllustration';

const roles = ['Software Developer', 'React + TypeScript Engineer', 'AI-assisted Builder', 'UI Craftsperson'];

const prompts = [
  { label: 'Show me projects', href: '#projects' },
  { label: 'What is her stack?', href: '#skills' },
  { label: 'Work experience', href: '#experience' },
];

function useTypewriter(words: string[], typeSpeed = 70, pause = 1600) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];
    if (!deleting && text === word) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (deleting && text === '') {
      setDeleting(false);
      setIndex((i) => i + 1);
      return;
    }
    const t = setTimeout(
      () => setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)),
      deleting ? typeSpeed / 2 : typeSpeed,
    );
    return () => clearTimeout(t);
  }, [text, deleting, index, words, typeSpeed, pause]);

  return text;
}

export function Hero() {
  const role = useTypewriter(roles);

  const handleNavClick = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleResume = () => {
    if (personalInfo.resumeAvailable) {
      window.open(personalInfo.resumeUrl, '_blank');
    }
  };

  return (
    <section id="home" className="relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32">
      <div className="section-container relative">
        <div className="grid items-center gap-16 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
          <div className="text-center lg:text-left">
            <div className="gradient-ring mb-7 inline-flex animate-fade-in items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-xs font-medium text-ink-700 backdrop-blur-md dark:bg-white/[0.04] dark:text-ink-200">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Available for opportunities
              <span className="text-ink-300 dark:text-ink-600">·</span>
              <span className="font-mono text-brand-600 dark:text-brand-300">2026</span>
            </div>

            <h1 className="animate-fade-in-delay-1 text-5xl font-semibold leading-[1.05] text-ink-900 opacity-0 dark:text-white sm:text-6xl lg:text-7xl">
              Hi, I'm{' '}
              <span className="text-gradient-animated">Darshana</span>{' '}
              <span className="text-serif-accent text-ink-700 dark:text-ink-100">Jain</span>
            </h1>

            <p className="animate-fade-in-delay-2 mt-5 h-8 font-mono text-lg text-ink-600 opacity-0 dark:text-ink-300 sm:text-xl">
              <span className="text-brand-500">&gt;</span> {role}
              <span className="ml-0.5 inline-block h-5 w-[2px] translate-y-1 animate-blink bg-accent-400" />
            </p>

            <p className="animate-fade-in-delay-3 mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink-500 opacity-0 dark:text-ink-400 lg:mx-0">
              {personalInfo.heroSubtext}
            </p>

            {/* AI prompt bar */}
            <div className="animate-fade-in-delay-4 mx-auto mt-9 max-w-xl opacity-0 lg:mx-0">
              <button
                onClick={() => handleNavClick('#projects')}
                className="gradient-ring group flex w-full items-center gap-3 rounded-2xl bg-white/80 p-2 pl-4 text-left shadow-xl shadow-brand-500/5 backdrop-blur-xl transition-all duration-300 hover:shadow-brand-500/20 dark:bg-ink-900/70"
              >
                <Sparkles className="h-5 w-5 shrink-0 text-brand-500 dark:text-brand-300" />
                <span className="flex-1 truncate text-sm text-ink-400 dark:text-ink-500">
                  Ask me anything about my work...
                </span>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-lg shadow-brand-500/40 transition-transform duration-300 group-hover:scale-105">
                  <ArrowUp className="h-4 w-4" />
                </span>
              </button>
              <div className="mt-3 flex flex-wrap justify-center gap-2 lg:justify-start">
                {prompts.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => handleNavClick(p.href)}
                    className="rounded-full border border-ink-200 bg-white/60 px-3 py-1 text-xs text-ink-600 backdrop-blur-md transition-all duration-300 hover:border-brand-400 hover:text-brand-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-ink-400 dark:hover:border-brand-400/50 dark:hover:text-white"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="animate-fade-in-delay-4 mt-9 flex flex-wrap items-center justify-center gap-3 opacity-0 lg:justify-start">
              <button onClick={() => handleNavClick('#contact')} className="btn-primary group">
                Let's build together
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <button onClick={handleResume} disabled={!personalInfo.resumeAvailable} className="btn-secondary">
                <Download className="h-4 w-4" />
                Resume
              </button>
              <div className="flex items-center gap-2 sm:ml-2">
                <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="icon-btn">
                  <Github className="h-5 w-5" />
                </a>
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="icon-btn">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <HeroIllustration />
          </div>
        </div>
      </div>
    </section>
  );
}
