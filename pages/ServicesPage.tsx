
import React, { useState, useEffect } from 'react';
import { ChevronLeft, Sliders, CheckCircle, Video, PenTool, LifeBuoy, Crown, Palette, Film, Lock, X, Check, ArrowRight, Phone, Mail, MessageCircle, ShieldCheck, Eye, Sparkles, Calculator, Gift, Snowflake } from 'lucide-react';
import { ServiceType } from '../types';
import toast from 'react-hot-toast';

// --- PROMO SETTINGS ---
const PROMO_FACTOR = 0.5; // -50%
const PROMO_LABEL = "OFFRE DE NOËL (-50%)";

// --- PROJECT WORKFLOW MODAL ---
interface ProjectWorkflowModalProps {
  serviceName: string;
  price: number | string;
  customDetails: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const ProjectWorkflowModal: React.FC<ProjectWorkflowModalProps> = ({ serviceName, price, customDetails, isOpen, onClose, onSuccess }) => {
  const [step, setStep] = useState<'info' | 'contact' | 'success'>('info');
  const [contactMethod, setContactMethod] = useState<'phone' | 'whatsapp' | 'email'>('email');
  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');

  // Reset modal state when opening
  useEffect(() => {
    if (isOpen) {
        setStep('info');
        setName('');
        setContactInfo('');
        setContactMethod('email');
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Affichage succès immédiat
    toast.success("Ouverture de votre messagerie...", { icon: '📧' });
    setStep('success');

    // Préparation Mail
    const subject = encodeURIComponent(`[COMMANDE NOEL] ${serviceName} - ${name}`);
    
    let methodLabel = "EMAIL";
    if (contactMethod === 'phone') methodLabel = "TÉLÉPHONE / SMS";
    if (contactMethod === 'whatsapp') methodLabel = "WHATSAPP";

    const body = encodeURIComponent(`Bonjour Infini 24,

Je souhaite profiter de l'OFFRE DE NOËL (-50%) pour mon projet.

SERVICE : ${serviceName}
PRIX PROMO : ${price}€ (Remise de 50% incluse)

--- MES COORDONNÉES ---
Nom : ${name}
Contact de préférence : ${methodLabel} (${contactInfo})

--- DÉTAILS DU PROJET ---
${customDetails}

--- FICHIERS JOINTS ---
(J'ajoute mes photos, logos ou exemples en pièce jointe de ce mail)

Dans l'attente de votre validation,
Cordialement.`);

    // Ouverture Mail
    setTimeout(() => {
        window.location.href = `mailto:Wendy.toussaint@icloud.com?subject=${subject}&body=${body}`;
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
        
        {/* Header Festive */}
        <div className="bg-gradient-to-r from-red-50 to-white border-b border-red-100 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-red-500/10 p-2.5 rounded-xl text-red-600">
                 <Gift size={18} />
            </div>
            <span className="text-sm font-bold text-slate-800">Finaliser la demande de Noël</span>
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
                    Vous avez configuré <span className="text-red-600 font-bold">"{serviceName}"</span>.
                </p>
                <div className="mt-3 inline-block px-4 py-1.5 bg-red-100 text-red-700 rounded-full text-xs font-black tracking-widest animate-pulse">
                    -50% APPLIQUÉ
                </div>
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

              <button onClick={() => setStep('contact')} className="w-full mt-4 bg-gradient-to-r from-red-600 to-red-800 hover:shadow-xl hover:shadow-red-600/30 text-white font-bold py-5 rounded-[1.5rem] transition-all active:scale-95 text-lg flex items-center justify-center gap-2 group">
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
                            autoComplete="name"
                            inputMode="text"
                            spellCheck="true"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-xs font-bold text-slate-500 ml-3 mb-2">Préférence de contact</label>
                        <div className="flex gap-2 mb-3">
                             <button 
                                type="button" 
                                onClick={() => { setContactMethod('email'); }} 
                                className={`flex-1 py-3 rounded-xl text-xs font-bold border transition-all ${contactMethod === 'email' ? 'bg-red-50 border-red-600 text-white shadow-lg' : 'bg-slate-50 border-transparent text-slate-400'}`}
                             >
                                 Email
                             </button>
                             <button 
                                type="button" 
                                onClick={() => { setContactMethod('phone'); }} 
                                className={`flex-1 py-3 rounded-xl text-xs font-bold border transition-all ${contactMethod === 'phone' ? 'bg-red-50 border-red-600 text-white shadow-lg' : 'bg-slate-50 border-transparent text-slate-400'}`}
                             >
                                 Tél / SMS
                             </button>
                        </div>

                        <input 
                            type={contactMethod === 'email' ? 'email' : 'tel'} 
                            required
                            value={contactInfo}
                            onChange={(e) => setContactInfo(e.target.value)}
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-[#B48646] focus:ring-4 focus:ring-[#B48646]/10 outline-none text-sm font-medium"
                            placeholder={contactMethod === 'email' ? 'votre@email.com' : '06 00 00 00 00'}
                            autoComplete={contactMethod === 'email' ? 'email' : 'tel'}
                            inputMode={contactMethod === 'email' ? 'email' : 'tel'}
                        />
                    </div>
                </div>

                <button type="submit" className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:shadow-xl hover:shadow-red-600/30 text-white font-bold py-5 rounded-[1.5rem] transition-all active:scale-95 text-lg flex items-center justify-center gap-2 group">
                    Valider mon offre de Noël <Mail size={20} />
                </button>
            </form>
          )}

          {step === 'success' && (
            <div className="flex flex-col items-center justify-center py-8 text-center animate-in zoom-in duration-300">
              <div className="w-24 h-24 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-red-100/50 animate-bounce">
                <Gift size={48} strokeWidth={3} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Mail prêt !</h3>
              <p className="text-sm text-slate-500 mb-4">
                  Vérifiez votre application Mail.<br/>
                  <span className="font-bold text-red-600">La remise de 50% est incluse dans le résumé.</span>
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
}

// 1. Graphic Design Form
const GraphicDesignForm = ({ onBack, onRequest, initialValues }: FormProps) => {
    const [subService, setSubService] = useState<string>('identity_complete'); 
    const [price, setPrice] = useState<number>(370); 
    
    // Form Inputs
    const [companyName, setCompanyName] = useState('');
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
        let basePrice = 0;
        switch(subService) {
            case 'identity_complete': basePrice = 370; break; 
            case 'logo_creation': basePrice = 200; break;
            case 'print': basePrice = 50; break; 
            case 'social_kit': basePrice = 120; break;
            default: basePrice = 0;
        }
        // APPLY PROMO
        setPrice(basePrice * PROMO_FACTOR);
    }, [subService]);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let serviceName = "Design Graphique";
        if(subService === 'identity_complete') serviceName = "Pack Identité Complète";
        if(subService === 'logo_creation') serviceName = "Création & Refonte Logo";
        if(subService === 'print') serviceName = "Cartes de Visite & Flyers";
        if(subService === 'social_kit') serviceName = "Kit Réseaux Sociaux";
        
        const fullDetails = `• Entreprise : ${companyName || 'Non renseigné'}
• Préférences / Idées : ${details}
• REMISE NOËL : -50% appliqué`;

        onRequest(serviceName, price, fullDetails);
    };

    const renderConfigPanel = () => (
        <div className="space-y-6 animate-in slide-in-from-top duration-300">
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
                        autoComplete="organization"
                        spellCheck="true"
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
                        spellCheck="true"
                    ></textarea>
                </div>
            </div>

            <div className="bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 text-center relative overflow-hidden text-white shadow-2xl">
                <div className="absolute top-0 left-0 w-32 h-32 bg-red-600 blur-[60px] opacity-30 rounded-full pointer-events-none animate-pulse"></div>
                
                <span className="block text-xs text-red-400 uppercase tracking-widest font-black mb-2 relative z-10">{PROMO_LABEL}</span>
                <div className="flex flex-col items-center justify-center gap-0 relative z-10">
                    <span className="text-slate-500 line-through text-lg font-bold">{price / PROMO_FACTOR}€</span>
                    <span className="text-6xl font-extrabold tracking-tight text-red-500">{price}€</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-2 font-medium relative z-10">Remise automatique jusqu'au 11 janv.</p>
            </div>

            <button type="submit" className="w-full bg-gradient-to-r from-red-600 to-red-800 text-white font-bold text-lg py-5 rounded-[2rem] shadow-xl shadow-red-600/30 hover:shadow-2xl hover:shadow-red-600/40 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-3 group">
                    <Gift size={22} className="group-hover:rotate-12 transition-transform" /> Profiter de mon offre
            </button>
        </div>
    );

    return (
        <div className="flex flex-col h-full overflow-y-auto no-scrollbar pb-20">
            {/* Form Header Festive */}
            <header className="relative pt-14 pb-10 px-6 bg-white border-b border-red-50 rounded-b-[3rem] mb-6 overflow-hidden shadow-sm shrink-0 z-20">
                 <div className="absolute top-0 right-0 w-48 h-48 bg-red-500/5 rounded-full blur-[60px] -mr-10 -mt-10 pointer-events-none"></div>
                 <div className="relative z-10 flex items-center gap-4">
                    <button onClick={onBack} className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-red-600 hover:shadow-lg transition-all group shadow-sm">
                        <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform"/>
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold font-['Poppins'] text-slate-900 leading-none mb-1">
                            Logos & Design <span className="text-red-600 font-black">-50%</span>
                        </h1>
                        <p className="text-red-500 text-xs font-bold uppercase tracking-widest flex items-center gap-2"><Gift size={12}/> Offre Fêtes en cours</p>
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
                                    
                                    <label className={`relative border-2 p-6 rounded-[2rem] cursor-pointer transition-all duration-300 hover:scale-[1.02] ${subService === 'identity_complete' ? 'bg-red-50/30 border-red-600 shadow-xl shadow-red-600/10' : 'bg-slate-50 hover:bg-white border-transparent shadow-sm'}`}>
                                        <div className="absolute -top-3 right-6 bg-red-600 text-white text-[10px] font-black px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
                                            -50% NOËL
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${subService === 'identity_complete' ? 'border-red-600' : 'border-slate-200'}`}>
                                                {subService === 'identity_complete' && <div className="w-3 h-3 rounded-full bg-red-600" />}
                                            </div>
                                            <input type="radio" name="subService" value="identity_complete" checked={subService === 'identity_complete'} onChange={() => setSubService('identity_complete')} className="hidden" />
                                            <div className="flex-1">
                                                <span className="font-bold block text-lg text-slate-900">Pack Identité Complète</span>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <span className="text-xs text-slate-400 line-through font-bold">370€</span>
                                                    <span className="inline-block px-3 py-1 bg-red-600 text-white rounded-xl font-black text-sm">185€</span>
                                                </div>
                                            </div>
                                        </div>
                                    </label>

                                    {/* MOBILE SIMULATOR ACCORDION (Hidden on LG) */}
                                    {subService === 'identity_complete' && (
                                        <div className="lg:hidden mt-4 pl-4 border-l-2 border-red-600/20">
                                            {renderConfigPanel()}
                                        </div>
                                    )}

                                    <label className={`relative border-2 p-5 rounded-[2rem] cursor-pointer transition-all duration-300 hover:scale-[1.02] ${subService === 'logo_creation' ? 'bg-red-50/30 border-red-600 shadow-lg' : 'bg-slate-50 hover:bg-white border-transparent shadow-sm'}`}>
                                        <div className="flex items-start gap-4">
                                            <div className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${subService === 'logo_creation' ? 'border-red-600' : 'border-slate-200'}`}>
                                                {subService === 'logo_creation' && <div className="w-2.5 h-2.5 rounded-full bg-red-600" />}
                                            </div>
                                            <input type="radio" name="subService" value="logo_creation" checked={subService === 'logo_creation'} onChange={() => setSubService('logo_creation')} className="hidden" />
                                            <div className="flex-1">
                                                <span className="font-bold text-slate-900 block text-base">Création & Refonte Logo</span>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-xs text-slate-400 line-through font-bold">200€</span>
                                                    <span className="text-sm font-black text-red-600">100€</span>
                                                </div>
                                            </div>
                                        </div>
                                    </label>

                                    {/* MOBILE SIMULATOR ACCORDION (Hidden on LG) */}
                                    {subService === 'logo_creation' && (
                                        <div className="lg:hidden mt-4 pl-4 border-l-2 border-red-600/20">
                                            {renderConfigPanel()}
                                        </div>
                                    )}

                                    <label className={`relative border-2 p-5 rounded-[2rem] cursor-pointer transition-all duration-300 hover:scale-[1.02] ${subService === 'print' ? 'bg-red-50/30 border-red-600 shadow-lg' : 'bg-slate-50 hover:bg-white border-transparent shadow-sm'}`}>
                                        <div className="flex items-start gap-4">
                                            <div className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${subService === 'print' ? 'border-red-600' : 'border-slate-200'}`}>
                                                {subService === 'print' && <div className="w-2.5 h-2.5 rounded-full bg-red-600" />}
                                            </div>
                                            <input type="radio" name="subService" value="print" checked={subService === 'print'} onChange={() => setSubService('print')} className="hidden" />
                                            <div className="flex-1">
                                                <span className="font-bold text-slate-900 block text-base">Cartes de Visite & Flyers</span>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-xs text-slate-400 line-through font-bold">50€</span>
                                                    <span className="text-sm font-black text-red-600">25€</span>
                                                </div>
                                            </div>
                                        </div>
                                    </label>

                                    {/* MOBILE SIMULATOR ACCORDION (Hidden on LG) */}
                                    {subService === 'print' && (
                                        <div className="lg:hidden mt-4 pl-4 border-l-2 border-red-600/20">
                                            {renderConfigPanel()}
                                        </div>
                                    )}

                                </div>
                            </div>

                            {/* DESKTOP CONFIG PANEL (Hidden on Mobile) */}
                            <div className="hidden lg:block sticky top-6">
                                {renderConfigPanel()}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

// 2. Video Form 
const VideoForm = ({ onBack, onRequest, initialValues }: FormProps) => {
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
        
        // Calculate Base
        let calculated = basePrice;
        if (subService === 'digitization') {
            calculated = (tapes * tapePrice) + (Math.ceil(duration / 10) * 5);
        } else if (subService === 'grading') {
             let extraMinutes = Math.max(0, duration - 10);
             calculated = basePrice + (extraMinutes * pricePerMin);
        } else {
             calculated += (photos * pricePerPhoto);
             calculated += (duration * pricePerMin);
             if (subService !== 'birthday' && subService !== 'wedding' && subService !== 'funeral') {
                 calculated += musicCost;
             }
        }

        // APPLY PROMO NOEL
        setPrice(calculated * PROMO_FACTOR);
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
  - REMISE NOËL : -50% appliqué`;
        }

        onRequest(name, price, details);
    }

    const renderPricingSimulator = () => (
        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 space-y-8 animate-in slide-in-from-top duration-300">
            <h3 className="text-xs font-black text-red-600 uppercase tracking-widest flex items-center gap-2">
                <Gift size={14} /> Simulateur de Noël (-50%)
            </h3>
            
            {subService !== 'grading' && subService !== 'digitization' && (
                <div>
                    <label className="flex justify-between text-sm font-bold text-slate-700 mb-3">
                        <span>Nombre de photos</span>
                        <span className="text-red-600 bg-red-50 px-3 py-1 rounded-xl font-bold text-xs">{photos} photos</span>
                    </label>
                    <input type="range" min="10" max="500" step="10" value={photos} onChange={(e) => setPhotos(parseInt(e.target.value))} className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-red-600" />
                </div>
            )}

            {subService === 'digitization' && (
                <div>
                    <label className="flex justify-between text-sm font-bold text-slate-700 mb-3">
                        <span>Nombre de cassettes</span>
                        <span className="text-red-600 bg-red-50 px-3 py-1 rounded-xl font-bold text-xs">{tapes} cassette{tapes > 1 ? 's' : ''}</span>
                    </label>
                    <input type="range" min="1" max="20" step="1" value={tapes} onChange={(e) => setTapes(parseInt(e.target.value))} className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-red-600" />
                </div>
            )}

            <div className="bg-slate-900 p-8 rounded-[2.5rem] text-center border border-slate-800 text-white relative overflow-hidden shadow-inner">
                <div className="absolute top-0 left-0 w-32 h-32 bg-red-600 blur-[60px] opacity-20"></div>
                <span className="block text-xs text-red-400 uppercase tracking-widest font-black relative z-10">{PROMO_LABEL}</span>
                <div className="flex flex-col items-center relative z-10">
                    <span className="text-slate-500 line-through text-lg font-bold">{price / PROMO_FACTOR}€</span>
                    <span className="block text-6xl font-extrabold text-red-500 tracking-tight">{price}€</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-2 font-medium relative z-10">Cadeau : Offre valable jusqu'au 11/01</p>
            </div>

            <button onClick={handleOrder} className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:shadow-xl hover:shadow-red-600/30 hover:-translate-y-1 text-white font-bold py-5 rounded-[2rem] transition-all active:scale-95 flex justify-center items-center gap-3">
                <Eye size={20} /> Valider avec remise -50%
            </button>
        </div>
    );

    return (
        <div className="flex flex-col h-full overflow-y-auto no-scrollbar pb-20">
            {/* Header Festive */}
            <header className="relative pt-14 pb-10 px-6 bg-white border-b border-red-50 rounded-b-[3rem] mb-6 overflow-hidden shadow-sm shrink-0 z-20">
                 <div className="absolute top-0 right-0 w-48 h-48 bg-red-500/5 rounded-full blur-[60px] -mr-10 -mt-10 pointer-events-none"></div>
                 <div className="relative z-10 flex items-center gap-4">
                    <button onClick={onBack} className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-red-600 hover:shadow-lg transition-all group shadow-sm">
                        <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform"/>
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold font-['Poppins'] text-slate-900 leading-none mb-1">
                            Vidéos & Souvenirs <span className="text-red-600 font-black">-50%</span>
                        </h1>
                        <p className="text-red-500 text-xs font-bold uppercase tracking-widest flex items-center gap-2 font-black"><Gift size={12}/> Cadeau de fin d'année</p>
                    </div>
                </div>
            </header>

            <div className="animate-in slide-in-from-bottom duration-300">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm mb-6">
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Type de projet</label>
                                <div className="space-y-4">
                                    {['birthday', 'wedding', 'funeral', 'digitization', 'grading'].map((type) => (
                                        <React.Fragment key={type}>
                                            <label className={`border-2 p-5 rounded-[2rem] flex items-start gap-4 cursor-pointer transition-all duration-300 hover:scale-[1.02] ${subService === type ? 'bg-red-50/20 border-red-600' : 'bg-slate-50 hover:bg-white border-transparent'}`}>
                                                <input type="radio" name="videoType" value={type} checked={subService === type} onChange={() => setSubService(type)} className="w-5 h-5 accent-red-600 mt-1" />
                                                <div className="flex-1">
                                                    <span className="text-sm font-bold text-slate-800 block">
                                                        {type === 'birthday' && 'Diaporama Anniversaire / Retraite'}
                                                        {type === 'wedding' && 'Diaporama Mariage / Baptême'}
                                                        {type === 'funeral' && 'Hommage & Obsèques'}
                                                        {type === 'digitization' && 'Numérisation VHS'}
                                                        {type === 'grading' && 'Retouche Colorimétrique'}
                                                    </span>
                                                    <div className="mt-2 text-[10px] font-black text-red-600 bg-red-100 inline-block px-2 py-0.5 rounded-lg">-50% APPLIQUÉ</div>
                                                </div>
                                            </label>
                                            {subService === type && (
                                                <div className="lg:hidden mt-4 pl-4 border-l-2 border-red-600/20">
                                                    {renderPricingSimulator()}
                                                </div>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="hidden lg:block sticky top-6">
                            {renderPricingSimulator()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// 3. Assistance Form
const AssistanceForm = ({ onBack, onRequest, initialValues }: FormProps) => {
    const [missionType, setMissionType] = useState<string>('retouche');
    const [photoCount, setPhotoCount] = useState<number>(1);
    const [price, setPrice] = useState<number>(5);
    const [details, setDetails] = useState('');
    
    useEffect(() => {
        if (initialValues) {
            if (initialValues.includes("modif_photo")) setMissionType('modif_photo');
            else setMissionType('retouche');
        }
    }, [initialValues]);

    useEffect(() => {
        let base = photoCount * 5;
        // PROMO
        setPrice(base * PROMO_FACTOR);
    }, [missionType, photoCount]);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const name = "Assistance Rapide - Promo Noël";
        const fullDetails = `• Mission : ${missionType}\n• Photos : ${photoCount}\n• Description : ${details}\n• REMISE : -50% Noël appliquée`;
        onRequest(name, price, fullDetails);
    };

    return (
        <div className="flex flex-col h-full overflow-y-auto no-scrollbar pb-20">
             <header className="relative pt-14 pb-10 px-6 bg-white border-b border-red-50 rounded-b-[3rem] mb-6 overflow-hidden shadow-sm shrink-0 z-20">
                 <div className="relative z-10 flex items-center gap-4">
                    <button onClick={onBack} className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-red-600 transition-all">
                        <ChevronLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold font-['Poppins'] text-slate-900 leading-none mb-1">
                            Assistance <span className="text-red-600">Fêtes</span>
                        </h1>
                        <p className="text-red-500 text-xs font-black uppercase tracking-widest flex items-center gap-2"><Snowflake size={12}/> Tarif Spécial Noël : 2.50€ / photo</p>
                    </div>
                </div>
            </header>

            <div className="animate-in slide-in-from-bottom duration-300 px-6">
                <div className="max-w-5xl mx-auto">
                    <form className="grid grid-cols-1 lg:grid-cols-2 gap-8" onSubmit={handleFormSubmit}>
                        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
                             <div>
                                <label className="flex justify-between text-sm font-bold text-slate-700 mb-3">
                                    <span>Nombre de photos</span>
                                    <span className="text-red-600 bg-red-50 px-3 py-1 rounded-xl font-bold text-xs">{photoCount} photo{photoCount > 1 ? 's' : ''}</span>
                                </label>
                                <input type="range" min="1" max="50" step="1" value={photoCount} onChange={(e) => setPhotoCount(parseInt(e.target.value))} className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-red-600" />
                            </div>
                            <textarea 
                                value={details}
                                onChange={(e) => setDetails(e.target.value)}
                                className="w-full px-6 py-4 border-2 border-slate-100 rounded-2xl outline-none text-sm bg-slate-50 focus:bg-white focus:border-red-600 transition-all" 
                                rows={5} 
                                placeholder="Expliquez votre retouche urgente..." 
                                required
                            ></textarea>
                        </div>
                        
                        <div className="space-y-6">
                            <div className="bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 text-center relative overflow-hidden text-white shadow-2xl">
                                <span className="block text-xs text-red-400 uppercase tracking-widest font-black mb-2 relative z-10">{PROMO_LABEL}</span>
                                <div className="flex flex-col items-center justify-center relative z-10">
                                    <span className="text-slate-500 line-through text-lg font-bold">{price / PROMO_FACTOR}€</span>
                                    <span className="text-5xl font-black text-red-500">{price}€</span>
                                </div>
                            </div>
                            <button type="submit" className="w-full bg-gradient-to-r from-red-600 to-red-800 text-white font-bold py-5 rounded-[2rem] transition-all flex items-center justify-center gap-3">
                                <Gift size={20} /> Commander (Offre Noël)
                            </button>
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
}

const ServicesPage: React.FC<ServicesPageProps> = ({ initialService, onClearInitial }) => {
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
    if (selectedService === ServiceType.VIDEO) return <VideoForm onBack={handleBack} onRequest={handleProjectRequest} initialValues={null} />;
    if (selectedService === ServiceType.GRAPHIC_DESIGN) return <GraphicDesignForm onBack={handleBack} onRequest={handleProjectRequest} initialValues={null} />;
    if (selectedService === ServiceType.ASSISTANCE) return <AssistanceForm onBack={handleBack} onRequest={handleProjectRequest} initialValues={null} />;

    return (
      <div className="flex flex-col h-full overflow-y-auto no-scrollbar">
         {/* Main Banner Festive */}
         <header className="relative pt-16 pb-12 px-8 bg-white border-b border-red-50 rounded-b-[3rem] mb-8 overflow-hidden shadow-[0_4px_30px_-15px_rgba(0,0,0,0.05)] shrink-0 z-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-[80px] -mr-16 -mt-16 pointer-events-none"></div>
            
            <div className="relative z-10">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-[10px] font-black uppercase tracking-widest mb-4 border border-red-200 animate-pulse">
                  <Gift size={12} /> CADEAU DE NOËL : -50%
               </div>
               <h1 className="text-3xl md:text-4xl font-extrabold font-['Poppins'] text-slate-900 leading-tight mb-2">
                 Nos Services <span className="text-red-600">Festifs</span>
               </h1>
               <p className="text-slate-500 font-medium max-w-md text-sm md:text-base">
                 Profitez de -50% sur toute l'application jusqu'au 11 janvier 2026.
               </p>
            </div>
         </header>

        {/* Services Grid */}
        <div className="max-w-7xl mx-auto w-full px-6 pb-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-bottom duration-500 delay-100">
            {/* Card 1 */}
            <div 
                onClick={() => setSelectedService(ServiceType.GRAPHIC_DESIGN)}
                className="group bg-white p-8 rounded-[2.5rem] shadow-sm border-2 border-transparent hover:border-red-600/30 transition-all duration-300 cursor-pointer flex flex-col items-center text-center h-full relative overflow-hidden"
            >
                <div className="absolute top-2 right-2 bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded-lg">-50%</div>
                <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:text-white transition-all duration-500">
                    <PenTool size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-6">Design Graphique</h3>
                <div className="mt-auto">
                    <span className="text-xs font-black text-white bg-red-600 px-4 py-2 rounded-xl">Profiter (-50%)</span>
                </div>
            </div>

            {/* Card 2 */}
            <div 
                onClick={() => setSelectedService(ServiceType.VIDEO)}
                className="group bg-white p-8 rounded-[2.5rem] shadow-sm border-2 border-transparent hover:border-red-600/30 transition-all duration-300 cursor-pointer flex flex-col items-center text-center h-full relative overflow-hidden"
            >
                <div className="absolute top-2 right-2 bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded-lg">-50%</div>
                <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:text-white transition-all duration-500">
                    <Video size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-6">Vidéo & Souvenirs</h3>
                <div className="mt-auto">
                    <span className="text-xs font-black text-white bg-red-600 px-4 py-2 rounded-xl">Profiter (-50%)</span>
                </div>
            </div>

            {/* Card 3 */}
            <div 
                onClick={() => setSelectedService(ServiceType.ASSISTANCE)}
                className="group bg-white p-8 rounded-[2.5rem] shadow-sm border-2 border-transparent hover:border-red-600/30 transition-all duration-300 cursor-pointer flex flex-col items-center text-center h-full relative overflow-hidden"
            >
                <div className="absolute top-2 right-2 bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded-lg">-50%</div>
                <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:text-white transition-all duration-500">
                    <LifeBuoy size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-6">Assistance Rapide</h3>
                <div className="mt-auto">
                    <span className="text-xs font-black text-white bg-red-600 px-4 py-2 rounded-xl">Profiter (-50%)</span>
                </div>
            </div>
            </div>
        </div>
      </div>
    );
  };

  return (
    <>
        {renderContent()}
        <ProjectWorkflowModal 
            serviceName={currentServiceName}
            price={currentServicePrice}
            customDetails={currentServiceDetails}
            isOpen={showProjectModal}
            onClose={() => setShowProjectModal(false)}
            onSuccess={handleSuccess}
        />
    </>
  );
};

export default ServicesPage;
