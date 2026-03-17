import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress: React.FC = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div className="fixed top-0 left-0 right-0 h-1 z-[150] pointer-events-none">
            {/* Background track */}
            <div className="absolute inset-0 bg-white/5" />
            
            {/* Progress bar */}
            <motion.div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#B48646] via-[#E5B066] to-[#B48646] origin-left"
                style={{ scaleX }}
            />

            {/* Finn's Eye / Icon indicator */}
            <motion.div 
                className="absolute top-0 left-0 -translate-y-1/2 -ml-2"
                style={{ 
                    left: `${scrollYProgress.get() * 100}%`,
                    x: scaleX.get() * 100 // This is just a placeholder, we'll use a better approach below
                }}
            >
                {/* We use a separate motion div for the icon to follow the progress */}
            </motion.div>

            <FinnIcon progress={scrollYProgress} />
        </div>
    );
};

const FinnIcon = ({ progress }: { progress: any }) => {
    const [left, setLeft] = useState(0);

    useEffect(() => {
        return progress.onChange((latest: number) => {
            setLeft(latest * 100);
        });
    }, [progress]);

    return (
        <div 
            className="absolute top-0 h-6 w-6 -translate-y-1/2 transition-all duration-100 ease-out pointer-events-none"
            style={{ left: `${left}%`, marginLeft: '-12px' }}
        >
            <div className="relative w-full h-full">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-[#B48646] rounded-full blur-md opacity-40 animate-pulse" />
                
                {/* Finn's Eye Icon */}
                <div className="relative w-full h-full rounded-full border border-[#B48646] bg-slate-950 flex items-center justify-center overflow-hidden">
                    <img 
                        src="https://res.cloudinary.com/dmgqewagr/image/upload/v1773739523/Portrait.png" 
                        alt="" 
                        className="w-full h-full object-cover grayscale brightness-125"
                        referrerPolicy="no-referrer"
                    />
                </div>
            </div>
        </div>
    );
};

export default ScrollProgress;
