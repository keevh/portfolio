import { useState } from 'react';
import { Mail, Github, Linkedin, Send } from 'lucide-react';
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
    <section id="contact" className="py-24 px-4 md:px-16 max-w-7xl mx-auto border-t border-white/5 overflow-hidden">
      <motion.div 
        className="flex flex-col gap-4 mb-16 items-center text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
      >
        <span className="font-code-sm text-secondary uppercase tracking-widest block">{t('contact.subtitle')}</span>
        <h2 className="font-headline-lg text-4xl md:text-5xl text-on-surface">{t('contact.title')}</h2>
        <div className="w-16 h-1 bg-primary-container rounded mt-2"></div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
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
          <div className="flex flex-col gap-4 mt-4">
            <a href="mailto:andreskevin2606@gmail.com" className="flex items-center gap-4 text-on-surface-variant hover:text-primary-container transition-colors group">
              <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center group-hover:bg-primary-container/10">
                <Mail size={24} />
              </div>
              <span className="font-code-sm">andreskevin2606@gmail.com</span>
            </a>
            <a href="#" className="flex items-center gap-4 text-on-surface-variant hover:text-primary-container transition-colors group">
              <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center group-hover:bg-primary-container/10">
                <Github size={24} />
              </div>
              <span className="font-code-sm">github.com/kevingallardo</span>
            </a>
            <a href="#" className="flex items-center gap-4 text-on-surface-variant hover:text-primary-container transition-colors group">
              <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center group-hover:bg-primary-container/10">
                <Linkedin size={24} />
              </div>
              <span className="font-code-sm">linkedin.com/in/kevingallardo</span>
            </a>
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
          
          <form className="flex flex-col p-6 font-code-sm" onSubmit={handleSubmit}>
            <div className="flex text-gray-400 text-sm mb-4">
              <span className="text-[#e5c07b] mr-2">const</span> 
              <span className="text-white">message</span> 
              <span className="mr-2"> =</span>
              <span>{'{'}</span>
            </div>

            <div className="pl-6 flex flex-col gap-4 border-l border-white/10 ml-2">
              <div className="flex flex-col gap-1 relative group">
                <div className="flex items-center gap-2">
                  <label htmlFor="name" className="text-[#e5c07b] whitespace-nowrap min-w-[50px] text-right">
                    name: <span className="text-[#98c379]">"</span>
                  </label>
                  <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} onBlur={() => setTouched(t => ({ ...t, name: true }))} placeholder="Tu nombre" className="w-full bg-[#252526]/50 border border-transparent rounded px-2 py-1 text-[#98c379] focus:outline-none focus:border-white/10 transition-colors" />
                  <span className="text-[#98c379] ml-1">",</span>
                </div>
                {(touched.name || submitted) && isNameEmpty && (
                  <div className="text-[#ff5f56] text-xs pl-[58px]">
                    <span className="text-gray-500 mr-2">//</span> Error: El nombre es requerido.
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-1 relative">
                <div className="flex items-center gap-2">
                  <label htmlFor="email" className="text-[#e5c07b] whitespace-nowrap min-w-[50px] text-right">
                    email: <span className="text-[#98c379]">"</span>
                  </label>
                  <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={() => setTouched(t => ({ ...t, email: true }))} placeholder="tu@email.com" className="w-full bg-[#252526]/50 border border-transparent rounded px-2 py-1 text-[#98c379] focus:outline-none focus:border-white/10 transition-colors" />
                  <span className="text-[#98c379] ml-1">",</span>
                </div>
                {(touched.email || submitted) && isEmailEmpty && (
                  <div className="text-[#ff5f56] text-xs pl-[58px]">
                    <span className="text-gray-500 mr-2">//</span> Error: El correo electrónico es requerido.
                  </div>
                )}
                {(touched.email || submitted) && !isEmailEmpty && !isEmailValid && (
                  <div className="text-[#ff5f56] text-xs pl-[58px]">
                    <span className="text-gray-500 mr-2">//</span> Error: Formato de correo electrónico inválido.
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-1 relative mt-1">
                <div className="flex items-start gap-2">
                  <label htmlFor="message" className="text-[#e5c07b] whitespace-nowrap overflow-visible">
                    content: <span className="text-[#98c379]">\`</span>
                  </label>
                </div>
                <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} onBlur={() => setTouched(t => ({ ...t, message: true }))} rows={3} placeholder="Hola, me gustaría trabajar contigo..." className="w-full bg-[#252526]/50 border border-transparent rounded px-2 py-2 text-[#98c379] focus:outline-none focus:border-white/10 transition-colors resize-none ml-4 w-[calc(100%-1rem)]"></textarea>
                <span className="text-[#98c379]"> \`</span>
                {(touched.message || submitted) && isMessageEmpty && (
                  <div className="text-[#ff5f56] text-xs">
                    <span className="text-gray-500 mr-2">//</span> Error: El contenido del mensaje no puede estar vacío.
                  </div>
                )}
              </div>
            </div>
            
            <div className="text-gray-400 text-sm mt-2 mb-2">
              {'};'}
            </div>

            <div className="flex text-gray-400 text-sm mb-4">
              <span className="text-[#c678dd] mr-2">await</span>
              <span className="text-[#61afef]">fetch</span>
              <span>(</span>
              <span className="text-[#98c379]">'/api/send'</span>
              <span>, {'{'} </span>
              <span className="text-[#d19a66] ml-2">body</span>
              <span>: message {'}'});</span>
            </div>
            
            <div className="flex justify-end">
              <button 
                type="submit" 
                disabled={hasErrors}
                className="px-6 py-2.5 bg-transparent border border-primary-container text-primary-container font-code-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-container/10 transition-all duration-300 rounded-lg uppercase tracking-widest text-xs flex items-center justify-center gap-2"
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
