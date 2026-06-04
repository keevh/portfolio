import { useState } from 'react';
import { Mail, Github, Linkedin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';

export function Contact() {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState({ name: false, email: false, message: false });

  // Validation logic
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isNameEmpty = name.trim() === '';
  const isEmailEmpty = email.trim() === '';
  const isEmailValid = emailRegex.test(email);
  const isMessageEmpty = message.trim() === '';
  
  const hasErrors = isNameEmpty || isEmailEmpty || !isEmailValid || isMessageEmpty;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTouched({ name: true, email: true, message: true });
    if (!hasErrors) {
      // Mock submit
      setTimeout(() => {
        setSubmitted(false);
        setTouched({ name: false, email: false, message: false });
        setName('');
        setEmail('');
        setMessage('');
        alert('Mensaje enviado exitosamente');
      }, 1000);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-16 max-w-7xl mx-auto border-t border-white/5 overflow-hidden">
      <motion.div 
        className="flex flex-col gap-4 mb-16 items-center text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
      >
        <span className="font-code-sm text-secondary uppercase tracking-widest block">{t('contact.subtitle')}</span>
        <h2 className="font-headline-lg text-3xl sm:text-4xl lg:text-5xl text-on-surface">{t('contact.title')}</h2>
        <div className="w-16 h-1 bg-primary-container rounded mt-2"></div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col gap-8"
        >
          <p className="font-body-md text-on-surface-variant text-lg">
            {t('contact.desc')}
          </p>
          <div className="flex flex-col gap-3 mt-4">
            {[
              { href: 'mailto:andreskevin2606@gmail.com', icon: <Mail size={20} />, label: 'andreskevin2606@gmail.com' },
              { href: '#', icon: <Github size={20} />, label: 'github.com/kevingallardo' },
              { href: '#', icon: <Linkedin size={20} />, label: 'linkedin.com/in/kevingallardo' },
            ].map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                className="flex items-center gap-3 text-on-surface-variant hover:text-primary-container transition-colors group"
              >
                <div className="shrink-0 w-10 h-10 rounded-full glass-panel flex items-center justify-center group-hover:bg-primary-container/10 transition-colors">
                  {icon}
                </div>
                <span className="font-code-sm text-sm break-all">{label}</span>
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-[#1e1e1e]"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Editor Header */}
          <div className="bg-[#252526] px-4 py-3 flex items-center border-b border-white/5">
            <div className="flex gap-2 mr-4">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
            </div>
            <div className="flex space-x-2">
              <div className="px-3 py-1 bg-[#1e1e1e] text-gray-300 text-xs font-code-sm rounded-t-md border-t border-x border-primary-container/30">
                contact.ts
              </div>
            </div>
          </div>
          
          <form className="flex flex-col p-3 sm:p-5 font-code-sm text-xs" onSubmit={handleSubmit}>
            {/* const message = { */}
            <p className="text-gray-400 mb-3">
              <span className="text-[#e5c07b]">const </span>
              <span className="text-white">message</span>
              <span className="text-gray-400"> = {'{'}</span>
            </p>

            <div className="pl-3 sm:pl-5 flex flex-col gap-3 border-l border-white/10 ml-1">
              {/* name */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1 min-w-0">
                  <label htmlFor="name" className="text-[#e5c07b] shrink-0">
                    name:<span className="text-[#98c379]">"</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => setTouched(t => ({ ...t, name: true }))}
                    placeholder="Tu nombre"
                    className="min-w-0 flex-1 bg-[#252526]/60 border border-transparent rounded px-2 py-1 text-[#98c379] focus:outline-none focus:border-white/20 transition-colors placeholder:text-gray-600"
                  />
                  <span className="text-[#98c379] shrink-0">",</span>
                </div>
                {(touched.name || submitted) && isNameEmpty && (
                  <p className="text-[#ff5f56]"><span className="text-gray-600 mr-1">//</span>nombre requerido</p>
                )}
              </div>

              {/* email */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1 min-w-0">
                  <label htmlFor="email" className="text-[#e5c07b] shrink-0">
                    email:<span className="text-[#98c379]">"</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setTouched(t => ({ ...t, email: true }))}
                    placeholder="tu@email.com"
                    className="min-w-0 flex-1 bg-[#252526]/60 border border-transparent rounded px-2 py-1 text-[#98c379] focus:outline-none focus:border-white/20 transition-colors placeholder:text-gray-600"
                  />
                  <span className="text-[#98c379] shrink-0">",</span>
                </div>
                {(touched.email || submitted) && isEmailEmpty && (
                  <p className="text-[#ff5f56]"><span className="text-gray-600 mr-1">//</span>correo requerido</p>
                )}
                {(touched.email || submitted) && !isEmailEmpty && !isEmailValid && (
                  <p className="text-[#ff5f56]"><span className="text-gray-600 mr-1">//</span>formato inválido</p>
                )}
              </div>

              {/* message */}
              <div className="flex flex-col gap-1">
                <p className="text-[#e5c07b]">
                  body:<span className="text-[#98c379]">`</span>
                </p>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onBlur={() => setTouched(t => ({ ...t, message: true }))}
                  rows={4}
                  placeholder="Hola, me gustaría trabajar contigo..."
                  className="w-full bg-[#252526]/60 border border-transparent rounded px-2 py-2 text-[#98c379] focus:outline-none focus:border-white/20 transition-colors resize-none placeholder:text-gray-600"
                />
                <span className="text-[#98c379]">`</span>
                {(touched.message || submitted) && isMessageEmpty && (
                  <p className="text-[#ff5f56]"><span className="text-gray-600 mr-1">//</span>mensaje requerido</p>
                )}
              </div>
            </div>

            {/* }; */}
            <p className="text-gray-400 mt-2 mb-3">{'};'}</p>

            {/* await send(message); */}
            <p className="text-gray-400 mb-4 truncate">
              <span className="text-[#c678dd]">await </span>
              <span className="text-[#61afef]">send</span>
              <span className="text-gray-400">(message);</span>
            </p>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={hasErrors}
                className="px-4 sm:px-6 py-2 bg-transparent border border-primary-container text-primary-container disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary-container/10 transition-all duration-200 rounded-lg uppercase tracking-widest text-xs"
              >
                {t('contact.send')}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
