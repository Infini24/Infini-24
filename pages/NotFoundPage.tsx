import React from 'react';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

const NotFoundPage: React.FC<{ onNavigate: (index: number) => void }> = ({ onNavigate }) => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
            {/* Background Vibe */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#B48646]/10 rounded-full blur-[120px] opacity-30" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 max-w-2xl"
            >
                {/* Finn in his ship image */}
                <div className="mb-8 relative group">
                    <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-3xl group-hover:bg-[#B48646]/20 transition-colors duration-500" />
                    <img 
                        src="https://res.cloudinary.com/dmgqewagr/image/upload/v1773739523/Portrait.png" 
                        alt="Finn" 
                        className="w-48 h-48 md:w-64 md:h-64 mx-auto object-contain grayscale brightness-110 drop-shadow-[0_0_30px_rgba(180,134,70,0.3)]"
                        referrerPolicy="no-referrer"
                    />
                </div>

                <h1 className="text-6xl md:text-8xl font-black text-white mb-4 tracking-tighter">404</h1>
                <div className="bg-[#B48646]/10 border border-[#B48646]/30 p-6 rounded-3xl backdrop-blur-md mb-8">
                    <p className="text-[#B48646] font-mono text-sm md:text-lg mb-2 uppercase tracking-widest">
                        [ERREUR_DE_COORDONNÉES_TEMPORELLES]
                    </p>
                    <p className="text-slate-300 text-lg md:text-xl font-medium leading-relaxed">
                        "Vous avez dérivé trop loin dans le flux, voyageur. Laissez-moi recalibrer vos capteurs et vous ramener à l'accueil."
                    </p>
                </div>

                <button 
                    onClick={() => onNavigate(0)}
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-[#B48646] to-[#E5B066] text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-all shadow-xl shadow-[#B48646]/20 group"
                >
                    <Home size={20} />
                    Retourner à la base
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                </button>
            </motion.div>

            {/* Technical details footer */}
            <div className="absolute bottom-8 left-0 right-0 text-center">
                <p className="text-[10px] text-slate-600 uppercase tracking-[0.5em] font-black">
                    Finn Navigation System v2.4 // Sector_Unknown
                </p>
            </div>
        </div>
    );
};

export default NotFoundPage;
