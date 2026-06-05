import { useState } from 'react';
import { X, MonitorPlay } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import type { Project } from '../data/projects';

type Props = {
  project: Project;
  onClose: () => void;
};

const modalVariants = {
  hidden:  { opacity: 0, scale: 0.96, y: 12 },
  visible: { opacity: 1, scale: 1,    y: 0   },
  exit:    { opacity: 0, scale: 0.96, y: 12  },
};

export function ProjectModal({ project, onClose }: Props) {
  const { t } = useLanguage();
  const [activeImage, setActiveImage] = useState(project.image);
  const [tab, setTab] = useState<'info' | 'live'>('info');

  return (
    <motion.div
      key="backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{ backgroundColor: 'rgba(5,5,5,0.85)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <motion.div
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
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/50 flex items-center justify-center text-white/60 hover:text-white hover:bg-black/80 transition-colors cursor-pointer"
          aria-label={t('proj.close')}
        >
          <X size={18} />
        </button>

        {/* Tabs — only when liveUrl exists */}
        {project.liveUrl && (
          <div className="flex border-b border-white/10 px-6 pt-4 gap-1 flex-shrink-0">
            <button
              onClick={() => setTab('info')}
              className={`px-4 py-2 font-label-caps text-xs rounded-t-lg transition-colors cursor-pointer ${tab === 'info' ? 'text-primary-container border-b-2 border-primary-container' : 'text-on-surface-variant hover:text-white'}`}
            >
              {t('proj.tab.info')}
            </button>
            <button
              onClick={() => setTab('live')}
              className={`px-4 py-2 font-label-caps text-xs rounded-t-lg transition-colors flex items-center gap-2 cursor-pointer ${tab === 'live' ? 'text-primary-container border-b-2 border-primary-container' : 'text-on-surface-variant hover:text-white'}`}
            >
              <MonitorPlay size={14} /> {t('proj.tab.live')}
            </button>
          </div>
        )}

        {/* Live preview iframe */}
        {tab === 'live' && project.liveUrl && (
          <div className="flex-grow h-[60vh] rounded-b-[24px] overflow-hidden">
            <iframe
              src={project.liveUrl}
              title={project.title}
              className="w-full h-full border-0"
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-forms"
            />
          </div>
        )}

        {/* Main image */}
        {tab === 'info' && (
        <div className="h-56 sm:h-72 overflow-hidden relative flex-shrink-0 rounded-t-[24px]">
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent z-10 pointer-events-none" />
          <AnimatePresence mode="wait">
            <motion.img
              key={activeImage}
              src={activeImage}
              alt={project.title}
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          </AnimatePresence>
        </div>

        )}

        {/* Body */}
        {tab === 'info' && <div className="p-5 sm:p-8 -mt-12 relative z-20 flex-grow">
          {/* Gallery thumbnails */}
          {project.gallery.length > 1 && (
            <div className="flex gap-2 mb-6">
              {project.gallery.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-14 h-10 sm:w-16 sm:h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImage === img ? 'border-primary-container' : 'border-white/10 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag: { label: string; color: string }, i: number) => (
              <span
                key={i}
                className="px-3 py-1 bg-black/60 rounded-lg font-label-caps text-xs flex items-center gap-2 text-gray-200 border border-white/10"
              >
                <span className={`w-2 h-2 rounded-full ${tag.color} shrink-0`} />
                {tag.label}
              </span>
            ))}
          </div>

          <h3 className="font-headline-lg text-2xl sm:text-4xl text-white mb-6">{project.title}</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <p className="font-label-caps text-xs text-secondary tracking-widest mb-3">{t('proj.details')}</p>
              <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">{project.desc}</p>
            </div>
            {project.highlights.length > 0 && (
              <div>
                <p className="font-label-caps text-xs text-secondary tracking-widest mb-3">{t('proj.highlights')}</p>
                <ul className="space-y-2.5">
                  {project.highlights.map((ht: string, i: number) => {
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
            {project.links.map((link: { type: string; url: string; label: string; icon: React.ElementType }, i: number) => {
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
        </div>}
      </motion.div>
    </motion.div>
  );
}
