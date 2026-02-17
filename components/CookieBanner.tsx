
import React, { useState, useEffect } from 'react';
import { ShieldCheck, X, ExternalLink } from 'lucide-react';

interface CookieBannerProps {
  onShowPrivacy?: () => void;
}

const CookieBanner: React.FC<CookieBannerProps> = ({ onShowPrivacy }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Un petit délai pour ne pas agresser l'utilisateur dès le chargement
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'true');
    setIsVisible(false);
    // On recharge pour s'assurer que les scripts AdSense s'activent avec le consentement
    window.location.reload();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-2xl z-[200] animate-in slide-in-from-bottom duration-700">
      <div className="bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden">
        {/* Décoration de fond */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#B48646]/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
          <div className="w-16 h-16 bg-[#B48646]/20 rounded-2xl flex items-center justify-center text-[#B48646] shrink-0">
            <ShieldCheck size={32} />
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h4 className="text-white font-bold text-lg mb-1 font-['Poppins']">Respect de votre vie privée</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Infini 24 utilise des cookies pour améliorer votre expérience et diffuser des publicités personnalisées via Google AdSense. 
              {onShowPrivacy && (
                <button 
                  onClick={onShowPrivacy}
                  className="inline-flex items-center gap-1 text-[#B48646] hover:underline ml-1 font-bold"
                >
                  Voir la politique <ExternalLink size={10} />
                </button>
              )}
            </p>
          </div>
          
          <div className="flex flex-col gap-2 w-full md:w-auto">
            <button 
              onClick={acceptCookies}
              className="px-8 py-3 bg-[#B48646] text-white font-bold rounded-xl text-sm hover:bg-[#946d38] transition-all active:scale-95 shadow-lg shadow-[#B48646]/20 whitespace-nowrap"
            >
              Accepter tout
            </button>
            <button 
              onClick={() => setIsVisible(false)}
              className="px-8 py-3 bg-white/5 text-slate-400 font-bold rounded-xl text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all"
            >
              Continuer sans accepter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
