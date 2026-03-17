import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Eye, Zap, Globe, Cpu, ArrowRight } from 'lucide-react';

interface Report {
    id: number;
    title: string;
    date: string;
    category: string;
    content: string;
    tags: string[];
}

const reports: Report[] = [
    {
        id: 1,
        title: "Observation du Flux : L'Ascension du Minimalisme Spatial",
        date: "15 Mars 2026",
        category: "Design",
        content: "Mes capteurs indiquent une saturation des interfaces complexes. Le flux se dirige vers une clarté absolue. Moins de bruit, plus d'Aura-24. L'espace vide n'est pas du vide, c'est de l'énergie potentielle.",
        tags: ["Minimalisme", "UX", "Futur"]
    },
    {
        id: 2,
        title: "Analyse Temporelle : La Vidéo Verticale Domine",
        date: "10 Mars 2026",
        category: "Vidéo",
        content: "Les séquences temporelles de 15 à 60 secondes capturent 85% de l'attention organique. Mon processeur recommande l'optimisation des formats 9:16 pour une immersion maximale dans le secteur mobile.",
        tags: ["Reels", "TikTok", "Engagement"]
    },
    {
        id: 3,
        title: "Rapport de Rendu : L'Intelligence Artificielle comme Muse",
        date: "05 Mars 2026",
        category: "Technologie",
        content: "L'IA n'est pas une menace, c'est un exosquelette pour la créativité humaine. Elle permet de transcender les limites du rendu classique. Protocole d'hybridation activé.",
        tags: ["IA", "Créativité", "Hybride"]
    }
];

const GazettePage: React.FC = () => {
    return (
        <div className="flex flex-col min-h-full bg-transparent relative overflow-hidden">
            {/* Header */}
            <div className="pt-12 md:pt-20 pb-8 px-4 text-center relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#B48646]/5 rounded-full blur-3xl -z-10" />
                <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tighter">
                    La <span className="text-[#B48646]">Gazette</span> de Finn
                </h2>
                <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base uppercase tracking-[0.2em] font-bold">
                    [Rapports d'Observation du Secteur Créatif]
                </p>
            </div>

            <div className="max-w-5xl mx-auto px-4 md:px-8 py-12 space-y-12">
                {reports.map((report, idx) => (
                    <motion.div 
                        key={report.id}
                        initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="group relative bg-slate-900/40 backdrop-blur-md rounded-[2.5rem] border border-white/5 overflow-hidden hover:border-[#B48646]/30 transition-all duration-500"
                    >
                        <div className="p-8 md:p-12 flex flex-col md:flex-row gap-8 items-start">
                            {/* Date & Category */}
                            <div className="shrink-0 space-y-2">
                                <div className="flex items-center gap-2 text-[#B48646] font-mono text-xs uppercase tracking-widest">
                                    <Cpu size={14} />
                                    {report.category}
                                </div>
                                <div className="text-slate-500 text-[10px] font-bold uppercase tracking-tighter">
                                    {report.date}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 space-y-6">
                                <h3 className="text-2xl md:text-3xl font-black text-white group-hover:text-[#B48646] transition-colors">
                                    {report.title}
                                </h3>
                                <p className="text-slate-300 leading-relaxed text-lg italic">
                                    "{report.content}"
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {report.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-[10px] text-slate-400 font-bold uppercase tracking-widest border border-white/5">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Action Icon */}
                            <div className="absolute top-8 right-8 text-slate-700 group-hover:text-[#B48646] transition-colors">
                                <ArrowRight size={32} strokeWidth={3} />
                            </div>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#B48646]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                ))}
            </div>

            {/* Footer Gazette */}
            <div className="py-20 text-center">
                <div className="inline-flex items-center gap-4 px-8 py-4 bg-slate-900/60 rounded-full border border-white/10 text-slate-400 text-xs font-bold uppercase tracking-widest">
                    <Globe size={16} className="animate-spin-slow" />
                    Scan du secteur en cours...
                </div>
            </div>
        </div>
    );
};

export default GazettePage;
