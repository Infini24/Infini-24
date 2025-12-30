
import React from 'react';
import { ArrowRight, Video, PenTool, Info, LifeBuoy, Infinity as InfinityIcon, Sparkles, Briefcase, Check, Gift, Snowflake } from 'lucide-react';
import { ServiceType } from '../types';

interface HomePageProps {
  onNavigate: (index: number, serviceType?: ServiceType) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  
  return (
    <div className="flex flex-col h-full overflow-y-auto no-scrollbar bg-[#FDFCF8]">
      {/* Header / Branding */}
      <header className="flex-none pt-14 pb-8 px-6 bg-white border-b border-slate-50/50 shadow-[0_4px_30px_-15px_rgba(0,0,0,0.02)] relative mb-6 z-10 rounded-b-[3rem]">
        <div className="relative z-10 flex flex-col items-center justify-center text-center mt-2">
           <div className="mb-3 text-[#B48646] hover:scale-110 transition-transform duration-500 cursor-default">
             <InfinityIcon size={52} strokeWidth={1.5} />
           </div>
           
           <h1 className="text-4xl tracking-tight mb-1 font-['Poppins']">
             <span className="font-bold text-slate-900">INFINI</span>
             <span className="font-bold text-[#B48646]">24</span>
           </h1>
           
           <p className="text-slate-400 text-[10px] font-bold tracking-[0.4em] uppercase mt-1">
              Créateur de souvenirs
           </p>
        </div>
      </header>
      
      <div className="max-w-7xl mx-auto w-full pb-24 px-2 relative z-10 mt-2">
        
        {/* PROMO NOEL SECTION */}
        <section className="mt-2 px-4 mb-8">
            <div 
                className="bg-gradient-to-br from-red-700 via-red-800 to-slate-900 rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center justify-between shadow-2xl shadow-red-900/20 relative overflow-hidden group cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 max-w-4xl mx-auto border border-red-600/30" 
                onClick={() => onNavigate(2)}
            >
                {/* Background Effects */}
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white rounded-full blur-[120px] opacity-10 pointer-events-none"></div>
                <div className="absolute top-4 right-8 text-white/10 group-hover:rotate-12 transition-transform duration-1000">
                    <Snowflake size={120} />
                </div>
                <div className="absolute bottom-4 left-4 text-white/5">
                    <Gift size={80} />
                </div>
                
                <div className="relative z-10 flex-1 w-full md:w-auto mb-6 md:mb-0">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white text-red-700 text-[10px] font-black rounded-full shadow-lg animate-pulse">
                            <Sparkles size={10} fill="currentColor" /> OFFRE DE NOËL
                        </span>
                        <span className="text-[10px] font-bold text-red-200 uppercase tracking-wider">Limité au 11 Janvier</span>
                    </div>

                    <h3 className="font-extrabold text-white text-3xl md:text-5xl mb-4 leading-tight">
                        Fêtez 2026 avec <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500">-50% SUR TOUT !</span>
                    </h3>
                    
                    <p className="text-red-100/80 text-sm mb-6 max-w-sm font-medium">
                        C'est notre cadeau : profitez de la moitié du prix sur l'ensemble de nos services graphiques et vidéos.
                    </p>

                    <div className="flex items-center gap-4">
                         <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
                            <span className="text-white text-xs font-bold">Valable sur TOUS les services</span>
                         </div>
                    </div>
                </div>
                
                {/* CTA Button */}
                <div className="relative z-10 md:pl-8 flex justify-end md:block">
                    <button 
                        className="w-20 h-20 bg-white hover:bg-yellow-400 text-red-700 rounded-3xl flex flex-col items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3"
                    >
                        <span className="text-2xl font-black">-50%</span>
                        <ArrowRight size={20} strokeWidth={3} />
                    </button>
                </div>
            </div>
        </section>

        {/* Intro Text */}
        <div className="text-center max-w-md mx-auto animate-in slide-in-from-bottom duration-500 mb-8 px-4">
          <h2 className="text-2xl font-medium text-slate-800 leading-tight">
            Simplifiez votre<br />
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-600">communication visuelle.</span>
          </h2>
        </div>

        {/* Quick Navigation Buttons */}
        <section className="mt-6 px-4 grid grid-cols-2 gap-4 max-w-4xl mx-auto w-full">
            <button
                onClick={() => onNavigate(1)}
                className="flex flex-col items-center justify-center gap-2 p-6 rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:shadow-lg hover:shadow-[#B48646]/10 hover:border-[#B48646]/30 hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 group"
            >
                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-[#B48646] group-hover:text-white transition-colors duration-300">
                    <Briefcase size={24} />
                </div>
                <span className="font-bold text-slate-800 text-sm md:text-base group-hover:text-[#B48646] transition-colors">Nos Réalisations</span>
            </button>

            <button
                onClick={() => onNavigate(2)}
                className="flex flex-col items-center justify-center gap-2 p-6 rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:shadow-lg hover:shadow-[#B48646]/10 hover:border-[#B48646]/30 hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 group"
            >
                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-[#B48646] group-hover:text-white transition-colors duration-300">
                    <Sparkles size={24} />
                </div>
                <span className="font-bold text-slate-800 text-sm md:text-base group-hover:text-[#B48646] transition-colors">Nos Services</span>
            </button>
        </section>

        {/* Services Blocks */}
        <section className="mt-12 px-4 max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                 <div className="w-1.5 h-8 bg-gradient-to-b from-[#B48646] to-[#F3C06B] rounded-full"></div>
                 <div>
                    <h3 className="text-2xl font-bold text-slate-900">Nos Services</h3>
                    <p className="text-xs text-slate-500 font-medium">Une offre complète pour sublimer votre image</p>
                 </div>
            </div>
           
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-bottom duration-500 delay-100">
            
            {/* Service 1: Graphic Design */}
            <div 
                onClick={() => onNavigate(2, ServiceType.GRAPHIC_DESIGN)}
                className="group bg-white p-6 rounded-[2.5rem] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.03)] border border-slate-50 hover:border-[#B48646]/20 hover:shadow-[0_20px_40px_-10px_rgba(180,134,70,0.1)] hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 cursor-pointer flex flex-col"
            >
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-slate-50 rounded-[1.2rem] flex items-center justify-center shadow-inner group-hover:bg-slate-900 transition-colors duration-500 shrink-0">
                         <PenTool size={28} className="text-slate-700 group-hover:text-[#F3C06B] transition-colors" />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 text-lg group-hover:text-[#B48646] transition-colors">Logo & Design</h4>
                        <span className="text-[10px] bg-[#B48646]/10 text-[#B48646] px-2 py-0.5 rounded-lg font-bold">Identité Visuelle</span>
                    </div>
                </div>

                <div className="mb-6 flex-1 px-2">
                     <p className="text-2xl font-bold text-slate-900 leading-none mb-1">
                        Sublimez <br/><span className="text-[#B48646]">votre image.</span>
                     </p>
                </div>

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-red-500 font-bold flex items-center gap-1"><Gift size={10} /> Promo Noël</span>
                        <div className="flex items-center gap-1">
                            <span className="text-xs font-bold text-slate-300 line-through">50€</span>
                            <span className="text-sm font-black text-red-600">25€</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-bold text-[#B48646] group-hover:translate-x-1 transition-transform">
                        Configurer <ArrowRight size={16} />
                    </div>
                </div>
            </div>

            {/* Service 2: Video & Photo */}
            <div 
                onClick={() => onNavigate(2, ServiceType.VIDEO)}
                className="group bg-white p-6 rounded-[2.5rem] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.03)] border border-slate-50 hover:border-[#B48646]/20 hover:shadow-[0_20px_40px_-10px_rgba(180,134,70,0.1)] hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 cursor-pointer flex flex-col"
            >
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-slate-50 rounded-[1.2rem] flex items-center justify-center shadow-inner group-hover:bg-slate-900 transition-colors duration-500 shrink-0">
                         <Video size={28} className="text-slate-700 group-hover:text-[#F3C06B] transition-colors" />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 text-lg group-hover:text-[#B48646] transition-colors">Vidéo & Souvenir</h4>
                        <span className="text-[10px] bg-[#B48646]/10 text-[#B48646] px-2 py-0.5 rounded-lg font-bold">Montage Pro</span>
                    </div>
                </div>

                 <div className="mb-6 flex-1 px-2">
                     <p className="text-2xl font-bold text-slate-900 leading-none mb-1">
                        Éternisez <br/><span className="text-[#B48646]">vos émotions.</span>
                     </p>
                </div>

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-red-500 font-bold flex items-center gap-1"><Gift size={10} /> Promo Noël</span>
                        <div className="flex items-center gap-1">
                            <span className="text-xs font-bold text-slate-300 line-through">20€</span>
                            <span className="text-sm font-black text-red-600">10€</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-bold text-[#B48646] group-hover:translate-x-1 transition-transform">
                        Créer <ArrowRight size={16} />
                    </div>
                </div>
            </div>

            {/* Service 3: Assistance */}
            <div 
                onClick={() => onNavigate(2, ServiceType.ASSISTANCE)}
                className="group bg-white p-6 rounded-[2.5rem] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.03)] border border-slate-50 hover:border-[#B48646]/20 hover:shadow-[0_20px_40px_-10px_rgba(180,134,70,0.1)] hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 cursor-pointer flex flex-col"
            >
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-slate-50 rounded-[1.2rem] flex items-center justify-center shadow-inner group-hover:bg-slate-900 transition-colors duration-500 shrink-0">
                         <LifeBuoy size={28} className="text-slate-700 group-hover:text-[#F3C06B] transition-colors" />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 text-lg group-hover:text-[#B48646] transition-colors">Assistance</h4>
                        <span className="text-[10px] bg-[#B48646]/10 text-[#B48646] px-2 py-0.5 rounded-lg font-bold">Support Rapide</span>
                    </div>
                </div>

                 <div className="mb-6 flex-1 px-2">
                     <p className="text-2xl font-bold text-slate-900 leading-none mb-1">
                        Un expert <br/><span className="text-[#B48646]">à vos côtés.</span>
                     </p>
                </div>

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-red-500 font-bold flex items-center gap-1"><Gift size={10} /> Promo Noël</span>
                        <div className="flex items-center gap-1">
                            <span className="text-xs font-bold text-slate-300 line-through">5€</span>
                            <span className="text-sm font-black text-red-600">2.50€</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-bold text-[#B48646] group-hover:translate-x-1 transition-transform">
                        Demander <ArrowRight size={16} />
                    </div>
                </div>
            </div>

            </div>
        </section>

        {/* About Us */}
        <section className="mt-12 mb-8 px-4">
            <div className="bg-slate-900 text-slate-300 p-8 rounded-[3rem] relative overflow-hidden shadow-2xl border-t border-slate-800">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#B48646] rounded-full blur-[100px] opacity-20 -mr-10 -mt-10 animate-pulse"></div>
            
            <div className="flex items-center gap-4 mb-6 text-white relative z-10">
                <div className="p-3 bg-[#B48646]/20 rounded-2xl text-[#F3C06B] border border-[#B48646]/20">
                    <Info size={28} />
                </div>
                <h3 className="text-2xl font-bold font-['Poppins']">Qui sommes-nous ?</h3>
            </div>
            <p className="text-sm leading-relaxed mb-8 font-light relative z-10 text-slate-300">
                Infini 24 est votre partenaire digital de proximité. Nous combinons créativité artistique et rapidité d'exécution pour fournir des supports visuels impactants.
            </p>
            <div className="flex gap-3 text-xs font-bold text-white flex-wrap relative z-10">
                <span className="px-5 py-3 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-default">⚡ Rapide</span>
                <span className="px-5 py-3 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-default">💎 Premium</span>
                <span className="px-5 py-3 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-default">🤝 Humain</span>
            </div>
            </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
