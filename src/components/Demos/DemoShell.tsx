import type { ReactNode } from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';

interface DemoShellProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  actions?: ReactNode;
}

export function DemoShell({ title, subtitle, children, actions }: DemoShellProps) {
  return (
    <div className="dark min-h-screen bg-ink-950 text-ink-200">
      <div className="ai-backdrop" aria-hidden="true">
        <div className="gradient-orb animate-aurora -left-40 -top-40 h-[30rem] w-[30rem] bg-brand-600/25" />
        <div className="gradient-orb animate-aurora -right-40 top-1/3 h-[26rem] w-[26rem] bg-accent-600/15" style={{ animationDelay: '4s' }} />
      </div>

      <header className="sticky top-0 z-40 border-b border-white/5 bg-ink-950/70 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <a href="/#projects" className="icon-btn h-9 w-9 shrink-0" aria-label="Back to portfolio">
              <ArrowLeft className="h-4 w-4" />
            </a>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="truncate text-sm font-semibold text-white sm:text-base">{title}</h1>
                <span className="hidden items-center gap-1 rounded-full border border-brand-400/20 bg-brand-500/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-brand-200 sm:inline-flex">
                  <Sparkles className="h-3 w-3" />
                  Live demo
                </span>
              </div>
              <p className="truncate text-xs text-ink-500">{subtitle}</p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">{actions}</div>
        </div>
      </header>

      <main className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">{children}</main>
    </div>
  );
}
