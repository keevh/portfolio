import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function Header() {
  const { t, toggleLanguage } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: '#about',    label: t('nav.about') },
    { href: '#skills',   label: t('nav.skills') },
    { href: '#projects', label: t('nav.projects') },
    { href: '#journey',  label: t('nav.journey') },
    { href: '#contact',  label: t('nav.contact') },
  ];

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
      {/* Top bar */}
      <div className="flex justify-between items-center gap-8 h-16 px-4 sm:px-6 lg:px-16 max-w-7xl mx-auto">
        {/* Logo */}
        <a
          href="#"
          className="font-headline-md text-base lg:text-xl font-bold text-on-surface flex items-center gap-1 shrink-0 whitespace-nowrap"
        >
          <span className="text-primary-container">&lt;</span>
          Kevin Gallardo
          <span className="text-primary-container">/&gt;</span>
        </a>

        {/* Desktop nav — lg+ only */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-10 font-label-caps text-xs">
          {navLinks.map(({ href, label }) => (
            <motion.a
              key={href}
              href={href}
              className="text-on-surface-variant hover:text-primary-container transition-colors duration-200 whitespace-nowrap"
              whileTap={{ y: 2, scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              {label}
            </motion.a>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden lg:flex items-center gap-6">
          <button
            onClick={toggleLanguage}
            className="font-label-caps text-xs text-on-surface-variant hover:text-primary-container transition-colors flex items-center gap-2"
          >
            <Globe size={15} />
            {t('lang.toggle')}
          </button>
          <a
            href="#"
            className="inline-flex items-center justify-center h-9 px-5 rounded-full font-label-caps text-xs bg-primary-container text-on-primary-container hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(0,242,255,0.2)] whitespace-nowrap"
          >
            {t('header.cv')}
          </a>
        </div>

        {/* Mobile / tablet actions — < lg */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={toggleLanguage}
            aria-label="Toggle language"
            className="p-2 text-on-surface-variant hover:text-primary-container transition-colors"
          >
            <Globe size={18} />
          </button>
          <button
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="p-2 text-on-surface hover:text-primary-container transition-colors"
          >
            <motion.div
              animate={{ rotate: menuOpen ? 90 : 0, scale: menuOpen ? 0.9 : 1 }}
              transition={{ duration: 0.2 }}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.div>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden lg:hidden bg-surface/95 backdrop-blur-xl border-t border-white/8"
          >
            <nav className="flex flex-col px-4 sm:px-6 pt-2 pb-4">
              {navLinks.map(({ href, label }, i) => (
                <motion.a
                  key={href}
                  href={href}
                  onClick={closeMenu}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.2 }}
                  className="font-label-caps text-xs text-on-surface-variant hover:text-primary-container py-3 px-3 rounded-lg hover:bg-white/5 transition-colors"
                >
                  {label}
                </motion.a>
              ))}

              <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between px-3">
                <button
                  onClick={() => { toggleLanguage(); closeMenu(); }}
                  className="font-label-caps text-xs text-on-surface-variant hover:text-primary-container transition-colors flex items-center gap-2"
                >
                  <Globe size={15} />
                  {t('lang.toggle')}
                </button>
                <a
                  href="#"
                  onClick={closeMenu}
                  className="inline-flex items-center justify-center h-9 px-5 rounded-full font-label-caps text-xs bg-primary-container text-on-primary-container hover:opacity-90 transition-opacity"
                >
                  {t('header.cv')}
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
