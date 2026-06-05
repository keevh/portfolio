import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TechStack } from './components/TechStack';
import { Projects } from './components/Projects';
import { Journey } from './components/Journey';
import { Contact } from './components/Contact';
import { PlaygroundSection } from './components/PlaygroundSection';
import { Footer } from './components/Footer';
import { LanguageProvider } from './context/LanguageContext';

export default function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen">
        <Header />
        <main>
          <Hero />
          <TechStack />
          <Projects />
          <Journey />
          <div className="hidden lg:block"><PlaygroundSection /></div>
          <Contact />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
