
import React, { useState } from 'react';
import { Trophy, Gift, Info, X, AlertCircle, Home, Facebook, Hourglass, Timer } from 'lucide-react';

interface ContestPageProps {
  onNavigate?: (index: number) => void;
}

const ContestPage: React.FC<ContestPageProps> = ({ onNavigate }) => {
  const [showRules, setShowRules] = useState(false);

  const RulesModal = () => (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="bg-white rounded-[2.5rem] w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col shadow-2xl">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-800">
                        <Info size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Règlement du Jeu</h3>
                </div>
                <button onClick={() => setShowRules(false)} className="p-3 bg-slate-50 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
                    <X size={20} />
                </button>
            </div>
            <div className="p-8 overflow-y-auto no-scrollbar space-y-8 text-sm leading-relaxed text-slate-600">
                <section>
                    <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">1. Organisateur</h4>
                    <p>Le Jeu Concours est organisé par Infini 24 via le site Infini24.fr.</p>
                </section>
                <section>
                    <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">2. Prochain Concours</h4>
                    <p>Restez connectés pour découvrir les dates de notre prochain événement exclusif.</p>
                </section>
                <section>
                    <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">3. Lot à gagner</h4>
                    <p>Le lot sera dévoilé lors du lancement du prochain concours.</p>
                </section>
                <section>
                    <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">4. Conditions</h4>
                    <p>La participation est gratuite et sans obligation d'achat. Ouvert à toute personne majeure résidant en France. Une seule participation par foyer.</p>
                </section>
                <section className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2"><AlertCircle size={16} className="text-[#B48646]" /> RGPD</h4>
                    <p className="text-xs">Les informations collectées sont utilisées exclusivement pour la gestion du concours. Conformément à la loi, vous disposez d'un droit d'accès et de suppression de vos données.</p>
                </section>
            </div>
        </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full overflow-y-auto no-scrollbar bg-[#FDFCF8]">
      
      {/* Banner */}
      <header className="relative pt-16 pb-12 px-8 bg-white border-b border-slate-50 rounded-b-[3rem] mb-8 overflow-hidden shadow-[0_4px_30px_-15px_rgba(0,0,0,0.05)] shrink-0 z-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] -mr-16 -mt-16 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#B48646]/5 rounded-full blur-[60px] -ml-10 -mb-10 pointer-events-none"></div>
        
        <div className="relative z-10">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest mb-4 border border-blue-100">
              <Timer size={12} /> Prochainement
           </div>
           <h1 className="text-3xl md:text-4xl font-extrabold font-['Poppins'] text-slate-900 leading-tight mb-2">
             Espace Concours
           </h1>
           <p className="text-slate-500 font-medium max-w-md text-sm md:text-base">
             De nouvelles surprises arrivent très bientôt !
           </p>
        </div>
      </header>

      <div className="flex-1 px-4 lg:px-8 pb-24 max-w-4xl mx-auto w-full">
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom duration-500">
          {/* Coming Soon Message */}
          <div className="bg-slate-900 rounded-[3rem] p-10 md:p-14 text-white relative overflow-hidden shadow-2xl border border-white/5 group">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#B48646]/20 rounded-full blur-[100px] -mr-20 -mt-20"></div>
              
              <div className="relative z-10 space-y-8 text-center md:text-left">
                  <div className="flex flex-col items-center md:items-start gap-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-[#B48646] to-[#E5B066] rounded-3xl flex items-center justify-center text-white shadow-2xl transform group-hover:rotate-6 transition-transform duration-500">
                          <Hourglass size={40} strokeWidth={1.5} className="animate-pulse" />
                      </div>
                      <div className="space-y-1">
                          <h2 className="text-2xl md:text-4xl font-black tracking-tight text-[#B48646]">
                              Un nouveau concours approche...
                          </h2>
                          <p className="text-white/60 font-black text-xl md:text-2xl tracking-widest uppercase">
                              Restez à l'écoute
                          </p>
                      </div>
                  </div>

                  <div className="space-y-6">
                      <p className="text-slate-300 text-lg md:text-xl font-medium leading-relaxed">
                          Nous préparons actuellement notre prochain événement pour vous remercier de votre fidélité. Suivez-nous sur nos réseaux sociaux pour ne rien manquer du lancement !
                      </p>
                      
                      <div className="flex flex-col md:flex-row items-center gap-4 pt-6">
                          <a 
                              href="https://www.facebook.com/profile.php?id=61584316950503" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="w-full md:w-auto bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
                          >
                              <Facebook size={20} /> Suivre sur Facebook
                          </a>
                          <button 
                              onClick={() => onNavigate && onNavigate(0)}
                              className="w-full md:w-auto bg-white/10 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-white/20 transition-all backdrop-blur-sm"
                          >
                              <Home size={20} /> Retour à l'accueil
                          </button>
                      </div>
                  </div>
              </div>
          </div>

          {/* Lot Reminder Placeholder */}
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-100 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B48646]/10 text-[#B48646] text-[10px] font-black uppercase tracking-widest mb-6">
                  <Gift size={14} /> À gagner prochainement
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Des créations exclusives Infini 24</h3>
              <p className="text-slate-500 text-sm leading-relaxed max-w-md mx-auto">
                  Nous mettons tout en œuvre pour vous proposer des lots qui sublimeront vos souvenirs les plus précieux.
              </p>
          </div>
        </div>
      </div>

      {showRules && <RulesModal />}
    </div>
  );
};

export default ContestPage;
