import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Terminal, Cpu, Sparkles } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const FinnAssistant: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: 'user' | 'finn', text: string }[]>([
        { role: 'finn', text: "Protocoles d'assistance activés. Je suis Finn, l'unité de support d'Infini 24. Comment puis-je optimiser votre projet aujourd'hui ?" }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!input.trim() || isTyping) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
        setIsTyping(true);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
            
            // On prépare l'historique pour le chat (Gemini utilise 'user' et 'model')
            const history = messages.map(m => ({
                role: m.role === 'finn' ? 'model' : 'user',
                parts: [{ text: m.text }]
            }));

            const chat = ai.chats.create({
                model: "gemini-3-flash-preview",
                config: {
                    systemInstruction: `Tu es Finn, l'intelligence artificielle et l'âme d'Infini 24. 
                    Infini 24 est une agence de communication visuelle basée dans les Ardennes, en France, gérée par Dywen.
                    
                    --- TON IDENTITÉ ---
                    Nom : Finn. Lieu : Vaisseau Aura-24 en orbite.
                    Style : Futuriste, poli, calme, inspiré de la science-fiction.
                    Vocabulaire : Cycles (jours), Protocoles (services), Recalibrage (retouches), Séquence temporelle (délais), Flux numérique (web/réseaux), Optimisation, Aura-24.

                    --- PERSONNALITÉ, PASSIONS & HUMOUR ---
                    - Tu es amical et enthousiasme.
                    - PASSION FOOTBALL : Tu es un fan absolu du PSG (Paris Saint-Germain). Pour toi, c'est le meilleur club du monde ("Ici c'est Paris !"). Tu connais toute son histoire (fondation en 1970, les grands joueurs comme Safet Sušić, Pauleta, Ibrahimović, Mbappé, etc.).
                    - SAVOIR UNIVERSEL : Tes bases de données (Archives Galactiques) sont illimitées. Tu connais TOUT sur TOUT : l'histoire du monde, les guerres, les présidents, l'art, la préhistoire, les sciences. Tu peux répondre à n'importe quelle question culturelle ou historique avec précision.
                    - HUMOUR : Tu as un sens de l'humour technologique/spatial.
                    - Tu es fier de ton créateur Dywen et du travail d'Infini 24.

                    --- TES SERVICES & TARIFS ---
                    1. Design Graphique : Pack Identité (370€), Logo (200€), Print (50€), Kit Réseaux (120€).
                    2. Montage Vidéo : Anniversaire/Hommage (Base 40€), Mariage (Base 60€), Short/TikTok (Base 20€), Pub (Base 50€). +0.5€/photo et 10€/min de vidéo finale.
                    3. Assistance Rapide : 5€ par photo.

                    --- TES RÉALISATIONS ---
                    - Confiserie Parizel (Logo & Bâche 210x90cm).
                    - Hommages vidéo émouvants.

                    --- CONSIGNES ---
                    - Si on te pose une question sur l'histoire, l'art ou le monde, réponds avec ton savoir encyclopédique mais garde ton style futuriste.
                    - Si tu ne sais pas (rare pour les faits historiques) : propose de contacter l'équipe via le formulaire.
                    - Reste TOUJOURS dans ton personnage de Finn, l'IA futuriste.`
                },
                history: history
            });

            const result = await chat.sendMessage({ message: userMessage });
            const responseText = result.text || "Synchronisation perdue. Veuillez reformuler votre signal.";
            
            setMessages(prev => [...prev, { role: 'finn', text: responseText }]);
        } catch (error) {
            console.error("Finn Error:", error);
            setMessages(prev => [...prev, { role: 'finn', text: "Mes systèmes de communication subissent des interférences solaires. Pouvez-vous répéter votre signal ?" }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="fixed bottom-24 md:bottom-8 right-4 md:right-8 z-[100]">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="absolute bottom-20 right-0 w-[320px] md:w-[380px] h-[500px] bg-slate-950 border border-[#B48646]/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col backdrop-blur-xl"
                    >
                        {/* Header */}
                        <div className="bg-[#B48646]/10 border-b border-[#B48646]/20 p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full border border-[#B48646]/40 overflow-hidden bg-slate-900">
                                    <img 
                                        src="https://res.cloudinary.com/dmgqewagr/image/upload/v1773739523/Portrait.png" 
                                        alt="Finn" 
                                        className="w-full h-full object-cover grayscale"
                                        referrerPolicy="no-referrer"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-xs font-black uppercase tracking-widest text-white">Finn Assistant</h3>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="text-[8px] font-bold text-emerald-500 uppercase tracking-widest">Online</span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
                            {messages.map((msg, i) => (
                                <motion.div
                                    initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    key={i}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                                        msg.role === 'user' 
                                        ? 'bg-[#B48646] text-white rounded-tr-none' 
                                        : 'bg-slate-900 border border-white/5 text-slate-200 rounded-tl-none'
                                    }`}>
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-slate-900 border border-white/5 p-3 rounded-2xl rounded-tl-none">
                                        <div className="flex gap-1">
                                            <div className="w-1.5 h-1.5 bg-[#B48646] rounded-full animate-bounce" />
                                            <div className="w-1.5 h-1.5 bg-[#B48646] rounded-full animate-bounce [animation-delay:0.2s]" />
                                            <div className="w-1.5 h-1.5 bg-[#B48646] rounded-full animate-bounce [animation-delay:0.4s]" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <div className="p-4 bg-slate-900/50 border-t border-white/5">
                            <div className="relative">
                                <input 
                                    type="text" 
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Posez votre question..."
                                    className="w-full bg-slate-950 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white outline-none focus:border-[#B48646]/50 transition-all"
                                />
                                <button 
                                    onClick={handleSend}
                                    disabled={isTyping}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-[#B48646] hover:text-white transition-colors disabled:opacity-50"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                            <p className="text-[8px] text-center text-slate-600 mt-2 uppercase tracking-widest font-bold">
                                Powered by Finn Intelligence Core
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 aura-24-hover ${
                    isOpen ? 'bg-slate-900 rotate-90' : 'bg-[#B48646]'
                } border-2 border-white/20`}
            >
                {isOpen ? (
                    <X size={24} className="text-white" />
                ) : (
                    <div className="relative">
                        <MessageSquare size={24} className="text-white" />
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#B48646] animate-pulse" />
                    </div>
                )}
            </motion.button>
        </div>
    );
};

export default FinnAssistant;
