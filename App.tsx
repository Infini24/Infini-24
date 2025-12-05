import React, { useState, useEffect } from 'react';
import { Home, Calculator, Mail, ArrowRight, Infinity as InfinityIcon, Image as ImageIcon, User as UserIcon, Loader2 } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { auth, db } from './firebaseConfig';

import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import RealizationsPage from './pages/RealizationsPage';
import ContactPage from './pages/ContactPage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import { ServiceType, User } from './types';

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
           { icon: UserIcon, label: "Mon Compte", index: 3 },
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
        { icon: UserIcon, index: 3 },
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
  const [initialService, setInitialService] = useState<ServiceType | null>(null);
  
  // Auth State
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Auth Persistence Listener
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Fetch additional user details from Firestore
          const doc = await db.collection('users').doc(firebaseUser.uid).get();
          if (doc.exists) {
            setUser({ uid: firebaseUser.uid, ...doc.data() } as User);
          } else {
             // Fallback minimal user info if firestore doc missing
             setUser({
               uid: firebaseUser.uid,
               email: firebaseUser.email || '',
               name: firebaseUser.displayName || 'Utilisateur',
               type: 'Particulier', // Default fallback
               phone: ''
             } as User);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          // Still set basic user even if fetch fails to allow usage
          setUser({
             uid: firebaseUser.uid,
             email: firebaseUser.email || '',
             name: firebaseUser.displayName || 'Utilisateur',
             type: 'Particulier',
             phone: ''
          } as User);
        }
      } else {
        setUser(null);
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleNavigate = (index: number, serviceType?: ServiceType) => {
    setActiveTab(index);
    if (serviceType) {
      setInitialService(serviceType);
    }
    window.scrollTo({ top: 0 });
  };

  const handleLoginSuccess = (user: User) => {
      setUser(user);
      // Stay on tab 3 or navigate elsewhere if needed
  };

  if (authLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#FDFCF8] flex-col gap-4">
         <Loader2 className="animate-spin text-[#B48646]" size={48} />
         <p className="text-slate-400 text-xs font-bold uppercase tracking-widest animate-pulse">Chargement d'Infini 24...</p>
      </div>
    );
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

      {/* GLOBAL BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#B48646]/5 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-slate-900/5 rounded-full blur-[100px] opacity-60" />
        <div className="absolute top-[40%] left-[20%] w-[300px] h-[300px] bg-[#F3C06B]/5 rounded-full blur-[80px] opacity-40" />
      </div>

      <DesktopSidebar 
        activeTab={activeTab} 
        onNavigate={handleNavigate} 
      />
      
      <main className="flex-1 h-full relative flex flex-col md:pl-72 transition-all duration-300 z-10">
        
        {/* Page Content with Keep-Alive Logic */}
        <div className={`flex-1 h-full overflow-hidden ${activeTab === 0 ? 'block' : 'hidden'}`}>
             <HomePage 
                onNavigate={handleNavigate} 
                user={user} 
                onLoginClick={() => handleNavigate(3)}
                onLogout={() => auth.signOut()}
             />
        </div>
        
        <div className={`flex-1 h-full overflow-hidden ${activeTab === 1 ? 'block' : 'hidden'}`}>
             <RealizationsPage />
        </div>

        <div className={`flex-1 h-full overflow-hidden ${activeTab === 2 ? 'block' : 'hidden'}`}>
             <ServicesPage 
                initialService={initialService} 
                onClearInitial={() => setInitialService(null)} 
                user={user}
            />
        </div>

        <div className={`flex-1 h-full overflow-hidden ${activeTab === 3 ? 'block' : 'hidden'}`}>
             {user ? (
                 <ProfilePage 
                    user={user} 
                    onLogout={() => auth.signOut()} 
                    onLoginClick={() => {}} // Not used here as user is logged in
                 />
             ) : (
                 <AuthPage onLogin={handleLoginSuccess} />
             )}
        </div>

        <div className={`flex-1 h-full overflow-hidden ${activeTab === 4 ? 'block' : 'hidden'}`}>
             <ContactPage user={user} />
        </div>

        <MobileNavigation activeTab={activeTab} onNavigate={handleNavigate} />
      </main>
    </div>
  );
};

export default App;