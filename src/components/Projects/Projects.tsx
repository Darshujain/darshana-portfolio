import { Rocket } from 'lucide-react';
import { projects } from '@/data/portfolio';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ProjectCard } from '@/components/ProjectCard/ProjectCard';

export function Projects() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="projects" className="section-padding">
      <div
        ref={ref}
        className={`section-container reveal ${visible ? 'reveal-visible' : ''}`}
      >
        <div className="mb-14 text-center">
          <p className="section-eyebrow">
            <Rocket className="h-3.5 w-3.5" />
            Things I've built
          </p>
          <h2 className="section-heading">
            Featured <span className="text-serif-accent text-gradient">work</span>
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project, index) => (
            <div
              key={project.name}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
