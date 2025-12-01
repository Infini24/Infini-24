import React from 'react';
import { Sparkles, Calendar, Infinity } from 'lucide-react';

const RealizationsPage: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-[#FDFCF8] overflow-y-auto no-scrollbar">
      
      {/* Header Uniforme with extra top padding - Added flex-none and responsive text size */}
      <header className="flex-none pt-14 pb-10 px-6 bg-white border-b border-slate-50 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] relative overflow-hidden rounded-b-[3.5rem] mb-6 z-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#B48646] to-[#F3C06B] rounded-full blur-[80px] opacity-15 -mr-16 -mt-16 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-slate-900 rounded-full blur-[60px] opacity-5 -ml-10 -mb-10"></div>

            <div className="relative z-10 flex flex-col items-center justify-center text-center mt-2">
                <div className="flex items-center justify-center mb-4 relative group cursor-pointer transition-transform duration-500 hover:scale-110">
                     <div className="absolute inset-0 bg-[#B48646] blur-3xl opacity-20 rounded-full group-hover:opacity-40 transition-opacity duration-500"></div>
                     <Infinity size={48} strokeWidth={1.5} className="text-[#B48646] relative z-10 drop-shadow-sm transition-transform duration-700 group-hover:rotate-180" />
                </div>
                
                <h1 className="text-3xl md:text-4xl tracking-tighter mb-2 font-['Poppins'] font-bold text-slate-900">
                    Nos Réalisations
                </h1>
                
                <div className="inline-block px-4 py-1.5 rounded-full bg-[#B48646]/5 border border-[#B48646]/10 backdrop-blur-sm">
                     <p className="text-[#B48646] text-[10px] font-bold tracking-[0.3em] uppercase">
                        Portfolio Agence
                     </p>
                </div>
            </div>
        </header>

      <div className="flex-1 px-6 relative z-20 pb-20 flex flex-col items-center justify-start">
        
        {/* Coming Soon Card */}
        <div className="w-full max-w-md bg-white rounded-[3rem] p-10 shadow-2xl shadow-[#B48646]/10 border border-slate-50 text-center relative overflow-hidden group mt-4 animate-in slide-in-from-bottom duration-500">
            
            {/* Background decorations */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#B48646] to-[#F3C06B]"></div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#F3C06B] blur-[50px] opacity-20 rounded-full"></div>
            
            <div className="relative z-10 flex flex-col items-center">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 shadow-inner relative group-hover:scale-110 transition-transform duration-500">
                    <Sparkles size={32} className="text-[#B48646] animate-pulse" />
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mb-2 font-['Poppins']">Ouverture de la Galerie</h2>
                
                <div className="flex items-center gap-2 bg-[#B48646]/10 px-4 py-2 rounded-xl text-[#B48646] font-bold text-sm mb-6 border border-[#B48646]/20">
                    <Calendar size={16} /> 24 Décembre
                </div>

                <p className="text-slate-500 text-sm leading-relaxed mb-8">
                    Nous préparons une sélection exclusive de nos plus beaux projets pour le lancement officiel. 
                </p>

                <div className="w-full bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-2">
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">En attendant</p>
                    <p className="text-sm font-bold text-slate-800">Soyez le premier à apparaître ici !</p>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default RealizationsPage;