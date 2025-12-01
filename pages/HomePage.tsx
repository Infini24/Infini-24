import React from 'react';
import { ArrowRight, Video, PenTool, Info, LifeBuoy, Infinity, Sparkles, Briefcase, Check } from 'lucide-react';
import { ServiceType, User } from '../types';

interface HomePageProps {
  onNavigate: (index: number, serviceType?: ServiceType) => void;
  user?: User | null;
  onLoginClick?: () => void;
  onLogout?: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate, user, onLoginClick, onLogout }) => {
  
  return (
    <div className="flex flex-col h-full overflow-y-auto no-scrollbar bg-[#FDFCF8]">
      {/* Header / Branding - Added flex-none to prevent shrinking */}
      <header className="flex-none pt-14 pb-10 px-6 bg-white border-b border-slate-50 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] relative overflow-hidden rounded-b-[3.5rem] mb-6 z-10">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#B48646] to-[#F3C06B] rounded-full blur-[80px] opacity-15 -mr-16 -mt-16 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-slate-900 rounded-full blur-[60px] opacity-5 -ml-10 -mb-10"></div>

        <div className="relative z-10 flex flex-col items-center justify-center text-center mt-2">
           {/* Logo Representation */}
           <div className="flex items-center justify-center mb-4 relative group cursor-pointer transition-transform duration-500 hover:scale-110">
             <div className="absolute inset-0 bg-[#B48646] blur-3xl opacity-20 rounded-full group-hover:opacity-40 transition-opacity duration-500"></div>
             <Infinity size={48} strokeWidth={1.5} className="text-[#B48646] relative z-10 drop-shadow-sm transition-transform duration-700 group-hover:rotate-180" />
           </div>
           
           {/* Title */}
           <h1 className="text-4xl tracking-tighter mb-2 font-['Poppins']">
             <span className="font-bold text-slate-900">INFINI</span>
             <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#B48646] to-[#F3C06B]">24</span>
           </h1>
           <div className="inline-block px-4 py-1.5 rounded-full bg-[#B48646]/5 border border-[#B48646]/10 backdrop-blur-sm">
             <p className="text-[#B48646] text-[10px] font-bold tracking-[0.3em] uppercase">
              Créateur de souvenirs
             </p>
           </div>
        </div>
      </header>
      
      <div className="max-w-7xl mx-auto w-full pb-24 px-2 relative z-10 mt-4">
        
        {/* Intro Text */}
        <div className="text-center max-w-md mx-auto animate-in slide-in-from-bottom duration-700 mb-8 px-4">
          <h2 className="text-2xl font-medium text-slate-800 leading-tight">
            Simplifiez votre<br />
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-600">communication visuelle.</span>
          </h2>
        </div>

        {/* Banner / Carousel */}
        <section className="mt-2 px-4">
            <div 
                className="bg-gradient-to-br from-[#B48646] via-[#D49E52] to-[#F3C06B] rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center justify-between shadow-2xl shadow-[#B48646]/20 relative overflow-hidden group cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 max-w-4xl mx-auto" 
                onClick={() => onNavigate(2, ServiceType.GRAPHIC_DESIGN)}
            >
                {/* Glossy overlay */}
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay"></div>
                <div className="absolute -right-10 -top-10 w-48 h-48 bg-white/20 rounded-full blur-3xl group-hover:bg-white/30 transition-colors"></div>
                <div className="absolute -left-10 bottom-0 w-32 h-32 bg-black/5 rounded-full blur-2xl"></div>
                
                <div className="relative z-10 text-white flex-1 mb-6 md:mb-0">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/25 backdrop-blur-md text-white text-[10px] font-extrabold rounded-full mb-3 shadow-inner border border-white/20 animate-pulse">
                        <Sparkles size={10} fill="white" /> OFFRE SPÉCIALE -20%
                    </span>
                    <h3 className="font-extrabold text-3xl mb-1 leading-none tracking-tight">Pack Identité<br/>Complète</h3>
                    
                    {/* Offer Details */}
                    <div className="bg-black/10 p-3 rounded-xl mt-3 backdrop-blur-sm border border-white/10 w-fit">
                         <p className="text-[11px] text-white/90 font-medium leading-relaxed">
                            • 2 Logos (Vectoriels + Transparence)<br/>
                            • Bannières Réseaux Sociaux (FB, LinkedIn...)
                        </p>
                    </div>

                    <div className="mt-4 flex items-baseline gap-3">
                         <span className="text-white/60 line-through font-bold text-lg">300€</span>
                         <span className="text-white font-extrabold text-3xl">240€</span>
                    </div>
                </div>
                
                <button 
                    className="w-16 h-16 bg-white text-[#B48646] rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-[-45deg] transition-all duration-500 z-10 shrink-0"
                >
                    <ArrowRight size={28} />
                </button>
            </div>
        </section>

        {/* Quick Navigation Buttons - Below Special Offer */}
        <section className="mt-6 px-4 grid grid-cols-2 gap-4 max-w-4xl mx-auto w-full">
            <button
                onClick={() => onNavigate(1)}
                className="flex flex-col items-center justify-center gap-2 p-6 rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:shadow-lg hover:shadow-[#B48646]/10 hover:border-[#B48646]/30 hover:-translate-y-1 transition-all duration-300 group"
            >
                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-[#B48646] group-hover:text-white transition-colors duration-300">
                    <Briefcase size={24} />
                </div>
                <span className="font-bold text-slate-800 text-sm md:text-base group-hover:text-[#B48646] transition-colors">Nos Réalisations</span>
            </button>

            <button
                onClick={() => onNavigate(2)}
                className="flex flex-col items-center justify-center gap-2 p-6 rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:shadow-lg hover:shadow-[#B48646]/10 hover:border-[#B48646]/30 hover:-translate-y-1 transition-all duration-300 group"
            >
                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-[#B48646] group-hover:text-white transition-colors duration-300">
                    <Sparkles size={24} />
                </div>
                <span className="font-bold text-slate-800 text-sm md:text-base group-hover:text-[#B48646] transition-colors">Nos Services</span>
            </button>
        </section>

        {/* Services Blocks (Detailed View) */}
        <section className="mt-12 px-4 max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                 <div className="w-1.5 h-8 bg-gradient-to-b from-[#B48646] to-[#F3C06B] rounded-full"></div>
                 <div>
                    <h3 className="text-2xl font-bold text-slate-900">Nos Services</h3>
                    <p className="text-xs text-slate-500 font-medium">Une offre complète pour sublimer votre image</p>
                 </div>
            </div>
           
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Service 1: Graphic Design - DETAILED */}
            <div 
                onClick={() => onNavigate(2, ServiceType.GRAPHIC_DESIGN)}
                className="group bg-white p-6 rounded-[2.5rem] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.03)] border border-slate-50 hover:border-[#B48646]/20 hover:shadow-[0_20px_40px_-10px_rgba(180,134,70,0.1)] hover:-translate-y-1 transition-all duration-500 cursor-pointer flex flex-col"
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

                <ul className="space-y-3 mb-6 flex-1">
                    {[
                        "Création de Logo Unique",
                        "Refonte & Modernisation",
                        "Cartes de Visite & Flyers",
                        "Bannières Réseaux Sociaux",
                        "Chartes Graphiques"
                    ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                            <div className="w-5 h-5 rounded-full bg-[#B48646]/10 flex items-center justify-center shrink-0">
                                <Check size={10} className="text-[#B48646] stroke-[3]" />
                            </div>
                            {item}
                        </li>
                    ))}
                </ul>

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
                    <span className="text-xs font-bold text-slate-400">À partir de 80€</span>
                    <div className="flex items-center gap-2 text-sm font-bold text-[#B48646] group-hover:translate-x-1 transition-transform">
                        Configurer <ArrowRight size={16} />
                    </div>
                </div>
            </div>

            {/* Service 2: Video & Photo - DETAILED */}
            <div 
                onClick={() => onNavigate(2, ServiceType.VIDEO)}
                className="group bg-white p-6 rounded-[2.5rem] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.03)] border border-slate-50 hover:border-[#B48646]/20 hover:shadow-[0_20px_40px_-10px_rgba(180,134,70,0.1)] hover:-translate-y-1 transition-all duration-500 cursor-pointer flex flex-col"
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

                <ul className="space-y-3 mb-6 flex-1">
                    {[
                        "Montage Vidéo Promotionnel",
                        "Diaporama Anniversaire / Retraite",
                        "Diaporama Mariage / Baptême",
                        "Hommage & Obsèques",
                        "Numérisation de vos vidéos VHS",
                        "Retouche Colorimétrique"
                    ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                             <div className="w-5 h-5 rounded-full bg-[#B48646]/10 flex items-center justify-center shrink-0">
                                <Check size={10} className="text-[#B48646] stroke-[3]" />
                            </div>
                            {item}
                        </li>
                    ))}
                </ul>

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
                    <span className="text-xs font-bold text-slate-400">Sur mesure</span>
                    <div className="flex items-center gap-2 text-sm font-bold text-[#B48646] group-hover:translate-x-1 transition-transform">
                        Créer <ArrowRight size={16} />
                    </div>
                </div>
            </div>

            {/* Service 3: Assistance - DETAILED */}
            <div 
                onClick={() => onNavigate(2, ServiceType.ASSISTANCE)}
                className="group bg-white p-6 rounded-[2.5rem] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.03)] border border-slate-50 hover:border-[#B48646]/20 hover:shadow-[0_20px_40px_-10px_rgba(180,134,70,0.1)] hover:-translate-y-1 transition-all duration-500 cursor-pointer flex flex-col"
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

                <ul className="space-y-3 mb-6 flex-1">
                    {[
                        "Retouches Photos Express",
                        "Détourage d'images",
                        "Modifications de Textes",
                        "Aide Mise en Page",
                        "Conversion de fichiers"
                    ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                             <div className="w-5 h-5 rounded-full bg-[#B48646]/10 flex items-center justify-center shrink-0">
                                <Check size={10} className="text-[#B48646] stroke-[3]" />
                            </div>
                            {item}
                        </li>
                    ))}
                </ul>

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
                    <span className="text-xs font-bold text-slate-400">Dès 50€</span>
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