import { useMemo } from 'react';
import { Briefcase, GraduationCap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';
import experienceJson from '../data/experience.json';

type ExperienceJSON = {
  id: number;
  type: 'edu' | 'exp';
  place: string;
  period: string;
  i18n: {
    es: { title: string; desc: string };
    en: { title: string; desc: string };
  };
};

export function Journey() {
  const { t, language } = useLanguage();

  const timeline = useMemo(
    () => (experienceJson as ExperienceJSON[]).map((item) => ({
      ...item,
      title: item.i18n[language].title,
      desc:  item.i18n[language].desc,
    })),
    [language],
  );

  return (
    <section id="journey" className="py-24 px-4 md:px-16 max-w-7xl mx-auto border-t border-white/5 overflow-hidden">
      <motion.div
        className="flex flex-col gap-4 mb-16 items-center text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
      >
        <span className="font-code-sm text-secondary uppercase tracking-widest block">{t('journey.subtitle')}</span>
        <h2 className="font-headline-lg text-4xl md:text-5xl text-on-surface">{t('journey.title')}</h2>
        <div className="w-16 h-1 bg-primary-container rounded mt-2"></div>
      </motion.div>

      <div className="max-w-3xl mx-auto space-y-8">
        {timeline.map((item, index) => (
          <motion.div
            key={item.id}
            className="relative pl-8 md:pl-0"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="md:hidden absolute left-0 top-0 bottom-0 w-px bg-white/10" />
            <div className={`md:hidden absolute left-[-4px] top-2 w-2 h-2 rounded-full ${item.type === 'edu' ? 'bg-secondary' : 'bg-primary-container'}`} />

            <div className={`glass-panel p-6 sm:p-8 rounded-[32px] transition-all duration-300 group relative md:flex justify-between items-start gap-8 border-l-4 ${item.type === 'edu' ? 'border-l-secondary bg-secondary/5 hover:bg-secondary/10' : 'border-l-primary-container bg-primary-container/5 hover:bg-primary-container/10'}`}>
              <div className="md:w-1/3 mb-4 md:mb-0">
                <div className={`font-code-sm flex items-center gap-2 mb-2 ${item.type === 'edu' ? 'text-secondary' : 'text-primary-container'}`}>
                  <span className={`p-1.5 rounded-lg ${item.type === 'edu' ? 'bg-secondary/20' : 'bg-primary-container/20'}`}>
                    {item.type === 'edu' ? <GraduationCap size={16} /> : <Briefcase size={16} />}
                  </span>
                  {item.period}
                </div>
                <div className="font-label-caps text-on-surface-variant uppercase tracking-widest">{item.place}</div>
              </div>
              <div className="md:w-2/3">
                <h3 className="font-headline-md text-2xl text-on-surface mb-3">{item.title}</h3>
                <p className="font-body-md text-on-surface-variant">{item.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
