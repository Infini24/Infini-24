
import React, { useState } from 'react';
import { Trophy, Gift, Info, X, AlertCircle, Home, Facebook, Hourglass, Timer, Instagram, Linkedin } from 'lucide-react';

interface ContestPageProps {
  onNavigate?: (index: number) => void;
}

const ContestPage: React.FC<ContestPageProps> = ({ onNavigate }) => {
  const [showRules, setShowRules] = useState(false);

  const RulesModal = () => (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="bg-slate-900 rounded-[2.5rem] w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col shadow-2xl border border-white/5">
            <div className="p-8 border-b border-white/5 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#B48646]">
                        <Info size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-white">Règlement du Jeu</h3>
                </div>
                <button onClick={() => setShowRules(false)} className="p-3 bg-white/5 rounded-full text-slate-400 hover:text-white transition-colors">
                    <X size={20} />
                </button>
            </div>
            <div className="p-8 overflow-y-auto no-scrollbar space-y-8 text-sm leading-relaxed text-slate-400">
                <section>
                    <h4 className="font-bold text-white mb-3 flex items-center gap-2">1. Organisateur</h4>
                    <p>Le Jeu Concours est organisé par Infini 24 via le site Infini24.fr.</p>
                </section>
                <section>
                    <h4 className="font-bold text-white mb-3 flex items-center gap-2">2. Prochain Concours</h4>
                    <p>Restez connectés pour découvrir les dates de notre prochain événement exclusif.</p>
                </section>
                <section>
                    <h4 className="font-bold text-white mb-3 flex items-center gap-2">3. Lot à gagner</h4>
                    <p>Le lot sera dévoilé lors du lancement du prochain concours.</p>
                </section>
                <section>
                    <h4 className="font-bold text-white mb-3 flex items-center gap-2">4. Conditions</h4>
                    <p>La participation est gratuite et sans obligation d'achat. Ouvert à toute personne majeure résidant en France. Une seule participation par foyer.</p>
                </section>
                <section className="bg-white/5 p-6 rounded-2xl border border-white/5">
                    <h4 className="font-bold text-white mb-3 flex items-center gap-2"><AlertCircle size={16} className="text-[#B48646]" /> RGPD</h4>
                    <p className="text-xs">Les informations collectées sont utilisées exclusivement pour la gestion du concours. Conformément à la loi, vous disposez d'un droit d'accès et de suppression de vos données.</p>
                </section>
            </div>
        </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-full bg-transparent relative md:overflow-hidden">
      <main className="flex-1 relative flex flex-col items-center justify-start p-4 md:p-12 pt-12 md:pt-24">
        {/* Background Decorative Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#B48646]/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-5xl w-full animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 md:pb-0">
          {/* Main Card - Reduced Size */}
          <div className="bg-slate-900/40 backdrop-blur-xl rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 text-white relative overflow-hidden shadow-xl border border-white/5 group">
              {/* Subtle Background Decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#B48646]/5 rounded-full blur-[80px] -mr-20 -mt-20"></div>
              
              <div className="relative z-10 flex flex-col items-center text-center space-y-6 md:space-y-8">
                      <div className="w-12 h-12 md:w-20 md:h-20 bg-gradient-to-br from-[#B48646] via-[#E5B066] to-[#B48646] rounded-xl md:rounded-2xl flex items-center justify-center text-white shadow-xl transform group-hover:scale-110 transition-transform duration-500 border border-white/20">
                          <Hourglass size={24} strokeWidth={2} className="md:w-10 md:h-10 animate-pulse" />
                      </div>

                  <div className="space-y-2">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B48646]/10 text-[#B48646] text-[10px] md:text-xs font-bold uppercase tracking-widest border border-[#B48646]/20">
                          Restez à l'écoute
                      </div>
                  </div>

                  <p className="text-slate-300 text-[11px] md:text-lg font-medium leading-relaxed max-w-xl">
                      Nous préparons actuellement notre prochain événement pour vous remercier de votre fidélité. Suivez-nous sur nos réseaux sociaux pour ne rien manquer du lancement !
                  </p>
                  
                      <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 w-full pt-2">
                          <a 
                              href="https://www.facebook.com/profile.php?id=61584316950503" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex-1 md:flex-none bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-lg shadow-blue-600/20 text-[10px] md:text-sm active:scale-95 border border-white/10"
                          >
                              <Facebook size={16} className="md:w-5 md:h-5" /> Facebook
                          </a>
                          <a 
                              href="https://www.instagram.com/infini24_officiel" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex-1 md:flex-none bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-lg shadow-pink-600/20 text-[10px] md:text-sm active:scale-95 border border-white/10"
                          >
                              <Instagram size={16} className="md:w-5 md:h-5" /> Instagram
                          </a>
                          <a 
                              href="https://www.linkedin.com/company/infini24" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex-1 md:flex-none bg-gradient-to-r from-blue-700 to-blue-800 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-lg shadow-blue-800/20 text-[10px] md:text-sm active:scale-95 border border-white/10"
                          >
                              <Linkedin size={16} className="md:w-5 md:h-5" /> LinkedIn
                          </a>
                      </div>
                      <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 w-full md:w-auto pt-2">
                          <button 
                              onClick={() => onNavigate && onNavigate(0)}
                              className="w-full md:w-auto bg-white/5 text-white border border-white/10 px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all text-xs md:text-sm active:scale-95 backdrop-blur-md"
                          >
                              <Home size={16} className="md:w-5 md:h-5" /> Retour à l'accueil
                          </button>
                      </div>
              </div>
          </div>

          {/* Lot Reminder Placeholder - More Subtle */}
          <div className="mt-6 md:mt-8 bg-slate-900/40 backdrop-blur-md rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-6 border border-white/5 text-center flex items-center justify-center gap-4 md:gap-6">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-[#B48646]/10 flex items-center justify-center text-[#B48646]">
                  <Gift size={16} className="md:w-5 md:h-5" />
              </div>
              <div className="text-left">
                  <h3 className="text-[10px] md:text-xs font-bold text-white uppercase tracking-wider">Créations exclusives Infini 24</h3>
                  <p className="text-slate-400 text-[9px] md:text-xs">Des lots qui sublimeront vos souvenirs les plus précieux.</p>
              </div>
          </div>
        </div>
      </main>

      {showRules && <RulesModal />}
    </div>
  );
};

export default ContestPage;
