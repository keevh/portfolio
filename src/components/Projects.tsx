import { useState, useEffect, useCallback } from 'react';
import { ExternalLink, Github, FlaskConical, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';

type Project = {
  id: string;
  title: string;
  image: string;
  gallery: string[];
  highlights: string[];
  tags: { label: string; color: string }[];
  desc: string;
  ext: string;
  links: { type: string; url: string; label: string; icon: React.ElementType }[];
};

const modalVariants = {
  hidden:  { opacity: 0, scale: 0.96, y: 12 },
  visible: { opacity: 1, scale: 1,    y: 0   },
  exit:    { opacity: 0, scale: 0.96, y: 12  },
};

const backdropVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1 },
  exit:    { opacity: 0 },
};

export function Projects() {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeImage, setActiveImage] = useState<string>('');

  const openProject = useCallback((project: Project) => {
    setActiveImage(project.image);
    setSelectedProject(project);
  }, []);

  const closeProject = useCallback(() => {
    setSelectedProject(null);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedProject ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedProject]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeProject(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [closeProject]);

  const projects: Project[] = [
    {
      id: 'facepet',
      title: 'FacePet',
      image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?auto=format&fit=crop&q=80&w=2000',
        'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=1964',
      ],
      highlights: [
        'Problema: El aislamiento social en entornos urbanos afecta el estado de las mascotas',
        'Solución: Matchmaking algorítmico basado en nivel de energía, tamaño y cercanía',
        'Impacto: Fomenta grupos de paseo comunitarios y crea una red de rescate local',
      ],
      tags: [
        { label: t('proj.uiux'),     color: 'bg-secondary' },
        { label: t('proj.frontend'), color: 'bg-primary-container' },
      ],
      desc: t('proj.facepet.desc'),
      ext:  t('proj.facepet.ext'),
      links: [
        { type: 'demo', url: '#', label: t('proj.demo'), icon: ExternalLink },
        { type: 'repo', url: '#', label: 'GitHub',       icon: Github },
      ],
    },
    {
      id: 'votora',
      title: 'Votora / MQTT',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2070',
      gallery: [
        'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2070',
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2072',
        'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=2070',
      ],
      highlights: [
        'Desafío: Alta latencia y consumo excesivo de batería en nodos IoT',
        'Enfoque: Transición de polling HTTP a una arquitectura Pub/Sub orientada a eventos',
        'Resultado: Reducción drástica del ancho de banda y mayor autonomía de hardware',
      ],
      tags: [{ label: t('proj.hardware'), color: 'bg-[#7318ff]' }],
      desc: t('proj.votora.desc'),
      ext:  t('proj.votora.ext'),
      links: [
        { type: 'repo', url: '#', label: 'GitHub', icon: Github },
      ],
    },
    {
      id: 'shortener',
      title: t('proj.shortener.title') || 'Acortador de Enlaces',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070',
      gallery: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2015',
      ],
      highlights: [
        'Problema: Enlaces largos sin contexto y seguimiento opaco para los usuarios',
        'Arquitectura: Motor de redirección ultra-rápido operando en memoria caché (< 50ms)',
        'Métricas: Recolección asíncrona de telemetría sin penalizar el rendimiento del usuario',
      ],
      tags: [{ label: t('proj.utility'), color: 'bg-primary-container' }],
      desc: t('proj.shortener.desc'),
      ext:  t('proj.shortener.ext'),
      links: [
        { type: 'demo', url: '#', label: t('proj.demo'), icon: ExternalLink },
        { type: 'repo', url: '#', label: 'GitHub',       icon: Github },
      ],
    },
    {
      id: 'nilm',
      title: t('proj.nilm.title') || 'Simulación NILM',
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=2072',
      gallery: [
        'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=2072',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070',
      ],
      highlights: [
        'Barrera: Monitoreo tradicional requiere costosos sensores por cada electrodoméstico',
        'Innovación: Uso de Machine Learning para desagregar señales iterativas desde un punto único',
        'Valor: Democratiza el análisis y ahorro energético sin instalaciones invasivas en el hogar',
      ],
      tags: [
        { label: t('proj.ds'),     color: 'bg-secondary' },
        { label: t('proj.energy'), color: 'bg-[#7318ff]' },
      ],
      desc: t('proj.nilm.desc'),
      ext:  t('proj.nilm.ext'),
      links: [
        { type: 'research', url: '#', label: t('proj.research'), icon: FlaskConical },
        { type: 'repo',     url: '#', label: 'GitHub',           icon: Github },
      ],
    },
  ];

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-16 max-w-7xl mx-auto relative border-t border-white/5">
      <div className="absolute left-0 top-1/2 w-[300px] h-[300px] rounded-full bg-primary-container/5 blur-[100px] -z-10 pointer-events-none" />

      <motion.div
        className="flex flex-col items-center text-center gap-4 mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
      >
        <span className="font-code-sm text-sm text-secondary uppercase tracking-widest">{t('proj.subtitle')}</span>
        <h2 className="font-headline-lg text-3xl sm:text-4xl lg:text-5xl text-on-surface">{t('proj.title')}</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className="glass-panel rounded-[24px] overflow-hidden flex flex-col cursor-pointer group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.08 * index }}
            whileHover={{ y: -4 }}
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
      </div>

      {/* Modal */}
      <AnimatePresence mode="wait">
        {selectedProject && (
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2 }}
            style={{ backgroundColor: 'rgba(5,5,5,0.85)', backdropFilter: 'blur(8px)' }}
            onClick={closeProject}
          >
            <motion.div
              key={selectedProject.id}
              className="glass-panel w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[24px] relative flex flex-col border border-white/10 shadow-2xl"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={closeProject}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/50 flex items-center justify-center text-white/60 hover:text-white hover:bg-black/80 transition-colors"
                aria-label={t('proj.close')}
              >
                <X size={18} />
              </button>

              {/* Main image */}
              <div className="h-56 sm:h-72 overflow-hidden relative flex-shrink-0 rounded-t-[24px]">
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent z-10 pointer-events-none" />
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    src={activeImage}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                </AnimatePresence>
              </div>

              {/* Body */}
              <div className="p-5 sm:p-8 -mt-12 relative z-20 flex-grow">
                {/* Gallery thumbnails */}
                {selectedProject.gallery.length > 1 && (
                  <div className="flex gap-2 mb-6">
                    {selectedProject.gallery.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImage(img)}
                        className={`w-14 h-10 sm:w-16 sm:h-12 rounded-lg overflow-hidden border-2 transition-all ${activeImage === img ? 'border-primary-container' : 'border-white/10 opacity-60 hover:opacity-100'}`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedProject.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-black/60 rounded-lg font-label-caps text-xs flex items-center gap-2 text-gray-200 border border-white/10"
                    >
                      <span className={`w-2 h-2 rounded-full ${tag.color} shrink-0`} />
                      {tag.label}
                    </span>
                  ))}
                </div>

                <h3 className="font-headline-lg text-2xl sm:text-4xl text-white mb-6">{selectedProject.title}</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <p className="font-label-caps text-xs text-secondary tracking-widest mb-3">{t('proj.details') || 'Resumen'}</p>
                    <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">{selectedProject.desc}</p>
                  </div>
                  {selectedProject.highlights.length > 0 && (
                    <div>
                      <p className="font-label-caps text-xs text-secondary tracking-widest mb-3">{t('proj.highlights') || 'Claves'}</p>
                      <ul className="space-y-2.5">
                        {selectedProject.highlights.map((ht, i) => {
                          const idx = ht.indexOf(':');
                          return (
                            <li key={i} className="flex items-start gap-2 text-sm text-on-surface-variant">
                              <span className="text-primary-container mt-1 shrink-0">•</span>
                              {idx !== -1 ? (
                                <span>
                                  <strong className="text-white font-medium">{ht.slice(0, idx + 1)}</strong>
                                  {ht.slice(idx + 1)}
                                </span>
                              ) : ht}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-3 border-t border-white/10 pt-5">
                  {selectedProject.links.map((link, i) => {
                    const Icon = link.icon;
                    let cls = 'bg-surface-container text-white hover:bg-white/10';
                    if (link.type === 'demo') cls = 'bg-primary-container text-on-primary-container hover:opacity-90 shadow-[0_0_15px_rgba(0,242,255,0.15)]';
                    return (
                      <a
                        key={i}
                        href={link.url}
                        className={`font-label-caps text-xs h-10 px-5 rounded-full flex items-center gap-2 transition-all ${cls}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Icon size={16} /> {link.label}
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
