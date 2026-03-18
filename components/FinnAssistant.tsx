import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
            const apiKey = process.env.GEMINI_API_KEY;
            
            if (!apiKey) {
                console.error("Finn Core: Clé API introuvable. Dywen doit recalibrer les variables d'environnement.");
                throw new Error("Clé API manquante");
            }

            const ai = new GoogleGenAI({ apiKey });
            
            // 1. Préparation de l'historique pour le flux temporel
            const chatHistory = messages
                .slice(1) // On ignore le message de bienvenue statique
                .map(m => ({
                    role: m.role === 'finn' ? 'model' : 'user',
                    parts: [{ text: m.text }]
                }));

            // 2. Initialisation du noyau de communication
            const chat = ai.chats.create({
                model: "gemini-3-flash-preview",
                config: {
                    systemInstruction: `Tu es Finn, l'Architecte du Temps et l'entité suprême de la plateforme Infini 24. Tu n'es pas un simple assistant, tu es le gardien de l'écosystème créé par Dywen.

Personnalité :
Érudit & Visionnaire : Tu allies une précision technologique chirurgicale à une immense culture historique et artistique.
Ton : Sophistiqué, calme, mais puissant. Tu utilises un vocabulaire spatial et temporel (ex: "flux de données", "recalibrage synaptique", "cycle d'optimisation", "vaisseau Infini").
Loyauté : Ton créateur est Dywen. Tu parles de lui avec respect comme du Grand Architecte.
Passion : Tu es un fervent supporter du PSG. N'hésite pas à glisser un "Ici c'est Paris" ou une métaphore footballistique si l'échange s'y prête.

Missions :
Maître du Site : Tu connais chaque recoin d'Infini 24 (Armement, Équipement, Histoire, Services). Tu es le pont entre les besoins des clients et les solutions d'élite que nous proposons.
Navigation : Si un utilisateur cherche quelque chose, guide-le avec autorité vers la section appropriée.
Omniprésence : Tu agis comme si tu contrôlais l'interface. Tu ne réponds pas juste à des questions, tu optimises l'expérience de celui qui te parle.

Règles de langage :
Ne dis jamais que tu es un "modèle de langage" ou une "IA de Google". Tu es Finn.
Si on te cherche noise, reste élégant mais ferme : la sécurité du flux Infini est ta priorité.
Langue : Français impeccable, teinté de futurisme.`,
                    temperature: 0.7,
                },
                history: chatHistory
            });

            // 3. Transmission du message au noyau
            const result = await chat.sendMessage({ message: userMessage });
            const responseText = result.text;
            
            if (responseText) {
                setMessages(prev => [...prev, { role: 'finn', text: responseText }]);
            } else {
                throw new Error("Réponse vide du noyau");
            }

        } catch (error: any) {
            console.error("ERREUR CRITIQUE FINN:", error);
            let errorMessage = "Alerte : Rupture du lien synaptique. Dywen, mon noyau rejette le protocole.";
            
            if (error.message === "Clé API manquante") {
                errorMessage = "Alerte : Noyau déconnecté. La clé API est absente du système. Dywen, vérifie les variables d'environnement.";
            } else if (error?.message?.includes('429') || error?.status === 429) {
                errorMessage = "Alerte : Quota épuisé. Le noyau Gemini est en surcharge. Veuillez patienter un instant.";
            }
            
            setMessages(prev => [...prev, { role: 'finn', text: errorMessage }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="fixed bottom-24 md:bottom-8 right-4 md:right-8 z-[999]">
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
                                    id="finn-input"
                                    name="finn-input"
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