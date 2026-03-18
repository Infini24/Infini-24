
import React from 'react';
import { ArrowRight, Video, PenTool, Info, LifeBuoy, Infinity as InfinityIcon, Sparkles, Briefcase, Share2, Users, Shield, Scale, Mail, Facebook } from 'lucide-react';
import { ServiceType } from '../types';

interface HomePageProps {
  onNavigate: (index: number, serviceType?: ServiceType) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  
  return (
    <div className="flex flex-col min-h-full bg-transparent relative md:h-[calc(100vh-100px)] md:overflow-hidden">
      <main className="flex-1 relative flex items-center">
        {/* Background Decorative Elements */}
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-[#B48646]/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-[1600px] mx-auto px-4 md:px-12 w-full flex flex-col md:grid md:grid-cols-12 md:gap-16 items-center py-12 md:py-0">
          
          {/* Left Column: Hero Content */}
          <div className="col-span-12 md:col-span-7 text-center md:text-left animate-in fade-in slide-in-from-left duration-700 mb-12 md:mb-0">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#B48646]/10 text-[#B48646] text-[10px] md:text-xs font-black uppercase tracking-[0.2em] mb-6 md:mb-10 border border-[#B48646]/20">
              <Sparkles size={12} className="md:w-4 md:h-4" /> Excellence Digitale
            </div>
            <h2 className="text-5xl md:text-[110px] font-black text-white leading-[0.95] md:leading-[0.9] mb-8 md:mb-12 tracking-tighter">
              Sublimez votre<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B48646] via-[#E5B066] to-[#B48646]">image de marque.</span>
            </h2>
            <p className="text-slate-300 text-lg md:text-3xl font-medium mb-10 md:mb-16 max-w-3xl mx-auto md:mx-0 leading-relaxed opacity-90">
              Infini 24 transforme vos idées en réalités visuelles percutantes. Design graphique, montage vidéo et assistance premium.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-5 md:gap-8 justify-center md:justify-start">
              <button 
                onClick={() => onNavigate(2)}
                className="w-full sm:w-auto bg-gradient-to-r from-[#B48646] via-[#E5B066] to-[#B48646] text-white px-10 md:px-16 py-5 md:py-8 rounded-2xl md:rounded-[2.5rem] font-black flex items-center justify-center gap-4 md:gap-6 hover:scale-105 hover:shadow-[#B48646]/40 transition-all shadow-2xl shadow-[#B48646]/30 text-lg md:text-2xl border border-white/20 aura-24-hover"
              >
                Découvrir nos services <ArrowRight size={28} />
              </button>
              <button 
                onClick={() => onNavigate(1)}
                className="w-full sm:w-auto bg-white/5 text-white border border-white/10 px-10 md:px-16 py-5 md:py-8 rounded-2xl md:rounded-[2.5rem] font-black flex items-center justify-center gap-4 md:gap-6 hover:border-[#B48646]/50 hover:text-[#B48646] hover:bg-[#B48646]/5 transition-all text-lg md:text-2xl backdrop-blur-md"
              >
                Nos réalisations
              </button>
            </div>
          </div>

          {/* Right Column: Services & About Grid */}
          <div className="col-span-12 md:col-span-5 w-full animate-in fade-in slide-in-from-right duration-700 delay-200 pb-20 md:pb-0">
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {/* Service Card 1 */}
              <div 
                onClick={() => onNavigate(2, ServiceType.GRAPHIC_DESIGN)}
                className="group bg-slate-900/40 backdrop-blur-md p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] shadow-sm border border-white/5 hover:border-[#B48646]/30 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer"
              >
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-3xl bg-white/5 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-[#B48646] group-hover:text-white transition-all duration-500">
                  <PenTool size={24} className="md:w-8 md:h-8" />
                </div>
                <h4 className="font-black text-white text-base md:text-2xl mb-1 md:mb-2 tracking-tight">Design</h4>
                <p className="text-[11px] md:text-sm text-slate-400 font-bold uppercase tracking-widest">Logos & Identité</p>
              </div>

              {/* Service Card 2 */}
              <div 
                onClick={() => onNavigate(2, ServiceType.VIDEO)}
                className="group bg-slate-900/40 backdrop-blur-md p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] shadow-sm border border-white/5 hover:border-[#B48646]/30 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer"
              >
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-3xl bg-white/5 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-[#B48646] group-hover:text-white transition-all duration-500">
                  <Video size={24} className="md:w-8 md:h-8" />
                </div>
                <h4 className="font-black text-white text-base md:text-2xl mb-1 md:mb-2 tracking-tight">Vidéo</h4>
                <p className="text-[11px] md:text-sm text-slate-400 font-bold uppercase tracking-widest">Montage & Souvenirs</p>
              </div>

              {/* About Card - Spans 2 columns */}
              <div className="col-span-2 bg-slate-900/60 backdrop-blur-lg p-8 md:p-12 rounded-[2.5rem] md:rounded-[4rem] text-white relative overflow-hidden group border border-white/5 shadow-2xl">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#B48646] rounded-full blur-[80px] opacity-20 -mr-12 -mt-12"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4 md:mb-8">
                    <div className="p-2.5 bg-white/10 rounded-xl md:rounded-2xl text-[#F3C06B]">
                      <Info size={20} className="md:w-7 md:h-7" />
                    </div>
                    <h3 className="font-black text-base md:text-2xl tracking-tight">L'esprit Infini 24</h3>
                  </div>
                  <p className="text-xs md:text-lg text-slate-300 leading-relaxed mb-6 md:mb-10 font-medium opacity-80">
                    Votre partenaire digital de proximité. Créativité artistique et rapidité d'exécution pour des supports visuels impactants.
                  </p>
                  <div className="flex gap-3">
                    <span className="px-4 md:px-6 py-2 md:py-3 bg-white/5 rounded-xl md:rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-widest border border-white/10 text-[#B48646]">⚡ Rapide</span>
                    <span className="px-4 md:px-6 py-2 md:py-3 bg-white/5 rounded-xl md:rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-widest border border-white/10 text-[#B48646]">💎 Premium</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
