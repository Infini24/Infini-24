
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Facebook, Instagram, Linkedin, MessageCircle, ChevronDown, ChevronUp, HelpCircle, AlertTriangle, Smartphone } from 'lucide-react';
import toast from 'react-hot-toast';

const ContactPage: React.FC = () => {
    const [sending, setSending] = useState(false);
    
    // State for FAQ accordion
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    // Form data state
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        subject: '',
        message: ''
    });
    const [errors, setErrors] = useState<{[key: string]: string}>({});

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const faqData = [
        {
            question: "Comment vous envoyer mes photos ou vidéos ?",
            answer: "C'est très simple ! Vous pouvez nous envoyer vos fichiers directement par mail, via WhatsApp, ou utiliser un lien WeTransfer si les fichiers sont volumineux. Une fois la commande lancée, nous vous guiderons."
        },
        {
            question: "Quels sont les délais de création ?",
            answer: "Pour un logo simple ou un kit réseaux, comptez 3 à 5 jours ouvrés. Pour une identité complète ou une vidéo de mariage, le délai est d'environ 1 semaine à 10 jours selon les échanges."
        },
        {
            question: "Est-ce que vous faites l'impression ?",
            answer: "Nous réalisons uniquement le design graphique (les fichiers). Cependant, nous vous fournissons des fichiers haute qualité prêts à être envoyés chez n'importe quel imprimeur (Vistaprint, imprimeur local, etc.)."
        },
        {
            question: "Combien de modifications puis-je demander ?",
            answer: "Nous incluons jusqu'à 3 allers-retours de modifications dans nos forfaits pour être sûrs que le résultat vous plaise parfaitement."
        },
        {
            question: "Comment se passe le règlement ?",
            answer: "Un acompte peut être demandé pour les gros projets. Sinon, le paiement se fait à la fin, une fois que vous avez validé le visuel final, avant l'envoi des fichiers haute définition."
        },
        {
            question: "J'ai une urgence, c'est possible ?",
            answer: "Oui, contactez-nous directement par téléphone ou SMS. Nous pouvons traiter les demandes urgentes (livraison 24/48h) avec un supplément tarifaire."
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

        window.location.href = `mailto:dywen.officiel7@gmail.com?subject=${emailSubject}&body=${emailBody}`;
        toast.success("Ouverture de votre messagerie...");
        setFormData({ ...formData, message: '' });
    };

  return (
    <div className="flex flex-col h-full overflow-y-auto no-scrollbar">
      
      {/* Banner */}
      <header className="relative pt-16 pb-12 px-8 bg-white border-b border-slate-50 rounded-b-[3rem] mb-8 overflow-hidden shadow-[0_4px_30px_-15px_rgba(0,0,0,0.05)] shrink-0 z-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#B48646]/5 rounded-full blur-[80px] -mr-16 -mt-16 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-slate-900/5 rounded-full blur-[60px] -ml-10 -mb-10 pointer-events-none"></div>
        
        <div className="relative z-10">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B48646]/5 text-[#B48646] text-[10px] font-bold uppercase tracking-widest mb-4 border border-[#B48646]/10">
              <Mail size={12} /> Support
           </div>
           <h1 className="text-3xl md:text-4xl font-extrabold font-['Poppins'] text-slate-900 leading-tight mb-2">
             Contact & Aide
           </h1>
           <p className="text-slate-500 font-medium max-w-md text-sm md:text-base">
             Une question sur un service ou une commande ? Nous sommes là pour vous répondre rapidement.
           </p>
        </div>
      </header>

      <div className="flex-1 px-4 lg:px-8 relative z-20 pb-24 mt-2">
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-8 max-w-7xl mx-auto w-full transition-all">
            
            <div className="text-center mb-10">
                <h2 className="text-xl font-bold text-slate-900 mb-2">Comment préférez-vous échanger ?</h2>
                <p className="text-slate-500 text-sm">Choisissez votre moyen de communication favori.</p>
            </div>

            {/* --- GRID CONTACT OPTIMISÉE (PRIORITÉ SMS/MAIL/FB) --- */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
                
                {/* 1. SMS (PRIORITAIRE) */}
                <a href="sms:+33663083676?body=Bonjour Infini 24, je souhaite vous parler d'un projet..." className="bg-slate-50 p-4 rounded-[2rem] border border-transparent hover:border-[#B48646] hover:bg-white hover:shadow-lg transition-all active:scale-95 flex flex-col items-center justify-center gap-3 group">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-slate-800 shadow-sm group-hover:bg-[#B48646] group-hover:text-white transition-colors">
                        <Smartphone size={22} />
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide group-hover:text-[#B48646]">SMS Rapide</span>
                </a>

                {/* 2. EMAIL DIRECT (PRIORITAIRE) */}
                <a href="mailto:dywen.officiel7@gmail.com" className="bg-slate-50 p-4 rounded-[2rem] border border-transparent hover:border-[#B48646] hover:bg-white hover:shadow-lg transition-all active:scale-95 flex flex-col items-center justify-center gap-3 group">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-slate-800 shadow-sm group-hover:bg-[#B48646] group-hover:text-white transition-colors">
                        <Mail size={22} />
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide group-hover:text-[#B48646]">Email</span>
                </a>

                 {/* 3. FACEBOOK (PRIORITAIRE) */}
                <a href="https://www.facebook.com/profile.php?id=61584316950503" target="_blank" rel="noreferrer" className="bg-slate-50 p-4 rounded-[2rem] border border-transparent hover:border-[#B48646] hover:bg-white hover:shadow-lg transition-all active:scale-95 flex flex-col items-center justify-center gap-3 group">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-slate-800 shadow-sm group-hover:bg-[#B48646] group-hover:text-white transition-colors">
                        <Facebook size={22} />
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide group-hover:text-[#B48646]">Facebook</span>
                </a>

                {/* 4. APPEL */}
                <a href="tel:+33663083676" className="bg-slate-50 p-4 rounded-[2rem] border border-transparent hover:border-[#B48646] hover:bg-white hover:shadow-lg transition-all active:scale-95 flex flex-col items-center justify-center gap-3 group">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-slate-800 shadow-sm group-hover:bg-[#B48646] group-hover:text-white transition-colors">
                        <Phone size={22} />
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide group-hover:text-[#B48646]">Appeler</span>
                </a>

                {/* 5. WHATSAPP (MOINS PRIORITAIRE) */}
                <a href="https://wa.me/33663083676?text=Bonjour%20Infini%2024,%20j'ai%20une%20question%20sur%20un%20projet" target="_blank" rel="noreferrer" className="bg-slate-50 p-4 rounded-[2rem] border border-transparent hover:border-[#B48646] hover:bg-white hover:shadow-lg transition-all active:scale-95 flex flex-col items-center justify-center gap-3 group md:col-span-1 col-span-2">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-slate-800 shadow-sm group-hover:bg-[#B48646] group-hover:text-white transition-colors">
                        <MessageCircle size={22} />
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide group-hover:text-[#B48646]">WhatsApp</span>
                </a>

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Left Col: FAQ */}
                <div>
                    <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100 mb-10 h-full">
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
                                    autoComplete="name"
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
                                    autoComplete="tel"
                                    inputMode="tel"
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
                                autoComplete="email"
                                inputMode="email"
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
                                spellCheck="true"
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
                    <a href="https://www.linkedin.com/company/infini24" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-slate-50 text-slate-500 flex items-center justify-center hover:bg-[#B48646] hover:text-white transition-all duration-300 hover:scale-110 shadow-sm"><Linkedin size={22} /></a>
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
