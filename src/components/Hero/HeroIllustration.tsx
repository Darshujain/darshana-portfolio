import { useEffect, useState } from 'react';
import { Sparkles, Cpu, Zap, Code2 } from 'lucide-react';

const answer =
  'She ships fast, accessible React + TypeScript apps — order-tracking dashboards, a browser video editor, and clean e-commerce UIs.';

function useStream(text: string, speed = 28, startDelay = 1200) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        setCount((c) => {
          if (c >= text.length) {
            clearInterval(interval);
            return c;
          }
          return c + 1;
        });
      }, speed);
    }, startDelay);
    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  return { output: text.slice(0, count), done: count >= text.length };
}

export function HeroIllustration() {
  const { output, done } = useStream(answer);

  return (
    <div className="relative w-full max-w-md animate-fade-in-delay-2 opacity-0">
      {/* Orb */}
      <div className="absolute -top-14 left-1/2 z-20 -translate-x-1/2">
        <div className="relative h-28 w-28">
          <div className="ai-orb absolute inset-0 animate-orb" />
          <div className="absolute inset-3 rounded-full bg-white/20 blur-md" />
          <Sparkles className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
        </div>
      </div>

      {/* Glow */}
      <div className="absolute inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-brand-500/40 via-accent-500/25 to-cyan-400/20 blur-3xl" />

      {/* Chat window */}
      <div className="card-base gradient-ring overflow-hidden rounded-[2rem] pt-16 shadow-2xl shadow-brand-900/20">
        <div className="mb-4 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink-400 dark:text-ink-500">
            darshana.ai · online
          </p>
        </div>

        <div className="space-y-4 px-5 pb-5">
          {/* User message */}
          <div className="flex justify-end">
            <div className="max-w-[80%] rounded-2xl rounded-br-md bg-gradient-to-br from-brand-600 to-accent-600 px-4 py-2.5 text-sm text-white shadow-lg shadow-brand-500/20">
              What does Darshana build?
            </div>
          </div>

          {/* Assistant message */}
          <div className="flex gap-2.5">
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 via-accent-500 to-cyan-400 text-white">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            <div className="min-h-[4.5rem] max-w-[85%] rounded-2xl rounded-tl-md border border-ink-200 bg-white/70 px-4 py-2.5 text-sm leading-relaxed text-ink-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-ink-200">
              {output.length === 0 ? (
                <span className="flex gap-1 py-1.5">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-400" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent-400 [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-400 [animation-delay:300ms]" />
                </span>
              ) : (
                <>
                  {output}
                  {!done && <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-blink bg-brand-400" />}
                </>
              )}
            </div>
          </div>

          {/* Tool chips */}
          <div
            className={`flex flex-wrap gap-2 pl-9 transition-all duration-700 ${
              done ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
            }`}
          >
            {[
              { icon: Code2, label: 'React · TS' },
              { icon: Zap, label: 'RTK Query' },
              { icon: Cpu, label: 'Node · AWS' },
            ].map((chip) => (
              <span key={chip.label} className="tech-badge items-center gap-1.5">
                <chip.icon className="h-3 w-3" />
                {chip.label}
              </span>
            ))}
          </div>
        </div>

        {/* Input row */}
        <div className="border-t border-ink-200/70 px-5 py-3.5 dark:border-white/5">
          <div className="flex items-center gap-2 rounded-xl bg-ink-100/70 px-3 py-2 dark:bg-white/[0.03]">
            <span className="flex-1 font-mono text-xs text-ink-400 dark:text-ink-500">Message darshana.ai</span>
            <kbd className="rounded-md border border-ink-200 px-1.5 py-0.5 font-mono text-[10px] text-ink-400 dark:border-white/10 dark:text-ink-500">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>

      {/* Floating stat chips */}
      <div className="absolute -left-6 top-1/3 hidden animate-float rounded-2xl border border-ink-200 bg-white/80 px-3 py-2 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-ink-900/80 sm:block">
        <p className="font-mono text-[10px] uppercase tracking-wider text-ink-400">Status</p>
        <p className="text-sm font-semibold text-ink-900 dark:text-white">
          <span className="text-emerald-500">●</span> Shipping
        </p>
      </div>
      <div
        className="absolute -right-5 bottom-20 hidden animate-float rounded-2xl border border-ink-200 bg-white/80 px-3 py-2 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-ink-900/80 sm:block"
        style={{ animationDelay: '2s' }}
      >
        <p className="font-mono text-[10px] uppercase tracking-wider text-ink-400">Focus</p>
        <p className="text-gradient text-sm font-bold">Frontend · AI</p>
      </div>
    </div>
  );
}
