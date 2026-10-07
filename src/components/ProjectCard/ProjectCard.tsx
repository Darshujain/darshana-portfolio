import { Github, ExternalLink, Calendar, ArrowUpRight, Sparkles } from 'lucide-react';
import type { Project } from '@/data/portfolio';
import { ProjectMockup } from './ProjectMockup';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const githubDisabled = !project.githubUrl;
  const liveDisabled = !project.liveUrl;

  const githubProps = githubDisabled
    ? { 'aria-disabled': true, tabIndex: -1 }
    : { href: project.githubUrl!, target: '_blank', rel: 'noopener noreferrer' };

  const liveProps = liveDisabled
    ? { 'aria-disabled': true, tabIndex: -1 }
    : { href: project.liveUrl!, target: '_blank', rel: 'noopener noreferrer' };

  return (
    <div className="card-base card-hover group flex h-full flex-col overflow-hidden p-2">
      {/* Preview */}
      <div className="relative overflow-hidden rounded-[1.25rem]">
        <div className="transition-transform duration-700 group-hover:scale-105">
          {project.imageUrl ? (
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-ink-100 to-ink-200 dark:from-ink-800 dark:to-ink-900">
              <img
                src={project.imageUrl}
                alt={`${project.name} preview`}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              {/* Overlay gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-900/50 via-transparent to-accent-700/20 mix-blend-multiply dark:mix-blend-normal" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              {/* Live demo badge */}
              {!liveDisabled && (
                <div className="absolute right-3 top-3 flex translate-y-1 items-center gap-1.5 rounded-full border border-white/20 bg-ink-950/50 px-2.5 py-1 font-mono text-[11px] font-medium text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                  Live
                </div>
              )}
            </div>
          ) : (
            <ProjectMockup type={project.mockupType} name={project.name} />
          )}
        </div>
        {project.date?.includes('2026') && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-white/20 bg-gradient-to-r from-brand-600/90 to-accent-500/90 px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-wider text-white shadow-lg shadow-brand-500/40 backdrop-blur-md">
            <Sparkles className="h-3 w-3" />
            New · 2026
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-ink-900 dark:text-white">{project.name}</h3>
          {project.date && (
            <span className="inline-flex shrink-0 items-center gap-1 text-xs text-ink-400 dark:text-ink-500">
              <Calendar className="h-3 w-3" />
              {project.date}
            </span>
          )}
        </div>

        <p className="mb-4 text-sm leading-relaxed text-ink-500 dark:text-ink-400">
          {project.description}
        </p>

        <div className="mb-4 flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <span key={tech} className="tech-badge">
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-2">
          <a
            {...(githubProps as object)}
            aria-label={`${project.name} GitHub repository`}
            className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 ${
              githubDisabled
                ? 'cursor-not-allowed border-ink-200 text-ink-300 dark:border-white/5 dark:text-ink-600'
                : 'border-ink-300 text-ink-600 hover:border-brand-500 hover:text-brand-600 dark:border-white/10 dark:text-ink-300 dark:hover:border-brand-400/60 dark:hover:text-white'
            }`}
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            {...(liveProps as object)}
            aria-label={`${project.name} live demo`}
            className={`group/btn inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-full px-3 text-xs font-semibold transition-all duration-300 ${
              liveDisabled
                ? 'cursor-not-allowed border border-ink-200 text-ink-300 dark:border-white/5 dark:text-ink-600'
                : 'bg-ink-900 text-white hover:bg-gradient-to-r hover:from-brand-600 hover:to-accent-500 hover:shadow-lg hover:shadow-brand-500/30 dark:bg-white/[0.06] dark:text-white'
            }`}
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Live Demo
            {!liveDisabled && <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />}
          </a>
        </div>
      </div>
    </div>
  );
}
