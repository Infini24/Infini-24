import React, { useState, useEffect } from 'react';
import { Home, Calculator, Briefcase, Mail, ArrowRight, Infinity as InfinityIcon, LogIn, LogOut, User as UserIcon, Image as ImageIcon } from 'lucide-react';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ProfilePage from './pages/ProfilePage';
import RealizationsPage from './pages/RealizationsPage';
import ContactPage from './pages/ContactPage';
import AuthPage from './pages/AuthPage';
import { User, ServiceType } from './types';

// --- SIDEBAR COMPONENT (DESKTOP) ---
const DesktopSidebar = ({ 
  activeTab, 
  onNavigate, 
  user, 
  onLoginClick, 
  onLogout 
}: { 
  activeTab: number; 
  onNavigate: (index: number) => void;
  user: User | null;
  onLoginClick: () => void;
  onLogout: () => void;
}) => {
  return (
    <aside className="hidden md:flex flex-col w-72 h-screen fixed left-0 top-0 bg-white border-r border-slate-100 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-50 overflow-y-auto">
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
           { icon: Briefcase, label: "Mon Suivi", index: 3 },
           { icon: Mail, label: "Contact", index: 4 }
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

      {/* Sidebar Footer / User Profile */}
      <div className="p-6 border-t border-slate-50">
        {user ? (
           <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer group" onClick={() => { if(window.confirm("Se déconnecter ?")) onLogout(); }}>
              <div className="w-10 h-10 rounded-full bg-[#B48646] text-white flex items-center justify-center font-bold text-sm shadow-md group-hover:bg-red-500 transition-colors">
                  {user.name.charAt(0)}
              </div>
              <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
                  <p className="text-xs text-slate-400 truncate">{user.email}</p>
              </div>
              <LogOut size={18} className="text-slate-300 group-hover:text-red-500 transition-colors" />
           </div>
        ) : (
           <button 
             onClick={onLoginClick}
             className="w-full bg-slate-900 text-white p-4 rounded-2xl flex items-center justify-center gap-2 font-bold shadow-lg hover:bg-[#B48646] hover:shadow-[#B48646]/30 transition-all group"
           >
             <LogIn size={20} className="group-hover:-translate-y-1 transition-transform" /> Se connecter
           </button>
        )}
      </div>
    </aside>
  );
};

// --- MOBILE NAVIGATION ---
const MobileNavigation = ({ activeTab, onNavigate }: { activeTab: number; onNavigate: (index: number) => void }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-4 flex justify-between items-center z-50 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      {[
        { icon: Home, index: 0 },
        { icon: ImageIcon, index: 1 },
        { icon: Calculator, index: 2 },
        { icon: Briefcase, index: 3 },
        { icon: Mail, index: 4 }
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
  const [user, setUser] = useState<User | null>(null);
  const [initialService, setInitialService] = useState<ServiceType | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [pendingProject, setPendingProject] = useState<{service: ServiceType, name: string, price: number} | null>(null);

  const handleNavigate = (index: number, serviceType?: ServiceType) => {
    setActiveTab(index);
    if (serviceType) {
      setInitialService(serviceType);
    }
    // Scroll to top on navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginClick = () => {
    setShowAuth(true);
  };

  const handleLogin = (loggedUser: User) => {
    setUser(loggedUser);
    setShowAuth(false);
    // Redirect to Services if there was a pending request
    if (pendingProject) {
        setActiveTab(2);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab(0);
    setPendingProject(null);
  };

  const handleLoginReq = (data?: {service: ServiceType, name: string, price: number}) => {
      if (data) setPendingProject(data);
      setShowAuth(true);
  };

  const consumePending = () => {
      setPendingProject(null);
  }

  // Content Renderer
  let content;
  if (showAuth) {
      content = <AuthPage onLogin={handleLogin} />;
  } else {
      switch (activeTab) {
        case 0:
            content = <HomePage onNavigate={handleNavigate} user={user} onLoginClick={handleLoginClick} onLogout={handleLogout} />;
            break;
        case 1:
            content = <RealizationsPage />;
            break;
        case 2:
            content = <ServicesPage 
                initialService={initialService} 
                onClearInitial={() => setInitialService(null)} 
                user={user}
                onLoginReq={handleLoginReq}
                initialModalData={pendingProject}
                onConsumePending={consumePending}
                onLoginClick={handleLoginClick}
                onLogout={handleLogout}
            />;
            break;
        case 3:
            content = <ProfilePage user={user} onLogout={handleLogout} onLoginClick={handleLoginClick} />;
            break;
        case 4:
            content = <ContactPage user={user} onLoginClick={handleLoginClick} onLogout={handleLogout} />;
            break;
        default:
            content = <HomePage onNavigate={handleNavigate} />;
      }
  }

  return (
    <div className="flex bg-[#FDFCF8] h-screen w-screen overflow-hidden text-slate-900 font-['Inter'] selection:bg-[#B48646]/20 selection:text-[#B48646]">
      {/* Sidebar Desktop */}
      <DesktopSidebar 
        activeTab={showAuth ? -1 : activeTab} 
        onNavigate={(idx) => { setShowAuth(false); handleNavigate(idx); }} 
        user={user}
        onLoginClick={handleLoginClick}
        onLogout={handleLogout}
      />
      
      {/* Main Content Area */}
      <main className="flex-1 h-full relative flex flex-col md:pl-72 transition-all duration-300">
        
        {/* Back button on Mobile when Auth is open (optional UX improvement) */}
        {showAuth && (
            <div className="absolute top-6 left-6 z-50 md:hidden">
                <button 
                    onClick={() => setShowAuth(false)} 
                    className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-400 hover:text-[#B48646] transition-colors"
                >
                    <ArrowRight className="rotate-180" size={20} />
                </button>
            </div>
        )}
        
        {content}

        {/* Mobile Nav - Hidden when Auth is open */}
        {!showAuth && (
            <MobileNavigation activeTab={activeTab} onNavigate={handleNavigate} />
        )}
      </main>
    </div>
  );
};

export default App;