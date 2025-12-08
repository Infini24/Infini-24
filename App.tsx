import React, { useState, Suspense, lazy } from 'react';
import { Home, Calculator, Mail, Infinity as InfinityIcon, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

// Import Home Page eagerly (Critical Path) for instant LCP
import HomePage from './pages/HomePage';
import { ServiceType } from './types';

// Lazy load other pages to reduce initial bundle size
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const RealizationsPage = lazy(() => import('./pages/RealizationsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

// --- COMPONENTS ---

const LoadingScreen = () => (
  <div className="h-full w-full flex flex-col items-center justify-center bg-[#FDFCF8]">
      <Loader2 className="h-10 w-10 text-[#B48646] animate-spin mb-4" />
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest animate-pulse">Chargement...</p>
  </div>
);

// --- SIDEBAR COMPONENT (DESKTOP) ---
const DesktopSidebar = ({ 
  activeTab, 
  onNavigate
}: { 
  activeTab: number; 
  onNavigate: (index: number) => void;
}) => {

  return (
    <aside className="hidden md:flex flex-col w-72 h-screen fixed left-0 top-0 bg-white/80 backdrop-blur-xl border-r border-slate-100 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-50 overflow-y-auto">
      {/* Sidebar Header / Logo */}
      <div className="p-8 pb-4 flex flex-col items-start">
        <div className="flex items-center gap-3 mb-1 group cursor-pointer" onClick={() => onNavigate(0)}>
            <div className="relative">
                <div className="absolute inset-0 bg-[#B48646] blur-xl opacity-20 rounded-full group-hover:opacity-40 transition-opacity"></div>
                <InfinityIcon size={40} strokeWidth={1.5} className="text-[#B48646] relative z-10" />
            </div>
            <div className="flex flex-col">
                <span className="font-bold text-2xl text-slate-900 leading-none tracking-tight">INFINI<span className="text-[#B48646]">24</span></span>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Créateur de souvenirs</span>
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
             <span className={`text-sm font-bold ${activeTab === item.index ? 'font-extrabold' : ''}`}>{item.label}</span>
             {activeTab === item.index && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#B48646]"></div>}
           </button>
         ))}
      </nav>

      {/* Sidebar Footer - Contact Rapide */}
      <div className="p-6 border-t border-slate-50 text-center">
           <a 
             href="mailto:Dywen.officiel7@gmail.com"
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
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-slate-100 px-6 py-4 flex justify-between items-center z-50 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      {[
        { icon: Home, index: 0 },
        { icon: ImageIcon, index: 1 },
        { icon: Calculator, index: 2 },
        { icon: Mail, index: 3 }
      ].map((item) => (
        <button
          key={item.index}
          onClick={() => onNavigate(item.index)}
          className={`p-3 rounded-2xl transition-all duration-300 ${
            activeTab === item.index 
            ? 'bg-[#B48646] text-white shadow-lg shadow-[#B48646]/30 translate-y-[-8px]' 
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
  
  // Keep track of which tabs have been visited to load them only when needed
  // Index 0 (Home) is always "visited"
  const [mountedTabs, setMountedTabs] = useState<number[]>([0]);

  const handleNavigate = (index: number, serviceType?: ServiceType) => {
    setActiveTab(index);
    
    // Add to mounted tabs if not already present
    if (!mountedTabs.includes(index)) {
        setMountedTabs(prev => [...prev, index]);
    }

    if (serviceType) {
      setInitialService(serviceType);
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

      {/* GLOBAL BACKGROUND ELEMENTS - GPU ACCELERATED */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#B48646]/5 rounded-full blur-[120px] opacity-60 transform-gpu will-change-transform translate-z-0" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-slate-900/5 rounded-full blur-[100px] opacity-60 transform-gpu will-change-transform translate-z-0" />
        <div className="absolute top-[40%] left-[20%] w-[300px] h-[300px] bg-[#F3C06B]/5 rounded-full blur-[80px] opacity-40 transform-gpu will-change-transform translate-z-0" />
      </div>

      <DesktopSidebar 
        activeTab={activeTab} 
        onNavigate={handleNavigate} 
      />
      
      <main className="flex-1 h-full relative flex flex-col md:pl-72 transition-all duration-300 z-10">
        
        {/* Page 0: Home (Always Mounted) */}
        <div className={`flex-1 h-full overflow-hidden ${activeTab === 0 ? 'block' : 'hidden'}`}>
             <HomePage onNavigate={handleNavigate} />
        </div>
        
        {/* Page 1: Realizations (Lazy) */}
        {mountedTabs.includes(1) && (
            <div className={`flex-1 h-full overflow-hidden ${activeTab === 1 ? 'block' : 'hidden'}`}>
                <Suspense fallback={<LoadingScreen />}>
                    <RealizationsPage />
                </Suspense>
            </div>
        )}

        {/* Page 2: Services (Lazy) */}
        {mountedTabs.includes(2) && (
            <div className={`flex-1 h-full overflow-hidden ${activeTab === 2 ? 'block' : 'hidden'}`}>
                 <Suspense fallback={<LoadingScreen />}>
                    <ServicesPage 
                        initialService={initialService} 
                        onClearInitial={() => setInitialService(null)} 
                    />
                </Suspense>
            </div>
        )}

        {/* Page 3: Contact (Lazy) */}
        {mountedTabs.includes(3) && (
            <div className={`flex-1 h-full overflow-hidden ${activeTab === 3 ? 'block' : 'hidden'}`}>
                 <Suspense fallback={<LoadingScreen />}>
                    <ContactPage />
                 </Suspense>
            </div>
        )}

        <MobileNavigation activeTab={activeTab} onNavigate={handleNavigate} />
      </main>
    </div>
  );
};

export default App;