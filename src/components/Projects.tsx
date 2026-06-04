import { useState, useEffect } from 'react';
import { ExternalLink, Github, FlaskConical, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';

export function Projects() {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      setActiveImage(selectedProject.image);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  const projects = [
    {
      id: 'facepet',
      title: 'FacePet',
      image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?auto=format&fit=crop&q=80&w=2000',
        'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=1964'
      ],
      highlights: [
        'Problema: El aislamiento social en entornos urbanos afecta el estado de las mascotas',
        'Solución: Matchmaking algorítmico basado en nivel de energía, tamaño y cercanía',
        'Impacto: Fomenta grupos de paseo comunitarios y crea una red de rescate local'
      ],
      tags: [
        { label: t('proj.uiux'), color: 'bg-secondary' },
        { label: t('proj.frontend'), color: 'bg-primary-container' }
      ],
      desc: t('proj.facepet.desc'),
      ext: t('proj.facepet.ext'),
      links: [
        { type: 'demo', url: '#', label: t('proj.demo'), icon: ExternalLink },
        { type: 'repo', url: '#', label: 'GitHub', icon: Github }
      ]
    },
    {
      id: 'votora',
      title: 'Votora / MQTT',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2070',
      gallery: [
        'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2070',
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2072',
        'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=2070'
      ],
      highlights: [
        'Desafío: Alta latencia y consumo excesivo de batería en nodos IoT',
        'Enfoque: Transición de polling HTTP a una arquitectura Pub/Sub orientada a eventos',
        'Resultado: Reducción drástica del ancho de banda y mayor autonomía de hardware'
      ],
      tags: [
        { label: t('proj.hardware'), color: 'bg-[#7318ff]' }
      ],
      desc: t('proj.votora.desc'),
      ext: t('proj.votora.ext'),
      links: [
        { type: 'repo', url: '#', label: 'GitHub', icon: Github }
      ]
    },
    {
      id: 'shortener',
      title: t('proj.shortener.title') || 'Acortador de Enlaces',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070',
      gallery: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2015'
      ],
      highlights: [
        'Problema: Enlaces largos sin contexto y seguimiento opaco para los usuarios',
        'Arquitectura: Motor de redirección ultra-rápido operando en memoria caché (< 50ms)',
        'Métricas: Recolección asíncrona de telemetría sin penalizar el rendimiento del usuario'
      ],
      tags: [
        { label: t('proj.utility'), color: 'bg-primary-container' }
      ],
      desc: t('proj.shortener.desc'),
      ext: t('proj.shortener.ext'),
      links: [
        { type: 'demo', url: '#', label: t('proj.demo'), icon: ExternalLink },
        { type: 'repo', url: '#', label: 'GitHub', icon: Github }
      ]
    },
    {
      id: 'nilm',
      title: t('proj.nilm.title') || 'Simulación NILM',
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=2072',
      gallery: [
        'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=2072',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070'
      ],
      highlights: [
        'Barrera: Monitoreo tradicional requiere costosos sensores por cada electrodoméstico',
        'Innovación: Uso de Machine Learning para desagregar señales iterativas desde un punto único',
        'Valor: Democratiza el análisis y ahorro energético sin instalaciones invasivas en el hogar'
      ],
      tags: [
        { label: t('proj.ds'), color: 'bg-secondary' },
        { label: t('proj.energy'), color: 'bg-[#7318ff]' }
      ],
      desc: t('proj.nilm.desc'),
      ext: t('proj.nilm.ext'),
      links: [
        { type: 'research', url: '#', label: t('proj.research'), icon: FlaskConical },
        { type: 'repo', url: '#', label: 'GitHub', icon: Github }
      ]
    }
  ];

  return (
    <section id="projects" className="py-24 px-4 md:px-16 max-w-7xl mx-auto relative border-t border-white/5 overflow-hidden">
      <div className="absolute left-0 top-1/2 w-[300px] h-[300px] rounded-full bg-primary-container/5 blur-[100px] -z-10 pointer-events-none"></div>
      
      <motion.div 
        className="flex flex-col items-center text-center gap-4 mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
      >
        <span className="font-code-sm text-secondary uppercase tracking-widest block">{t('proj.subtitle')}</span>
        <h2 className="font-headline-lg text-4xl md:text-5xl text-on-surface">{t('proj.title')}</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <motion.div 
            key={project.id}
            layoutId={`card-${project.id}`}
            className="glass-panel rounded-[32px] overflow-hidden group flex flex-col h-full hover:glow-primary transition-all duration-300 cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 * index }}
            onClick={() => setSelectedProject(project)}
          >
            <motion.div layoutId={`image-${project.id}`} className="h-56 overflow-hidden relative">
              <div className="absolute inset-0 bg-surface/50 z-10 group-hover:bg-transparent transition-colors duration-300"></div>
              <img
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                src={project.image}
              />
            </motion.div>
            
            <motion.div layoutId={`content-${project.id}`} className="p-8 flex flex-col flex-grow bg-surface/0">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {project.tags.map((tag, i) => (
                  <span key={i} className="px-2 py-1 bg-[#1A1A1A] rounded font-code-sm text-label-caps flex items-center gap-2 text-gray-300 border border-white/5">
                    <span className={`w-2 h-2 rounded-full ${tag.color} block`}></span> {tag.label}
                  </span>
                ))}
              </div>
              <motion.h3 layoutId={`title-${project.id}`} className="font-headline-md text-2xl text-white mb-2">{project.title}</motion.h3>
              <p className="font-body-md text-on-surface-variant mb-8 flex-grow">
                {project.desc}
              </p>
              
              <div className="flex items-center gap-4 mt-auto border-t border-white/5 pt-4">
                {project.links.map((link, i) => {
                  const Icon = link.icon;
                  // Color based on type
                  let colorClass = 'text-on-surface-variant hover:text-white';
                  if (link.type === 'demo') colorClass = 'text-primary-container hover:text-primary';
                  if (link.type === 'research') colorClass = 'text-secondary hover:text-white';
                  
                  return (
                    <a 
                      key={i} 
                      href={link.url}
                      onClick={(e) => e.stopPropagation()} 
                      className={`font-code-sm transition-colors flex items-center gap-2 ${colorClass}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon size={16} /> {link.label}
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Modal for Extended Details */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050505]/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              layoutId={`card-${selectedProject.id}`}
              className="glass-panel w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[32px] relative flex flex-col border border-white/10"
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 glass-panel flex items-center justify-center text-white/70 hover:text-white hover:bg-black transition-colors"
                aria-label={t('proj.close')}
              >
                <X size={20} />
              </button>
              
              <motion.div layoutId={`image-${selectedProject.id}`} className="h-64 sm:h-80 overflow-hidden relative w-full flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent z-10 pointer-events-none"></div>
                <img
                  alt={selectedProject.title}
                  className="w-full h-full object-cover transition-opacity duration-300"
                  src={activeImage || selectedProject.image}
                />
              </motion.div>
              
              <motion.div layoutId={`content-${selectedProject.id}`} className="p-6 sm:p-10 -mt-16 sm:-mt-24 relative z-20 flex-grow bg-surface/0">
                
                {/* GALLERY THUMBNAILS */}
                {selectedProject.gallery && selectedProject.gallery.length > 1 && (
                  <div className="flex gap-3 mb-6 relative z-30">
                    {selectedProject.gallery.map((img: string, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImage(img)}
                        className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${activeImage === img ? 'border-primary' : 'border-white/10 opacity-70 hover:opacity-100'}`}
                      >
                        <img src={img} alt={`Gallery temp ${idx}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
                
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {selectedProject.tags.map((tag: any, i: number) => (
                    <span key={i} className="px-3 py-1.5 bg-black/80 backdrop-blur-md rounded-lg font-code-sm text-label-caps flex items-center gap-2 text-gray-200 border border-white/10">
                      <span className={`w-2 h-2 rounded-full ${tag.color} block shadow-[0_0_8px_currentColor] text-${tag.color.replace('bg-', '')}`}></span> {tag.label}
                    </span>
                  ))}
                </div>
                
                <motion.h3 layoutId={`title-${selectedProject.id}`} className="font-headline-lg text-4xl sm:text-5xl text-white mb-6">
                  {selectedProject.title}
                </motion.h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  <div className="flex flex-col">
                    <div className="font-label-caps text-secondary tracking-widest text-sm mb-4">
                      {t('proj.details') || 'Resumen'}
                    </div>
                    <p className="font-body-md text-on-surface-variant text-lg leading-relaxed">
                      {selectedProject.desc}
                    </p>
                  </div>
                  
                  {selectedProject.highlights && (
                    <div className="flex flex-col">
                      <div className="font-label-caps text-secondary tracking-widest text-sm mb-4">
                        {t('proj.highlights') || 'Claves'}
                      </div>
                      <ul className="space-y-3">
                        {selectedProject.highlights.map((ht: string, i: number) => {
                          const splitIndex = ht.indexOf(':');
                          return (
                            <li key={i} className="flex items-start gap-2 text-on-surface-variant font-body-md">
                              <span className="text-primary-container mt-1.5 text-xs">•</span>
                              {splitIndex !== -1 ? (
                                <span>
                                  <strong className="text-white font-medium">{ht.substring(0, splitIndex + 1)}</strong>
                                  {ht.substring(splitIndex + 1)}
                                </span>
                              ) : (
                                <span>{ht}</span>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-wrap items-center gap-4 border-t border-white/10 pt-6 mt-auto">
                  {selectedProject.links.map((link: any, i: number) => {
                    const Icon = link.icon;
                    let btnClass = 'bg-surface-container text-white hover:bg-white/10';
                    if (link.type === 'demo') btnClass = 'bg-primary-container text-on-primary-container hover:bg-primary shadow-[0_0_15px_rgba(249,115,22,0.15)]';
                    
                    return (
                      <a 
                        key={i} 
                        href={link.url}
                        className={`font-label-caps h-12 px-6 rounded-full flex items-center gap-2 transition-all ${btnClass}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Icon size={18} /> {link.label}
                      </a>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
