import React from 'react';
import { Sparkles, Calendar, Infinity } from 'lucide-react';

const RealizationsPage: React.FC = () => {
  return (
    <div className="flex flex-col h-full overflow-y-auto no-scrollbar">
      
      {/* Simplified Header */}
      <div className="pt-10 pb-6 px-6">
         <h1 className="text-3xl font-bold font-['Poppins'] text-slate-900 mb-1">Nos Réalisations</h1>
         <p className="text-slate-500 text-sm font-medium">Portfolio Agence</p>
      </div>

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