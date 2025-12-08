
import React, { useState } from 'react';
import { Image as ImageIcon, Video, PenTool, Instagram, Facebook, ArrowRight, Sparkles } from 'lucide-react';

const RealizationsPage: React.FC = () => {
  // Pour l'instant, on laisse la liste vide.
  // Les clients seront redirigés vers vos réseaux sociaux qui sont à jour.
  const projects: any[] = [];

  return (
    <div className="flex flex-col h-full overflow-y-auto no-scrollbar bg-[#FDFCF8]">
      
      {/* Banner */}
      <header className="relative pt-16 pb-8 px-8 bg-white border-b border-slate-50 rounded-b-[3rem] mb-6 overflow-hidden shadow-[0_4px_30px_-15px_rgba(0,0,0,0.05)] shrink-0 z-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#B48646]/5 rounded-full blur-[80px] -mr-16 -mt-16 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-slate-900/5 rounded-full blur-[60px] -ml-10 -mb-10 pointer-events-none"></div>
        
        <div className="relative z-10">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B48646]/5 text-[#B48646] text-[10px] font-bold uppercase tracking-widest mb-4 border border-[#B48646]/10">
              <ImageIcon size={12} /> Portfolio
           </div>
           <h1 className="text-3xl md:text-4xl font-extrabold font-['Poppins'] text-slate-900 leading-tight mb-2">
             Nos Réalisations
           </h1>
           <p className="text-slate-500 font-medium max-w-md text-sm md:text-base">
             Découvrez nos derniers projets graphiques et montages vidéos.
           </p>
        </div>
      </header>

      {/* Social Media Redirection */}
      <div className="flex-1 px-4 lg:px-8 pb-24 max-w-7xl mx-auto w-full flex flex-col items-center justify-center">
        
        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 max-w-md w-full text-center relative overflow-hidden group">
             {/* Background Effects */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#B48646]/10 rounded-full blur-[40px] -mr-10 -mt-10 group-hover:bg-[#B48646]/20 transition-colors duration-700"></div>
             <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#F3C06B]/10 rounded-full blur-[40px] -ml-10 -mb-10 group-hover:bg-[#F3C06B]/20 transition-colors duration-700"></div>

             <div className="relative z-10">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner relative">
                    <div className="absolute top-0 right-0 bg-red-500 rounded-full p-1.5 border-2 border-white animate-pulse"></div>
                    <ImageIcon size={32} className="text-slate-400" />
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mb-3">Nos Dernières Créations</h2>
                <p className="text-slate-500 mb-8 leading-relaxed text-sm font-medium">
                    Nos projets sont publiés quotidiennement en Story et Posts. <br/>
                    <span className="text-[#B48646] font-bold">Abonnez-vous pour voir notre travail !</span>
                </p>

                <div className="space-y-4">
                    <a 
                        href="https://www.instagram.com/infini2.4/" 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white shadow-lg shadow-pink-500/20 hover:scale-[1.02] active:scale-95 transition-all group/btn"
                    >
                        <div className="flex items-center gap-3">
                            <div className="bg-white/20 p-2 rounded-xl"><Instagram size={20} /></div>
                            <span className="font-bold">Sur Instagram</span>
                        </div>
                        <ArrowRight size={20} className="opacity-70 group-hover/btn:translate-x-1 transition-transform" />
                    </a>

                    <a 
                        href="https://www.facebook.com/profile.php?id=61584316950503" 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center justify-between p-4 rounded-2xl bg-[#1877F2] text-white shadow-lg shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all group/btn"
                    >
                        <div className="flex items-center gap-3">
                            <div className="bg-white/20 p-2 rounded-xl"><Facebook size={20} /></div>
                            <span className="font-bold">Sur Facebook</span>
                        </div>
                        <ArrowRight size={20} className="opacity-70 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100">
                    <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                        <Sparkles size={12} className="text-[#B48646]" /> Votre projet ici ?
                    </div>
                    <p className="text-sm font-bold text-slate-900">Contactez-nous pour le réaliser.</p>
                </div>
             </div>
        </div>

      </div>
    </div>
  );
};

export default RealizationsPage;
