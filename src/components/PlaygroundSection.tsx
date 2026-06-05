import { useState, useEffect } from 'react';
import { Gamepad2, Maximize2, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../hooks/useLanguage';

type Game = {
  id: string;
  name: string;
  url: string;
  preview: string;
  gif: string;
  stack: string;
};

const GAMES: Game[] = [
  {
    id: 'alien',
    name: 'Alien Monster Hunter',
    url: 'https://keevh.github.io/Alien-Monster-Hunter/',
    preview: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800',
    gif: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200',
    stack: 'HTML5 Canvas · JS',
  },
];

export function PlaygroundSection() {
  const { t } = useLanguage();
  const [selected, setSelected] = useState<Game | null>(null);
  const [hovered, setHovered] = useState<Game | null>(null);
  const [loaded, setLoaded] = useState(false);

  const handleSelect = (game: Game) => {
    if (selected?.id !== game.id) setLoaded(false);
    setSelected(game);
  };

  const [autoIndex, setAutoIndex] = useState(0);

  useEffect(() => {
    if (hovered || selected) return;
    const timer = setInterval(() => {
      setAutoIndex((i) => (i + 1) % GAMES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [hovered, selected]);

  const activeGif = hovered ?? (selected ? null : GAMES[autoIndex]);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-16 max-w-7xl mx-auto border-t border-white/5 overflow-hidden">
      <motion.div
        className="flex flex-col gap-4 mb-12 items-center text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
      >
        <span className="font-code-sm text-secondary uppercase tracking-widest block">{t('playground.subtitle')}</span>
        <h2 className="font-headline-lg text-3xl sm:text-4xl lg:text-5xl text-on-surface">{t('playground.title')}</h2>
        <div className="w-16 h-1 bg-primary-container rounded mt-2" />
        <p className="font-body-md text-on-surface-variant max-w-lg">{t('playground.desc')}</p>
      </motion.div>

      <div className="flex flex-col gap-4">
        {/* Game viewport */}
        <motion.div
          className="relative flex-1 rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-surface-container"
          style={{ aspectRatio: '16/9' }}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <AnimatePresence mode="wait">
            {!selected ? (
              <motion.div
                key="placeholder"
                className="absolute inset-0 flex flex-col items-center justify-center gap-4 cursor-pointer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => handleSelect(GAMES[0])}
              >
                <AnimatePresence mode="crossfade">
                  {activeGif && (
                    <motion.img
                      key={activeGif.id}
                      src={activeGif.gif}
                      alt="preview"
                      className="absolute inset-0 w-full h-full object-cover opacity-30"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.3 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.7 }}
                    />
                  )}
                </AnimatePresence>
                <div className="relative flex flex-col items-center gap-4 bg-black/50 backdrop-blur-sm px-8 py-6 rounded-2xl">
                  <div className="w-16 h-16 rounded-full bg-primary-container/10 border border-primary-container/30 flex items-center justify-center">
                    <Gamepad2 size={28} className="text-primary-container" />
                  </div>
                  <p className="font-code-sm text-sm text-on-surface-variant">{t('playground.hint')}</p>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-primary-container/30 bg-primary-container/10">
                    <Volume2 size={12} className="text-primary-container shrink-0" />
                    <span className="font-code-sm text-xs text-primary-container">{t('playground.sound')}</span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={selected.id}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {!loaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-surface-container z-10">
                    <div className="w-8 h-8 rounded-full border-2 border-primary-container border-t-transparent animate-spin" />
                  </div>
                )}
                <iframe
                  src={selected.url}
                  title={selected.name}
                  className="w-full h-full border-0"
                  loading="eager"
                  sandbox="allow-scripts allow-same-origin allow-forms"
                  allowFullScreen
                  onLoad={() => setLoaded(true)}
                />
                <a
                  href={selected.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 right-3 w-8 h-8 rounded-lg bg-black/60 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                  title={t('playground.fullscreen')}
                >
                  <Maximize2 size={14} />
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Game selector — only when multiple games */}
        {GAMES.length > 1 && <div className="flex gap-3">
          {GAMES.map((game) => (
            <motion.button
              key={game.id}
              onClick={() => handleSelect(game)}
              onMouseEnter={() => setHovered(game)}
              onMouseLeave={() => setHovered(null)}
              className={`relative rounded-xl overflow-hidden border-2 transition-all cursor-pointer text-left w-48 ${
                selected?.id === game.id
                  ? 'border-primary-container shadow-[0_0_12px_rgba(52,211,153,0.25)]'
                  : 'border-white/10 hover:border-white/30'
              }`}
              whileTap={{ scale: 0.97 }}
            >
              <img src={game.preview} alt={game.name} className="w-full h-24 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-2">
                <p className="font-label-caps text-xs text-white leading-tight">{game.name}</p>
                <p className="font-code-sm text-[10px] text-on-surface-variant mt-0.5">{game.stack}</p>
              </div>
              {selected?.id === game.id && (
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary-container" />
              )}
            </motion.button>
          ))}
        </div>}
      </div>
    </section>
  );
}
