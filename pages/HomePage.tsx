
import React from 'react';
import { ArrowRight, Video, PenTool, Info, LifeBuoy, Infinity as InfinityIcon, Sparkles, Briefcase, Share2, Users, Shield, Scale, Mail, Facebook } from 'lucide-react';
import { ServiceType } from '../types';

interface HomePageProps {
  onNavigate: (index: number, serviceType?: ServiceType) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  
  return (
    <div className="flex flex-col min-h-full bg-[#FDFCF8] relative md:overflow-hidden">
      <main className="flex-1 relative">
        {/* Background Decorative Elements */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#B48646]/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 md:px-12 flex flex-col md:grid md:grid-cols-12 md:gap-12 items-center py-8 md:py-16">
          
          {/* Left Column: Hero Content */}
          <div className="col-span-12 md:col-span-6 text-center md:text-left animate-in fade-in slide-in-from-left duration-700 mb-8 md:mb-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B48646]/10 text-[#B48646] text-[9px] md:text-[10px] font-bold uppercase tracking-widest mb-4 md:mb-6 border border-[#B48646]/10">
              <Sparkles size={10} className="md:w-3 md:h-3" /> Excellence Digitale
            </div>
            <h2 className="text-2xl md:text-6xl font-bold text-slate-900 leading-[1.2] md:leading-[1.1] mb-4 md:mb-6">
              Sublimez votre<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B48646] to-[#E5B066]">image de marque.</span>
            </h2>
            <p className="text-slate-500 text-xs md:text-lg font-medium mb-6 md:mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed">
              Infini 24 transforme vos idées en réalités visuelles percutantes. Design graphique, montage vidéo et assistance premium.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 justify-center md:justify-start">
              <button 
                onClick={() => onNavigate(2)}
                className="w-full sm:w-auto bg-slate-900 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold flex items-center justify-center gap-2 md:gap-3 hover:bg-[#B48646] hover:-translate-y-1 transition-all shadow-lg md:shadow-xl shadow-slate-900/10 text-sm"
              >
                Découvrir nos services <ArrowRight size={16} />
              </button>
              <button 
                onClick={() => onNavigate(1)}
                className="w-full sm:w-auto bg-white text-slate-900 border border-slate-200 px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold flex items-center justify-center gap-2 md:gap-3 hover:bg-slate-50 transition-all text-sm"
              >
                Nos réalisations
              </button>
            </div>
          </div>

          {/* Right Column: Services & About Grid */}
          <div className="col-span-12 md:col-span-6 w-full animate-in fade-in slide-in-from-right duration-700 delay-200 pb-20 md:pb-0">
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {/* Service Card 1 */}
              <div 
                onClick={() => onNavigate(2, ServiceType.GRAPHIC_DESIGN)}
                className="group bg-white p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] shadow-sm border border-slate-100 hover:border-[#B48646]/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-slate-50 flex items-center justify-center mb-3 md:mb-4 group-hover:bg-[#B48646] group-hover:text-white transition-colors">
                  <PenTool size={20} className="md:w-6 md:h-6" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm md:text-lg mb-0.5 md:mb-1">Design</h4>
                <p className="text-[10px] md:text-xs text-slate-400">Logos & Identité</p>
              </div>

              {/* Service Card 2 */}
              <div 
                onClick={() => onNavigate(2, ServiceType.VIDEO)}
                className="group bg-white p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] shadow-sm border border-slate-100 hover:border-[#B48646]/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-slate-50 flex items-center justify-center mb-3 md:mb-4 group-hover:bg-[#B48646] group-hover:text-white transition-colors">
                  <Video size={20} className="md:w-6 md:h-6" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm md:text-lg mb-0.5 md:mb-1">Vidéo</h4>
                <p className="text-[10px] md:text-xs text-slate-400">Montage & Souvenirs</p>
              </div>

              {/* About Card - Spans 2 columns */}
              <div className="col-span-2 bg-slate-900 p-5 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#B48646] rounded-full blur-[60px] opacity-20 -mr-8 -mt-8"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3 md:mb-4">
                    <div className="p-2 bg-white/10 rounded-lg md:rounded-xl text-[#F3C06B]">
                      <Info size={16} className="md:w-5 md:h-5" />
                    </div>
                    <h3 className="font-bold text-sm md:text-lg">L'esprit Infini 24</h3>
                  </div>
                  <p className="text-[11px] md:text-sm text-slate-400 leading-relaxed mb-4 md:mb-6 font-light">
                    Votre partenaire digital de proximité. Créativité artistique et rapidité d'exécution pour des supports visuels impactants.
                  </p>
                  <div className="flex gap-2">
                    <span className="px-3 md:px-4 py-1.5 md:py-2 bg-white/5 rounded-lg md:rounded-xl text-[9px] md:text-[10px] font-bold border border-white/5">⚡ Rapide</span>
                    <span className="px-3 md:px-4 py-1.5 md:py-2 bg-white/5 rounded-lg md:rounded-xl text-[9px] md:text-[10px] font-bold border border-white/5">💎 Premium</span>
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
