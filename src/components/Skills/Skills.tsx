import { Cpu } from 'lucide-react';
import { skillCategories } from '@/data/portfolio';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export function Skills() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="skills" className="section-padding">
      <div
        ref={ref}
        className={`section-container reveal ${visible ? 'reveal-visible' : ''}`}
      >
        <div className="mb-14 text-center">
          <p className="section-eyebrow">
            <Cpu className="h-3.5 w-3.5" />
            What I work with
          </p>
          <h2 className="section-heading">
            The <span className="text-serif-accent text-gradient">stack</span>
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((category, catIndex) => (
            <div
              key={category.title}
              className="card-base card-hover p-6"
              style={{ transitionDelay: `${catIndex * 80}ms` }}
            >
              <div className="mb-5 flex items-center justify-between">
                <h3 className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-ink-500 dark:text-ink-400">
                  {category.title}
                </h3>
                <span className="font-mono text-xs text-brand-500 dark:text-brand-300">
                  0{catIndex + 1}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span key={skill.name} className="skill-badge group">
                    <skill.icon className="h-4 w-4 text-brand-500 dark:text-brand-300 transition-transform duration-300 group-hover:scale-110" />
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
