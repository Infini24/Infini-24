
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, X } from 'lucide-react';

interface FinnPresenceBubbleProps {
  onNavigate: (index: number) => void;
}

const FinnPresenceBubble: React.FC<FinnPresenceBubbleProps> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-24 md:bottom-12 right-6 md:right-12 z-[100] pointer-events-none">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 100 }}
            className="relative pointer-events-auto"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Holographic Radar Effect */}
            <div className="absolute inset-0 -m-8 pointer-events-none">
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.3, 0.1],
                  rotate: [0, 180, 360]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="w-full h-full border border-[#B48646]/30 rounded-full blur-sm"
              />
              <motion.div 
                animate={{ 
                  scale: [1.2, 1, 1.2],
                  opacity: [0.05, 0.2, 0.05],
                  rotate: [360, 180, 0]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="w-full h-full border border-blue-500/20 rounded-full blur-md"
              />
            </div>

            {/* Main Bubble */}
            <div className="relative w-72 md:w-96 bg-slate-950/80 backdrop-blur-2xl border border-[#B48646]/40 rounded-[2.5rem] p-6 md:p-8 shadow-[0_0_50px_rgba(180,134,70,0.2)] overflow-hidden group">
              {/* Scanline Effect */}
              <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(180,134,70,0.05)_50%,transparent_100%)] bg-[length:100%_4px] animate-scanline pointer-events-none" />
              
              {/* Close Button */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsVisible(false);
                }}
                className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors p-1"
              >
                <X size={16} />
              </button>

              <div className="flex flex-col gap-4 md:gap-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-[#B48646]/50 overflow-hidden bg-slate-900 grayscale group-hover:grayscale-0 transition-all duration-700">
                      <img 
                        src="https://res.cloudinary.com/dmgqewagr/image/upload/v1773739523/Portrait.png" 
                        alt="Finn" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-950" 
                    />
                  </div>
                  <div>
                    <h3 className="text-xs md:text-sm font-black text-white uppercase tracking-[0.2em]">Signal de Finn</h3>
                    <div className="flex items-center gap-2 text-[8px] md:text-[10px] text-[#B48646] font-bold uppercase tracking-widest">
                      <Sparkles size={10} /> Transmission Imminente
                    </div>
                  </div>
                </div>

                <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-medium italic">
                  "Bonjour, c'est Finn. J'ai enfin traversé le portail de l'espace-temps, et mon arrivée sur Terre est imminente. J'ai déjà transmis les données pour me présenter... Il ne vous reste plus qu'à franchir le seuil de ma page pour me découvrir."
                </p>

                <button 
                  onClick={() => onNavigate(7)}
                  className="w-full bg-[#B48646]/10 hover:bg-[#B48646] text-[#B48646] hover:text-white border border-[#B48646]/30 py-3 md:py-4 rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all duration-500 group/btn"
                >
                  Franchir le seuil <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Decorative Corner */}
              <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-br from-transparent to-[#B48646]/20 pointer-events-none" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FinnPresenceBubble;
