
import React, { useState, useEffect } from 'react';
import { ChevronLeft, Video, PenTool, LifeBuoy, Palette, Lock, X, Check, ArrowRight, Mail, Eye, Calculator, ShieldCheck, HelpCircle, Trophy, Smartphone, Zap } from 'lucide-react';
import { ServiceType } from '../types';
import toast from 'react-hot-toast';

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
    toast.success("Ouverture de votre messagerie...", { icon: '📧' });
    setStep('success');

    const subject = encodeURIComponent(`[COMMANDE] ${serviceName} - ${name}`);
    let methodLabel = contactMethod === 'phone' ? "TÉLÉPHONE / SMS" : (contactMethod === 'whatsapp' ? "WHATSAPP" : "EMAIL");

    const body = encodeURIComponent(`Bonjour Infini 24,

Je souhaite lancer mon projet avec vous.

SERVICE : ${serviceName}
PRIX ESTIMÉ : ${price}€

--- MES COORDONNÉES ---
Nom : ${name}
Contact de préférence : ${methodLabel} (${contactInfo})

--- DÉTAILS DU PROJET ---
${customDetails}

--- FICHIERS JOINTS ---
(J'ajoute mes photos, logos ou exemples en pièce jointe de ce mail)

Dans l'attente de votre validation,
Cordialement.`);

    setTimeout(() => {
        window.location.href = `mailto:Wendy.toussaint@icloud.com?subject=${subject}&body=${body}`;
    }, 1000);

    setTimeout(() => {
        onSuccess();
        onClose();
    }, 5000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative bg-white sm:rounded-[2.5rem] rounded-t-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden animate-in slide-in-from-bottom duration-500 border border-white/20">
        <div className="border-b border-slate-100 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[#B48646]/10 p-2.5 rounded-xl text-[#B48646]">
                 <ShieldCheck size={18} />
            </div>
            <span className="text-sm font-bold text-slate-800">Finaliser ma demande</span>
          </div>
          <button onClick={onClose} className="bg-slate-100 p-2.5 rounded-full text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          {step === 'info' && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Récapitulatif</h3>
                <p className="text-slate-500 text-sm font-medium">
                    Vous avez configuré <span className="text-[#B48646] font-bold">"{serviceName}"</span>.
                </p>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <h4 className="font-bold text-slate-800 text-sm mb-2 flex items-center gap-2">
                      <Lock size={14} /> Informations importantes
                  </h4>
                  <ul className="text-xs text-slate-500 space-y-2">
                      <li>1. Validez ce formulaire avec vos infos.</li>
                      <li>2. Votre application Mail s'ouvre avec le résumé.</li>
                      <li className="font-bold">3. IMPORTANT : Ajoutez vos photos/logos en pièce jointe dans le mail qui va s'ouvrir.</li>
                  </ul>
              </div>
              <button onClick={() => setStep('info')} className="hidden" /> {/* Fix: ensures no direct skip */}
              <button onClick={() => setStep('contact')} className="w-full mt-4 bg-slate-900 text-white font-bold py-5 rounded-[1.5rem] transition-all active:scale-95 text-lg flex items-center justify-center gap-2 group">
                  Suivant <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
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
                        <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-[#B48646] outline-none text-sm font-medium" placeholder="Prénom Nom" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 ml-3 mb-2">Préférence de contact</label>
                        <div className="flex gap-2 mb-3">
                             <button type="button" onClick={() => setContactMethod('email')} className={`flex-1 py-3 rounded-xl text-xs font-bold border ${contactMethod === 'email' ? 'bg-[#B48646] border-[#B48646] text-white' : 'bg-slate-50 border-transparent text-slate-400'}`}>Email</button>
                             <button type="button" onClick={() => setContactMethod('phone')} className={`flex-1 py-3 rounded-xl text-xs font-bold border ${contactMethod === 'phone' ? 'bg-[#B48646] border-[#B48646] text-white' : 'bg-slate-50 border-transparent text-slate-400'}`}>Tél / SMS</button>
                        </div>
                        <input type={contactMethod === 'email' ? 'email' : 'tel'} required value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-[#B48646] outline-none text-sm font-medium" placeholder={contactMethod === 'email' ? 'votre@email.com' : '06 00 00 00 00'} />
                    </div>
                </div>
                <button type="submit" className="w-full bg-[#B48646] text-white font-bold py-5 rounded-[1.5rem] transition-all active:scale-95 text-lg flex items-center justify-center gap-2 group">
                    Envoyer ma demande <Mail size={20} />
                </button>
            </form>
          )}

          {step === 'success' && (
            <div className="flex flex-col items-center justify-center py-8 text-center animate-in zoom-in duration-300">
              <div className="w-24 h-24 bg-[#B48646]/10 text-[#B48646] rounded-full flex items-center justify-center mb-6 shadow-xl shadow-[#B48646]/10">
                <Check size={48} strokeWidth={3} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Demande envoyée !</h3>
              <p className="text-sm text-slate-500">Vérifiez votre application Mail pour finaliser l'envoi.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// 1. Graphic Design Form
const GraphicDesignForm = ({ onBack, onRequest }: FormProps) => {
    const [subService, setSubService] = useState<string>('identity_complete'); 
    const [price, setPrice] = useState<number>(370); 
    const [companyName, setCompanyName] = useState('');
    const [details, setDetails] = useState('');

    useEffect(() => {
        let basePrice = 0;
        switch(subService) {
            case 'identity_complete': basePrice = 370; break; 
            case 'logo_creation': basePrice = 200; break;
            case 'print': basePrice = 50; break; 
            case 'social_kit': basePrice = 120; break;
            default: basePrice = 0;
        }
        setPrice(basePrice);
    }, [subService]);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let serviceName = subService === 'identity_complete' ? "Pack Identité Complète" : (subService === 'logo_creation' ? "Création Logo" : (subService === 'print' ? "Print" : "Kit Réseaux"));
        const fullDetails = `• Entreprise : ${companyName}\n• Préférences : ${details}`;
        onRequest(serviceName, price, fullDetails);
    };

    const renderConfigPanel = () => (
        <div className="space-y-6 animate-in slide-in-from-top duration-300">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 space-y-6 overflow-visible">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-4">
                    <Palette size={14} /> Personnalisation
                </h3>
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">Nom de l'entreprise</label>
                    <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="w-full px-6 py-4 border-2 border-slate-100 rounded-2xl focus:border-[#B48646] outline-none transition-all bg-slate-50 text-sm" placeholder="Ex: Boulangerie Durand" required />
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">Détails de votre vision</label>
                    <textarea value={details} onChange={(e) => setDetails(e.target.value)} className="w-full px-6 py-4 border-2 border-slate-100 rounded-2xl outline-none text-sm focus:border-[#B48646] bg-slate-50 transition-all resize-none" rows={3} placeholder="Couleurs, ambiance, préférences..."></textarea>
                </div>
            </div>
            <div className="bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 text-center text-white shadow-2xl">
                <span className="block text-xs text-[#B48646] uppercase tracking-widest font-black mb-2">Tarif Estimé</span>
                <span className="text-6xl font-extrabold tracking-tight">{price}€</span>
            </div>
            <button type="submit" className="w-full bg-[#B48646] text-white font-bold text-lg py-5 rounded-[2rem] shadow-xl shadow-[#B48646]/20 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-3">
                Valider la configuration
            </button>
        </div>
    );

    return (
        <div className="flex flex-col h-full overflow-y-auto no-scrollbar pb-20">
            <header className="pt-14 pb-10 px-6 bg-white border-b border-slate-50 rounded-b-[3rem] mb-6 shrink-0 z-20 shadow-sm">
                 <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-[#B48646] transition-all">
                        <ChevronLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 leading-none mb-1">Logos & Design</h1>
                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Identité visuelle sur-mesure</p>
                    </div>
                </div>
            </header>
            <div className="max-w-5xl mx-auto px-6 w-full">
                <form className="grid grid-cols-1 lg:grid-cols-2 gap-8" onSubmit={handleFormSubmit}>
                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm overflow-visible">
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Nos Formules</label>
                        <div className="grid gap-5">
                            <label className={`relative border-2 p-6 rounded-[2rem] cursor-pointer transition-all ${subService === 'identity_complete' ? 'bg-[#B48646]/5 border-[#B48646]' : 'bg-slate-50 border-transparent'}`}>
                                <div className="flex items-start gap-4">
                                    <input type="radio" checked={subService === 'identity_complete'} onChange={() => setSubService('identity_complete')} className="w-5 h-5 accent-[#B48646] mt-1" />
                                    <div>
                                        <span className="font-bold block text-lg text-slate-900">Pack Identité Complète</span>
                                        <span className="text-[#B48646] font-black text-sm">370€</span>
                                    </div>
                                </div>
                            </label>
                            <label className={`relative border-2 p-5 rounded-[2rem] cursor-pointer transition-all ${subService === 'logo_creation' ? 'bg-[#B48646]/5 border-[#B48646]' : 'bg-slate-50 border-transparent'}`}>
                                <div className="flex items-start gap-4">
                                    <input type="radio" checked={subService === 'logo_creation'} onChange={() => setSubService('logo_creation')} className="w-5 h-5 accent-[#B48646] mt-1" />
                                    <div>
                                        <span className="font-bold text-slate-900 block text-base">Création & Refonte Logo</span>
                                        <span className="text-[#B48646] font-black text-sm">200€</span>
                                    </div>
                                </div>
                            </label>
                            <label className={`relative border-2 p-5 rounded-[2rem] cursor-pointer transition-all ${subService === 'print' ? 'bg-[#B48646]/5 border-[#B48646]' : 'bg-slate-50 border-transparent'}`}>
                                <div className="flex items-start gap-4">
                                    <input type="radio" checked={subService === 'print'} onChange={() => setSubService('print')} className="w-5 h-5 accent-[#B48646] mt-1" />
                                    <div>
                                        <span className="font-bold text-slate-900 block text-base">Cartes de Visite & Flyers</span>
                                        <span className="text-[#B48646] font-black text-sm">50€</span>
                                    </div>
                                </div>
                            </label>
                        </div>
                    </div>
                    <div className="hidden lg:block sticky top-6 overflow-visible">
                        {renderConfigPanel()}
                    </div>
                    <div className="lg:hidden overflow-visible">
                        {renderConfigPanel()}
                    </div>
                </form>
            </div>
        </div>
    );
};

// 2. Video Form
const VideoForm = ({ onBack, onRequest }: FormProps) => {
    const [subService, setSubService] = useState<string>('birthday'); 
    const [photos, setPhotos] = useState<number>(50);
    const [duration, setDuration] = useState<number>(10);
    const [price, setPrice] = useState<number>(0);

    const isProFormat = subService === 'short' || subService === 'ads';

    const estimatedDurationInSeconds = isProFormat ? (subService === 'short' ? 60 : 30) : (photos * 4.2);
    const estMin = Math.floor(estimatedDurationInSeconds / 60);
    const estSec = Math.round(estimatedDurationInSeconds % 60);

    const musicsNeeded = isProFormat ? 1 : Math.max(1, Math.ceil(estimatedDurationInSeconds / 210));

    useEffect(() => {
        let basePrice = 0;
        let photoCost = 0;
        let durationCost = 0;

        if (subService === 'short') {
            basePrice = 20; // Montage Short / TikTok
            photoCost = Math.max(0, (photos - 5) * 2); // Supplément au delà de 5 rushes
        } else if (subService === 'ads') {
            basePrice = 50; // Publicité Express
            photoCost = Math.max(0, (photos - 10) * 3); // Supplément au delà de 10 rushes
        } else {
            basePrice = subService === 'wedding' ? 60 : 40;
            photoCost = photos * 0.5;
            durationCost = duration * 10;
        }
        
        setPrice(basePrice + photoCost + durationCost);
    }, [photos, duration, subService]);

    const handleOrder = () => {
        let typeLabel = '';
        switch(subService) {
            case 'birthday': typeLabel = 'Anniversaire'; break;
            case 'wedding': typeLabel = 'Mariage'; break;
            case 'funeral': typeLabel = 'Hommage'; break;
            case 'short': typeLabel = 'Short / TikTok / Réel'; break;
            case 'ads': typeLabel = 'Publicité Express'; break;
        }
        const name = `Montage Vidéo ${typeLabel}`;
        const inputLabel = isProFormat ? 'Rushes/Médias' : 'Photos';
        const details = `• Type : ${typeLabel}\n• ${inputLabel} : ${photos}\n• Durée : ${duration} min`;
        onRequest(name, price, details);
    }

    const renderPricingSimulator = () => (
        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 space-y-8 relative overflow-visible z-30">
            <h3 className="text-xs font-black text-[#B48646] uppercase tracking-widest flex items-center gap-2">
                <Calculator size={14} /> Simulateur de Prix
            </h3>
            
            <div className="space-y-6 overflow-visible">
                <div className="flex items-center justify-between relative overflow-visible">
                    <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                        <span>{isProFormat ? 'Nombre de rushes / clips' : 'Nombre de photos'}</span>
                        <div className="group relative z-40">
                            <HelpCircle size={18} className="text-[#B48646] cursor-help transition-all group-hover:scale-110 active:scale-90" />
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-5 w-[280px] md:w-[340px] p-6 bg-slate-900 text-white text-[11px] leading-relaxed rounded-[2rem] opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)] z-[9999] border border-[#B48646]/40 backdrop-blur-md">
                                <p className="font-medium text-slate-100 italic">
                                    {isProFormat 
                                        ? "Pour les formats réseaux, nous optimisons vos rushes pour un montage ultra-dynamique. Les prix de base incluent un nombre limité de sources pour garantir la rapidité."
                                        : "\"Pour un montage dynamique et émouvant, nous recommandons une exposition de 4 à 5 secondes par photo. 50 photos correspondent environ à une musique standard (3min30).\""
                                    }
                                </p>
                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-[12px] border-transparent border-t-slate-900"></div>
                            </div>
                        </div>
                    </label>
                    <span className="text-[#B48646] bg-[#B48646]/10 px-4 py-1.5 rounded-xl font-black text-xs shadow-sm">{photos} {isProFormat ? 'fichiers' : 'photos'}</span>
                </div>
                
                <div className="pt-2">
                  <input 
                      type="range" 
                      min={isProFormat ? "1" : "10"} 
                      max={isProFormat ? "50" : "500"} 
                      step={isProFormat ? "1" : "10"} 
                      value={photos} 
                      onChange={(e) => setPhotos(parseInt(e.target.value))} 
                      className="w-full h-2.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#B48646] hover:accent-[#946d38] transition-all" 
                  />
                </div>

                <div className="flex flex-col gap-1.5 pl-3 pt-2 border-l-4 border-[#B48646]">
                    <p className="text-[13px] font-bold text-slate-700">
                        Durée estimée : <span className="text-slate-900 text-base font-black">~{estMin}min {estSec.toString().padStart(2, '0')}s</span>
                    </p>
                    <p className="text-[11px] font-black uppercase tracking-widest flex items-center gap-1.5 text-[#B48646]">
                        <div className="w-1.5 h-1.5 rounded-full animate-pulse bg-[#B48646]"></div>
                        {isProFormat ? 'Format vertical optimisé' : `Idéal pour ${musicsNeeded} musique${musicsNeeded > 1 ? 's' : ''}`}
                    </p>
                </div>
            </div>

            <div className="p-8 rounded-[2.5rem] text-center text-white relative shadow-2xl border border-white/5 transition-all duration-500 bg-slate-900">
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[70px] opacity-10 -mr-16 -mt-16 pointer-events-none bg-[#B48646]"></div>
                <span className="block text-xs text-[#B48646] uppercase tracking-widest font-black mb-3 relative z-10">Total de votre projet</span>
                <span className="block text-6xl font-extrabold tracking-tighter relative z-10">{price}€</span>
            </div>

            <button onClick={handleOrder} className="w-full text-white font-bold py-5 rounded-[2rem] transition-all active:scale-95 flex justify-center items-center gap-3 shadow-xl group bg-[#B48646] hover:bg-[#946d38] shadow-[#B48646]/20">
                <Eye size={20} className="group-hover:scale-110 transition-transform"/>
                Lancer la création
            </button>
        </div>
    );

    return (
        <div className="flex flex-col h-full overflow-y-auto no-scrollbar pb-20 overflow-x-visible">
            <header className="pt-14 pb-10 px-6 bg-white border-b border-slate-50 rounded-b-[3rem] mb-6 shrink-0 z-20 shadow-sm relative">
                 <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-[#B48646] transition-all">
                        <ChevronLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 leading-none mb-1">Vidéos & Souvenirs</h1>
                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Montage pro de vos moments</p>
                    </div>
                </div>
            </header>
            <div className="max-w-5xl mx-auto px-6 w-full overflow-visible">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 overflow-visible">
                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm mb-6 overflow-visible">
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Type de projet</label>
                        <div className="space-y-4">
                            {[
                                { id: 'birthday', icon: Zap, label: 'Anniversaire / Retraite' },
                                { id: 'wedding', icon: Zap, label: 'Mariage / Baptême' },
                                { id: 'funeral', icon: Zap, label: 'Hommage & Obsèques' },
                                { id: 'short', icon: Smartphone, label: 'Montage Short / TikTok / Réel' },
                                { id: 'ads', icon: Zap, label: 'Publicité Express' }
                            ].map((type) => (
                                <label key={type.id} className={`border-2 p-6 rounded-[2rem] flex items-center gap-4 cursor-pointer transition-all ${subService === type.id ? 'bg-[#B48646]/5 border-[#B48646] shadow-sm' : 'bg-slate-50 border-transparent hover:bg-white'}`}>
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${subService === type.id ? 'border-[#B48646]' : 'border-slate-200'}`}>
                                      {subService === type.id && <div className="w-3 h-3 rounded-full bg-[#B48646]" />}
                                    </div>
                                    <input type="radio" checked={subService === type.id} onChange={() => { setSubService(type.id); setPhotos(type.id === 'short' ? 5 : (type.id === 'ads' ? 10 : 50)); }} className="hidden" />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-base font-bold text-slate-800 block">{type.label}</span>
                                            {type.id === 'short' && <Smartphone size={14} className="text-[#B48646]" />}
                                        </div>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="sticky top-6 lg:mb-12 overflow-visible z-30">
                        {renderPricingSimulator()}
                    </div>
                </div>
            </div>
        </div>
    );
};

// 3. Assistance Form
const AssistanceForm = ({ onBack, onRequest }: FormProps) => {
    const [photoCount, setPhotoCount] = useState<number>(1);
    const [details, setDetails] = useState('');
    const price = photoCount * 5;

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onRequest("Assistance Rapide", price, `• Photos : ${photoCount}\n• Description : ${details}`);
    };

    return (
        <div className="flex flex-col h-full overflow-y-auto no-scrollbar pb-20">
             <header className="pt-14 pb-10 px-6 bg-white border-b border-slate-50 rounded-b-[3rem] mb-6 shrink-0 z-20 shadow-sm">
                 <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-[#B48646] transition-all">
                        <ChevronLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 leading-none mb-1">Assistance</h1>
                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Support graphique immédiat</p>
                    </div>
                </div>
            </header>
            <div className="max-w-5xl mx-auto px-6 w-full">
                <form className="grid grid-cols-1 lg:grid-cols-2 gap-8" onSubmit={handleFormSubmit}>
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
                         <div>
                            <label className="flex justify-between text-sm font-bold text-slate-700 mb-3">
                                <span>Nombre de photos</span>
                                <span className="text-[#B48646] bg-[#B48646]/5 px-3 py-1 rounded-xl font-bold text-xs">{photoCount} photos</span>
                            </label>
                            <input type="range" min="1" max="20" step="1" value={photoCount} onChange={(e) => setPhotoCount(parseInt(e.target.value))} className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#B48646]" />
                        </div>
                        <textarea value={details} onChange={(e) => setDetails(e.target.value)} className="w-full px-6 py-4 border-2 border-slate-100 rounded-2xl outline-none text-sm bg-slate-50 focus:border-[#B48646] transition-all" rows={5} placeholder="Expliquez votre besoin..." required></textarea>
                    </div>
                    <div className="space-y-6">
                        <div className="bg-slate-900 p-8 rounded-[2.5rem] text-center text-white">
                            <span className="block text-xs text-[#B48646] uppercase tracking-widest font-black mb-2">Prix fixe : 5€ / unité</span>
                            <span className="text-6xl font-black">{price}€</span>
                        </div>
                        <button type="submit" className="w-full bg-[#B48646] text-white font-bold py-5 rounded-[2rem] transition-all flex items-center justify-center gap-3 shadow-lg shadow-[#B48646]/20">
                             Envoyer ma demande
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

interface FormProps {
    onBack: () => void;
    onRequest: (name: string, price: number, details: string) => void;
}

const ServicesPage: React.FC<{initialService: ServiceType | null, onClearInitial: () => void, onNavigateToContest: () => void}> = ({ initialService, onClearInitial, onNavigateToContest }) => {
  const [selectedService, setSelectedService] = useState<ServiceType | null>(initialService);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [currentServiceName, setCurrentServiceName] = useState("");
  const [currentServicePrice, setCurrentServicePrice] = useState<number | string>(0);
  const [currentServiceDetails, setCurrentServiceDetails] = useState("");

  useEffect(() => { if (initialService) setSelectedService(initialService); }, [initialService]);

  const handleBack = () => { setSelectedService(null); onClearInitial(); };
  const handleProjectRequest = (name: string, price: number, details: string) => {
      setCurrentServiceName(name);
      setCurrentServicePrice(price);
      setCurrentServiceDetails(details);
      setShowProjectModal(true);
  };

  const renderContent = () => {
    if (selectedService === ServiceType.VIDEO) return <VideoForm onBack={handleBack} onRequest={handleProjectRequest} />;
    if (selectedService === ServiceType.GRAPHIC_DESIGN) return <GraphicDesignForm onBack={handleBack} onRequest={handleProjectRequest} />;
    if (selectedService === ServiceType.ASSISTANCE) return <AssistanceForm onBack={handleBack} onRequest={handleProjectRequest} />;

    return (
      <div className="flex flex-col h-full overflow-y-auto no-scrollbar relative">
         {/* FLOATY CONTEST BADGE */}
         <div 
            onClick={onNavigateToContest}
            className="fixed bottom-24 right-6 md:right-8 z-40 animate-bounce cursor-pointer group"
         >
            <div className="bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10 group-hover:bg-[#B48646] transition-all">
                <Trophy size={18} className="text-[#B48646] group-hover:text-white" />
                <span className="text-[10px] font-black uppercase tracking-widest">Jeu Gratuit</span>
            </div>
         </div>

         <header className="pt-16 pb-12 px-8 bg-white border-b border-slate-50 rounded-b-[3rem] mb-8 shrink-0 z-10 shadow-sm relative">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-2">Nos Services</h1>
            <p className="text-slate-500 font-medium text-sm md:text-base">Choisissez l'expertise dont vous avez besoin.</p>
         </header>
         
         <div className="max-w-7xl mx-auto w-full px-6 pb-24 grid grid-cols-1 md:grid-cols-3 gap-6 overflow-visible">
            {[
                { type: ServiceType.GRAPHIC_DESIGN, icon: PenTool, label: "Design Graphique", desc: "Logos & Identité" },
                { type: ServiceType.VIDEO, icon: Video, label: "Vidéo & Souvenirs", desc: "Montages Pro" },
                { type: ServiceType.ASSISTANCE, icon: LifeBuoy, label: "Assistance Rapide", desc: "Aides ponctuelles" }
            ].map(s => (
                <div key={s.type} onClick={() => setSelectedService(s.type)} className="group bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-50 hover:border-[#B48646]/30 transition-all cursor-pointer flex flex-col items-center text-center h-full">
                    <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#B48646] group-hover:text-white transition-all duration-300">
                        <s.icon size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{s.label}</h3>
                    <p className="text-slate-400 text-sm mb-6">{s.desc}</p>
                    <div className="mt-auto">
                        <span className="text-xs font-bold text-[#B48646] group-hover:underline">Configurer mon projet</span>
                    </div>
                </div>
            ))}
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
            onSuccess={() => { setSelectedService(null); onClearInitial(); }}
        />
    </>
  );
};

export default ServicesPage;
