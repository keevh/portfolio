import { useState, useEffect, useCallback, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { ProjectModal } from './ProjectModal';
import { PROJECT_DATA, resolveProjects } from '../data/projects';
import type { Category, Project } from '../data/projects';

const FILTERS: Category[] = ['all', 'fullstack', 'frontend', 'backend'];

export function Projects() {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter]        = useState<Category>('all');

  const projects = useMemo(() => resolveProjects(PROJECT_DATA, t), [t]);
  const filtered = useMemo(
    () => projects.filter((p) => activeFilter === 'all' || p.category === activeFilter),
    [projects, activeFilter],
  );

  const openProject  = useCallback((p: Project) => setSelectedProject(p), []);
  const closeProject = useCallback(() => setSelectedProject(null), []);

  useEffect(() => {
    document.body.style.overflow = selectedProject ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedProject]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeProject(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [closeProject]);

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-16 max-w-7xl mx-auto relative border-t border-white/5">
      <div className="absolute left-0 top-1/2 w-[300px] h-[300px] rounded-full bg-primary-container/5 blur-[100px] -z-10 pointer-events-none" />

      {/* Header */}
      <motion.div
        className="flex flex-col items-center text-center gap-4 mb-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
      >
        <span className="font-code-sm text-sm text-secondary uppercase tracking-widest">{t('proj.subtitle')}</span>
        <h2 className="font-headline-lg text-3xl sm:text-4xl lg:text-5xl text-on-surface">{t('proj.title')}</h2>
      </motion.div>

      {/* Category filter */}
      <motion.div
        className="flex flex-wrap justify-center gap-2 mb-10"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {FILTERS.map((cat) => (
          <motion.button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`relative px-5 py-2 rounded-full font-label-caps text-xs transition-colors ${
              activeFilter === cat
                ? 'text-on-primary-container'
                : 'text-on-surface-variant hover:text-on-surface glass-panel'
            }`}
            whileTap={{ scale: 0.94, y: 2 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            {activeFilter === cat && (
              <motion.span
                layoutId="filter-pill"
                className="absolute inset-0 rounded-full bg-primary-container"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">{t(`proj.filter.${cat}`)}</span>
          </motion.button>
        ))}
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              className="glass-panel rounded-[24px] overflow-hidden flex flex-col cursor-pointer group"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              whileHover={{ y: -6, boxShadow: '0 0 40px rgba(0,242,255,0.12)' }}
              onClick={() => openProject(project)}
            >
              {/* Thumbnail */}
              <div className="h-52 overflow-hidden relative flex-shrink-0">
                <div className="absolute inset-0 bg-surface/40 z-10 group-hover:bg-transparent transition-colors duration-300" />
                <img
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  src={project.image}
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-[#1A1A1A] rounded font-label-caps text-xs flex items-center gap-2 text-gray-300 border border-white/5"
                    >
                      <span className={`w-2 h-2 rounded-full ${tag.color} shrink-0`} />
                      {tag.label}
                    </span>
                  ))}
                </div>
                <h3 className="font-headline-md text-xl text-white mb-2">{project.title}</h3>
                <p className="font-body-md text-sm text-on-surface-variant mb-6 flex-grow">{project.desc}</p>

                <div className="flex items-center gap-4 border-t border-white/5 pt-4">
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
                      >
                        <Icon size={15} /> {link.label}
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence mode="wait">
        {selectedProject && (
          <ProjectModal
            key={selectedProject.id}
            project={selectedProject}
            onClose={closeProject}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
