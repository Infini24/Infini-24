import React, { useState, useEffect } from 'react';
import { Home, Calculator, Mail, Infinity as InfinityIcon, Image as ImageIcon, Timer, Facebook, Star } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

// Imports des pages
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import RealizationsPage from './pages/RealizationsPage';
import ContactPage from './pages/ContactPage';
import ContestPage from './pages/ContestPage';
import PrivacyPage from './pages/PrivacyPage';
import LegalNoticePage from './pages/LegalNoticePage';
import CookieBanner from './components/CookieBanner';
import { ServiceType } from './types';

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
    { name: "Concours", index: 4 },
    { name: "Contact", index: 3 }
  ];

  return (
    <header className="sticky top-0 w-full bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm z-50 flex-none transition-all">
      <div className="max-w-7xl mx-auto px-6 h-20 md:h-24 flex items-center justify-between">
        
        {/* LOGO */}
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => onNavigate(0)}>
          <div className="text-[#B48646] group-hover:rotate-12 transition-transform duration-500">
            <InfinityIcon size={32} className="md:w-10 md:h-10" strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="text-lg md:text-2xl tracking-tighter font-bold">
              <span className="text-slate-900">INFINI</span>
              <span className="text-[#B48646]">24</span>
            </h1>
            <p className="text-slate-400 text-[7px] md:text-[9px] font-bold tracking-[0.3em] uppercase">
              Créateur de souvenirs
            </p>
          </div>
        </div>

        {/* NAVIGATION DESKTOP */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = activeTab === item.index;
            return (
              <button 
                key={item.index}
                onClick={() => onNavigate(item.index)} 
                className={`relative group flex flex-col items-center px-6 py-2 transition-all duration-300 rounded-xl border-2 ${
                  isActive 
                    ? "bg-slate-900 border-slate-900 text-white shadow-lg" 
                    : "bg-transparent border-transparent text-slate-400 hover:text-slate-900"
                }`}
              >
                {/* Indicateur visuel (Étoile/Diamant/Infini) */}
                <div className={`absolute -top-3 transition-all duration-500 ${
                  isActive 
                    ? "opacity-100 scale-110 rotate-0" 
                    : "opacity-0 scale-50 rotate-45"
                }`}>
                  <div className="bg-white p-1 rounded-full shadow-md border border-slate-100">
                    <Star size={14} className="text-[#B48646] fill-[#B48646]" />
                  </div>
                </div>

                {/* Texte de l'onglet */}
                <span className={`text-[11px] font-black uppercase tracking-[0.2em] transition-colors duration-300`}>
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
    <footer className="flex-none py-4 px-12 bg-white border-t border-slate-100 z-20 hidden md:block">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-slate-400">
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
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-100 px-6 py-4 flex justify-between items-center z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      {[
        { icon: Home, index: 0 },
        { icon: Calculator, index: 2 },
        { icon: ImageIcon, index: 1 },
        { icon: Timer, index: 4 },
        { icon: Mail, index: 3 }
      ].map((item) => (
        <button
          key={item.index}
          onClick={() => onNavigate(item.index)}
          className={`p-3 rounded-2xl transition-all ${
            activeTab === item.index 
            ? 'bg-[#B48646] text-white shadow-lg shadow-[#B48646]/30 -translate-y-1' 
            : 'text-slate-400 hover:bg-slate-50'
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

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path.includes('concours')) setActiveTab(4);
      else if (path.includes('contact')) setActiveTab(3);
      else if (path.includes('services')) setActiveTab(2);
      else if (path.includes('realisations')) setActiveTab(1);
      else if (path.includes('confidentialite')) setActiveTab(5);
      else if (path.includes('mentions-legales')) setActiveTab(6);
      else setActiveTab(0);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (index: number, serviceType?: ServiceType) => {
    setActiveTab(index);
    if (!mountedTabs.includes(index)) setMountedTabs(prev => [...prev, index]);
    if (serviceType) setInitialService(serviceType);

    const paths: Record<number, string> = { 
      0: '/', 1: '/realisations', 2: '/services', 3: '/contact', 
      4: '/concours', 5: '/confidentialite', 6: '/mentions-legales' 
    };
    if (window.location.pathname !== paths[index]) {
      window.history.pushState({}, '', paths[index]);
    }
  };

  return (
    // h-screen + overflow-hidden pour supprimer le scroll global inutile
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-[#FDFCF8] text-slate-900 font-['Inter'] selection:bg-[#B48646]/20 selection:text-[#B48646]">
      <Toaster position="top-center" />

      {/* Arrière-plan décoratif léger */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40" 
        style={{ background: `radial-gradient(circle at 90% 10%, rgba(180, 134, 70, 0.04) 0%, transparent 40%)` }} 
      />

      <GlobalHeader activeTab={activeTab} onNavigate={handleNavigate} />
      
      {/* Zone de contenu principale (le scroll ne se fait qu'ici) */}
      <main className="flex-1 relative z-10 overflow-y-auto no-scrollbar">
        <div className="min-h-full w-full pb-32 md:pb-0">
          {/* Sections avec gestion du montage pour la performance */}
          <div className={activeTab === 0 ? 'block' : 'hidden'}><HomePage onNavigate={handleNavigate} /></div>
          
          {mountedTabs.includes(4) && <div className={activeTab === 4 ? 'block' : 'hidden'}><ContestPage onNavigate={handleNavigate} /></div>}
          
          {mountedTabs.includes(1) && <div className={activeTab === 1 ? 'block' : 'hidden'}><RealizationsPage /></div>}
          
          {mountedTabs.includes(2) && (
            <div className={activeTab === 2 ? 'block' : 'hidden'}>
              <ServicesPage 
                initialService={initialService} 
                onClearInitial={() => setInitialService(null)} 
                onNavigateToContest={() => handleNavigate(4)}
              />
            </div>
          )}

          {mountedTabs.includes(3) && <div className={activeTab === 3 ? 'block' : 'hidden'}><ContactPage /></div>}
          
          {mountedTabs.includes(5) && <div className={activeTab === 5 ? 'block' : 'hidden'}><PrivacyPage onBack={() => handleNavigate(0)} /></div>}
          
          {mountedTabs.includes(6) && <div className={activeTab === 6 ? 'block' : 'hidden'}><LegalNoticePage onBack={() => handleNavigate(0)} /></div>}
        </div>
      </main>

      {/* Barre de navigation mobile & Footer fixe */}
      <MobileNavigation activeTab={activeTab} onNavigate={handleNavigate} />
      <GlobalFooter onNavigate={handleNavigate} />
      <CookieBanner onShowPrivacy={() => handleNavigate(5)} />
    </div>
  );
};

export default App;
