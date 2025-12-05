import React, { useState, useRef, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, Facebook, Instagram, Linkedin, MessageCircle, ChevronDown, ChevronUp, HelpCircle, Infinity, AlertTriangle, MessageSquare, Smartphone } from 'lucide-react';
import { User } from '../types';
import toast from 'react-hot-toast';

interface ContactPageProps {
  user?: User | null;
  onLoginClick?: () => void;
  onLogout?: () => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ user, onLoginClick, onLogout }) => {
    const [sending, setSending] = useState(false);
    
    // State for FAQ accordion
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    // Form data state
    const [formData, setFormData] = useState({
        name: user?.name || '',
        phone: user?.phone || '',
        email: user?.email || '',
        subject: '',
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
        const safeMessage = newMessage.replace(/[<>]/g, "").trim(); 
        if (!safeMessage) return;

        const userMsg = { id: Date.now(), text: safeMessage, isUser: true };
        setMessages(prev => [...prev, userMsg]);
        setNewMessage("");

        setTimeout(() => {
            const botMsg = { id: Date.now() + 1, text: "Merci. Un membre de l'équipe Infini 24 va vous répondre rapidement.", isUser: false };
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
        const emailRe = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRe.test(formData.email.trim())) newErrors.email = "Email invalide";
        if (!formData.name.trim() || formData.name.length < 2) newErrors.name = "Nom requis";
        if (!formData.subject.trim()) newErrors.subject = "Objet requis";
        if (!formData.message.trim() || formData.message.length < 10) newErrors.message = "Message trop court";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!validateForm()) {
            toast.error("Veuillez vérifier les champs rouges.");
            return;
        }

        const emailSubject = encodeURIComponent(`[SITE WEB] ${formData.subject} - ${formData.name}`);
        const emailBody = encodeURIComponent(`NOUVELLE DEMANDE DE CONTACT

--- INFORMATIONS CLIENT ---
👤 Nom : ${formData.name}
📧 Email : ${formData.email}
📱 Téléphone : ${formData.phone}

--- SUJET ---
${formData.subject}

--- MESSAGE ---
${formData.message}

-------------------------
Envoyé depuis le formulaire de contact Infini 24`);

        window.location.href = `mailto:wendy.toussaint@icloud.com?subject=${emailSubject}&body=${emailBody}`;
        toast.success("Ouverture de votre messagerie...");
        setFormData({ ...formData, message: '' });
    };

  return (
    <div className="flex flex-col h-full bg-[#FDFCF8] overflow-y-auto no-scrollbar">
      
      <header className="flex-none pt-14 pb-10 px-6 bg-white border-b border-slate-50 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] relative overflow-hidden rounded-b-[3.5rem] mb-6 z-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#B48646] to-[#F3C06B] rounded-full blur-[80px] opacity-15 -mr-16 -mt-16 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-slate-900 rounded-full blur-[60px] opacity-5 -ml-10 -mb-10"></div>

            <div className="relative z-10 flex flex-col items-center justify-center text-center mt-2">
                <div className="flex items-center justify-center mb-4 relative group cursor-pointer transition-transform duration-500 hover:scale-110">
                     <div className="absolute inset-0 bg-[#B48646] blur-3xl opacity-20 rounded-full group-hover:opacity-40 transition-opacity duration-500"></div>
                     <Infinity size={48} strokeWidth={1.5} className="text-[#B48646] relative z-10 drop-shadow-sm transition-transform duration-700 group-hover:rotate-180" />
                </div>
                <h1 className="text-4xl tracking-tighter mb-2 font-['Poppins'] font-bold text-slate-900">
                    Contact & Aide
                </h1>
                <div className="inline-block px-4 py-1.5 rounded-full bg-[#B48646]/5 border border-[#B48646]/10 backdrop-blur-sm">
                     <p className="text-[#B48646] text-[10px] font-bold tracking-[0.3em] uppercase">
                        Infini 24
                     </p>
                </div>
            </div>
        </header>

      <div className="flex-1 px-4 lg:px-8 relative z-20 pb-8 mt-4">
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-8 max-w-7xl mx-auto w-full transition-all">
            
            <div className="text-center mb-10">
                <h2 className="text-xl font-bold text-slate-900 mb-2">Comment préférez-vous échanger ?</h2>
                <p className="text-slate-500 text-sm">Choisissez votre moyen de communication favori pour nous parler de votre projet.</p>
            </div>

            {/* --- GRID CONTACT OPTIMISÉE --- */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
                {/* 1. APPEL */}
                <a href="tel:+33663083676" className="bg-slate-50 p-4 rounded-[2rem] border border-transparent hover:border-[#B48646] hover:bg-white hover:shadow-lg transition-all active:scale-95 flex flex-col items-center justify-center gap-3 group">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-slate-800 shadow-sm group-hover:bg-[#B48646] group-hover:text-white transition-colors">
                        <Phone size={22} />
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide group-hover:text-[#B48646]">Appeler</span>
                </a>

                {/* 2. SMS (NOUVEAU) */}
                <a href="sms:+33663083676?body=Bonjour Infini 24, je souhaite vous parler d'un projet..." className="bg-slate-50 p-4 rounded-[2rem] border border-transparent hover:border-[#B48646] hover:bg-white hover:shadow-lg transition-all active:scale-95 flex flex-col items-center justify-center gap-3 group">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-slate-800 shadow-sm group-hover:bg-[#B48646] group-hover:text-white transition-colors">
                        <Smartphone size={22} />
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide group-hover:text-[#B48646]">SMS</span>
                </a>

                {/* 3. WHATSAPP */}
                <a href="https://wa.me/33663083676?text=Bonjour%20Infini%2024,%20j'ai%20une%20question%20sur%20un%20projet" target="_blank" rel="noreferrer" className="bg-slate-50 p-4 rounded-[2rem] border border-transparent hover:border-[#B48646] hover:bg-white hover:shadow-lg transition-all active:scale-95 flex flex-col items-center justify-center gap-3 group">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-slate-800 shadow-sm group-hover:bg-[#B48646] group-hover:text-white transition-colors">
                        <MessageCircle size={22} />
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide group-hover:text-[#B48646]">WhatsApp</span>
                </a>

                {/* 4. FACEBOOK */}
                <a href="https://www.facebook.com/profile.php?id=61584316950503" target="_blank" rel="noreferrer" className="bg-slate-50 p-4 rounded-[2rem] border border-transparent hover:border-[#B48646] hover:bg-white hover:shadow-lg transition-all active:scale-95 flex flex-col items-center justify-center gap-3 group">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-slate-800 shadow-sm group-hover:bg-[#B48646] group-hover:text-white transition-colors">
                        <Facebook size={22} />
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide group-hover:text-[#B48646]">Facebook</span>
                </a>

                {/* 5. EMAIL DIRECT (NOUVEAU) */}
                <a href="mailto:wendy.toussaint@icloud.com" className="bg-slate-50 p-4 rounded-[2rem] border border-transparent hover:border-[#B48646] hover:bg-white hover:shadow-lg transition-all active:scale-95 flex flex-col items-center justify-center gap-3 group md:col-span-1 col-span-2">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-slate-800 shadow-sm group-hover:bg-[#B48646] group-hover:text-white transition-colors">
                        <Mail size={22} />
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide group-hover:text-[#B48646]">Email Direct</span>
                </a>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Left Col: FAQ & Chat */}
                <div>
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

                    <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100 mb-8 lg:mb-0">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-6">
                            <MessageSquare size={14} className="text-[#B48646]"/> Chat en direct
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
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#B48646]/10 flex items-center justify-center text-[#B48646]">
                            <Mail size={20} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">Détailler mon projet par écrit</h3>
                     </div>
                     
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
                            <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">Objet de la demande</label>
                            <select
                                name="subject"
                                value={formData.subject}
                                onChange={handleInputChange}
                                className={`w-full px-5 py-4 bg-slate-50 border-2 rounded-2xl outline-none text-sm transition-all font-medium cursor-pointer ${errors.subject ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-slate-200 focus:border-[#B48646] focus:ring-[#B48646]/10'} focus:ring-4`}
                            >
                                <option value="">Choisir un sujet...</option>
                                <option value="Demande de devis">Demande de devis</option>
                                <option value="Question sur un service">Question sur un service</option>
                                <option value="Problème technique">Problème technique</option>
                                <option value="Partenariat">Partenariat</option>
                                <option value="Autre">Autre</option>
                            </select>
                            {errors.subject && <p className="text-red-500 text-[10px] mt-1 ml-2 font-bold flex items-center gap-1"><AlertTriangle size={10}/> {errors.subject}</p>}
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">Message</label>
                            <textarea 
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                rows={6} 
                                className={`w-full px-5 py-4 bg-slate-50 border-2 rounded-2xl outline-none text-sm transition-all font-medium resize-none ${errors.message ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-slate-200 focus:border-[#B48646] focus:ring-[#B48646]/10'} focus:ring-4`}
                                placeholder="Décrivez votre besoin en détail..."
                            ></textarea>
                            {errors.message && <p className="text-red-500 text-[10px] mt-1 ml-2 font-bold flex items-center gap-1"><AlertTriangle size={10}/> {errors.message}</p>}
                        </div>

                        <button 
                            type="submit" 
                            disabled={sending}
                            className="w-full bg-gradient-to-r from-[#B48646] to-[#E5B066] hover:shadow-xl hover:shadow-[#B48646]/30 text-white font-bold py-5 rounded-[2rem] transition-all active:scale-95 flex items-center justify-center gap-2 text-lg"
                        >
                            Envoyer par mail <Send size={20} />
                        </button>
                     </form>
                </div>
            </div>

            {/* Footer / Socials */}
            <div className="mt-16 pt-10 border-t border-slate-100 flex flex-col items-center">
                 <div className="flex gap-4 mb-6">
                    <a href="https://www.facebook.com/profile.php?id=61584316950503" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-slate-50 text-slate-500 flex items-center justify-center hover:bg-[#B48646] hover:text-white transition-all duration-300 hover:scale-110 shadow-sm"><Facebook size={22} /></a>
                    <a href="https://www.instagram.com/infini2.4/" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-slate-50 text-slate-500 flex items-center justify-center hover:bg-[#B48646] hover:text-white transition-all duration-300 hover:scale-110 shadow-sm"><Instagram size={22} /></a>
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