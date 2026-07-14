import React, { useState } from 'react';
import { 
  Facebook, 
  ExternalLink, 
  Clock, 
  Sparkles,
  ArrowRight,
  Settings
} from 'lucide-react';
import toast from 'react-hot-toast';

interface FacebookPageProps {
  onNavigate?: (index: number) => void;
}

const FacebookPage: React.FC<FacebookPageProps> = ({ onNavigate }) => {
  const pageProfileUrl = "https://www.facebook.com/profile.php?id=61584316950503";
  const messengerUrl = "https://m.me/61584316950503";

  // Mode Développeur caché
  const [showDevMode, setShowDevMode] = useState(false);
  const [tempToken, setTempToken] = useState(() => {
    return localStorage.getItem('fb_page_access_token') || '';
  });

  const handleSaveToken = () => {
    if (tempToken.trim() === '') {
      localStorage.removeItem('fb_page_access_token');
      toast.success("Jeton supprimé. Utilisation du jeton par défaut.");
    } else {
      localStorage.setItem('fb_page_access_token', tempToken.trim());
      toast.success("Jeton sauvegardé localement !");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent text-slate-100">
      {/* Header section with cover */}
      <div className="relative w-full h-48 md:h-64 bg-slate-950 overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-cover bg-center opacity-30 blur-[1px]" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=2070&auto=format&fit=crop')` }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
        
        <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row items-center md:items-end gap-4 z-10 text-center md:text-left">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#B48646] to-[#E5B066] rounded-full blur opacity-75"></div>
            <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-slate-900 bg-slate-950 flex items-center justify-center text-[#E5B066]">
              <Facebook size={40} className="animate-pulse" />
            </div>
          </div>
          <div className="flex-1 space-y-1">
            <h1 className="text-xl md:text-3xl font-extrabold tracking-tight text-white font-sans flex items-center justify-center md:justify-start gap-2">
              INFINI24
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#B48646]/20 text-[#E5B066] text-[10px] font-bold border border-[#B48646]/30 shadow-sm backdrop-blur-md">
                <Clock size={10} /> Standby
              </span>
            </h1>
            <p className="text-slate-400 text-xs md:text-sm font-light">
              Mise en veille temporaire de l'affichage du flux en direct.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content: Polished Under Construction View */}
      <div className="max-w-3xl w-full mx-auto px-4 py-12 md:py-20 space-y-12 pb-32">
        <div className="relative bg-slate-900/40 backdrop-blur-md rounded-3xl border border-white/5 p-8 md:p-12 text-center space-y-8 overflow-hidden shadow-2xl">
          {/* Subtle light effects in background */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#B48646]/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[#E5B066]/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="mx-auto w-16 h-16 rounded-2xl bg-[#B48646]/10 border border-[#B48646]/20 flex items-center justify-center text-[#E5B066] mb-4">
            <Clock size={32} className="animate-pulse" />
          </div>

          <div className="space-y-4 max-w-xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white font-sans">
              Flux Facebook en Maintenance
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed font-light">
              Nous optimisons actuellement la synchronisation technique avec la plateforme Meta. Notre widget de publication en temps réel sera de retour très prochainement !
            </p>
          </div>

          {/* Golden Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 max-w-md mx-auto">
            <a
              href={pageProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-[#B48646] to-[#E5B066] hover:from-[#c29657] hover:to-[#f0c381] text-slate-950 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all hover:scale-[1.02] shadow-xl shadow-[#B48646]/10 active:scale-95"
            >
              Visiter notre Facebook <ExternalLink size={14} />
            </a>
            
            <a
              href={messengerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all border border-white/10 active:scale-95"
            >
              Nous Contacter <ArrowRight size={14} />
            </a>
          </div>

          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/5 text-[11px] text-slate-400">
            <Sparkles size={12} className="text-[#E5B066]" />
            <span>Mise en veille temporaire • Merci pour votre patience ✨</span>
          </div>
        </div>

        {/* Hidden Developer Mode Access */}
        <div className="text-center pt-4">
          <button
            onClick={() => setShowDevMode(!showDevMode)}
            className="text-[10px] text-slate-600 hover:text-slate-400 uppercase tracking-widest transition-colors font-mono"
          >
            {showDevMode ? "Masquer la console technique" : "Accès Technique Administrateur"}
          </button>

          {showDevMode && (
            <div className="mt-6 bg-slate-900/80 border border-white/5 rounded-2xl p-6 text-left space-y-4 max-w-md mx-auto animate-in fade-in duration-300">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                <Settings size={14} className="text-[#E5B066]" />
                <span>Configuration du Jeton (localStorage)</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Vous pouvez forcer un jeton d'accès localement dans ce navigateur pour faire des tests.
              </p>
              <div className="space-y-2">
                <input
                  type="password"
                  placeholder="Coller le Page Access Token..."
                  value={tempToken}
                  onChange={(e) => setTempToken(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#B48646]"
                />
                <button
                  onClick={handleSaveToken}
                  className="w-full py-2 bg-[#B48646] hover:bg-[#966d35] text-slate-950 font-bold text-xs rounded-xl transition-all"
                >
                  Sauvegarder le Jeton
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacebookPage;
