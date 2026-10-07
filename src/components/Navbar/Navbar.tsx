import { useEffect, useState } from 'react';
import { Menu, X, Code2 } from 'lucide-react';
import { navLinks, personalInfo } from '@/data/portfolio';
import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle';

interface NavbarProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navLinks.map((link) => link.href.replace('#', ''));
      const current = sections.find((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`fixed inset-x-0 top-0 z-50 px-3 transition-all duration-500 ${scrolled ? 'pt-3' : 'pt-5'}`}>
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full border px-3 py-2 transition-all duration-500 sm:px-4 ${
          scrolled
            ? 'border-ink-200/70 bg-white/70 shadow-lg shadow-ink-900/5 backdrop-blur-2xl dark:border-white/10 dark:bg-ink-950/60 dark:shadow-black/40'
            : 'border-transparent bg-transparent'
        }`}
      >
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#home');
          }}
          className="flex items-center gap-2.5 text-base font-semibold font-display text-ink-900 dark:text-white"
        >
          <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 via-accent-500 to-cyan-400 text-white shadow-lg shadow-brand-500/40 transition-transform duration-300 hover:scale-105 hover:rotate-12">
            <Code2 className="h-[18px] w-[18px]" />
          </span>
          <span className="hidden whitespace-nowrap sm:inline">
            {personalInfo.name}
            <span className="ml-1 font-mono text-xs font-normal text-brand-500 dark:text-brand-300">.dev</span>
          </span>
        </a>

        <div className="hidden items-center gap-0.5 rounded-full border border-ink-200/60 bg-white/50 p-1 backdrop-blur-md dark:border-white/5 dark:bg-white/[0.03] md:flex">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-ink-900 text-white shadow-sm dark:bg-white/10 dark:text-white dark:shadow-[0_0_20px_-4px_rgba(167,139,250,0.6)_inset]'
                    : 'text-ink-500 hover:text-ink-900 dark:text-ink-400 dark:hover:text-white'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="icon-btn h-10 w-10 md:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <div
        className={`mx-auto mt-2 max-w-6xl overflow-hidden rounded-3xl border border-ink-200/70 bg-white/90 backdrop-blur-2xl transition-all duration-500 dark:border-white/10 dark:bg-ink-950/90 md:hidden ${
          menuOpen ? 'max-h-96 opacity-100' : 'pointer-events-none max-h-0 border-transparent opacity-0'
        }`}
      >
        <div className="flex flex-col gap-1 px-5 py-4 sm:px-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="rounded-2xl px-4 py-3 text-sm font-medium text-ink-600 transition-colors hover:bg-brand-50 hover:text-brand-600 dark:text-ink-300 dark:hover:bg-white/5 dark:hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
