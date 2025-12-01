import React, { useState, useRef, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, Facebook, Instagram, Linkedin, Loader2, MessageCircle, ChevronDown, ChevronUp, HelpCircle, Infinity, AlertTriangle } from 'lucide-react';
import { User } from '../types';

interface ContactPageProps {
  user?: User | null;
  onLoginClick?: () => void;
  onLogout?: () => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ user, onLoginClick, onLogout }) => {
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    
    // State for FAQ accordion
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    // Form data state
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: ''
    });
    const [errors, setErrors] = useState<{[key: string]: string}>({});

    // State for Chat
    const [messages, setMessages] = useState<{id: number, text: string, isUser: boolean}[]>([
        { id: 1, text: "Bonjour ! Je suis l'assistant virtuel. Une question sur nos services ?", isUser: false }
    ]);
    const [newMessage, setNewMessage] = useState("");
    const chatEndRef = useRef<HTMLDivElement>(null);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        // Sanitize input
        const safeMessage = newMessage.replace(/[<>]/g, "").trim(); 
        if (!safeMessage) return;

        const userMsg = { id: Date.now(), text: safeMessage, isUser: true };
        setMessages(prev => [...prev, userMsg]);
        setNewMessage("");

        // Simulate response
        setTimeout(() => {
            const botMsg = { id: Date.now() + 1, text: "Merci pour votre question. Un membre de l'équipe Infini 24 va vous répondre dans quelques instants.", isUser: false };
            setMessages(prev => [...prev, botMsg]);
        }, 1500);
    };

    const faqData = [
        {
            question: "Quels sont les délais de création ?",
            answer: "Pour un logo simple ou un kit réseaux, comptez 3 à 5 jours ouvrés. Pour une identité complète ou une vidéo, le délai est d'environ 1 semaine à 10 jours selon les échanges."
        },
        {
            question: "Comment se passe le règlement ?",
            answer: "Un acompte de 30% est demandé au démarrage du projet pour valider la commande. Le solde est à régler à la livraison des fichiers finaux."
        },
        {
            question: "Fournissez-vous les fichiers sources ?",
            answer: "Oui ! Pour les logos et identités visuelles, nous vous livrons les fichiers vectoriels (AI, EPS, PDF) ainsi que les formats PNG/JPG haute définition."
        }
    ];

    const validateForm = () => {
        const newErrors: {[key: string]: string} = {};
        
        // Email Regex
        const emailRe = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRe.test(formData.email.trim())) {
            newErrors.email = "Adresse email invalide";
        }

        if (!formData.name.trim() || formData.name.length < 2) {
            newErrors.name = "Nom requis (min 2 car.)";
        }

        if (!formData.message.trim() || formData.message.length < 10) {
            newErrors.message = "Message trop court";
        }

        // Phone Validation (Optional but strict if present)
        if (formData.phone.trim()) {
            const phoneRe = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
            if (!phoneRe.test(formData.phone.replace(/\s/g, ''))) {
                newErrors.phone = "Numéro invalide";
            }
        } else {
             newErrors.phone = "Téléphone requis";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if(!validateForm()) return;

        setSending(true);
        
        // Préparation du mail réel via l'application de messagerie du client
        const subject = encodeURIComponent(`Contact Site Internet: ${formData.name}`);
        const body = encodeURIComponent(`Nom: ${formData.name}
Email: ${formData.email}
Téléphone: ${formData.phone}

Message:
${formData.message}`);

        // Simulation d'attente pour l'effet visuel
        setTimeout(() => {
            setSending(false);
            setSent(true);
            
            // Ouverture de l'application mail
            window.location.href = `mailto:wendy.toussaint@icloud.com?subject=${subject}&body=${body}`;
            
            setFormData({ name: '', phone: '', email: '', message: '' });
        }, 1500);
    };

    if (sent) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center animate-in fade-in zoom-in duration-500 bg-[#FDFCF8]">
                <div className="w-28 h-28 bg-[#B48646]/10 text-[#B48646] rounded-full flex items-center justify-center mb-8 shadow-sm animate-bounce">
                    <Send size={48} />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Message prêt !</h2>
                <p className="text-slate-500 mb-8 max-w-xs mx-auto font-medium">Votre application mail va s'ouvrir pour confirmer l'envoi à Infini 24.</p>
                <button 
                    onClick={() => setSent(false)}
                    className="bg-gradient-to-r from-[#B48646] to-[#E5B066] text-white px-10 py-4 rounded-full font-bold shadow-lg hover:shadow-xl hover:shadow-[#B48646]/30 transition-all active:scale-95"
                >
                    Retour au formulaire
                </button>
            </div>
        )
    }

  return (
    <div className="flex flex-col h-full bg-[#FDFCF8] overflow-y-auto no-scrollbar">
      
      {/* Header Uniforme - Added flex-none */}
      <header className="flex-none pt-14 pb-10 px-6 bg-white border-b border-slate-50 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] relative overflow-hidden rounded-b-[3.5rem] mb-6 z-10">
            {/* Background Blurs */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#B48646] to-[#F3C06B] rounded-full blur-[80px] opacity-15 -mr-16 -mt-16 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-slate-900 rounded-full blur-[60px] opacity-5 -ml-10 -mb-10"></div>

            <div className="relative z-10 flex flex-col items-center justify-center text-center mt-2">
                {/* Infinity Logo */}
                <div className="flex items-center justify-center mb-4 relative group cursor-pointer transition-transform duration-500 hover:scale-110">
                     <div className="absolute inset-0 bg-[#B48646] blur-3xl opacity-20 rounded-full group-hover:opacity-40 transition-opacity duration-500"></div>
                     <Infinity size={48} strokeWidth={1.5} className="text-[#B48646] relative z-10 drop-shadow-sm transition-transform duration-700 group-hover:rotate-180" />
                </div>
                
                {/* Title */}
                <h1 className="text-4xl tracking-tighter mb-2 font-['Poppins'] font-bold text-slate-900">
                    Contact & Aide
                </h1>
                
                {/* Subtitle Badge */}
                <div className="inline-block px-4 py-1.5 rounded-full bg-[#B48646]/5 border border-[#B48646]/10 backdrop-blur-sm">
                     <p className="text-[#B48646] text-[10px] font-bold tracking-[0.3em] uppercase">
                        Infini 24
                     </p>
                </div>
            </div>
        </header>

      <div className="flex-1 px-4 lg:px-8 relative z-20 pb-8 mt-4">
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-8 max-w-7xl mx-auto w-full transition-all">
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Left Col: Actions & FAQ & Chat */}
                <div>
                    {/* Quick Actions Grid */}
                    <div className="grid grid-cols-3 gap-4 mb-10">
                        <a href="tel:+33663083676" className="bg-slate-50 p-5 rounded-[2rem] shadow-sm border border-transparent hover:border-[#B48646] hover:bg-white hover:shadow-md transition-all active:scale-95 flex flex-col items-center justify-center gap-3 group">
                            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-slate-800 shadow-sm group-hover:bg-[#B48646] group-hover:text-white transition-colors">
                                <Phone size={22} />
                            </div>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide group-hover:text-[#B48646]">Appeler</span>
                        </a>
                        <a href="https://wa.me/33663083676" target="_blank" rel="noreferrer" className="bg-slate-50 p-5 rounded-[2rem] shadow-sm border border-transparent hover:border-[#B48646] hover:bg-white hover:shadow-md transition-all active:scale-95 flex flex-col items-center justify-center gap-3 group">
                            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-slate-800 shadow-sm group-hover:bg-[#B48646] group-hover:text-white transition-colors">
                                <MessageCircle size={22} />
                            </div>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide group-hover:text-[#B48646]">WhatsApp</span>
                        </a>
                        <a href="mailto:wendy.toussaint@icloud.com" className="bg-slate-50 p-5 rounded-[2rem] shadow-sm border border-transparent hover:border-[#B48646] hover:bg-white hover:shadow-md transition-all active:scale-95 flex flex-col items-center justify-center gap-3 group">
                            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-slate-800 shadow-sm group-hover:bg-[#B48646] group-hover:text-white transition-colors">
                                <Mail size={22} />
                            </div>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide group-hover:text-[#B48646]">Email</span>
                        </a>
                    </div>

                    {/* FAQ Accordion */}
                    <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100 mb-10">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-6">
                            <HelpCircle size={14} className="text-[#B48646]"/> Questions Fréquentes
                        </h3>
                        <div className="space-y-3">
                            {faqData.map((item, index) => (
                                <div key={index} className="bg-white rounded-[1.5rem] border border-slate-200 overflow-hidden shadow-sm">
                                    <button 
                                        onClick={() => toggleFaq(index)}
                                        className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-800 text-sm hover:bg-slate-50 transition-colors"
                                    >
                                        {item.question}
                                        {openFaq === index ? <ChevronUp size={18} className="text-[#B48646]"/> : <ChevronDown size={18} className="text-slate-300"/>}
                                    </button>
                                    {openFaq === index && (
                                        <div className="px-5 pb-5 text-sm text-slate-500 leading-relaxed font-medium">
                                            {item.answer}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Chat Interface */}
                    <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100 mb-8 lg:mb-0">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-6">
                            <MessageCircle size={14} className="text-[#B48646]"/> Chat en direct
                        </h3>
                        <div className="bg-white border-2 border-slate-100 rounded-[1.5rem] h-80 flex flex-col overflow-hidden shadow-sm">
                            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/30">
                                {messages.map((msg) => (
                                    <div key={msg.id} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[85%] px-5 py-3 rounded-2xl text-sm font-medium leading-relaxed shadow-sm ${msg.isUser ? 'bg-gradient-to-br from-[#B48646] to-[#E5B066] text-white rounded-br-sm' : 'bg-white border border-slate-200 text-slate-600 rounded-bl-sm'}`}>
                                            {msg.text}
                                        </div>
                                    </div>
                                ))}
                                <div ref={chatEndRef} />
                            </div>
                            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-100 flex gap-3">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Posez votre question..."
                                    className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#B48646] outline-none transition-all font-medium"
                                />
                                <button type="submit" className="p-3 bg-[#B48646] text-white rounded-xl hover:bg-[#9a733c] transition-colors shadow-lg shadow-[#B48646]/20">
                                    <Send size={18} />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Right Col: Contact Form */}
                <div className="space-y-8">
                     <h3 className="text-2xl font-bold text-slate-900">Envoyez-nous un message</h3>
                     <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                        <div className="grid grid-cols-2 gap-5">
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">Nom</label>
                                <input 
                                    type="text" 
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className={`w-full px-5 py-4 bg-slate-50 border-2 rounded-2xl outline-none text-sm transition-all font-medium ${errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-slate-200 focus:border-[#B48646] focus:ring-[#B48646]/10'} focus:ring-4`}
                                    placeholder="Votre nom" 
                                />
                                {errors.name && <p className="text-red-500 text-[10px] mt-1 ml-2 font-bold flex items-center gap-1"><AlertTriangle size={10}/> {errors.name}</p>}
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">Téléphone</label>
                                <input 
                                    type="tel" 
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className={`w-full px-5 py-4 bg-slate-50 border-2 rounded-2xl outline-none text-sm transition-all font-medium ${errors.phone ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-slate-200 focus:border-[#B48646] focus:ring-[#B48646]/10'} focus:ring-4`}
                                    placeholder="Votre numéro" 
                                />
                                {errors.phone && <p className="text-red-500 text-[10px] mt-1 ml-2 font-bold flex items-center gap-1"><AlertTriangle size={10}/> {errors.phone}</p>}
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">Email</label>
                            <input 
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={`w-full px-5 py-4 bg-slate-50 border-2 rounded-2xl outline-none text-sm transition-all font-medium ${errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-slate-200 focus:border-[#B48646] focus:ring-[#B48646]/10'} focus:ring-4`}
                                placeholder="votre@email.com" 
                            />
                            {errors.email && <p className="text-red-500 text-[10px] mt-1 ml-2 font-bold flex items-center gap-1"><AlertTriangle size={10}/> {errors.email}</p>}
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">Message</label>
                            <textarea 
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                rows={6} 
                                className={`w-full px-5 py-4 bg-slate-50 border-2 rounded-2xl outline-none text-sm transition-all font-medium resize-none ${errors.message ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-slate-200 focus:border-[#B48646] focus:ring-[#B48646]/10'} focus:ring-4`}
                                placeholder="Comment pouvons-nous vous aider ?"
                            ></textarea>
                            {errors.message && <p className="text-red-500 text-[10px] mt-1 ml-2 font-bold flex items-center gap-1"><AlertTriangle size={10}/> {errors.message}</p>}
                        </div>

                        <button 
                            type="submit" 
                            disabled={sending}
                            className="w-full bg-gradient-to-r from-[#B48646] to-[#E5B066] hover:shadow-xl hover:shadow-[#B48646]/30 text-white font-bold py-5 rounded-[2rem] transition-all active:scale-95 flex items-center justify-center gap-2 text-lg"
                        >
                            {sending ? <Loader2 className="animate-spin" /> : (
                                <>
                                    Envoyer le message <Send size={20} />
                                </>
                            )}
                        </button>
                     </form>
                </div>
            </div>

            {/* Footer / Socials */}
            <div className="mt-16 pt-10 border-t border-slate-100 flex flex-col items-center">
                 <div className="flex gap-4 mb-6">
                    <a href="#" className="w-12 h-12 rounded-full bg-slate-50 text-slate-500 flex items-center justify-center hover:bg-[#B48646] hover:text-white transition-all duration-300 hover:scale-110 shadow-sm"><Facebook size={22} /></a>
                    <a href="#" className="w-12 h-12 rounded-full bg-slate-50 text-slate-500 flex items-center justify-center hover:bg-[#B48646] hover:text-white transition-all duration-300 hover:scale-110 shadow-sm"><Instagram size={22} /></a>
                    <a href="#" className="w-12 h-12 rounded-full bg-slate-50 text-slate-500 flex items-center justify-center hover:bg-[#B48646] hover:text-white transition-all duration-300 hover:scale-110 shadow-sm"><Linkedin size={22} /></a>
                 </div>
                 
                 <div className="text-center text-xs text-slate-400 space-y-2 font-medium">
                    <p className="flex items-center justify-center gap-1"><MapPin size={14}/> Ville-sur-Lumes, Ardennes</p>
                    <p className="mt-6 opacity-60">© 2026 Infini 24. Tous droits réservés.</p>
                 </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;