import { Heart } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer id="contact" className="w-full py-12 bg-surface-dim border-t border-white/5 flex flex-col md:flex-row justify-between items-center px-4 md:px-16 max-w-7xl mx-auto opacity-80 hover:opacity-100 transition-opacity duration-300 mt-24">
      <div className="text-label-caps font-code-sm text-on-surface-variant mb-6 md:mb-0">
        <span className="font-bold">&lt;/&gt;</span> KEVIN GALLARDO
      </div>
      
      <p className="font-body-md text-on-surface-variant text-sm mb-6 md:mb-0 text-center flex items-center gap-1.5">
        © {new Date().getFullYear()} {t('footer.built')} <Heart size={13} className="text-primary-container fill-primary-container shrink-0" />
      </p>
      
      <div className="flex items-center gap-6">
        <a className="font-code-sm text-on-surface-variant hover:text-primary transition-colors" href="https://github.com/keevh" target="_blank" rel="noopener noreferrer">
          Github
        </a>
        <a className="font-code-sm text-on-surface-variant hover:text-primary transition-colors" href="https://www.linkedin.com/in/keevh/" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
      </div>
    </footer>
  );
}
