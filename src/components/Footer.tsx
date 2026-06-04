import { useLanguage } from '../context/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer id="contact" className="w-full py-12 bg-surface-dim border-t border-white/5 flex flex-col md:flex-row justify-between items-center px-4 md:px-16 max-w-7xl mx-auto opacity-80 hover:opacity-100 transition-opacity duration-300 mt-24">
      <div className="text-label-caps font-code-sm text-on-surface-variant mb-6 md:mb-0">
        <span className="font-bold">&lt;/&gt;</span> KEVIN GALLARDO
      </div>
      
      <p className="font-body-md text-on-surface-variant text-sm mb-6 md:mb-0 text-center">
        © {new Date().getFullYear()} {t('footer.built')}
      </p>
      
      <div className="flex items-center gap-6">
        <a className="font-code-sm text-on-surface-variant hover:text-primary transition-colors hover:glow-primary" href="#">
          Github
        </a>
        <a className="font-code-sm text-on-surface-variant hover:text-primary transition-colors hover:glow-primary" href="#">
          LinkedIn
        </a>
      </div>
    </footer>
  );
}
