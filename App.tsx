import React, { useState, useEffect } from 'react';
import { Home, Calculator, Mail, Infinity as InfinityIcon, Image as ImageIcon } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

// IMPORT STATIQUE (Vitesse Instantanée)
// On charge tout d'un coup pour qu'il n'y ait aucun délai au clic
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import RealizationsPage from './pages/RealizationsPage';
import ContactPage from './pages/ContactPage';
import { ServiceType } from './types';

// --- COMPONENTS ---

// --- SIDEBAR COMPONENT (DESKTOP) ---
const DesktopSidebar = ({ 
  activeTab, 
  onNavigate
}: { 
  activeTab: number; 
  onNavigate: (index: number) => void;
}) => {

  return (
    // Optimisation: backdrop-blur-md au lieu de xl pour performance PC
    <aside className="hidden md:flex flex-col w-72 h-screen fixed left-0 top-0 bg-white/90 backdrop-blur-md border-r border-slate-100 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-50 overflow-y-auto">
      {/* Sidebar Header / Logo */}
      <div className="p-8 pb-4 flex flex-col items-start">
        <div className="flex items-center gap-3 mb-1 group cursor-pointer" onClick={() => onNavigate(0)}>
            <div className="relative">
                <div className="absolute inset-0 bg-[#B48646] opacity-20 rounded-full group-hover:opacity-40 transition-opacity"></div>
                <InfinityIcon size={40} strokeWidth={1.5} className="text-[#B48646] relative z-10" />
            </div>
            <div className="flex flex-col">
                <span className="font-bold text-2xl text-slate-900 leading-none tracking-tight">INFINI<span className="text-[#B48646]">24</span></span>
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Créateur de souvenirs</span>
            </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-8 space-y-2">
         {[
           { icon: Home, label: "Accueil", index: 0 },
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

      {/* Sidebar Footer - Contact Rapide */}
      <div className="p-6 border-t border-slate-50 text-center">
           <a 
             href="mailto:Wendy.toussaint@icloud.com"
             className="w-full bg-slate-900 text-white p-4 rounded-2xl flex items-center justify-center gap-2 font-bold shadow-lg hover:bg-[#B48646] hover:shadow-[#B48646]/30 transition-all group text-sm"
           >
             <Mail size={18} className="group-hover:-translate-y-1 transition-transform" /> Nous écrire
           </a>
      </div>
    </aside>
  );
};

// --- MOBILE NAVIGATION ---
const MobileNavigation = ({ activeTab, onNavigate }: { activeTab: number; onNavigate: (index: number) => void }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-100 px-6 py-4 flex justify-between items-center z-50 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      {[
        { icon: Home, index: 0 },
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

// --- MAIN APP COMPONENT ---
const App = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [initialService, setInitialService] = useState<ServiceType | null>(null);
  
  // Keep track of which tabs have been visited to render them
  // This allows instant switching while keeping state (forms don't reset)
  const [mountedTabs, setMountedTabs] = useState<number[]>([0]);

  // Gestion initiale de l'URL et nettoyage
  useEffect(() => {
    try {
        // 1. Nettoyage URL sale (fbclid)
        const url = new URL(window.location.href);
        if (url.searchParams.has('fbclid')) {
            url.searchParams.delete('fbclid');
            window.history.replaceState({}, document.title, url.pathname);
        }

        // 2. Routing initial
        const path = window.location.pathname;
        let initialTab = 0;
        if (path.includes('nos-realisations') || path.includes('realisations')) initialTab = 1;
        else if (path.includes('nos-services') || path.includes('services')) initialTab = 2;
        else if (path.includes('contact')) initialTab = 3;

        if (initialTab !== 0) {
            setActiveTab(initialTab);
            setMountedTabs(prev => [...prev, initialTab]);
        }
    } catch (e) {
        // Ignore errors in sandboxed environments where history API might be restricted
        console.warn("Navigation history update failed (harmless in preview)", e);
    }
  }, []);

  // Gestion du bouton "Précédent" du navigateur (Back Button)
  useEffect(() => {
    const handlePopState = () => {
        const path = window.location.pathname;
        if (path.includes('contact')) setActiveTab(3);
        else if (path.includes('services')) setActiveTab(2);
        else if (path.includes('realisations')) setActiveTab(1);
        else setActiveTab(0);
    };
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (index: number, serviceType?: ServiceType) => {
    setActiveTab(index);
    
    // Add to mounted tabs if not already present (Instant Render)
    if (!mountedTabs.includes(index)) {
        setMountedTabs(prev => [...prev, index]);
    }

    if (serviceType) {
      setInitialService(serviceType);
    }

    // Mise à jour URL sans rechargement
    let path = '/';
    if (index === 1) path = '/nos-realisations';
    if (index === 2) path = '/nos-services';
    if (index === 3) path = '/contact';
    
    if (window.location.pathname !== path) {
        try {
            window.history.pushState({}, '', path);
        } catch (e) {
             console.warn("PushState failed (harmless in preview)", e);
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

      {/* 
          OPTIMISATION PERFORMANCE PC & MOBILE : 
          Gradient statique (GPU accelerated) pour éviter les calculs de flou coûteux.
      */}
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
        
        {/* 
            NAVIGATION INSTANTANÉE (0 latence)
            Toutes les pages sont chargées statiquement.
            On utilise 'display: none' pour masquer celles inactives.
            Cela garantit une vitesse de 0.00s au changement d'onglet.
        */}
        
        {/* Page 0: Home */}
        <div className={`flex-1 h-full overflow-hidden ${activeTab === 0 ? 'block' : 'hidden'}`}>
             <HomePage onNavigate={handleNavigate} />
        </div>
        
        {/* Page 1: Realizations */}
        {mountedTabs.includes(1) && (
            <div className={`flex-1 h-full overflow-hidden ${activeTab === 1 ? 'block' : 'hidden'}`}>
                <RealizationsPage />
            </div>
        )}

        {/* Page 2: Services */}
        {mountedTabs.includes(2) && (
            <div className={`flex-1 h-full overflow-hidden ${activeTab === 2 ? 'block' : 'hidden'}`}>
                <ServicesPage 
                    initialService={initialService} 
                    onClearInitial={() => setInitialService(null)} 
                />
            </div>
        )}

        {/* Page 3: Contact */}
        {mountedTabs.includes(3) && (
            <div className={`flex-1 h-full overflow-hidden ${activeTab === 3 ? 'block' : 'hidden'}`}>
                <ContactPage />
            </div>
        )}

        <MobileNavigation activeTab={activeTab} onNavigate={handleNavigate} />
      </main>
    </div>
  );
};

export default App;