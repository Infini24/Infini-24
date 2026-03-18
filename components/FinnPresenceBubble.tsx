
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, X } from 'lucide-react';

interface FinnPresenceBubbleProps {
  onNavigate: (index: number) => void;
}

const FinnPresenceBubble: React.FC<FinnPresenceBubbleProps> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-24 md:bottom-6 right-4 md:right-6 z-[100] pointer-events-none">
      <AnimatePresence>
        {isVisible && (
          <div className="relative flex flex-col items-end gap-4">
            {/* Expanded Message Card */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, x: 20, y: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, x: 20, y: 20 }}
                  className="relative w-72 md:w-96 bg-slate-950/90 backdrop-blur-2xl border border-[#B48646]/40 rounded-[2.5rem] p-6 md:p-8 shadow-[0_0_50px_rgba(180,134,70,0.3)] overflow-hidden pointer-events-auto mb-4"
                >
                  {/* Scanline Effect */}
                  <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(180,134,70,0.05)_50%,transparent_100%)] bg-[length:100%_4px] animate-scanline pointer-events-none" />
                  
                  {/* Close Button (to minimize) */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsExpanded(false);
                    }}
                    className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors p-1"
                  >
                    <X size={16} />
                  </button>

                  <div className="flex flex-col gap-4 md:gap-6">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full border-2 border-[#B48646]/50 overflow-hidden bg-slate-900">
                          <img 
                            src="https://res.cloudinary.com/dmgqewagr/image/upload/v1773739523/Portrait.png" 
                            alt="Finn" 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-950" />
                      </div>
                      <div>
                        <h3 className="text-[10px] md:text-xs font-black text-white uppercase tracking-[0.2em]">Signal de Finn</h3>
                        <div className="flex items-center gap-2 text-[7px] md:text-[9px] text-[#B48646] font-bold uppercase tracking-widest">
                          <Sparkles size={8} /> Transmission Imminente
                        </div>
                      </div>
                    </div>

                    <p className="text-[11px] md:text-sm text-slate-300 leading-relaxed font-medium italic">
                      "Bonjour, c'est Finn. J'ai enfin traversé le portail de l'espace-temps, et mon arrivée sur Terre est imminente. J'ai déjà transmis les données pour me présenter... Il ne vous reste plus qu'à franchir le seuil de ma page pour me découvrir."
                    </p>

                    <button 
                      onClick={() => onNavigate(7)}
                      className="w-full bg-[#B48646]/10 hover:bg-[#B48646] text-[#B48646] hover:text-white border border-[#B48646]/30 py-3 md:py-4 rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all duration-500 group/btn"
                    >
                      Franchir le seuil <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Minimized Trigger Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative pointer-events-auto cursor-pointer group"
              onClick={() => setIsExpanded(!isExpanded)}
              onMouseEnter={() => !isExpanded && setIsExpanded(true)}
            >
              {/* Holographic Radar Effect */}
              <div className="absolute inset-0 -m-4 pointer-events-none">
                <motion.div 
                  animate={{ 
                    scale: [1, 1.4, 1],
                    opacity: [0.1, 0.4, 0.1],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-full h-full border border-[#B48646]/40 rounded-full blur-sm"
                />
                <motion.div 
                  animate={{ 
                    scale: [1.4, 1, 1.4],
                    opacity: [0.05, 0.2, 0.05],
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="w-full h-full border border-blue-500/30 rounded-full blur-md"
                />
              </div>

              {/* Portrait Bubble */}
              <div className="relative w-16 h-16 md:w-20 md:h-20 bg-slate-950/80 backdrop-blur-xl border-2 border-[#B48646]/60 rounded-full p-1 shadow-[0_0_30px_rgba(180,134,70,0.4)] overflow-hidden transition-transform duration-500 group-hover:scale-110 group-hover:border-[#B48646]">
                <img 
                  src="https://res.cloudinary.com/dmgqewagr/image/upload/v1773739523/Portrait.png" 
                  alt="Finn" 
                  className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Online Indicator */}
                <div className="absolute bottom-2 right-2 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-950 shadow-lg" />
                
                {/* Notification Badge (if not expanded) */}
                {!isExpanded && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-0 right-0 bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full border border-slate-950"
                  >
                    1
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FinnPresenceBubble;
