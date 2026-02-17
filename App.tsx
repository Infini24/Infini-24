
import React, { useState, useEffect } from 'react';
import { Home, Calculator, Mail, Infinity as InfinityIcon, Image as ImageIcon, Trophy, Shield, Scale } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import RealizationsPage from './pages/RealizationsPage';
import ContactPage from './pages/ContactPage';
import ContestPage from './pages/ContestPage';
import PrivacyPage from './pages/PrivacyPage';
import LegalNoticePage from './pages/LegalNoticePage';
import CookieBanner from './components/CookieBanner';
import { ServiceType } from './types';

const DesktopSidebar = ({ 
  activeTab, 
  onNavigate
}: { 
  activeTab: number; 
  onNavigate: (index: number) => void;
}) => {

  return (
    <aside className="hidden md:flex flex-col w-72 h-screen fixed left-0 top-0 bg-white/90 backdrop-blur-md border-r border-slate-100 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-50 overflow-y-auto">
      <div className="p-8 pb-4 flex flex-col items-start">
        <div className="flex items-center gap-3 mb-1 group cursor-pointer" onClick={() => onNavigate(0)}>
            <InfinityIcon size={40} strokeWidth={1.5} className="text-[#B48646] group-hover:scale-110 transition-transform duration-300" />
            <div className="flex flex-col">
                <span className="font-bold text-2xl text-slate-900 leading-none tracking-tight">INFINI<span className="text-[#B48646]">24</span></span>
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Créateur de souvenirs</span>
            </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-8 space-y-2">
         {[
           { icon: Home, label: "Accueil", index: 0 },
           { icon: Trophy, label: "Jeu Concours", index: 4 },
           { icon: ImageIcon, label: "Nos Réalisations", index: 1 },
           { icon: Calculator, label: "Nos Services", index: 2 },
           { icon: Mail, label: "Contact", index: 3 }
         ].map((item) => (
           <button
             key={item.index}
             onClick={() => onNavigate(item.index)}
             className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${
               activeTab === item.index 
               ? 'bg-[#B48646]/10 text-[#B48646]' 
               : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
             }`}
           >
             <item.icon size={22} strokeWidth={activeTab === item.index ? 2.5 : 2} className="group-hover:scale-110 transition-transform"/>
             <span className="text-sm font-bold">{item.label}</span>
             {activeTab === item.index && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#B48646]"></div>}
           </button>
         ))}
      </nav>

      <div className="p-6 border-t border-slate-50 flex flex-col gap-3">
           <button 
             onClick={() => onNavigate(5)}
             className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-colors ${activeTab === 5 ? 'text-[#B48646]' : 'text-slate-400 hover:text-slate-600'}`}
           >
             <Shield size={14} /> Confidentialité
           </button>
           <button 
             onClick={() => onNavigate(6)}
             className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-colors ${activeTab === 6 ? 'text-[#B48646]' : 'text-slate-400 hover:text-slate-600'}`}
           >
             <Scale size={14} /> Mentions Légales
           </button>
           <a 
             href="mailto:Wendy.toussaint@icloud.com"
             className="w-full bg-slate-900 text-white p-4 rounded-2xl flex items-center justify-center gap-2 font-bold shadow-lg hover:bg-[#B48646] hover:shadow-[#B48646]/30 transition-all group text-sm mt-2"
           >
             <Mail size={18} className="group-hover:-translate-y-1 transition-transform" /> Nous écrire
           </a>
      </div>
    </aside>
  );
};

const MobileNavigation = ({ activeTab, onNavigate }: { activeTab: number; onNavigate: (index: number) => void }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-100 px-6 py-4 flex justify-between items-center z-50 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      {[
        { icon: Home, index: 0 },
        { icon: Trophy, index: 4 },
        { icon: ImageIcon, index: 1 },
        { icon: Calculator, index: 2 },
        { icon: Mail, index: 3 }
      ].map((item) => (
        <button
          key={item.index}
          onClick={() => onNavigate(item.index)}
          className={`p-3 rounded-2xl transition-all duration-200 ${
            activeTab === item.index 
            ? 'bg-[#B48646] text-white shadow-lg shadow-[#B48646]/30 translate-y-[-4px]' 
            : 'text-slate-400 hover:bg-slate-50'
          }`}
        >
          <item.icon size={24} strokeWidth={activeTab === item.index ? 2.5 : 2} />
        </button>
      ))}
    </div>
  );
};

const App = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [initialService, setInitialService] = useState<ServiceType | null>(null);
  const [mountedTabs, setMountedTabs] = useState<number[]>([0]);

  useEffect(() => {
    try {
        const url = new URL(window.location.href);
        if (url.searchParams.has('fbclid')) {
            url.searchParams.delete('fbclid');
            window.history.replaceState({}, document.title, url.pathname);
        }

        const path = window.location.pathname;
        let initialTab = 0;
        if (path.includes('concours')) initialTab = 4;
        else if (path.includes('nos-realisations') || path.includes('realisations')) initialTab = 1;
        else if (path.includes('nos-services') || path.includes('services')) initialTab = 2;
        else if (path.includes('contact')) initialTab = 3;
        else if (path.includes('confidentialite')) initialTab = 5;
        else if (path.includes('mentions-legales')) initialTab = 6;

        if (initialTab !== 0) {
            setActiveTab(initialTab);
            setMountedTabs(prev => Array.from(new Set([...prev, initialTab])));
        }
    } catch (e) {
        console.warn("Navigation history update failed", e);
    }
  }, []);

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
    if (!mountedTabs.includes(index)) {
        setMountedTabs(prev => [...prev, index]);
    }
    if (serviceType) {
      setInitialService(serviceType);
    }

    let path = '/';
    if (index === 4) path = '/concours';
    if (index === 1) path = '/nos-realisations';
    if (index === 2) path = '/nos-services';
    if (index === 3) path = '/contact';
    if (index === 5) path = '/confidentialite';
    if (index === 6) path = '/mentions-legales';
    
    if (window.location.pathname !== path) {
        try {
            window.history.pushState({}, '', path);
        } catch (e) {
             console.warn("PushState failed", e);
        }
    }
  };

  return (
    <div className="flex bg-[#FDFCF8] h-screen w-screen overflow-hidden text-slate-900 font-['Inter'] selection:bg-[#B48646]/20 selection:text-[#B48646]">
      <Toaster 
        position="top-center" 
        toastOptions={{
            style: { background: '#333', color: '#fff', borderRadius: '1rem', fontSize: '14px', fontWeight: 'bold' },
            success: { style: { background: '#F0FFF4', color: '#15803d', border: '1px solid #BBF7D0' }, iconTheme: { primary: '#15803d', secondary: '#fff' } },
            error: { style: { background: '#FEF2F2', color: '#991B1B', border: '1px solid #FECACA' } }
        }}
      />

      <div 
        className="fixed inset-0 z-0 pointer-events-none transform-gpu will-change-transform"
        style={{
          background: `
            radial-gradient(circle at 90% 10%, rgba(180, 134, 70, 0.08) 0%, transparent 40%),
            radial-gradient(circle at 10% 90%, rgba(30, 41, 59, 0.03) 0%, transparent 40%),
            radial-gradient(circle at 50% 50%, rgba(243, 192, 107, 0.03) 0%, transparent 50%)
          `
        }}
      />

      <DesktopSidebar 
        activeTab={activeTab} 
        onNavigate={handleNavigate} 
      />
      
      <main className="flex-1 h-full relative flex flex-col md:pl-72 z-10">
        
        <div className={`flex-1 h-full overflow-hidden ${activeTab === 0 ? 'block' : 'hidden'}`}>
             <HomePage onNavigate={handleNavigate} />
        </div>
        
        {mountedTabs.includes(4) && (
            <div className={`flex-1 h-full overflow-hidden ${activeTab === 4 ? 'block' : 'hidden'}`}>
                <ContestPage onNavigate={handleNavigate} />
            </div>
        )}

        {mountedTabs.includes(1) && (
            <div className={`flex-1 h-full overflow-hidden ${activeTab === 1 ? 'block' : 'hidden'}`}>
                <RealizationsPage />
            </div>
        )}

        {mountedTabs.includes(2) && (
            <div className={`flex-1 h-full overflow-hidden ${activeTab === 2 ? 'block' : 'hidden'}`}>
                <ServicesPage 
                    initialService={initialService} 
                    onClearInitial={() => setInitialService(null)} 
                    onNavigateToContest={() => handleNavigate(4)}
                />
            </div>
        )}

        {mountedTabs.includes(3) && (
            <div className={`flex-1 h-full overflow-hidden ${activeTab === 3 ? 'block' : 'hidden'}`}>
                <ContactPage />
            </div>
        )}

        {mountedTabs.includes(5) && (
            <div className={`flex-1 h-full overflow-hidden ${activeTab === 5 ? 'block' : 'hidden'}`}>
                <PrivacyPage onBack={() => handleNavigate(0)} />
            </div>
        )}

        {mountedTabs.includes(6) && (
            <div className={`flex-1 h-full overflow-hidden ${activeTab === 6 ? 'block' : 'hidden'}`}>
                <LegalNoticePage onBack={() => handleNavigate(0)} />
            </div>
        )}

        <MobileNavigation activeTab={activeTab} onNavigate={handleNavigate} />
      </main>

      <CookieBanner onShowPrivacy={() => handleNavigate(5)} />
    </div>
  );
};

export default App;
