import { useRef, useEffect, useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { motion, useMotionValue, useSpring, useTransform, useInView } from 'motion/react';
import { smoothScrollTo } from '../utils/scroll';

const PHOTO_SRC = `${import.meta.env.BASE_URL}photo.avif`;

function ParallaxPhoto({ src }: { src: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);

  const spring = { stiffness: 60, damping: 18, mass: 0.8 };
  const x = useSpring(useTransform(rawX, [0, 1], [-18, 18]), spring);
  const y = useSpring(useTransform(rawY, [0, 1], [-12, 12]), spring);
  const glowX = useSpring(useTransform(rawX, [0, 1], [-8, 8]), spring);
  const glowY = useSpring(useTransform(rawY, [0, 1], [-5, 5]), spring);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width);
    rawY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    rawX.set(0.5);
    rawY.set(0.5);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex justify-center items-center h-80 sm:h-96 lg:h-[520px] select-none"
    >
      {/* Ambient glow */}
      <motion.div
        style={{ x: glowX, y: glowY }}
        className="absolute w-64 h-64 rounded-full bg-gradient-to-tr from-primary-container/20 to-secondary/15 blur-[60px] pointer-events-none"
      />

      {/* Outer spinning ring */}
      <div className="absolute w-72 h-72 sm:w-80 sm:h-80 lg:w-[400px] lg:h-[400px] rounded-full border border-primary-container/20 animate-[spin_60s_linear_infinite] pointer-events-none shadow-[0_0_20px_rgba(52,211,153,0.08)]">
        <div className="absolute top-0 left-[20%] w-6 h-px bg-primary-container shadow-[0_0_12px_#34d399]" />
        <div className="absolute bottom-0 right-[20%] w-6 h-px bg-secondary shadow-[0_0_12px_#2dd4bf]" />
        <div className="absolute top-1/2 left-0 w-px h-5 bg-white/30" />
        <div className="absolute top-1/2 right-0 w-px h-5 bg-white/30" />
      </div>

      {/* Inner counter-spinning ring */}
      <div className="absolute w-56 h-56 sm:w-64 sm:h-64 lg:w-[320px] lg:h-[320px] rounded-full border border-secondary/20 animate-[spin_40s_linear_infinite_reverse] pointer-events-none">
        <div className="absolute top-0 right-[30%] w-4 h-px bg-primary-container/80 shadow-[0_0_8px_#34d399]" />
        <div className="absolute bottom-0 left-[30%] w-4 h-px bg-secondary/80 shadow-[0_0_8px_#2dd4bf]" />
      </div>

      {/* Image — parallax layer */}
      <motion.img
        style={{ x, y }}
        src={src}
        alt="Kevin Gallardo"
        className="relative h-80 sm:h-96 lg:h-[520px] w-auto object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.7)] scale-x-[-1]"
        draggable={false}
      />

      {/* Ground shadow */}
      <motion.div
        style={{ x: glowX }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 w-32 h-4 rounded-full bg-black/40 blur-xl pointer-events-none"
      />
    </div>
  );
}

const STATS = {
  years: 3,
  projects: 20,
  techs: 12,
};

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const step = 16;
    const increment = value / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) { setCount(value); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, step);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <div ref={ref} className="flex flex-col items-center lg:items-start gap-1">
      <span className="font-display-lg text-3xl sm:text-4xl text-primary-container">
        {count}{suffix}
      </span>
      <span className="font-code-sm text-[10px] sm:text-xs text-on-surface-variant uppercase tracking-wider sm:tracking-widest">{label}</span>
    </div>
  );
}

export function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="about"
      className="min-h-screen flex items-center relative overflow-hidden pt-16"
    >
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary-container/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-[100px]" />
        <div className="absolute left-10 top-1/3 text-surface-container font-code-sm opacity-20 select-none hidden xl:block">
          &lt;html&gt;<br />
          &nbsp;&nbsp;&lt;body&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;h1&gt;<br />
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-10 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8 items-center min-h-[calc(100vh-4rem)]">

          {/* ── Text column (includes photo on mobile/tablet) ── */}
          <motion.div
            className="flex flex-col gap-6 lg:gap-8 z-10 justify-center py-8 lg:py-16"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            {/* Avatar — mobile/tablet only */}
            <motion.div
              className="lg:hidden"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
            >
              <ParallaxPhoto src={PHOTO_SRC} />
            </motion.div>


            {/* Heading */}
            <div className="flex flex-col gap-3 text-center lg:text-left">
              <h1 className="font-display-lg text-5xl sm:text-6xl lg:text-7xl text-on-surface leading-tight">
                {t('hero.greeting')} {t('hero.im')}
                <span className="text-primary-container">.</span>
              </h1>
              <h2 className="font-display-lg text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gradient pb-1">
                {t('hero.specialty')}
              </h2>
            </div>

            {/* Description */}
            <p className="font-code-sm text-base text-on-surface-variant border-l-2 border-primary-container pl-4 max-w-md mx-auto lg:mx-0 text-left leading-relaxed">
              {t('hero.desc')}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <motion.a
                href="#projects"
                onClick={(e) => { e.preventDefault(); const el = document.getElementById('projects'); if (el) smoothScrollTo(el.getBoundingClientRect().top + window.scrollY); }}
                className="inline-flex items-center justify-center h-12 px-8 rounded-full font-label-caps text-xs bg-primary-container text-on-primary-container shadow-[0_0_20px_rgba(0,242,255,0.2)]"
                whileHover={{ opacity: 0.9 }}
                whileTap={{ y: 4, scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              >
                {t('hero.btn.projects')}
              </motion.a>
              <motion.a
                href="#contact"
                onClick={(e) => { e.preventDefault(); const el = document.getElementById('contact'); if (el) smoothScrollTo(el.getBoundingClientRect().top + window.scrollY); }}
                className="inline-flex items-center justify-center h-12 px-8 rounded-full font-label-caps text-xs border border-primary-container/30 text-primary-container"
                whileHover={{ backgroundColor: 'rgba(0,242,255,0.08)' }}
                whileTap={{ y: 4, scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              >
                {t('hero.btn.contact')}
              </motion.a>
            </div>
            {/* Stats */}
            <motion.div
              className="flex gap-4 sm:gap-8 justify-center lg:justify-start pt-2 border-t border-white/5 w-full min-w-0"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <StatCounter value={STATS.years} suffix="+" label={t('hero.stats.years')} />
              <div className="w-px bg-white/10" />
              <StatCounter value={STATS.projects} suffix="+" label={t('hero.stats.projects')} />
              <div className="w-px bg-white/10" />
              <StatCounter value={STATS.techs} suffix="+" label={t('hero.stats.techs')} />
            </motion.div>
          </motion.div>

          {/* ── Photo column — lg+ ── */}
          <motion.div
            className="hidden lg:flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <ParallaxPhoto src={PHOTO_SRC} />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
