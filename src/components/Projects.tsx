import { useMemo } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { motion } from 'motion/react';
import { resolveProjects } from '../data/projects';

const BASE_PATH = import.meta.env.BASE_URL.replace(/\/$/, '');

function getProjectHref(slug: string) {
  return `${BASE_PATH}/projects/${slug}`.replace(/^\/\//, '/');
}

export function Projects() {
  const { t, language } = useLanguage();

  const projects = useMemo(
    () => resolveProjects(t as (key: string) => string, language),
    [t, language],
  );

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-16 max-w-7xl mx-auto relative border-t border-white/5">
      <div className="absolute left-0 top-1/2 w-[300px] h-[300px] rounded-full bg-primary-container/5 blur-[100px] -z-10 pointer-events-none" />

      {/* Header */}
      <motion.div
        className="flex flex-col items-center text-center gap-4 mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
      >
        <span className="font-code-sm text-secondary uppercase tracking-widest block">{t('proj.subtitle')}</span>
        <h2 className="font-headline-lg text-3xl sm:text-4xl lg:text-5xl text-on-surface">{t('proj.title')}</h2>
      </motion.div>

      {/* Zig-zag list */}
      <div className="flex flex-col gap-12">
        {projects.map((project, index) => {
          const reversed = index % 2 === 1;
          return (
            <motion.article
              key={project.id}
              className={`glass-panel rounded-[24px] overflow-hidden group relative flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'}`}
              initial={{ opacity: 0, x: reversed ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              whileHover={{ y: -6, boxShadow: '0 0 40px rgba(75,226,119,0.12)' }}
            >
              <a
                href={getProjectHref(project.slug)}
                aria-label={`Open ${project.title} project page`}
                className="absolute inset-0 z-10"
              />

              {/* Image */}
              <div className="md:w-1/2 relative overflow-hidden bg-surface-container-low aspect-video md:aspect-auto flex-shrink-0">
                <div className="absolute inset-0 bg-surface/30 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img
                  alt={project.title}
                  src={project.image}
                  loading="lazy"
                  className={`w-full h-full transition-transform duration-700 ${
                    project.imageFit === 'contain'
                      ? 'object-contain bg-surface'
                      : project.imageFit === 'scale-down'
                        ? 'object-scale-down bg-surface'
                        : 'object-cover group-hover:scale-105'
                  }`}
                />
              </div>

              {/* Content */}
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center gap-4 relative z-20 pointer-events-none">
                <span className="font-label-caps text-xs text-secondary uppercase tracking-widest">
                  {t(`proj.filter.${project.category}`)}
                </span>
                <h3 className="font-headline-md text-2xl text-on-surface">{project.title}</h3>
                <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">{project.desc}</p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {project.stack.slice(0, 4).map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-white/5 rounded font-label-caps text-xs text-tertiary">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 pt-3">
                  {project.links.map((link, i) => {
                    const Icon = link.icon;
                    let cls = 'text-on-surface-variant hover:text-white';
                    if (link.type === 'demo')     cls = 'text-primary-container hover:text-primary';
                    if (link.type === 'research') cls = 'text-secondary hover:text-white';
                    return (
                      <a
                        key={i}
                        href={link.url}
                        onClick={(e) => e.stopPropagation()}
                        className={`font-code-sm text-xs transition-colors flex items-center gap-1.5 ${cls}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ pointerEvents: 'auto' }}
                      >
                        <Icon size={15} /> {link.label}
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
