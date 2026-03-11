
import React, { useState, useEffect } from 'react';
import { ShieldCheck, X, Settings, Check, ArrowRight } from 'lucide-react';

interface CookieBannerProps {
  onShowPrivacy?: () => void;
}

const CookieBanner: React.FC<CookieBannerProps> = ({ onShowPrivacy }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    // Vérification du consentement stocké (version 2 pour forcer le nouveau bandeau)
    const storedConsent = localStorage.getItem('cookie-consent-v2');
    if (storedConsent) {
      try {
        const { value, expiry } = JSON.parse(storedConsent);
        if (new Date().getTime() < expiry) {
          if (value === 'accepted') {
            loadScripts();
          }
          return;
        }
      } catch (e) {
        localStorage.removeItem('cookie-consent-v2');
      }
    }

    // Apparition fluide après 1.5 secondes
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const loadScripts = () => {
    // --- GOOGLE ADSENSE ---
    if (!document.querySelector('script[src*="adsbygoogle"]')) {
      const adsenseScript = document.createElement('script');
      adsenseScript.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6658392090726583";
      adsenseScript.async = true;
      adsenseScript.crossOrigin = "anonymous";
      document.head.appendChild(adsenseScript);
    }

    // --- GOOGLE ANALYTICS (GA4) ---
    if (!document.querySelector('script[src*="googletagmanager"]')) {
      const gaId = "G-XXXXX"; // Remplacez par votre ID G-XXXXX
      
      const gaScript = document.createElement('script');
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      gaScript.async = true;
      document.head.appendChild(gaScript);

      const gaConfigScript = document.createElement('script');
      gaConfigScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gaId}');
      `;
      document.head.appendChild(gaConfigScript);
    }
  };

  const handleAcceptAll = () => {
    saveConsent('accepted');
    loadScripts();
    setIsVisible(false);
  };

  const handleRefuseAll = () => {
    saveConsent('refused');
    setIsVisible(false);
  };

  const saveConsent = (value: 'accepted' | 'refused') => {
    const expiry = new Date().getTime() + 180 * 24 * 60 * 60 * 1000; // 6 mois
    localStorage.setItem('cookie-consent-v2', JSON.stringify({ value, expiry }));
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:max-w-sm z-[200] animate-in fade-in slide-in-from-bottom-10 duration-700">
      <div className="bg-slate-900/95 border border-white/10 rounded-[2rem] p-5 md:p-8 shadow-2xl shadow-black/50 backdrop-blur-xl relative overflow-hidden group">
        {/* Décoration de fond style "Design & Vidéo" */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-[#B48646]/10 rounded-full blur-[40px] -mr-12 -mt-12"></div>
        
        <div className="relative z-10 space-y-4 md:space-y-6">
          <div className="flex items-start gap-3 md:gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-[#B48646]/20 rounded-xl md:rounded-2xl flex items-center justify-center text-[#B48646] shrink-0">
              <ShieldCheck size={20} className="md:w-6 md:h-6" />
            </div>
            <div className="space-y-0.5 md:space-y-1">
              <h3 className="text-base md:text-lg font-bold text-white font-['Poppins'] tracking-tight">On ajuste les réglages ?</h3>
              <p className="text-slate-400 text-[11px] md:text-sm leading-relaxed font-medium">
                Nos cookies aident à cadrer votre expérience. Ils nous permettent d'analyser l'audience et de diffuser des annonces pertinentes.
              </p>
            </div>
          </div>

          {!showSettings ? (
            <div className="flex flex-col gap-2 md:gap-3">
              <button 
                onClick={handleAcceptAll}
                className="w-full bg-[#B48646] text-white py-3 md:py-4 rounded-xl md:rounded-2xl font-bold text-xs md:text-sm uppercase tracking-widest hover:bg-[#E5B066] transition-all shadow-lg shadow-[#B48646]/20 flex items-center justify-center gap-2 group/btn"
              >
                <Check size={16} className="md:w-[18px] md:h-[18px]" /> Tout accepter
              </button>
              <div className="grid grid-cols-2 gap-2 md:gap-3">
                <button 
                  onClick={handleRefuseAll}
                  className="bg-white/5 text-white/70 py-3 md:py-3.5 rounded-xl md:rounded-2xl font-bold text-[9px] md:text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all border border-white/5"
                >
                  Refuser
                </button>
                <button 
                  onClick={() => setShowSettings(true)}
                  className="bg-white/5 text-white/70 py-3 md:py-3.5 rounded-xl md:rounded-2xl font-bold text-[9px] md:text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all border border-white/5 flex items-center justify-center gap-1.5 md:gap-2"
                >
                  <Settings size={12} className="md:w-[14px] md:h-[14px]" /> Personnaliser
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3 md:space-y-4 animate-in fade-in duration-300">
                <div className="space-y-2 md:space-y-3">
                    <div className="flex items-center justify-between p-2.5 md:p-3 bg-white/5 rounded-lg md:rounded-xl border border-white/5">
                        <div className="text-[10px] md:text-xs font-bold text-white">Essentiels</div>
                        <div className="text-[8px] md:text-[10px] text-[#B48646] font-black uppercase">Toujours actif</div>
                    </div>
                    <div className="flex items-center justify-between p-2.5 md:p-3 bg-white/5 rounded-lg md:rounded-xl border border-white/5">
                        <div className="text-[10px] md:text-xs font-bold text-white">Analytiques</div>
                        <div className="w-8 h-4 md:w-10 md:h-5 bg-[#B48646] rounded-full relative">
                            <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full"></div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between p-2.5 md:p-3 bg-white/5 rounded-lg md:rounded-xl border border-white/5">
                        <div className="text-[10px] md:text-xs font-bold text-white">Publicitaires</div>
                        <div className="w-8 h-4 md:w-10 md:h-5 bg-[#B48646] rounded-full relative">
                            <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full"></div>
                        </div>
                    </div>
                </div>
                <button 
                    onClick={handleAcceptAll}
                    className="w-full bg-white text-slate-900 py-2.5 md:py-3 rounded-lg md:rounded-xl font-bold text-[10px] md:text-xs uppercase tracking-widest hover:bg-slate-100 transition-all"
                >
                    Enregistrer
                </button>
                <button 
                    onClick={() => setShowSettings(false)}
                    className="w-full text-slate-500 text-[9px] md:text-[10px] font-bold uppercase hover:text-slate-300 transition-colors"
                >
                    Retour
                </button>
            </div>
          )}

          <div className="text-center">
            <button 
                onClick={onShowPrivacy}
                className="text-[9px] md:text-[10px] text-slate-500 hover:text-[#B48646] transition-colors flex items-center justify-center gap-1 mx-auto group"
            >
                Politique de confidentialité <ArrowRight size={9} className="md:w-[10px] md:h-[10px] group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
