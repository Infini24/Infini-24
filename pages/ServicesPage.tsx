import React, { useState, useEffect } from 'react';
import { ChevronLeft, Sliders, CheckCircle, Video, PenTool, LifeBuoy, Crown, Palette, Film, Lock, X, Check, ArrowRight, Phone, Mail, MessageCircle, ShieldCheck, Eye, Sparkles, Calculator } from 'lucide-react';
import { ServiceType, User } from '../types';
import toast from 'react-hot-toast';

// --- PROJECT WORKFLOW MODAL ---
interface ProjectWorkflowModalProps {
  serviceName: string;
  price: number | string;
  customDetails: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  user?: User | null;
}

const ProjectWorkflowModal: React.FC<ProjectWorkflowModalProps> = ({ serviceName, price, customDetails, isOpen, onClose, onSuccess, user }) => {
  const [step, setStep] = useState<'info' | 'contact' | 'success'>('info');
  const [contactMethod, setContactMethod] = useState<'phone' | 'whatsapp' | 'email'>('email');
  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');

  // Prefill user data if logged in
  useEffect(() => {
    if (isOpen) {
        setStep('info');
        if (user) {
            setName(user.name);
            if (user.email) {
                setContactMethod('email');
                setContactInfo(user.email);
            } else if (user.phone) {
                setContactMethod('phone');
                setContactInfo(user.phone);
            }
        }
    }
  }, [isOpen, user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Affichage succès immédiat
    toast.success("Ouverture de votre messagerie...", { icon: '📧' });
    setStep('success');

    // Préparation Mail
    const subject = encodeURIComponent(`[COMMANDE] ${serviceName} - ${name}`);
    
    let methodLabel = "EMAIL";
    if (contactMethod === 'phone') methodLabel = "TÉLÉPHONE / SMS";
    if (contactMethod === 'whatsapp') methodLabel = "WHATSAPP";

    const body = encodeURIComponent(`Bonjour Infini 24,

Je souhaite valider ma commande : ${serviceName}
Budget estimé : ${price}€

--- MES COORDONNÉES ---
Nom : ${name}
Contact de préférence : ${methodLabel} (${contactInfo})
${user?.companyName ? `Entreprise : ${user.companyName}\n` : ''}

--- DÉTAILS DU PROJET ---
${customDetails}

--- FICHIERS JOINTS ---
(J'ajoute mes photos, logos ou exemples en pièce jointe de ce mail)

Dans l'attente de votre validation,
Cordialement.`);

    // Ouverture Mail
    setTimeout(() => {
        window.location.href = `mailto:Dywen.officiel7@gmail.com?subject=${subject}&body=${body}`;
    }, 1000);

    // Fermeture auto
    setTimeout(() => {
        onSuccess();
        onClose();
    }, 5000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={onClose}></div>
      
      <div className="relative bg-white sm:rounded-[2.5rem] rounded-t-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden animate-in slide-in-from-bottom duration-500 border border-white/20">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-100 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[#B48646]/10 p-2.5 rounded-xl text-[#B48646]">
                 <ShieldCheck size={18} />
            </div>
            <span className="text-sm font-bold text-slate-800">Finaliser la demande</span>
          </div>
          <button onClick={onClose} className="bg-slate-100 p-2.5 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          
          {step === 'info' && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Récapitulatif</h3>
                <p className="text-slate-500 text-sm font-medium">
                    Vous avez configuré <span className="text-[#B48646] font-bold">"{serviceName}"</span>.
                </p>
              </div>

              <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
                  <h4 className="font-bold text-orange-800 text-sm mb-2 flex items-center gap-2">
                      <Lock size={14} /> Comment ça marche ?
                  </h4>
                  <ul className="text-xs text-orange-700 space-y-2">
                      <li>1. Validez ce formulaire avec vos infos.</li>
                      <li>2. Votre application Mail s'ouvre avec le résumé.</li>
                      <li className="font-bold">3. IMPORTANT : Vous pourrez ajouter vos photos/logos en pièce jointe directement dans le mail.</li>
                  </ul>
              </div>

              <button onClick={() => setStep('contact')} className="w-full mt-4 bg-gradient-to-r from-[#B48646] to-[#E5B066] hover:shadow-xl hover:shadow-[#B48646]/30 text-white font-bold py-5 rounded-[1.5rem] transition-all active:scale-95 text-lg flex items-center justify-center gap-2 group">
                  J'ai compris, suivant <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
              </button>
            </div>
          )}

          {step === 'contact' && (
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-slate-900">Vos coordonnées</h3>
                    <p className="text-slate-400 text-xs font-medium uppercase tracking-wide">Pour créer votre dossier</p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 ml-3 mb-1">Votre Nom</label>
                        <input 
                            type="text" 
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-[#B48646] focus:ring-4 focus:ring-[#B48646]/10 outline-none text-sm font-medium"
                            placeholder="Prénom Nom"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-xs font-bold text-slate-500 ml-3 mb-2">Préférence de contact</label>
                        <div className="flex gap-2 mb-3">
                             <button 
                                type="button" 
                                onClick={() => { setContactMethod('email'); if(user?.email) setContactInfo(user.email); else setContactInfo(''); }} 
                                className={`flex-1 py-3 rounded-xl text-xs font-bold border transition-all ${contactMethod === 'email' ? 'bg-[#B48646]/10 border-[#B48646] text-[#B48646]' : 'bg-slate-50 border-transparent text-slate-400'}`}
                             >
                                 Email
                             </button>
                             <button 
                                type="button" 
                                onClick={() => { setContactMethod('phone'); if(user?.phone) setContactInfo(user.phone); else setContactInfo(''); }} 
                                className={`flex-1 py-3 rounded-xl text-xs font-bold border transition-all ${contactMethod === 'phone' ? 'bg-[#B48646]/10 border-[#B48646] text-[#B48646]' : 'bg-slate-50 border-transparent text-slate-400'}`}
                             >
                                 Téléphone / SMS
                             </button>
                        </div>

                        <input 
                            type={contactMethod === 'email' ? 'email' : 'tel'} 
                            required
                            value={contactInfo}
                            onChange={(e) => setContactInfo(e.target.value)}
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-[#B48646] focus:ring-4 focus:ring-[#B48646]/10 outline-none text-sm font-medium"
                            placeholder={contactMethod === 'email' ? 'votre@email.com' : '06 00 00 00 00'}
                        />
                    </div>
                </div>

                <button type="submit" className="w-full bg-gradient-to-r from-[#B48646] to-[#E5B066] hover:shadow-xl hover:shadow-[#B48646]/30 text-white font-bold py-5 rounded-[1.5rem] transition-all active:scale-95 text-lg flex items-center justify-center gap-2 group">
                    Ouvrir mon mail <Mail size={20} />
                </button>
            </form>
          )}

          {step === 'success' && (
            <div className="flex flex-col items-center justify-center py-8 text-center animate-in zoom-in duration-300">
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-green-100/50 animate-bounce">
                <Check size={48} strokeWidth={3} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Mail prêt !</h3>
              <p className="text-sm text-slate-500 mb-4">
                  Vérifiez votre application Mail.<br/>
                  <span className="font-bold text-[#B48646]">N'oubliez pas d'ajouter vos pièces jointes !</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


// --- Sub-components for Forms ---
interface FormProps {
    onBack: () => void;
    onRequest: (name: string, price: number, details: string) => void;
    initialValues?: string | null;
    user?: User | null;
}

// 1. Graphic Design Form
const GraphicDesignForm = ({ onBack, onRequest, initialValues, user }: FormProps) => {
    const [subService, setSubService] = useState<string>('identity_complete'); 
    const [price, setPrice] = useState<number>(320); 
    
    // Form Inputs
    const [companyName, setCompanyName] = useState(user?.companyName || '');
    const [details, setDetails] = useState('');

    useEffect(() => {
        if (initialValues) {
             if (initialValues.includes("Création")) setSubService('logo_creation');
             else if (initialValues.includes("Kit")) setSubService('social_kit');
             else if (initialValues.includes("Carte")) setSubService('print');
             else setSubService('identity_complete');
        }
    }, [initialValues]);

    useEffect(() => {
        switch(subService) {
            case 'identity_complete': setPrice(320); break; 
            case 'logo_creation': setPrice(200); break;
            case 'print': setPrice(50); break; 
            case 'social_kit': setPrice(120); break;
            default: setPrice(0);
        }
    }, [subService]);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let serviceName = "Design Graphique";
        if(subService === 'identity_complete') serviceName = "Pack Identité Complète";
        if(subService === 'logo_creation') serviceName = "Création & Refonte Logo";
        if(subService === 'print') serviceName = "Cartes de Visite & Flyers";
        if(subService === 'social_kit') serviceName = "Kit Réseaux Sociaux";
        
        const fullDetails = `• Entreprise : ${companyName || 'Non renseigné'}
• Préférences / Idées : ${details}`;

        onRequest(serviceName, price, fullDetails);
    };

    return (
        <div className="flex flex-col h-full overflow-y-auto no-scrollbar pb-20">
            {/* Form Header */}
            <header className="relative pt-14 pb-10 px-6 bg-white border-b border-slate-50 rounded-b-[3rem] mb-6 overflow-hidden shadow-sm shrink-0 z-20">
                 <div className="absolute top-0 right-0 w-48 h-48 bg-[#B48646]/5 rounded-full blur-[60px] -mr-10 -mt-10 pointer-events-none"></div>
                 <div className="relative z-10 flex items-center gap-4">
                    <button onClick={onBack} className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-[#B48646] hover:shadow-lg transition-all group shadow-sm">
                        <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform"/>
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold font-['Poppins'] text-slate-900 leading-none mb-1">
                            Logos & Design
                        </h1>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Identité Visuelle</p>
                    </div>
                </div>
            </header>

            <div className="animate-in slide-in-from-bottom duration-300">
                <div className="max-w-5xl mx-auto px-6">
                    <form className="space-y-6" onSubmit={handleFormSubmit}>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Choisissez votre formule</label>
                                <div className="grid gap-5">
                                    
                                    <label className={`relative border-2 p-6 rounded-[2rem] cursor-pointer transition-all duration-300 hover:scale-[1.02] ${subService === 'identity_complete' ? 'bg-[#fffcf5] border-[#B48646] shadow-xl shadow-[#B48646]/10' : 'bg-slate-50 hover:bg-white border-transparent shadow-sm'}`}>
                                        {subService === 'identity_complete' && (
                                            <div className="absolute -top-3 right-6 bg-red-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
                                                <Crown size={12} fill="white" /> OFFRE SPÉCIALE
                                            </div>
                                        )}
                                        <div className="flex items-start gap-4">
                                            <div className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${subService === 'identity_complete' ? 'border-[#B48646]' : 'border-slate-200'}`}>
                                                {subService === 'identity_complete' && <div className="w-3 h-3 rounded-full bg-[#B48646]" />}
                                            </div>
                                            <input type="radio" name="subService" value="identity_complete" checked={subService === 'identity_complete'} onChange={() => setSubService('identity_complete')} className="hidden" />
                                            <div className="flex-1">
                                                <span className="font-bold block text-lg text-slate-900">Pack Identité Complète</span>
                                                <div className="mt-3 space-y-1.5">
                                                    {[
                                                        "1 Création Logo sur mesure",
                                                        "1 Bannière réseaux sociaux",
                                                        "Design Cartes & Flyers OFFERT (Impression sur devis)",
                                                    ].map((item, i) => (
                                                        <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                                                            <Check size={10} className="text-[#B48646] stroke-[3]" /> {item}
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="flex items-center gap-2 mt-3 pt-2 border-t border-slate-100/50">
                                                    <span className="text-xs text-slate-400 line-through font-bold">370€</span>
                                                    <span className="inline-block px-3 py-1.5 bg-[#B48646]/10 text-[#B48646] rounded-xl font-bold text-sm">320€</span>
                                                </div>
                                                <p className="text-[10px] text-[#B48646] font-bold mt-1">50€ de Cartes de Visite & Flyers OFFERTS !</p>
                                            </div>
                                        </div>
                                    </label>

                                    <label className={`border-2 p-5 rounded-[2rem] cursor-pointer transition-all duration-300 hover:scale-[1.02] ${subService === 'logo_creation' ? 'bg-[#fffcf5] border-[#B48646] shadow-lg' : 'bg-slate-50 hover:bg-white border-transparent shadow-sm'}`}>
                                        <div className="flex items-start gap-4">
                                            <div className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${subService === 'logo_creation' ? 'border-[#B48646]' : 'border-slate-200'}`}>
                                                {subService === 'logo_creation' && <div className="w-2.5 h-2.5 rounded-full bg-[#B48646]" />}
                                            </div>
                                            <input type="radio" name="subService" value="logo_creation" checked={subService === 'logo_creation'} onChange={() => setSubService('logo_creation')} className="hidden" />
                                            <div className="flex-1">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="font-bold text-slate-900 block text-base">Création & Refonte Logo</span>
                                                    <span className="font-bold text-sm text-[#B48646]">200€</span>
                                                </div>
                                                <div className="space-y-1">
                                                    {[
                                                        "Création de Logo Unique",
                                                        "Refonte & Modernisation",
                                                        "Design sur mesure"
                                                    ].map((item, i) => (
                                                        <div key={i} className="flex items-center gap-2 text-[10px] text-slate-500">
                                                            <Check size={10} className="text-[#B48646]" /> {item}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </label>

                                    <label className={`border-2 p-5 rounded-[2rem] cursor-pointer transition-all duration-300 hover:scale-[1.02] ${subService === 'print' ? 'bg-[#fffcf5] border-[#B48646] shadow-lg' : 'bg-slate-50 hover:bg-white border-transparent shadow-sm'}`}>
                                        <div className="flex items-start gap-4">
                                            <div className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${subService === 'print' ? 'border-[#B48646]' : 'border-slate-200'}`}>
                                                {subService === 'print' && <div className="w-2.5 h-2.5 rounded-full bg-[#B48646]" />}
                                            </div>
                                            <input type="radio" name="subService" value="print" checked={subService === 'print'} onChange={() => setSubService('print')} className="hidden" />
                                            <div className="flex-1">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="font-bold text-slate-900 block text-base">Cartes de Visite & Flyers</span>
                                                    <span className="font-bold text-sm text-[#B48646]">50€</span>
                                                </div>
                                                <div className="space-y-1">
                                                     {[
                                                        "Design sur mesure",
                                                        "Fichiers pour l'imprimeur",
                                                        "Recto / Verso",
                                                        "Impression en option"
                                                    ].map((item, i) => (
                                                        <div key={i} className="flex items-center gap-2 text-[10px] text-slate-500">
                                                            <Check size={10} className="text-[#B48646]" /> {item}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </label>

                                    <label className={`border-2 p-5 rounded-[2rem] cursor-pointer transition-all duration-300 hover:scale-[1.02] ${subService === 'social_kit' ? 'bg-[#fffcf5] border-[#B48646] shadow-lg' : 'bg-slate-50 hover:bg-white border-transparent shadow-sm'}`}>
                                        <div className="flex items-start gap-4">
                                            <div className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${subService === 'social_kit' ? 'border-[#B48646]' : 'border-slate-200'}`}>
                                                {subService === 'social_kit' && <div className="w-2.5 h-2.5 rounded-full bg-[#B48646]" />}
                                            </div>
                                            <input type="radio" name="subService" value="social_kit" checked={subService === 'social_kit'} onChange={() => setSubService('social_kit')} className="hidden" />
                                            <div className="flex-1">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="font-bold text-slate-900 block text-base">Kit Réseaux Sociaux</span>
                                                    <span className="font-bold text-sm text-[#B48646]">120€</span>
                                                </div>
                                                <div className="space-y-1">
                                                     {[
                                                        "Bannière réseaux sociaux",
                                                        "Photo de Profil",
                                                        "Design sur mesure"
                                                    ].map((item, i) => (
                                                        <div key={i} className="flex items-center gap-2 text-[10px] text-slate-500">
                                                            <Check size={10} className="text-[#B48646]" /> {item}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </label>

                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 space-y-6">
                                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-4">
                                        <Palette size={14} /> Personnalisation
                                    </h3>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-3">Nom de l'entreprise</label>
                                        <input 
                                            type="text" 
                                            value={companyName}
                                            onChange={(e) => setCompanyName(e.target.value)}
                                            className="w-full px-6 py-4 border-2 border-slate-100 rounded-2xl focus:border-[#B48646] focus:ring-4 focus:ring-[#B48646]/10 outline-none transition-all bg-slate-50 focus:bg-white text-sm" 
                                            placeholder="Ex: Boulangerie Durand" 
                                            required 
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-3">Détails</label>
                                        <textarea 
                                            value={details}
                                            onChange={(e) => setDetails(e.target.value)}
                                            className="w-full px-6 py-4 border-2 border-slate-100 rounded-2xl outline-none text-sm focus:border-[#B48646] focus:ring-4 focus:ring-[#B48646]/10 bg-slate-50 focus:bg-white transition-all resize-none" 
                                            rows={3} 
                                            placeholder="Couleurs, ambiance, préférences..."
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 text-center relative overflow-hidden text-white shadow-2xl">
                                    <div className="absolute top-0 left-0 w-32 h-32 bg-[#B48646] blur-[60px] opacity-30 rounded-full pointer-events-none animate-pulse"></div>
                                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#F3C06B] blur-[60px] opacity-20 rounded-full pointer-events-none"></div>
                                    
                                    <span className="block text-xs text-slate-400 uppercase tracking-widest font-bold mb-2 relative z-10">Total Estimé</span>
                                    <div className="flex flex-col items-center justify-center gap-0 relative z-10">
                                        {subService === 'identity_complete' && (
                                             <span className="text-white/50 line-through text-lg font-bold">370€</span>
                                        )}
                                        <span className="text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#B48646] to-[#F3C06B]">{price}€</span>
                                    </div>
                                    <p className="text-[10px] text-slate-400 mt-2 font-medium relative z-10">Paiement uniquement à la validation finale</p>
                                    
                                </div>

                                <button type="submit" className="w-full bg-gradient-to-r from-[#B48646] to-[#E5B066] text-white font-bold text-lg py-5 rounded-[2rem] shadow-xl shadow-[#B48646]/30 hover:shadow-2xl hover:shadow-[#B48646]/40 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-3 group">
                                     <Eye size={22} className="group-hover:scale-100 transition-transform" /> Lancer le projet
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

// 2. Video Form 
const VideoForm = ({ onBack, onRequest, initialValues, user }: FormProps) => {
    const [subService, setSubService] = useState<string>('birthday'); 
    const [photos, setPhotos] = useState<number>(50);
    const [duration, setDuration] = useState<number>(10);
    const [tapes, setTapes] = useState<number>(1);
    const [musicOption, setMusicOption] = useState<boolean>(true);
    const [price, setPrice] = useState<number>(0);
    
    // Promo specifics
    const [promoObjective, setPromoObjective] = useState('');
    const [promoDesc, setPromoDesc] = useState('');

    useEffect(() => {
        if (initialValues) {
            if (initialValues.includes("Mariage")) setSubService('wedding');
            else if (initialValues.includes("Promo")) setSubService('promo');
            else if (initialValues.includes("Color")) setSubService('grading');
            else if (initialValues.includes("Hommage")) setSubService('funeral');
            else if (initialValues.includes("VHS")) setSubService('digitization');
            else setSubService('birthday');
        }
    }, [initialValues]);

    useEffect(() => {
        let basePrice = 40;
        let pricePerPhoto = 0.5;
        let pricePerMin = 10;
        let musicCost = musicOption ? 15 : 0;
        let tapePrice = 5; 

        if (subService === 'wedding') {
            basePrice = 60;
        } else if (subService === 'grading') {
            basePrice = 20; 
            pricePerMin = 1; 
            pricePerPhoto = 0; 
            musicCost = 0; 
        } else if (subService === 'funeral') {
            basePrice = 40;
        } else if (subService === 'digitization') {
            basePrice = 0; 
            musicCost = 0;
        }
        
        // Calculate
        let calculated = basePrice;
        if (subService === 'digitization') {
            calculated = (tapes * tapePrice) + (Math.ceil(duration / 10) * 5);
        } else if (subService === 'grading') {
             let extraMinutes = Math.max(0, duration - 10);
             calculated = basePrice + (extraMinutes * pricePerMin);
        } else {
             calculated += (photos * pricePerPhoto);
             calculated += (duration * pricePerMin);
        }

        if (subService !== 'grading' && subService !== 'birthday' && subService !== 'wedding' && subService !== 'funeral' && subService !== 'digitization') {
            calculated += musicCost;
        }
        
        setPrice(calculated);
    }, [photos, duration, musicOption, subService, tapes]);

    const handleOrder = () => {
        let name = "Vidéo Souvenir";
        let details = "";

        if (subService === 'promo') {
            name = "Montage Vidéo Promotionnel";
            details = `• Objectif : ${promoObjective}\n• Description : ${promoDesc}`;
        } else {
            if (subService === 'wedding') name = "Diaporama Mariage / Baptême";
            if (subService === 'birthday') name = "Diaporama Anniversaire / Retraite";
            if (subService === 'funeral') name = "Hommage & Obsèques";
            if (subService === 'grading') name = "Retouche Colorimétrique";
            if (subService === 'digitization') name = "Numérisation VHS";
            
            details = `• Configuration : 
  - ${photos} photos (si applicable)
  - Durée estimée : ${duration} min
  - Cassettes : ${tapes} (si applicable)
  - Option Musique : ${musicOption ? 'Oui' : 'Non'}`;
        }

        onRequest(name, price, details);
    }

    return (
        <div className="flex flex-col h-full overflow-y-auto no-scrollbar pb-20">
            {/* Form Header */}
            <header className="relative pt-14 pb-10 px-6 bg-white border-b border-slate-50 rounded-b-[3rem] mb-6 overflow-hidden shadow-sm shrink-0 z-20">
                 <div className="absolute top-0 right-0 w-48 h-48 bg-[#B48646]/5 rounded-full blur-[60px] -mr-10 -mt-10 pointer-events-none"></div>
                 <div className="relative z-10 flex items-center gap-4">
                    <button onClick={onBack} className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-[#B48646] hover:shadow-lg transition-all group shadow-sm">
                        <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform"/>
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold font-['Poppins'] text-slate-900 leading-none mb-1">
                            Vidéo & Souvenirs
                        </h1>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Création Sur Mesure</p>
                    </div>
                </div>
            </header>

            <div className="animate-in slide-in-from-bottom duration-300">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm mb-8 text-center md:text-left flex items-center gap-6">
                         <div className="hidden md:flex w-16 h-16 bg-[#B48646]/10 rounded-2xl items-center justify-center text-[#B48646] shrink-0">
                            <Film size={28} />
                         </div>
                         <p className="text-slate-500 text-sm font-medium leading-relaxed">
                            Transformez vos photos et vidéos en souvenirs inoubliables.
                         </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm mb-6">
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Type de projet</label>
                                <div className="space-y-4">
                                    {['birthday', 'wedding', 'funeral', 'digitization', 'grading', 'promo'].map((type) => (
                                        <label key={type} className={`border-2 p-5 rounded-[2rem] flex items-start gap-4 cursor-pointer transition-all duration-300 hover:scale-[1.02] ${subService === type ? 'bg-[#fffcf5] border-[#B48646]' : 'bg-slate-50 hover:bg-white border-transparent'}`}>
                                            <input type="radio" name="videoType" value={type} checked={subService === type} onChange={() => setSubService(type)} className="w-5 h-5 accent-[#B48646] mt-1" />
                                            <div>
                                                <span className="text-sm font-bold text-slate-800 block mb-2">
                                                    {type === 'birthday' && 'Diaporama Anniversaire / Retraite'}
                                                    {type === 'wedding' && 'Diaporama Mariage / Baptême'}
                                                    {type === 'funeral' && 'Hommage & Obsèques'}
                                                    {type === 'digitization' && 'Numérisation VHS'}
                                                    {type === 'grading' && 'Retouche Colorimétrique'}
                                                    {type === 'promo' && 'Montage Vidéo Promotionnel'}
                                                </span>
                                                <div className="space-y-1">
                                                    {type === 'birthday' && [
                                                        "Revivez vos souvenirs d'antan",
                                                        "Vidéo émouvante",
                                                        "Musique incluse (au choix)"
                                                    ].map((item, i) => (
                                                        <div key={i} className="flex items-center gap-2 text-[10px] text-slate-500">
                                                            <Check size={10} className="text-[#B48646]" /> {item}
                                                        </div>
                                                    ))}

                                                    {type === 'wedding' && [
                                                        "Revivez vos souvenirs d'antan",
                                                        "Vidéo émouvante",
                                                        "Musique incluse (au choix)"
                                                    ].map((item, i) => (
                                                        <div key={i} className="flex items-center gap-2 text-[10px] text-slate-500">
                                                            <Check size={10} className="text-[#B48646]" /> {item}
                                                        </div>
                                                    ))}

                                                    {type === 'funeral' && [
                                                        "Hommage sobre et élégant",
                                                        "Traitement prioritaire",
                                                        "Musique douce incluse"
                                                    ].map((item, i) => (
                                                        <div key={i} className="flex items-center gap-2 text-[10px] text-slate-500">
                                                            <Check size={10} className="text-[#B48646]" /> {item}
                                                        </div>
                                                    ))}

                                                    {type === 'digitization' && [
                                                        "Transfert VHS vers Numérique",
                                                        "Amélioration Qualité",
                                                        "Livraison Clé USB / Cloud"
                                                    ].map((item, i) => (
                                                        <div key={i} className="flex items-center gap-2 text-[10px] text-slate-500">
                                                            <Check size={10} className="text-[#B48646]" /> {item}
                                                        </div>
                                                    ))}

                                                    {type === 'grading' && [
                                                        "Correction Luminosité & Contraste",
                                                        "Harmonisation des couleurs",
                                                        "Style Cinéma / Vintage / Noir & Blanc"
                                                    ].map((item, i) => (
                                                        <div key={i} className="flex items-center gap-2 text-[10px] text-slate-500">
                                                            <Check size={10} className="text-[#B48646]" /> {item}
                                                        </div>
                                                    ))}

                                                    {type === 'promo' && [
                                                         "Vidéo Promotionnelle (PME)",
                                                         "Format Réseaux Sociaux",
                                                         "Texte & Sous-titres"
                                                    ].map((item, i) => (
                                                        <div key={i} className="flex items-center gap-2 text-[10px] text-slate-500">
                                                            <Check size={10} className="text-[#B48646]" /> {item}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div>
                            {(subService === 'birthday' || subService === 'wedding' || subService === 'grading' || subService === 'funeral' || subService === 'digitization') && (
                                <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 space-y-8 animate-in fade-in duration-300">
                                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        <Sliders size={14} /> Simulateur de tarif
                                    </h3>
                                    
                                    {subService !== 'grading' && subService !== 'digitization' && (
                                        <div>
                                            <label className="flex justify-between text-sm font-bold text-slate-700 mb-3">
                                                <span>Nombre de photos</span>
                                                <span className="text-[#B48646] bg-[#B48646]/10 px-3 py-1 rounded-xl font-bold text-xs">{photos} photos</span>
                                            </label>
                                            <input type="range" min="10" max="500" step="10" value={photos} onChange={(e) => setPhotos(parseInt(e.target.value))} className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#B48646]" />
                                        </div>
                                    )}

                                    {subService === 'digitization' && (
                                        <div>
                                            <label className="flex justify-between text-sm font-bold text-slate-700 mb-3">
                                                <span>Nombre de cassettes</span>
                                                <span className="text-[#B48646] bg-[#B48646]/10 px-3 py-1 rounded-xl font-bold text-xs">{tapes} cassette{tapes > 1 ? 's' : ''}</span>
                                            </label>
                                            <input type="range" min="1" max="20" step="1" value={tapes} onChange={(e) => setTapes(parseInt(e.target.value))} className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#B48646]" />
                                            <p className="text-[10px] text-slate-400 mt-1">5€ par cassette</p>
                                        </div>
                                    )}

                                    {(subService !== 'digitization' || subService === 'digitization') && (
                                        <div>
                                            <label className="flex justify-between text-sm font-bold text-slate-700 mb-3">
                                                <span>{subService === 'digitization' ? 'Durée totale en minutes (estimée)' : 'Durée estimée (minutes)'}</span>
                                                <span className="text-[#B48646] bg-[#B48646]/10 px-3 py-1 rounded-xl font-bold text-xs">{duration} min</span>
                                            </label>
                                            <input type="range" min="1" max="180" step="1" value={duration} onChange={(e) => setDuration(parseInt(e.target.value))} className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#B48646]" />
                                            {subService === 'digitization' && <p className="text-[10px] text-slate-400 mt-1">5€ par tranche de 10 min</p>}
                                            {subService === 'grading' && <p className="text-[10px] text-slate-400 mt-1">Forfait 20€ (10 min inclus) + 1€/min sup.</p>}
                                        </div>
                                    )}

                                    {subService !== 'grading' && subService !== 'digitization' && (
                                        <>
                                            {(subService === 'birthday' || subService === 'wedding' || subService === 'funeral') ? (
                                                <div className="flex items-center justify-between p-5 bg-slate-50 rounded-[1.5rem] border border-slate-100 cursor-default">
                                                    <span className="text-sm font-bold text-slate-700">Montage musical</span>
                                                    <span className="text-[#B48646] font-bold text-xs bg-[#B48646]/10 px-3 py-1 rounded-full border border-[#B48646]/20">INCLUS</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-between p-5 bg-slate-50 rounded-[1.5rem] border border-transparent hover:bg-white hover:shadow-md hover:border-slate-100 transition-all cursor-pointer" onClick={() => setMusicOption(!musicOption)}>
                                                    <span className="text-sm font-bold text-slate-700">Montage musical (+15€)</span>
                                                    <div className={`w-14 h-8 rounded-full p-1 transition-all duration-300 shadow-inner ${musicOption ? 'bg-[#B48646]' : 'bg-slate-300'}`}>
                                                        <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${musicOption ? 'translate-x-6' : 'translate-x-0'}`} />
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )}

                                    <div className="bg-slate-900 p-8 rounded-[2.5rem] text-center border border-slate-800 text-white relative overflow-hidden shadow-inner">
                                        <div className="absolute top-0 left-0 w-32 h-32 bg-[#B48646] blur-[60px] opacity-20"></div>
                                        <span className="block text-xs text-slate-400 uppercase tracking-widest font-bold relative z-10">Total TTC</span>
                                        <span className="block text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#B48646] to-[#F3C06B] mt-2 relative z-10 tracking-tight">{price}€</span>
                                        <p className="text-[10px] text-slate-400 mt-2 font-medium relative z-10">Paiement uniquement à la fin</p>
                                    </div>

                                    <button onClick={handleOrder} className="w-full bg-gradient-to-r from-[#B48646] to-[#E5B066] hover:shadow-xl hover:shadow-[#B48646]/30 hover:-translate-y-1 text-white font-bold py-5 rounded-[2rem] transition-all active:scale-95 flex justify-center items-center gap-3">
                                        <Eye size={20} /> Demander ce projet
                                    </button>
                                </div>
                            )}

                            {subService === 'promo' && (
                                <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 space-y-6 animate-in fade-in duration-300">
                                    <p className="text-sm text-slate-600 bg-[#B48646]/5 p-6 rounded-2xl border border-[#B48646]/20 font-medium leading-relaxed">Pour les vidéos promotionnelles, nous réalisons un devis sur mesure après étude de votre scénario.</p>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-3">Objectif de la vidéo</label>
                                        <input 
                                            type="text" 
                                            value={promoObjective}
                                            onChange={(e) => setPromoObjective(e.target.value)}
                                            className="w-full px-6 py-4 border-2 border-slate-100 rounded-2xl outline-none bg-slate-50 focus:bg-white focus:border-[#B48646] focus:ring-4 focus:ring-[#B48646]/10 transition-all text-sm" 
                                            placeholder="Ex: Présentation produit..." 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-3">Description du projet</label>
                                        <textarea 
                                            value={promoDesc}
                                            onChange={(e) => setPromoDesc(e.target.value)}
                                            className="w-full px-6 py-4 border-2 border-slate-100 rounded-2xl outline-none text-sm bg-slate-50 focus:bg-white focus:border-[#B48646] focus:ring-4 focus:ring-[#B48646]/10 transition-all resize-none" 
                                            rows={4} 
                                            placeholder="Décrivez votre idée..."
                                        ></textarea>
                                    </div>
                                    <button onClick={handleOrder} className="w-full mt-2 bg-slate-900 text-white font-bold py-5 rounded-[2rem] shadow-lg hover:shadow-xl hover:bg-slate-800 transition-all active:scale-95">
                                        Demander un devis
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// 3. Assistance Form
const AssistanceForm = ({ onBack, onRequest, initialValues, user }: FormProps) => {
    const [missionType, setMissionType] = useState<string>('retouche');
    const [photoCount, setPhotoCount] = useState<number>(1);
    const [price, setPrice] = useState<number>(5);
    const [details, setDetails] = useState('');
    
    // Try to restore state if initialValues provided
    useEffect(() => {
        if (initialValues) {
            if (initialValues.includes("modif_photo")) setMissionType('modif_photo');
            else if (initialValues.includes("autre")) setMissionType('autre');
            else setMissionType('retouche');
        }
    }, [initialValues]);

    useEffect(() => {
        if (missionType === 'retouche' || missionType === 'modif_photo') {
            setPrice(photoCount * 5);
        } else {
            setPrice(0);
        }
    }, [missionType, photoCount]);

    const getPriceDisplay = () => {
        if (missionType === 'retouche' || missionType === 'modif_photo') return `${price}€`;
        return 'Sur devis';
    };

    const isFixedPrice = missionType === 'retouche' || missionType === 'modif_photo';

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const finalPrice = isFixedPrice ? price : 0;
        const name = "Assistance - " + missionType;
        const fullDetails = `• Mission : ${missionType}\n• Nombre de photos : ${photoCount}\n• Description : ${details}`;
        onRequest(name, finalPrice, fullDetails);
    };

    return (
        <div className="flex flex-col h-full overflow-y-auto no-scrollbar pb-20">
             {/* Form Header */}
             <header className="relative pt-14 pb-10 px-6 bg-white border-b border-slate-50 rounded-b-[3rem] mb-6 overflow-hidden shadow-sm shrink-0 z-20">
                 <div className="absolute top-0 right-0 w-48 h-48 bg-[#B48646]/5 rounded-full blur-[60px] -mr-10 -mt-10 pointer-events-none"></div>
                 <div className="relative z-10 flex items-center gap-4">
                    <button onClick={onBack} className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-[#B48646] hover:shadow-lg transition-all group shadow-sm">
                        <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform"/>
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold font-['Poppins'] text-slate-900 leading-none mb-1">
                            Assistance Rapide
                        </h1>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Support Immédiat</p>
                    </div>
                </div>
            </header>

            <div className="animate-in slide-in-from-bottom duration-300">
                <div className="max-w-5xl mx-auto px-6">
                    <form className="space-y-6" onSubmit={handleFormSubmit}>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Type de demande</label>
                                <div className="grid gap-4">
                                    {[
                                        {id: 'retouche', label: 'Retouche Photo Simple', desc: '5€ / photo', details: ["Retouche Colorimétrique", "Amélioration Netteté"]},
                                        {id: 'modif_photo', label: 'Modification / Montage', desc: '5€ / photo', details: ["Détourage d'images", "Suppression d'éléments"]}
                                    ].map((item) => (
                                        <label key={item.id} className={`bg-slate-50 border-2 p-5 rounded-[2rem] flex items-start gap-4 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-md ${missionType === item.id ? 'border-[#B48646] ring-1 ring-[#B48646]/20 bg-white' : 'hover:bg-white border-transparent'}`}>
                                            <input type="radio" name="missionType" value={item.id} checked={missionType === item.id} onChange={() => setMissionType(item.id)} className="w-5 h-5 accent-[#B48646] mt-1" />
                                            <div>
                                                <span className="font-bold text-slate-900 text-sm block">{item.label}</span>
                                                <span className="text-xs text-slate-500 font-medium block mb-2">{item.desc}</span>
                                                <div className="space-y-1">
                                                     {item.details.map((detail, i) => (
                                                         <div key={i} className="flex items-center gap-2 text-[10px] text-slate-500">
                                                            <Check size={10} className="text-[#B48646]" /> {detail}
                                                        </div>
                                                     ))}
                                                </div>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="space-y-6">
                                <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100">
                                    {isFixedPrice && (
                                        <div className="mb-6">
                                            <label className="flex justify-between text-sm font-bold text-slate-700 mb-3">
                                                <span>Nombre de photos</span>
                                                <span className="text-[#B48646] bg-[#B48646]/10 px-3 py-1 rounded-xl font-bold text-xs">{photoCount} photo{photoCount > 1 ? 's' : ''}</span>
                                            </label>
                                            <input type="range" min="1" max="50" step="1" value={photoCount} onChange={(e) => setPhotoCount(parseInt(e.target.value))} className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#B48646]" />
                                        </div>
                                    )}

                                    <label className="block text-sm font-bold text-slate-700 mb-3">Détails de la mission</label>
                                    <p className="text-xs text-slate-500 mb-4 font-medium">Soyez le plus précis possible pour un traitement rapide.</p>
                                    <textarea 
                                        value={details}
                                        onChange={(e) => setDetails(e.target.value)}
                                        className="w-full px-6 py-4 border-2 border-slate-100 rounded-2xl outline-none text-sm focus:border-[#B48646] focus:ring-4 focus:ring-[#B48646]/10 bg-slate-50 focus:bg-white transition-all resize-none" 
                                        rows={5} 
                                        placeholder="Expliquez ce que nous devons modifier..." 
                                        required
                                    ></textarea>
                                </div>
                                
                                <div className="bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 text-center relative overflow-hidden text-white shadow-2xl">
                                     <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#B48646] blur-[60px] opacity-30 rounded-full pointer-events-none"></div>
                                    <span className="block text-xs text-slate-400 uppercase tracking-widest font-bold mb-2 relative z-10">Estimation</span>
                                    <div className="flex items-center justify-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-[#B48646] to-[#F3C06B] relative z-10">
                                        <span className="text-5xl font-extrabold tracking-tight">{getPriceDisplay()}</span>
                                    </div>
                                </div>

                                <button type="submit" className="w-full mt-4 bg-gradient-to-r from-[#B48646] to-[#E5B066] hover:shadow-xl hover:shadow-[#B48646]/30 hover:-translate-y-1 text-white font-bold py-5 rounded-[2rem] transition-all active:scale-95 flex items-center justify-center gap-3">
                                     <CheckCircle size={20} /> Envoyer la demande
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

// --- Main Page Component ---

interface ServicesPageProps {
  initialService: ServiceType | null;
  onClearInitial: () => void;
  user?: User | null;
}

const ServicesPage: React.FC<ServicesPageProps> = ({ initialService, onClearInitial, user }) => {
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
  
  // State for Project Modal (Request mode)
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [currentServiceName, setCurrentServiceName] = useState("");
  const [currentServicePrice, setCurrentServicePrice] = useState<number | string>(0);
  const [currentServiceDetails, setCurrentServiceDetails] = useState("");

  useEffect(() => {
    if (initialService) {
      setSelectedService(initialService);
    }
  }, [initialService]);

  const handleBack = () => {
    setSelectedService(null);
    onClearInitial();
  };

  const handleProjectRequest = (name: string, price: number, details: string = "") => {
      setCurrentServiceName(name);
      setCurrentServicePrice(price);
      setCurrentServiceDetails(details);
      setShowProjectModal(true);
  };

  const handleSuccess = () => {
    handleBack(); 
  };

  const renderContent = () => {
    if (selectedService === ServiceType.VIDEO) return <VideoForm onBack={handleBack} onRequest={handleProjectRequest} initialValues={null} user={user} />;
    if (selectedService === ServiceType.GRAPHIC_DESIGN) return <GraphicDesignForm onBack={handleBack} onRequest={handleProjectRequest} initialValues={null} user={user} />;
    if (selectedService === ServiceType.ASSISTANCE) return <AssistanceForm onBack={handleBack} onRequest={handleProjectRequest} initialValues={null} user={user} />;

    return (
      <div className="flex flex-col h-full">
         {/* Main Banner */}
         <header className="relative pt-16 pb-12 px-8 bg-white border-b border-slate-50 rounded-b-[3rem] mb-8 overflow-hidden shadow-[0_4px_30px_-15px_rgba(0,0,0,0.05)] shrink-0 z-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#B48646]/5 rounded-full blur-[80px] -mr-16 -mt-16 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#F3C06B]/10 rounded-full blur-[60px] -ml-10 -mb-10 pointer-events-none"></div>
            
            <div className="relative z-10">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B48646]/5 text-[#B48646] text-[10px] font-bold uppercase tracking-widest mb-4 border border-[#B48646]/10">
                  <Calculator size={12} /> Nos Offres
               </div>
               <h1 className="text-3xl md:text-4xl font-extrabold font-['Poppins'] text-slate-900 leading-tight mb-2">
                 Nos Services
               </h1>
               <p className="text-slate-500 font-medium max-w-md text-sm md:text-base">
                 Des solutions créatives adaptées à vos besoins personnels et professionnels.
               </p>
            </div>
         </header>

        {/* Services Grid */}
        <div className="max-w-7xl mx-auto w-full px-6 pb-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-bottom duration-700 delay-100">
            {/* Card 1 */}
            <div 
                onClick={() => setSelectedService(ServiceType.GRAPHIC_DESIGN)}
                className="group bg-white p-8 rounded-[2.5rem] shadow-[0_10px_30px_-15px_rgba(0,0,0,0.03)] border border-slate-50 hover:border-[#B48646]/20 hover:shadow-[0_20px_40px_-10px_rgba(180,134,70,0.1)] hover:-translate-y-1 transition-all duration-500 cursor-pointer flex flex-col items-center text-center h-full relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[100%] -mr-10 -mt-10 z-0 group-hover:bg-[#B48646]/5 transition-colors"></div>
                
                <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:bg-[#B48646] group-hover:text-white transition-all duration-500 relative z-10">
                    <PenTool size={32} />
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-6 relative z-10">Design Graphique</h3>
                
                <div className="mb-6 relative z-10 w-full px-2">
                    <ul className="space-y-3">
                        <li className="flex items-center gap-3 text-sm text-slate-600 font-medium text-left">
                            <div className="bg-[#B48646]/10 p-1 rounded-full"><Check size={12} className="text-[#B48646]" /></div>
                            Création de Logo Unique
                        </li>
                        <li className="flex items-center gap-3 text-sm text-slate-600 font-medium text-left">
                            <div className="bg-[#B48646]/10 p-1 rounded-full"><Check size={12} className="text-[#B48646]" /></div>
                            Cartes de Visite & Flyers
                        </li>
                        <li className="flex items-center gap-3 text-sm text-slate-600 font-medium text-left">
                            <div className="bg-[#B48646]/10 p-1 rounded-full"><Check size={12} className="text-[#B48646]" /></div>
                            Identité Visuelle Complète
                        </li>
                    </ul>
                </div>
                
                <div className="mt-auto relative z-10">
                    <span className="text-xs font-bold text-[#B48646] bg-[#B48646]/10 px-4 py-2 rounded-xl group-hover:bg-[#B48646] group-hover:text-white transition-colors">Découvrir</span>
                </div>
            </div>

            {/* Card 2 */}
            <div 
                onClick={() => setSelectedService(ServiceType.VIDEO)}
                className="group bg-white p-8 rounded-[2.5rem] shadow-[0_10px_30px_-15px_rgba(0,0,0,0.03)] border border-slate-50 hover:border-[#B48646]/20 hover:shadow-[0_20px_40px_-10px_rgba(180,134,70,0.1)] hover:-translate-y-1 transition-all duration-500 cursor-pointer flex flex-col items-center text-center h-full relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[100%] -mr-10 -mt-10 z-0 group-hover:bg-[#B48646]/5 transition-colors"></div>

                <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:bg-[#B48646] group-hover:text-white transition-all duration-500 relative z-10">
                    <Video size={32} />
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-6 relative z-10">Vidéo & Souvenirs</h3>
                
                <div className="mb-6 relative z-10 w-full px-2">
                    <ul className="space-y-3">
                        <li className="flex items-center gap-3 text-sm text-slate-600 font-medium text-left">
                            <div className="bg-[#B48646]/10 p-1 rounded-full"><Check size={12} className="text-[#B48646]" /></div>
                            Montage Vidéo & Diaporamas
                        </li>
                        <li className="flex items-center gap-3 text-sm text-slate-600 font-medium text-left">
                            <div className="bg-[#B48646]/10 p-1 rounded-full"><Check size={12} className="text-[#B48646]" /></div>
                            Numérisation de Cassettes VHS
                        </li>
                        <li className="flex items-center gap-3 text-sm text-slate-600 font-medium text-left">
                            <div className="bg-[#B48646]/10 p-1 rounded-full"><Check size={12} className="text-[#B48646]" /></div>
                            Retouche Colorimétrique
                        </li>
                    </ul>
                </div>
                
                <div className="mt-auto relative z-10">
                    <span className="text-xs font-bold text-[#B48646] bg-[#B48646]/10 px-4 py-2 rounded-xl group-hover:bg-[#B48646] group-hover:text-white transition-colors">Découvrir</span>
                </div>
            </div>

            {/* Card 3 */}
            <div 
                onClick={() => setSelectedService(ServiceType.ASSISTANCE)}
                className="group bg-white p-8 rounded-[2.5rem] shadow-[0_10px_30px_-15px_rgba(0,0,0,0.03)] border border-slate-50 hover:border-[#B48646]/20 hover:shadow-[0_20px_40px_-10px_rgba(180,134,70,0.1)] hover:-translate-y-1 transition-all duration-500 cursor-pointer flex flex-col items-center text-center h-full relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[100%] -mr-10 -mt-10 z-0 group-hover:bg-[#B48646]/5 transition-colors"></div>

                <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:bg-[#B48646] group-hover:text-white transition-all duration-500 relative z-10">
                    <LifeBuoy size={32} />
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-6 relative z-10">Assistance Rapide</h3>
                
                <div className="mb-6 relative z-10 w-full px-2">
                    <ul className="space-y-3">
                        <li className="flex items-center gap-3 text-sm text-slate-600 font-medium text-left">
                            <div className="bg-[#B48646]/10 p-1 rounded-full"><Check size={12} className="text-[#B48646]" /></div>
                            Retouches Photos Rapides
                        </li>
                        <li className="flex items-center gap-3 text-sm text-slate-600 font-medium text-left">
                            <div className="bg-[#B48646]/10 p-1 rounded-full"><Check size={12} className="text-[#B48646]" /></div>
                            Modifications de Fichiers
                        </li>
                        <li className="flex items-center gap-3 text-sm text-slate-600 font-medium text-left">
                            <div className="bg-[#B48646]/10 p-1 rounded-full"><Check size={12} className="text-[#B48646]" /></div>
                            Détourage & Montages Simples
                        </li>
                    </ul>
                </div>
                
                <div className="mt-auto relative z-10">
                    <span className="text-xs font-bold text-[#B48646] bg-[#B48646]/10 px-4 py-2 rounded-xl group-hover:bg-[#B48646] group-hover:text-white transition-colors">Découvrir</span>
                </div>
            </div>

            </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full overflow-y-auto no-scrollbar">
       <ProjectWorkflowModal 
          isOpen={showProjectModal}
          onClose={() => setShowProjectModal(false)}
          serviceName={currentServiceName}
          price={currentServicePrice}
          customDetails={currentServiceDetails}
          onSuccess={handleSuccess}
          user={user}
       />
       {renderContent()}
    </div>
  );
};

export default ServicesPage;