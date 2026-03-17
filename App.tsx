import React, { useState, useEffect } from 'react';
import { Home, Calculator, Mail, Infinity as InfinityIcon, Image as ImageIcon, Timer, Facebook, User } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { generateBackground } from './src/backgroundGenerator';

// Imports des pages
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import RealizationsPage from './pages/RealizationsPage';
import ContactPage from './pages/ContactPage';
import ContestPage from './pages/ContestPage';
import PrivacyPage from './pages/PrivacyPage';
import LegalNoticePage from './pages/LegalNoticePage';
import FinnPage from './pages/FinnPage';
import ErrorBoundary from './components/ErrorBoundary';
import CookieBanner from './components/CookieBanner';
import FinnAssistant from './components/FinnAssistant';
import ScrollProgress from './components/ScrollProgress';
import NotFoundPage from './pages/NotFoundPage';
import { ServiceType } from './types';
import { useRef } from 'react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

/* --- HEADER GLOBAL (FIGÉ & DORÉ) --- */
const GlobalHeader = ({ 
  activeTab, 
  onNavigate
}: { 
  activeTab: number; 
  onNavigate: (index: number) => void;
}) => {
  const navItems = [
    { name: "Accueil", index: 0 },
    { name: "Services", index: 2 },
    { name: "Réalisations", index: 1 },
    { name: "Finn", index: 7 },
    { name: "Concours", index: 4 },
    { name: "Contact", index: 3 }
  ];

  return (
    <header className="sticky top-0 w-full bg-slate-950/80 backdrop-blur-md border-b border-white/5 shadow-sm z-50 flex-none transition-all">
      <div className="max-w-7xl mx-auto px-3 lg:px-6 h-20 md:h-24 flex items-center justify-between">
        
        {/* LOGO */}
        <div className="flex items-center gap-2 lg:gap-3 group cursor-pointer shrink-0" onClick={() => onNavigate(0)}>
          <div className="text-[#B48646] group-hover:rotate-12 transition-transform duration-500">
            <InfinityIcon size={28} className="md:w-10 md:h-10" strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="text-base md:text-2xl tracking-tighter font-bold">
              <span className="text-white">INFINI</span>
              <span className="text-[#B48646]">24</span>
            </h1>
            <p className="text-slate-400 text-[6px] md:text-[9px] font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase">
              Créateur de souvenirs
            </p>
          </div>
        </div>

        {/* NAVIGATION DESKTOP */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-6">
          {navItems.map((item) => {
            const isActive = activeTab === item.index;
            return (
              <button 
                key={item.index}
                onClick={() => onNavigate(item.index)} 
                className={`relative group flex flex-col items-center px-3 lg:px-6 py-2 transition-all duration-300 rounded-xl border-2 ${
                  isActive 
                    ? "border-[#B48646] text-[#B48646] shadow-sm bg-[#B48646]/5" 
                    : "bg-transparent border-transparent text-slate-400 hover:text-white"
                }`}
              >
                {/* Indicateur visuel (Infini) */}
                <div className={`absolute -top-3 transition-all duration-500 ${
                  isActive 
                    ? "opacity-100 scale-110 rotate-0" 
                    : "opacity-0 scale-50 rotate-45"
                }`}>
                  <div className="bg-white p-1 rounded-full shadow-md border border-slate-100">
                    <InfinityIcon size={14} className="text-[#B48646]" />
                  </div>
                </div>

                {/* Texte de l'onglet */}
                <span className={`text-[10px] lg:text-[11px] font-black uppercase tracking-[0.1em] lg:tracking-[0.2em] transition-colors duration-300`}>
                  {item.name}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

/* --- FOOTER GLOBAL --- */
const GlobalFooter = ({ onNavigate }: { onNavigate: (index: number) => void }) => {
  return (
    <footer className="flex-none py-4 px-12 bg-slate-950/80 backdrop-blur-md border-t border-white/5 z-20 hidden md:block">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-slate-500">
        <p className="text-[10px] font-bold uppercase tracking-widest">© 2026 Infini 24 • Tous droits réservés</p>
        <div className="flex items-center gap-6">
          <button onClick={() => onNavigate(5)} className="text-[10px] font-bold hover:text-[#B48646] uppercase tracking-widest transition-colors">Confidentialité</button>
          <button onClick={() => onNavigate(6)} className="text-[10px] font-bold hover:text-[#B48646] uppercase tracking-widest transition-colors">Mentions Légales</button>
          <div className="flex items-center gap-4 ml-4">
            <a href="https://www.facebook.com/profile.php?id=61584316950503" target="_blank" rel="noreferrer" className="hover:text-[#B48646] transition-all hover:scale-110"><Facebook size={16} /></a>
            <a href="mailto:dywen.officiel7@gmail.com" className="hover:text-[#B48646] transition-all hover:scale-110"><Mail size={16} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

/* --- NAVIGATION MOBILE --- */
const MobileNavigation = ({ activeTab, onNavigate }: { activeTab: number; onNavigate: (index: number) => void }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-950/90 backdrop-blur-md border-t border-white/5 px-6 py-4 flex justify-between items-center z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.2)]">
      {[
        { icon: Home, index: 0 },
        { icon: Calculator, index: 2 },
        { icon: ImageIcon, index: 1 },
        { icon: User, index: 7 },
        { icon: Timer, index: 4 },
        { icon: Mail, index: 3 }
      ].map((item) => (
        <button
          key={item.index}
          onClick={() => onNavigate(item.index)}
          className={`p-3 rounded-2xl transition-all border-2 ${
            activeTab === item.index 
            ? 'border-[#B48646] text-[#B48646] shadow-sm -translate-y-1 bg-[#B48646]/10' 
            : 'text-slate-500 border-transparent hover:bg-white/5'
          }`}
        >
          <item.icon size={24} strokeWidth={activeTab === item.index ? 2.5 : 2} />
        </button>
      ))}
    </div>
  );
};

/* --- COMPOSANT APP PRINCIPAL --- */
const App = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [initialService, setInitialService] = useState<ServiceType | null>(null);
  const [mountedTabs, setMountedTabs] = useState<number[]>([0]);
  const [backgroundUrl, setBackgroundUrl] = useState<string | null>(null);
  const [isEasterEggActive, setIsEasterEggActive] = useState(false);
  const keyBuffer = useRef<string>('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keyBuffer.current = (keyBuffer.current + e.key.toUpperCase()).slice(-6);
      if (keyBuffer.current === 'AURA24') {
        setIsEasterEggActive(true);
        toast.success("PROTOCOLE AURA-24 ACTIVÉ", {
          icon: '🚀',
          duration: 5000,
          style: { background: '#0f172a', color: '#B48646', border: '1px solid #B48646' }
        });
        setTimeout(() => setIsEasterEggActive(false), 5000);
        keyBuffer.current = '';
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const loadBackground = async () => {
      const url = await generateBackground();
      if (url) setBackgroundUrl(url);
    };
    loadBackground();
  }, []);

  useEffect(() => {
    const getTabFromPath = () => {
      const path = window.location.pathname;
      if (path === '/') return 0;
      if (path.includes('concours')) return 4;
      if (path.includes('contact')) return 3;
      if (path.includes('services')) return 2;
      if (path.includes('realisations')) return 1;
      if (path.includes('confidentialite')) return 5;
      if (path.includes('mentions-legales')) return 6;
      if (path.includes('finn')) return 7;
      return -1; // Not Found
    };

    const initialTab = getTabFromPath();
    setActiveTab(initialTab);
    setMountedTabs(prev => prev.includes(initialTab) ? prev : [...prev, initialTab]);

    const handlePopState = () => {
      const tab = getTabFromPath();
      setActiveTab(tab);
      setMountedTabs(prev => prev.includes(tab) ? prev : [...prev, tab]);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (index: number, serviceType?: ServiceType) => {
    setActiveTab(index);
    setMountedTabs(prev => prev.includes(index) ? prev : [...prev, index]);
    if (serviceType) setInitialService(serviceType);

    const paths: Record<number, string> = { 
      0: '/', 1: '/realisations', 2: '/services', 3: '/contact', 
      4: '/concours', 5: '/confidentialite', 6: '/mentions-legales',
      7: '/finn'
    };
    
    if (window.location.pathname !== paths[index]) {
      window.history.pushState({}, '', paths[index]);
    }
  };

  return (
    // h-screen + overflow-hidden pour supprimer le scroll global inutile
    <div className="h-screen w-full flex flex-col overflow-hidden bg-gradient-to-b from-[#000814] via-[#001d3d] to-[#003566] text-slate-100 font-['Inter'] selection:bg-[#B48646]/20 selection:text-[#B48646]">
      <Toaster position="top-center" />
      <ScrollProgress />

      {/* Easter Egg Animation */}
      <AnimatePresence>
        {isEasterEggActive && (
          <motion.div 
            initial={{ x: '-100vw', y: '50vh', opacity: 0 }}
            animate={{ x: '100vw', y: '20vh', opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3, ease: "linear" }}
            className="fixed inset-0 z-[200] pointer-events-none"
          >
            <div className="relative">
              <div className="absolute top-0 left-0 w-64 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-sm" />
              <img 
                src="https://res.cloudinary.com/dmgqewagr/image/upload/v1773739524/Intro%20%28Breaching%29.png" 
                alt="" 
                className="w-32 h-32 object-contain -rotate-12"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Arrière-plan dynamique */}
      <div className="star-rain">
        {/* Soleil et Lune lointains - Alternance jour/nuit (Cycle accéléré) */}
        <div className="celestial-body moon" style={{ animation: 'celestialMove 200s linear infinite', animationDelay: '-120s' }} />
        <div className="celestial-body sun" style={{ animation: 'celestialMove 200s linear infinite', animationDelay: '-20s' }} />

        {/* Étoiles filantes - Très rares et multidirectionnelles */}
        {[...Array(3)].map((_, i) => {
          const angle = Math.random() * 360;
          const rad = (angle * Math.PI) / 180;
          const dist = 100; // vmin
          const moveX = Math.cos(rad) * dist;
          const moveY = Math.sin(rad) * dist;
          
          return (
            <div 
              key={`shooting-${i}`} 
              className="shooting-star" 
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `shootingStar ${2 + Math.random() * 4}s linear infinite`,
                animationDelay: `-${Math.random() * 30}s`,
                // @ts-ignore
                '--rotation': `${angle}deg`,
                '--move-x-start': `${moveX * 0.05}vw`,
                '--move-y-start': `${moveY * 0.05}vh`,
                '--move-x-end': `${moveX}vw`,
                '--move-y-end': `${moveY}vh`
              }}
            />
          );
        })}

        {/* Étoiles lointaines - Nombreuses et lentes */}
        {[...Array(60)].map((_, i) => (
          <div 
            key={i} 
            className={`star ${i % 4 === 0 ? 'star-twinkle' : ''}`} 
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: i % 4 === 0 
                ? `distantStarMove ${60 + Math.random() * 100}s linear infinite, twinkle ${3 + Math.random() * 4}s ease-in-out infinite`
                : `distantStarMove ${60 + Math.random() * 100}s linear infinite`,
              animationDelay: `-${Math.random() * 100}s`,
              transform: `scale(${0.3 + Math.random() * 0.7})`
            }}
          />
        ))}
      </div>
      {backgroundUrl && (
        <div 
          className="bg-dynamic" 
          style={{ backgroundImage: `url(${backgroundUrl})` }} 
        />
      )}
      <div className="bg-overlay" />

      <GlobalHeader activeTab={activeTab} onNavigate={handleNavigate} />
      
      {/* Zone de contenu principale (le scroll ne se fait qu'ici) */}
      <main className="flex-1 relative z-10 overflow-y-auto overflow-x-hidden no-scrollbar">
        <div className="min-h-full w-full pb-32 md:pb-0">
          {/* Sections avec gestion du montage pour la performance */}
          <div className={activeTab === 0 ? 'block' : 'hidden'}>
            <ErrorBoundary>
              <HomePage onNavigate={handleNavigate} />
            </ErrorBoundary>
          </div>
          
          {mountedTabs.includes(4) && (
            <div className={activeTab === 4 ? 'block' : 'hidden'}>
              <ErrorBoundary>
                <ContestPage onNavigate={handleNavigate} />
              </ErrorBoundary>
            </div>
          )}
          
          {mountedTabs.includes(1) && (
            <div className={activeTab === 1 ? 'block' : 'hidden'}>
              <ErrorBoundary>
                <RealizationsPage />
              </ErrorBoundary>
            </div>
          )}
          
          {mountedTabs.includes(2) && (
            <div className={activeTab === 2 ? 'block' : 'hidden'}>
              <ErrorBoundary>
                <ServicesPage 
                  initialService={initialService} 
                  onClearInitial={() => setInitialService(null)} 
                  onNavigateToContest={() => handleNavigate(4)}
                />
              </ErrorBoundary>
            </div>
          )}

          {activeTab === -1 && (
            <div className="block">
              <ErrorBoundary>
                <NotFoundPage onNavigate={handleNavigate} />
              </ErrorBoundary>
            </div>
          )}
          
          {mountedTabs.includes(3) && (
            <div className={activeTab === 3 ? 'block' : 'hidden'}>
              <ErrorBoundary>
                <ContactPage />
              </ErrorBoundary>
            </div>
          )}
          
          {mountedTabs.includes(5) && (
            <div className={activeTab === 5 ? 'block' : 'hidden'}>
              <ErrorBoundary>
                <PrivacyPage onBack={() => handleNavigate(0)} />
              </ErrorBoundary>
            </div>
          )}
          
          {mountedTabs.includes(6) && (
            <div className={activeTab === 6 ? 'block' : 'hidden'}>
              <ErrorBoundary>
                <LegalNoticePage onBack={() => handleNavigate(0)} />
              </ErrorBoundary>
            </div>
          )}
          
          {mountedTabs.includes(7) && (
            <div className={activeTab === 7 ? 'block' : 'hidden'}>
              <ErrorBoundary>
                <FinnPage onNavigate={handleNavigate} />
              </ErrorBoundary>
            </div>
          )}
        </div>
      </main>

      {/* Barre de navigation mobile & Footer fixe */}
      <MobileNavigation activeTab={activeTab} onNavigate={handleNavigate} />
      <GlobalFooter onNavigate={handleNavigate} />
      <CookieBanner onShowPrivacy={() => handleNavigate(5)} />
      <FinnAssistant />
    </div>
  );
};

export default App;
