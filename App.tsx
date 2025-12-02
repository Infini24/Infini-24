
import React, { useState, useEffect } from 'react';
import { Home, Calculator, Briefcase, Mail, ArrowRight, Infinity as InfinityIcon, LogIn, LogOut, User as UserIcon, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { auth, db } from './firebaseConfig';

import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ProfilePage from './pages/ProfilePage';
import RealizationsPage from './pages/RealizationsPage';
import ContactPage from './pages/ContactPage';
import AuthPage from './pages/AuthPage';
import { User, ServiceType, UserType } from './types';
import { logoutUser } from './db';

// --- COMPONENTS ---

const LoadingScreen = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-[#FDFCF8]">
    <div className="relative mb-4">
        <div className="absolute inset-0 bg-[#B48646] blur-2xl opacity-20 rounded-full animate-pulse"></div>
        <InfinityIcon size={64} className="text-[#B48646] relative z-10 animate-bounce" strokeWidth={1.5} />
    </div>
    <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] animate-pulse">Chargement Infini 24...</p>
  </div>
);

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
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

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
           <>
             {showLogoutConfirm ? (
                 <div className="bg-red-50 p-4 rounded-2xl border border-red-100 animate-in fade-in slide-in-from-bottom-2">
                     <p className="text-xs font-bold text-red-800 mb-3 text-center">Déconnexion ?</p>
                     <div className="flex gap-2">
                         <button onClick={() => setShowLogoutConfirm(false)} className="flex-1 bg-white text-slate-600 py-2 rounded-xl text-xs font-bold border border-slate-200 hover:bg-slate-50">Annuler</button>
                         <button onClick={() => { onLogout(); setShowLogoutConfirm(false); }} className="flex-1 bg-red-500 text-white py-2 rounded-xl text-xs font-bold hover:bg-red-600 shadow-sm">Oui</button>
                     </div>
                 </div>
             ) : (
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer group" onClick={() => setShowLogoutConfirm(true)}>
                    <div className="w-10 h-10 rounded-full bg-[#B48646] text-white flex items-center justify-center font-bold text-sm shadow-md group-hover:bg-red-500 transition-colors">
                        {user.name.charAt(0)}
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
                        <p className="text-xs text-slate-400 truncate">{user.email}</p>
                    </div>
                    <LogOut size={18} className="text-slate-300 group-hover:text-red-500 transition-colors" />
                </div>
             )}
           </>
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
  const [isAuthReady, setIsAuthReady] = useState(false); // Nouvel état pour le chargement initial
  
  const [initialService, setInitialService] = useState<ServiceType | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [pendingProject, setPendingProject] = useState<{service: ServiceType, name: string, price: number} | null>(null);

  useEffect(() => {
      console.log("Infini 24 App v2.0 - Optimized Auth (v8)");
      if (!auth) {
          setIsAuthReady(true);
          return;
      }

      const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
          if (currentUser) {
              // 1. FAST UPDATE (Optimistic UI)
              // On n'attend pas la base de données pour afficher l'interface.
              // On utilise les infos disponibles immédiatement dans le token Auth.
              const optimisticUser: User = {
                  uid: currentUser.uid,
                  name: currentUser.displayName || 'Utilisateur',
                  email: currentUser.email || '',
                  type: UserType.PARTICULIER, // Valeur par défaut (sera écrasée par la DB)
                  phone: ''
              };
              
              setUser(optimisticUser);
              setIsAuthReady(true); // On libère l'interface immédiatement

              // 2. BACKGROUND FETCH (Données complètes)
              // On récupère les infos Firestore en tâche de fond (téléphone, entreprise, type réel)
              try {
                  const userDoc = await db.collection("users").doc(currentUser.uid).get();
                  if (userDoc.exists) {
                      // Mise à jour silencieuse de l'état avec les données complètes
                      setUser(prev => ({ ...prev, ...userDoc.data() } as User));
                  }
              } catch (error) {
                  console.error("Erreur chargement profil background:", error);
              }

          } else {
              setUser(null);
              setIsAuthReady(true);
          }
      });
      return () => unsubscribe();
  }, []);

  const handleNavigate = (index: number, serviceType?: ServiceType) => {
    setActiveTab(index);
    if (serviceType) {
      setInitialService(serviceType);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginClick = () => {
    setShowAuth(true);
  };

  const handleLogin = (loggedUser: User) => {
    setUser(loggedUser);
    setShowAuth(false);
    if (pendingProject) {
        setActiveTab(2);
    }
  };

  const handleLogout = async () => {
    await logoutUser();
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

  // --- RENDERING ---

  if (!isAuthReady) {
      return <LoadingScreen />;
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
      <Toaster 
        position="top-center" 
        toastOptions={{
            style: { background: '#333', color: '#fff', borderRadius: '1rem', fontSize: '14px', fontWeight: 'bold' },
            success: { style: { background: '#F0FFF4', color: '#15803d', border: '1px solid #BBF7D0' }, iconTheme: { primary: '#15803d', secondary: '#fff' } },
            error: { style: { background: '#FEF2F2', color: '#991B1B', border: '1px solid #FECACA' } }
        }}
      />

      <DesktopSidebar 
        activeTab={showAuth ? -1 : activeTab} 
        onNavigate={(idx) => { setShowAuth(false); handleNavigate(idx); }} 
        user={user}
        onLoginClick={handleLoginClick}
        onLogout={handleLogout}
      />
      
      <main className="flex-1 h-full relative flex flex-col md:pl-72 transition-all duration-300">
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
        {!showAuth && <MobileNavigation activeTab={activeTab} onNavigate={handleNavigate} />}
      </main>
    </div>
  );
};

export default App;
