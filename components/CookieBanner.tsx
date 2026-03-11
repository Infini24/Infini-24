
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
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-md z-[200] animate-in fade-in slide-in-from-bottom-10 duration-700">
      <div className="bg-slate-900 border border-white/10 rounded-[2.5rem] p-6 md:p-8 shadow-2xl shadow-black/50 backdrop-blur-xl relative overflow-hidden group">
        {/* Décoration de fond style "Design & Vidéo" */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#B48646]/10 rounded-full blur-[50px] -mr-16 -mt-16"></div>
        
        <div className="relative z-10 space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-[#B48646]/20 rounded-2xl flex items-center justify-center text-[#B48646] shrink-0">
              <ShieldCheck size={24} />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white font-['Poppins'] tracking-tight">On ajuste les réglages ?</h3>
              <p className="text-slate-400 text-sm leading-relaxed font-medium">
                Nos cookies aident à cadrer votre expérience. Ils nous permettent d'analyser l'audience et de diffuser des annonces pertinentes pour soutenir nos créations.
              </p>
            </div>
          </div>

          {!showSettings ? (
            <div className="flex flex-col gap-3">
              <button 
                onClick={handleAcceptAll}
                className="w-full bg-[#B48646] text-white py-4 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-[#E5B066] transition-all shadow-lg shadow-[#B48646]/20 flex items-center justify-center gap-2 group/btn"
              >
                <Check size={18} /> Tout accepter
              </button>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={handleRefuseAll}
                  className="bg-white/5 text-white/70 py-3.5 rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all border border-white/5"
                >
                  Refuser
                </button>
                <button 
                  onClick={() => setShowSettings(true)}
                  className="bg-white/5 text-white/70 py-3.5 rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all border border-white/5 flex items-center justify-center gap-2"
                >
                  <Settings size={14} /> Personnaliser
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in duration-300">
                <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                        <div className="text-xs font-bold text-white">Essentiels</div>
                        <div className="text-[10px] text-[#B48646] font-black uppercase">Toujours actif</div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                        <div className="text-xs font-bold text-white">Analytiques</div>
                        <div className="w-10 h-5 bg-[#B48646] rounded-full relative">
                            <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                        <div className="text-xs font-bold text-white">Publicitaires</div>
                        <div className="w-10 h-5 bg-[#B48646] rounded-full relative">
                            <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                        </div>
                    </div>
                </div>
                <button 
                    onClick={handleAcceptAll}
                    className="w-full bg-white text-slate-900 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-100 transition-all"
                >
                    Enregistrer mes choix
                </button>
                <button 
                    onClick={() => setShowSettings(false)}
                    className="w-full text-slate-500 text-[10px] font-bold uppercase hover:text-slate-300 transition-colors"
                >
                    Retour
                </button>
            </div>
          )}

          <div className="text-center">
            <button 
                onClick={onShowPrivacy}
                className="text-[10px] text-slate-500 hover:text-[#B48646] transition-colors flex items-center justify-center gap-1 mx-auto group"
            >
                Politique de confidentialité <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
