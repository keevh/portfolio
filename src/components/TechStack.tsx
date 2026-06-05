import { useLanguage } from '../hooks/useLanguage';
import { motion } from 'motion/react';

export function TechStack() {
  const { t } = useLanguage();
  
  const skills = [
    'React', 'Next.js', 'Node.js', 'TypeScript', 'Astro', 'Python', 
    'Tailwind CSS', 'PostgreSQL', 'MongoDB', 'Docker', 'MQTT', 'Git & GitHub'
  ];

  return (
    <section id="skills" className="py-24 px-4 md:px-16 max-w-7xl mx-auto overflow-hidden">
      <motion.div 
        className="flex flex-col gap-4 mb-16 items-center text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
      >
        <span className="font-code-sm text-secondary uppercase tracking-widest block">{t('skills.subtitle')}</span>
        <h2 className="font-headline-lg text-4xl md:text-5xl text-on-surface">{t('skills.title')}</h2>
        <div className="w-16 h-1 bg-primary-container rounded mt-2"></div>
      </motion.div>
      
      <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-4">
        {skills.map((skill, index) => (
          <motion.span 
            key={skill} 
            className="px-6 py-3 glass-panel rounded-full font-code-sm text-on-surface hover:text-primary-container hover:border-primary-container/50 transition-colors cursor-default"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </section>
  );
}
