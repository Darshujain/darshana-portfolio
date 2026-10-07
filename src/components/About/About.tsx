import { Code2, Sparkles, Rocket, Zap } from 'lucide-react';
import { personalInfo } from '@/data/portfolio';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export function About() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  const highlights = [
    { icon: Code2, label: 'Clean Code', desc: 'Maintainable, well-structured components', span: 'sm:col-span-2' },
    { icon: Sparkles, label: 'Modern UI', desc: 'Responsive, accessible interfaces', span: '' },
    { icon: Rocket, label: 'Performance', desc: 'Optimized, fast-loading applications', span: '' },
    { icon: Zap, label: 'Type Safe', desc: 'TypeScript-first development approach', span: 'sm:col-span-2' },
  ];

  return (
    <section id="about" className="section-padding">
      <div
        ref={ref}
        className={`section-container reveal ${visible ? 'reveal-visible' : ''}`}
      >
        <div className="mb-14 text-center">
          <p className="section-eyebrow">
            <Sparkles className="h-3.5 w-3.5" />
            Get to know me
          </p>
          <h2 className="section-heading">
            About <span className="text-serif-accent text-gradient">me</span>
          </h2>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="card-base p-7 sm:p-10">
            <p className="text-base leading-relaxed text-ink-600 dark:text-ink-300 sm:text-lg">
              {personalInfo.aboutText}
            </p>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {highlights.map((item, index) => (
              <div
                key={item.label}
                className={`card-base card-hover group flex items-start gap-4 p-6 ${item.span}`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-lg shadow-brand-500/30 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <item.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-ink-900 dark:text-white">{item.label}</h3>
                  <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
