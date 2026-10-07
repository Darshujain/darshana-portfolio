import { Briefcase, Calendar, Route } from 'lucide-react';
import { experiences } from '@/data/portfolio';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export function Experience() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="experience" className="section-padding">
      <div
        ref={ref}
        className={`section-container reveal ${visible ? 'reveal-visible' : ''}`}
      >
        <div className="mb-14 text-center">
          <p className="section-eyebrow">
            <Route className="h-3.5 w-3.5" />
            My journey
          </p>
          <h2 className="section-heading">
            <span className="text-serif-accent text-gradient">Experience</span>
          </h2>
        </div>

        <div className="mx-auto max-w-2xl">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-brand-400 via-accent-400 to-transparent shadow-[0_0_12px_rgba(167,139,250,0.8)]" />

            {experiences.map((exp, index) => (
              <div
                key={index}
                className="relative pl-16 pb-8 last:pb-0"
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                {/* Node */}
                <div className="absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 via-accent-500 to-cyan-400 text-white shadow-lg shadow-brand-500/40 ring-4 ring-ink-50 dark:ring-ink-950">
                  <Briefcase className="h-5 w-5" />
                </div>

                {/* Card */}
                <div className="card-base card-hover p-6">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-bold text-ink-900 dark:text-white">
                        {exp.role}
                      </h3>
                      <p className="mt-0.5 text-sm font-medium text-brand-600 dark:text-brand-300">
                        {exp.company}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 px-3 py-1 font-mono text-[11px] text-ink-500 dark:border-white/10 dark:text-ink-400">
                      <Calendar className="h-3.5 w-3.5" />
                      {exp.period}
                    </span>
                  </div>
                  {exp.summary && (
                    <p className="mt-4 text-sm leading-relaxed text-ink-500 dark:text-ink-400">
                      {exp.summary}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
