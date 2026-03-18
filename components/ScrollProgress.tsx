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
        </div>
    );
};

export default ScrollProgress;
