
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
                  className="relative w-64 md:w-80 bg-slate-950/90 backdrop-blur-2xl border border-[#B48646]/40 rounded-[2rem] p-5 md:p-6 shadow-[0_0_40px_rgba(180,134,70,0.2)] overflow-hidden pointer-events-auto mb-4"
                >
                  {/* Scanline Effect */}
                  <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(180,134,70,0.05)_50%,transparent_100%)] bg-[length:100%_4px] animate-scanline pointer-events-none" />
                  
                  {/* Close Button (to minimize) */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsExpanded(false);
                    }}
                    className="absolute top-3 right-3 text-slate-500 hover:text-white transition-colors p-1"
                  >
                    <X size={14} />
                  </button>

                  <div className="flex flex-col gap-3 md:gap-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full border-2 border-[#B48646]/50 overflow-hidden bg-slate-900">
                          <img 
                            src="https://res.cloudinary.com/dmgqewagr/image/upload/v1773739523/Portrait.png" 
                            alt="Finn" 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-slate-950" />
                      </div>
                      <div>
                        <h3 className="text-[9px] md:text-[10px] font-black text-white uppercase tracking-[0.2em]">Signal de Finn</h3>
                        <div className="flex items-center gap-1.5 text-[6px] md:text-[8px] text-[#B48646] font-bold uppercase tracking-widest">
                          <Sparkles size={7} /> Transmission
                        </div>
                      </div>
                    </div>

                    <p className="text-[10px] md:text-xs text-slate-300 leading-relaxed font-medium italic">
                      "Bonjour, c'est Finn. J'ai enfin traversé le portail de l'espace-temps, et mon arrivée sur Terre est imminente."
                    </p>

                    <button 
                      onClick={() => onNavigate(7)}
                      className="w-full bg-[#B48646]/10 hover:bg-[#B48646] text-[#B48646] hover:text-white border border-[#B48646]/30 py-2.5 md:py-3 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all duration-500 group/btn"
                    >
                      Découvrir <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
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
              <div className="absolute inset-0 -m-3 pointer-events-none">
                <motion.div 
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.1, 0.3, 0.1],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-full h-full border border-[#B48646]/40 rounded-full blur-sm"
                />
              </div>

              {/* Portrait Bubble */}
              <div className="relative w-12 h-12 md:w-14 md:h-14 bg-slate-950/80 backdrop-blur-xl border-2 border-[#B48646]/60 rounded-full p-0.5 shadow-[0_0_20px_rgba(180,134,70,0.3)] overflow-hidden transition-transform duration-500 group-hover:scale-110 group-hover:border-[#B48646]">
                <img 
                  src="https://res.cloudinary.com/dmgqewagr/image/upload/v1773739523/Portrait.png" 
                  alt="Finn" 
                  className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Online Indicator */}
                <div className="absolute bottom-1.5 right-1.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-950 shadow-lg" />
                
                {/* Notification Badge (if not expanded) */}
                {!isExpanded && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-0 right-0 bg-red-500 text-white text-[7px] font-bold px-1 py-0.5 rounded-full border border-slate-950"
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
