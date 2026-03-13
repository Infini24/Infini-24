import React, { useState } from 'react';
import { Mail, Send, MessageCircle, ChevronDown, ChevronUp, HelpCircle, Smartphone, Facebook } from 'lucide-react';
import toast from 'react-hot-toast';

const ContactPage: React.FC = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: ''
    });

    const faqData = [
        { question: "Comment envoyer mes fichiers ?", answer: "Par mail, WhatsApp, ou WeTransfer pour les fichiers volumineux." },
        { question: "Quels sont les délais ?", answer: "3 à 5 jours pour un logo, environ 10 jours pour une identité complète." },
        { question: "Faites-vous l'impression ?", answer: "Nous réalisons les designs HD prêts pour l'impression." },
        { question: "Modifications possibles ?", answer: "3 allers-retours sont inclus dans nos forfaits." }
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!formData.email || !formData.message) {
            toast.error("Veuillez remplir les champs obligatoires.");
            return;
        }
        window.location.href = `mailto:dywen.officiel7@gmail.com?subject=Contact&body=${formData.message}`;
    };

    return (
        <div className="min-h-full bg-transparent flex flex-col font-sans overflow-y-auto no-scrollbar">
            
            <main className="flex-1 flex items-center justify-center px-4 lg:px-12 py-8 md:py-12">
                
                <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* --- COLONNE GAUCHE (Infos & FAQ) --- */}
                    <div className="lg:col-span-5 flex flex-col gap-8 animate-in fade-in slide-in-from-left duration-700">
                        
                        <div>
                            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Contactez-nous</h1>
                            <p className="text-slate-300 text-lg">Une question ? Parlons-en ensemble.</p>
                        </div>

                        {/* Moyens de contact - Icônes plus grandes */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {[
                                { icon: <Smartphone size={24} />, label: "SMS", href: "sms:+33663083676" },
                                { icon: <Mail size={24} />, label: "Email", href: "mailto:dywen.officiel7@gmail.com" },
                                { icon: <MessageCircle size={24} />, label: "WhatsApp", href: "https://wa.me/33663083676" },
                                { icon: <Facebook size={24} />, label: "Messenger", href: "https://m.me/61584316950503" }
                            ].map((item, i) => (
                                <a key={i} href={item.href} className="bg-slate-900/40 backdrop-blur-md border border-white/5 py-4 rounded-2xl shadow-sm flex flex-col items-center gap-2 hover:border-[#B48646]/40 transition-all group">
                                    <div className="text-slate-400 group-hover:text-[#B48646] transition-colors">{item.icon}</div>
                                    <span className="text-[10px] font-bold uppercase text-slate-400 group-hover:text-slate-300">{item.label}</span>
                                </a>
                            ))}
                        </div>

                        {/* FAQ - Optimisée pour l'espace */}
                        <div className="bg-slate-900/60 backdrop-blur-lg rounded-[2.5rem] p-6 sm:p-8 text-white shadow-xl border border-white/5">
                            <div className="flex items-center gap-2 mb-4 text-[#F3C06B]">
                                <HelpCircle size={18} />
                                <h3 className="text-xs font-bold uppercase tracking-widest">Questions fréquentes</h3>
                            </div>
                            <div className="space-y-1">
                                {faqData.map((item, index) => (
                                    <div key={index} className="border-b border-white/5 last:border-0">
                                        <button 
                                            onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                            className="w-full flex items-center justify-between text-left py-4"
                                        >
                                            <span className={`text-[15px] font-medium transition-colors ${openFaq === index ? 'text-[#F3C06B]' : 'text-slate-200 hover:text-white'}`}>
                                                {item.question}
                                            </span>
                                            {openFaq === index ? <ChevronUp size={18} className="text-[#B48646]"/> : <ChevronDown size={18} className="text-slate-600"/>}
                                        </button>
                                        {openFaq === index && (
                                            <p className="pb-4 text-sm text-slate-400 leading-relaxed animate-in fade-in">
                                                {item.answer}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* --- COLONNE DROITE (Formulaire) --- */}
                    <div className="lg:col-span-7 flex items-center animate-in fade-in slide-in-from-right duration-700">
                        <div className="bg-slate-900/40 backdrop-blur-xl rounded-[3rem] p-8 lg:p-12 shadow-2xl border border-white/5 w-full">
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-white">Envoyez un message</h2>
                                <p className="text-slate-400 text-sm">Réponse rapide garantie.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Nom complet</label>
                                        <input type="text" name="name" onChange={handleInputChange} placeholder="Jean Dupont" className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-base text-white outline-none focus:bg-white/10 focus:border-[#B48646]/50 transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Téléphone</label>
                                        <input type="tel" name="phone" onChange={handleInputChange} placeholder="06..." className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-base text-white outline-none focus:bg-white/10 focus:border-[#B48646]/50 transition-all" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email professionnel</label>
                                    <input type="email" name="email" onChange={handleInputChange} placeholder="votre@email.com" className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-base text-white outline-none focus:bg-white/10 focus:border-[#B48646]/50 transition-all" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Votre projet</label>
                                    <textarea name="message" onChange={handleInputChange} placeholder="Décrivez votre besoin..." className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-base text-white outline-none focus:bg-white/10 focus:border-[#B48646]/50 transition-all resize-none h-32"></textarea>
                                </div>

                                <button type="submit" className="w-full bg-gradient-to-r from-[#B48646] via-[#E5B066] to-[#B48646] text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-[#B48646]/20 flex items-center justify-center gap-3 text-sm tracking-widest active:scale-[0.98] border border-white/20 hover:scale-[1.02]">
                                    ENVOYER LE MESSAGE <Send size={18} />
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default ContactPage;
