
import React, { useState, useEffect } from 'react';
import { ChevronLeft, Video, PenTool, LifeBuoy, Palette, Lock, X, Check, ArrowRight, Mail, Eye, Calculator, ShieldCheck, HelpCircle, Trophy, Smartphone, Zap, Cpu } from 'lucide-react';
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
        window.location.href = `mailto:dywen.officiel7@gmail.com?subject=${subject}&body=${body}`;
    }, 1000);

    setTimeout(() => {
        onSuccess();
        onClose();
    }, 5000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl" onClick={onClose}></div>
      <div className="relative bg-slate-900 sm:rounded-[2.5rem] rounded-t-[2rem] sm:rounded-t-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden animate-in slide-in-from-bottom duration-500 border border-white/10">
        <div className="border-b border-white/5 p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[#B48646]/20 p-2.5 rounded-xl text-[#B48646]">
                 <ShieldCheck size={18} />
            </div>
            <span className="text-sm font-bold text-white">Finaliser ma demande</span>
          </div>
          <button onClick={onClose} className="bg-white/5 p-2.5 rounded-full text-slate-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-5 sm:p-8">
          {step === 'info' && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Récapitulatif</h3>
                <p className="text-slate-400 text-sm font-medium">
                    Vous avez configuré <span className="text-[#B48646] font-bold">"{serviceName}"</span>.
                </p>
              </div>
              <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                  <h4 className="font-bold text-slate-200 text-sm mb-2 flex items-center gap-2">
                      <Lock size={14} /> Informations importantes
                  </h4>
                  <ul className="text-xs text-slate-500 space-y-2">
                      <li>1. Validez ce formulaire avec vos infos.</li>
                      <li>2. Votre application Mail s'ouvre avec le résumé.</li>
                      <li className="font-bold">3. IMPORTANT : Ajoutez vos photos/logos en pièce jointe dans le mail qui va s'ouvrir.</li>
                  </ul>
              </div>
              <button onClick={() => setStep('info')} className="hidden" /> {/* Fix: ensures no direct skip */}
              <button onClick={() => setStep('contact')} className="w-full mt-4 bg-gradient-to-r from-[#B48646] via-[#E5B066] to-[#B48646] text-white font-bold py-4 sm:py-5 rounded-2xl sm:rounded-[1.5rem] transition-all active:scale-95 text-lg flex items-center justify-center gap-2 group shadow-lg shadow-[#B48646]/20 border border-white/20">
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
                             <button type="button" onClick={() => setContactMethod('email')} className={`flex-1 py-3 rounded-xl text-xs font-bold border transition-all ${contactMethod === 'email' ? 'bg-gradient-to-r from-[#B48646] to-[#E5B066] border-white/20 text-white shadow-md' : 'bg-white/5 border-white/10 text-slate-400'}`}>Email</button>
                             <button type="button" onClick={() => setContactMethod('phone')} className={`flex-1 py-3 rounded-xl text-xs font-bold border transition-all ${contactMethod === 'phone' ? 'bg-gradient-to-r from-[#B48646] to-[#E5B066] border-white/20 text-white shadow-md' : 'bg-white/5 border-white/10 text-slate-400'}`}>Tél / SMS</button>
                        </div>
                        <input type={contactMethod === 'email' ? 'email' : 'tel'} required value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-[#B48646] outline-none text-sm font-medium" placeholder={contactMethod === 'email' ? 'votre@email.com' : '06 00 00 00 00'} />
                    </div>
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-[#B48646] via-[#E5B066] to-[#B48646] text-white font-bold py-4 sm:py-5 rounded-2xl sm:rounded-[1.5rem] transition-all active:scale-95 text-lg flex items-center justify-center gap-2 group shadow-lg shadow-[#B48646]/20 border border-white/20 hover:scale-[1.02]">
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
const GraphicDesignForm = ({ onBack, onRequest, isEmbedded }: FormProps) => {
    const [subService, setSubService] = useState<string | null>(null); 
    const [price, setPrice] = useState<number>(0); 
    const [companyName, setCompanyName] = useState('');
    const [details, setDetails] = useState('');

    useEffect(() => {
        let basePrice = 0;
        if (!subService) return;
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
        if (!subService) return;
        let serviceName = subService === 'identity_complete' ? "Pack Identité Complète" : (subService === 'logo_creation' ? "Création Logo" : (subService === 'print' ? "Print" : "Kit Réseaux"));
        const fullDetails = `• Entreprise : ${companyName}\n• Préférences : ${details}`;
        onRequest(serviceName, price, fullDetails);
    };

    const renderConfigPanel = () => (
        <div className="space-y-6 animate-in slide-in-from-top duration-500">
                <div className="bg-slate-900/60 backdrop-blur-md p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] shadow-xl border border-white/10 space-y-6 overflow-visible">
                    <h3 className="text-[10px] font-bold text-[#B48646] uppercase tracking-widest flex items-center gap-2 mb-4">
                        <Palette size={14} /> Personnalisation
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1 mb-2">Nom de l'entreprise</label>
                            <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="w-full px-5 py-4 border-2 border-white/5 rounded-2xl focus:border-[#B48646] outline-none transition-all bg-white/5 text-white text-sm font-medium" placeholder="Ex: Boulangerie Durand" required />
                        </div>
                        <div>
                            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1 mb-2">Détails de votre vision</label>
                            <textarea value={details} onChange={(e) => setDetails(e.target.value)} className="w-full px-5 py-4 border-2 border-white/5 rounded-2xl outline-none text-sm font-medium focus:border-[#B48646] bg-white/5 text-white transition-all resize-none" rows={3} placeholder="Couleurs, ambiance, préférences..."></textarea>
                        </div>
                    </div>
                </div>
            <div className="bg-slate-950 p-8 rounded-[2.5rem] border border-white/10 text-center text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-2 right-2">
                    <div className="flex items-center gap-1 bg-[#B48646]/10 px-2 py-0.5 rounded-full border border-[#B48646]/20">
                        <Cpu size={8} className="text-[#B48646]" />
                        <span className="text-[7px] font-black text-[#B48646] uppercase tracking-widest">Finn_Certified</span>
                    </div>
                </div>
                <span className="block text-xs text-[#B48646] uppercase tracking-widest font-black mb-2">Tarif Estimé</span>
                <span className="text-6xl font-extrabold tracking-tight">{price}€</span>
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-[#B48646] via-[#E5B066] to-[#B48646] text-white font-bold text-lg py-4 sm:py-5 rounded-2xl sm:rounded-[2rem] shadow-xl shadow-[#B48646]/20 hover:scale-[1.02] transition-all active:scale-95 flex items-center justify-center gap-3 border border-white/20 aura-24-hover">
                Valider la configuration
            </button>
        </div>
    );

    const formulas = [
        { id: 'identity_complete', label: 'Pack Identité Complète', price: '370€', desc: 'Logo + Charte + Réseaux' },
        { id: 'logo_creation', label: 'Création & Refonte Logo', price: '200€', desc: 'Logo vectoriel haute qualité' },
        { id: 'print', label: 'Cartes de Visite & Flyers', price: '50€', desc: 'Design prêt pour impression' },
        { id: 'social_kit', label: 'Kit Réseaux Sociaux', price: '120€', desc: 'Bannières et avatars pro' }
    ];

    return (
        <div className="flex flex-col min-h-full pb-32">
            {!isEmbedded && (
                <header className="pt-8 pb-6 px-4 sm:pt-14 sm:pb-10 sm:px-6 bg-slate-900/80 backdrop-blur-md border-b border-white/5 rounded-b-[1.5rem] sm:rounded-b-[3rem] mb-4 sm:mb-6 shrink-0 z-20 shadow-sm">
                    <div className="flex items-center gap-3 sm:gap-4">
                        <button onClick={onBack} className="p-2.5 sm:p-3 bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl text-slate-400 hover:text-[#B48646] transition-all">
                            <ChevronLeft size={18} className="sm:w-5 sm:h-5" />
                        </button>
                        <div>
                            <h1 className="text-lg sm:text-2xl font-bold text-white leading-none mb-1">Logos & Design</h1>
                            <p className="text-slate-400 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">Identité visuelle sur-mesure</p>
                        </div>
                    </div>
                </header>
            )}
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 w-full">
                <form className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8" onSubmit={handleFormSubmit}>
                    <div className="xl:col-span-2 bg-slate-900/40 backdrop-blur-md p-5 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] border border-white/5 shadow-sm overflow-visible h-fit">
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Choisissez votre formule</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
                            {formulas.map((item) => (
                                <React.Fragment key={item.id}>
                                    <label 
                                        onClick={() => setSubService(item.id)}
                                        className={`relative border-2 p-4 md:p-6 rounded-2xl md:rounded-[2rem] cursor-pointer transition-all flex items-center justify-between group ${subService === item.id ? 'bg-[#B48646]/10 border-[#B48646] shadow-md' : 'bg-white/5 border-transparent hover:bg-white/10 hover:border-white/10'}`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${subService === item.id ? 'border-[#B48646]' : 'border-slate-600'}`}>
                                                {subService === item.id && <div className="w-2.5 h-2.5 rounded-full bg-[#B48646]" />}
                                            </div>
                                            <div>
                                                <span className={`font-bold block text-sm md:text-lg transition-colors ${subService === item.id ? 'text-white' : 'text-slate-300'}`}>{item.label}</span>
                                                <span className="text-[10px] md:text-xs text-slate-500 font-medium">{item.desc}</span>
                                            </div>
                                        </div>
                                        <span className={`font-black text-sm md:text-lg ${subService === item.id ? 'text-[#B48646]' : 'text-slate-500'}`}>{item.price}</span>
                                    </label>
                                    {/* Mobile Simulator under selected item */}
                                    {subService === item.id && (
                                        <div className="lg:hidden animate-in zoom-in duration-300 mt-4">
                                            {renderConfigPanel()}
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                    <div className="hidden xl:block sticky top-6 overflow-visible">
                        {subService ? renderConfigPanel() : (
                            <div className="bg-slate-900/40 backdrop-blur-md p-12 rounded-[2.5rem] border border-dashed border-white/10 text-center flex flex-col items-center justify-center min-h-[400px]">
                                <Palette size={48} className="text-slate-700 mb-4" />
                                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Sélectionnez une formule pour configurer</p>
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

// 2. Video Form
const VideoForm = ({ onBack, onRequest, isEmbedded }: FormProps) => {
    const [subService, setSubService] = useState<string | null>(null); 
    const [photos, setPhotos] = useState<number>(50);
    const [duration, setDuration] = useState<number>(10);
    const [price, setPrice] = useState<number>(0);

    const isProFormat = subService === 'short' || subService === 'ads';

    const estimatedDurationInSeconds = isProFormat ? (subService === 'short' ? 60 : 30) : (photos * 4.2);
    const estMin = Math.floor(estimatedDurationInSeconds / 60);
    const estSec = Math.round(estimatedDurationInSeconds % 60);

    const musicsNeeded = isProFormat ? 1 : Math.max(1, Math.ceil(estimatedDurationInSeconds / 210));

    useEffect(() => {
        if (!subService) return;
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
        if (!subService) return;
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
        <div className="bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl border border-white/10 space-y-8 relative overflow-visible z-30 animate-in slide-in-from-top duration-500">
            <h3 className="text-xs font-black text-[#B48646] uppercase tracking-widest flex items-center gap-2">
                <Calculator size={14} /> Simulateur de Prix
            </h3>
            
            <div className="space-y-6 overflow-visible">
                <div className="flex items-center justify-between relative overflow-visible">
                    <label className="flex items-center gap-2 text-sm font-bold text-slate-300">
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
                      className="w-full h-2.5 bg-white/5 rounded-lg appearance-none cursor-pointer accent-[#B48646] hover:accent-[#946d38] transition-all" 
                  />
                </div>

                <div className="flex flex-col gap-1.5 pl-3 pt-2 border-l-4 border-[#B48646]">
                    <p className="text-[13px] font-bold text-slate-300">
                        Durée estimée : <span className="text-white text-base font-black">~{estMin}min {estSec.toString().padStart(2, '0')}s</span>
                    </p>
                    <div className="text-[11px] font-black uppercase tracking-widest flex items-center gap-1.5 text-[#B48646]">
                        <div className="w-1.5 h-1.5 rounded-full animate-pulse bg-[#B48646]"></div>
                        {isProFormat ? 'Format vertical optimisé' : `Idéal pour ${musicsNeeded} musique${musicsNeeded > 1 ? 's' : ''}`}
                    </div>
                </div>
            </div>

            <div className="p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] text-center text-white relative shadow-2xl border border-white/10 transition-all duration-500 bg-slate-900/60">
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[70px] opacity-10 -mr-16 -mt-16 pointer-events-none bg-[#B48646]"></div>
                <span className="block text-xs text-[#B48646] uppercase tracking-widest font-black mb-3 relative z-10">Total de votre projet</span>
                <span className="block text-5xl sm:text-6xl font-extrabold tracking-tighter relative z-10">{price}€</span>
            </div>

            <button onClick={handleOrder} className="w-full text-white font-bold py-4 sm:py-5 rounded-2xl sm:rounded-[2rem] transition-all active:scale-95 flex justify-center items-center gap-3 shadow-xl group bg-gradient-to-r from-[#B48646] via-[#E5B066] to-[#B48646] shadow-[#B48646]/20 border border-white/20 hover:scale-[1.02] aura-24-hover">
                <Eye size={20} className="group-hover:scale-110 transition-transform"/>
                Lancer la création
            </button>
        </div>
    );

    const videoTypes = [
        { id: 'birthday', icon: Zap, label: 'Anniversaire / Retraite', desc: 'Émotion et souvenirs' },
        { id: 'wedding', icon: Zap, label: 'Mariage / Baptême', desc: 'Le plus beau jour' },
        { id: 'funeral', icon: Zap, label: 'Hommage & Obsèques', desc: 'Respect et dignité' },
        { id: 'short', icon: Smartphone, label: 'Short / TikTok / Réel', desc: 'Format vertical dynamique' },
        { id: 'ads', icon: Zap, label: 'Publicité Express', desc: 'Boostez votre business' }
    ];

    return (
        <div className="flex flex-col min-h-full pb-32 overflow-x-visible">
            {!isEmbedded && (
                <header className="pt-8 pb-6 px-4 sm:pt-14 sm:pb-10 sm:px-6 bg-slate-900/40 backdrop-blur-xl border-b border-white/5 rounded-b-[1.5rem] sm:rounded-b-[3rem] mb-4 sm:mb-6 shrink-0 z-20 shadow-sm relative">
                    <div className="flex items-center gap-3 sm:gap-4">
                        <button onClick={onBack} className="p-2.5 sm:p-3 bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl text-slate-400 hover:text-[#B48646] transition-all">
                            <ChevronLeft size={18} className="sm:w-5 sm:h-5" />
                        </button>
                        <div>
                            <h1 className="text-lg sm:text-2xl font-bold text-white leading-none mb-1">Vidéos & Souvenirs</h1>
                            <p className="text-slate-400 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">Montage pro de vos moments</p>
                        </div>
                    </div>
                </header>
            )}
            <div className="max-w-[1600px] mx-auto px-6 w-full overflow-visible">
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-10 overflow-visible">
                    <div className="xl:col-span-2 bg-slate-900/40 backdrop-blur-xl p-5 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] border border-white/5 shadow-sm mb-6 overflow-visible h-fit">
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Type de projet</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {videoTypes.map((type) => (
                                <React.Fragment key={type.id}>
                                    <label 
                                        onClick={() => { setSubService(type.id); setPhotos(type.id === 'short' ? 5 : (type.id === 'ads' ? 10 : 50)); }}
                                        className={`border-2 p-4 md:p-6 rounded-2xl md:rounded-[2rem] flex items-center justify-between cursor-pointer transition-all group ${subService === type.id ? 'bg-[#B48646]/10 border-[#B48646] shadow-md' : 'bg-white/5 border-transparent hover:bg-white/10 hover:border-white/20'}`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${subService === type.id ? 'border-[#B48646]' : 'border-white/20'}`}>
                                                {subService === type.id && <div className="w-2.5 h-2.5 rounded-full bg-[#B48646]" />}
                                            </div>
                                            <div>
                                                <span className={`text-sm md:text-lg font-bold transition-colors ${subService === type.id ? 'text-white' : 'text-slate-300'}`}>{type.label}</span>
                                                <span className="text-[10px] md:text-xs text-slate-500 font-medium block">{type.desc}</span>
                                            </div>
                                        </div>
                                        {type.id === 'short' && <Smartphone size={16} className={subService === type.id ? 'text-[#B48646]' : 'text-slate-500'} />}
                                    </label>
                                    {/* Mobile Simulator under selected item */}
                                    {subService === type.id && (
                                        <div className="lg:hidden animate-in zoom-in duration-300 mt-4">
                                            {renderPricingSimulator()}
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                    <div className="hidden xl:block sticky top-6 lg:mb-12 overflow-visible z-30">
                        {subService ? renderPricingSimulator() : (
                            <div className="bg-slate-900/40 backdrop-blur-md p-12 rounded-[2.5rem] border border-dashed border-white/10 text-center flex flex-col items-center justify-center min-h-[400px]">
                                <Video size={48} className="text-slate-700 mb-4" />
                                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Sélectionnez un type de projet pour simuler</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// 3. Assistance Form
const AssistanceForm = ({ onBack, onRequest, isEmbedded }: FormProps) => {
    const [photoCount, setPhotoCount] = useState<number>(1);
    const [details, setDetails] = useState('');
    const price = photoCount * 5;

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onRequest("Assistance Rapide", price, `• Photos : ${photoCount}\n• Description : ${details}`);
    };

    return (
        <div className="flex flex-col min-h-full pb-32">
            {!isEmbedded && (
                <header className="pt-8 pb-6 px-4 sm:pt-14 sm:pb-10 sm:px-6 bg-slate-900/80 backdrop-blur-md border-b border-white/5 rounded-b-[1.5rem] sm:rounded-b-[3rem] mb-4 sm:mb-6 shrink-0 z-20 shadow-sm">
                    <div className="flex items-center gap-3 sm:gap-4">
                        <button onClick={onBack} className="p-2.5 sm:p-3 bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl text-slate-400 hover:text-[#B48646] transition-all">
                            <ChevronLeft size={18} className="sm:w-5 sm:h-5" />
                        </button>
                        <div>
                            <h1 className="text-lg sm:text-2xl font-bold text-white leading-none mb-1">Assistance</h1>
                            <p className="text-slate-400 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">Support graphique immédiat</p>
                        </div>
                    </div>
                </header>
            )}
            <div className="max-w-[1600px] mx-auto px-6 w-full">
                <form className="grid grid-cols-1 xl:grid-cols-3 gap-8" onSubmit={handleFormSubmit}>
                    <div className="xl:col-span-2 bg-slate-900/40 backdrop-blur-md p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] shadow-sm border border-white/5 space-y-6">
                         <div>
                            <label className="flex justify-between text-sm font-bold text-slate-300 mb-3">
                                <span>Nombre de photos</span>
                                <span className="text-[#B48646] bg-[#B48646]/10 px-3 py-1 rounded-xl font-bold text-xs">{photoCount} photos</span>
                            </label>
                            <input type="range" min="1" max="20" step="1" value={photoCount} onChange={(e) => setPhotoCount(parseInt(e.target.value))} className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#B48646]" />
                        </div>
                        <textarea value={details} onChange={(e) => setDetails(e.target.value)} className="w-full px-6 py-4 border-2 border-white/5 rounded-2xl outline-none text-sm bg-white/5 text-white focus:border-[#B48646] transition-all" rows={5} placeholder="Expliquez votre besoin..." required></textarea>
                    </div>
                    <div className="space-y-6">
                        <div className="bg-slate-950 p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] text-center text-white border border-white/5">
                            <span className="block text-xs text-[#B48646] uppercase tracking-widest font-black mb-2">Prix fixe : 5€ / unité</span>
                            <span className="text-6xl font-black">{price}€</span>
                        </div>
                        <button type="submit" className="w-full bg-gradient-to-r from-[#B48646] via-[#E5B066] to-[#B48646] text-white font-bold py-4 sm:py-5 rounded-2xl sm:rounded-[2rem] transition-all flex items-center justify-center gap-3 shadow-lg shadow-[#B48646]/20 border border-white/20 hover:scale-[1.02] aura-24-hover">
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
    isEmbedded?: boolean;
}

const ServicesPage: React.FC<{initialService: ServiceType | null, onClearInitial: () => void, onNavigateToContest: () => void}> = ({ initialService, onClearInitial, onNavigateToContest }) => {
  const [selectedService, setSelectedService] = useState<ServiceType | null>(initialService);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [currentServiceName, setCurrentServiceName] = useState("");
  const [currentServicePrice, setCurrentServicePrice] = useState<number | string>(0);
  const [currentServiceDetails, setCurrentServiceDetails] = useState("");

  useEffect(() => { 
    if (initialService) setSelectedService(initialService); 
  }, [initialService]);

  const handleProjectRequest = (name: string, price: number, details: string) => {
      setCurrentServiceName(name);
      setCurrentServicePrice(price);
      setCurrentServiceDetails(details);
      setShowProjectModal(true);
  };

  const services = [
    { type: ServiceType.GRAPHIC_DESIGN, icon: Palette, label: "Design Graphique", desc: "Logos & Identité" },
    { type: ServiceType.VIDEO, icon: Video, label: "Vidéo & Souvenirs", desc: "Montages Pro" },
    { type: ServiceType.ASSISTANCE, icon: Zap, label: "Assistance Rapide", desc: "Retouches Express" }
  ];

  return (
    <div className="flex flex-col min-h-full relative bg-transparent">
      {/* Header de la page Services */}
      <div className="pt-12 md:pt-20 pb-8 px-4 text-center relative overflow-hidden">
        {/* Filigrane Finn */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 opacity-[0.03] pointer-events-none">
            <img 
                src="https://res.cloudinary.com/dmgqewagr/image/upload/v1773739523/Portrait.png" 
                alt="" 
                className="w-full h-full object-contain grayscale"
                referrerPolicy="no-referrer"
            />
        </div>
        
        <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tighter relative z-10">
          Nos <span className="text-[#B48646]">Services</span>
        </h2>
        <p className="text-slate-400 max-w-5xl mx-auto text-sm md:text-base relative z-10">
          Choisissez une catégorie pour configurer votre projet sur-mesure et obtenir un tarif instantané.
        </p>
      </div>

      {/* Sélecteur de Service Centralisé (Tabs) - Now acts as anchor links */}
      <div className="sticky top-0 z-30 bg-slate-950/50 backdrop-blur-xl border-y border-white/5 py-4 mb-8">
        <div className="max-w-[1600px] mx-auto px-4">
          <div className="flex bg-white/5 p-1.5 rounded-[1.5rem] md:rounded-[2rem] gap-1">
            {services.map((s) => {
              const sectionId = s.type === ServiceType.GRAPHIC_DESIGN ? 'design' : (s.type === ServiceType.VIDEO ? 'video' : 'assistance');
              return (
                <button
                  key={s.type}
                  onClick={() => {
                    const el = document.getElementById(sectionId);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`flex-1 flex flex-col md:flex-row items-center justify-center gap-1 md:gap-3 py-3 md:py-4 rounded-xl md:rounded-[1.5rem] transition-all duration-500 text-slate-400 hover:text-white hover:bg-white/5`}
                >
                  <s.icon size={18} className="text-[#B48646]" />
                  <div className="text-center md:text-left">
                    <span className="block text-[10px] md:text-sm font-black uppercase tracking-wider">{s.label}</span>
                    <span className={`hidden md:block text-[8px] uppercase tracking-widest font-bold opacity-60`}>{s.desc}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Zone de Formulaire Dynamique */}
      <div className="flex-1 animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-24 pb-24">
        <section id="design" className="scroll-mt-32">
          <div className="max-w-[1600px] mx-auto px-4 mb-8">
            <div className="flex items-center gap-4 mb-2">
              <div className="p-3 bg-[#B48646]/10 rounded-2xl text-[#B48646]">
                <Palette size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white">Design Graphique</h3>
            </div>
            <p className="text-slate-400 text-sm ml-16">Logos, identité visuelle et supports de communication.</p>
          </div>
          <GraphicDesignForm onBack={() => {}} onRequest={handleProjectRequest} isEmbedded />
        </section>

        <section id="video" className="scroll-mt-32">
          <div className="max-w-[1600px] mx-auto px-4 mb-8">
            <div className="flex items-center gap-4 mb-2">
              <div className="p-3 bg-[#B48646]/10 rounded-2xl text-[#B48646]">
                <Video size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white">Vidéo & Souvenirs</h3>
            </div>
            <p className="text-slate-400 text-sm ml-16">Montages professionnels pour vos événements et réseaux sociaux.</p>
          </div>
          <VideoForm onBack={() => {}} onRequest={handleProjectRequest} isEmbedded />
        </section>

        <section id="assistance" className="scroll-mt-32">
          <div className="max-w-[1600px] mx-auto px-4 mb-8">
            <div className="flex items-center gap-4 mb-2">
              <div className="p-3 bg-[#B48646]/10 rounded-2xl text-[#B48646]">
                <Zap size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white">Assistance Rapide</h3>
            </div>
            <p className="text-slate-400 text-sm ml-16">Retouches express et support graphique immédiat.</p>
          </div>
          <AssistanceForm onBack={() => {}} onRequest={handleProjectRequest} isEmbedded />
        </section>
      </div>

      <ProjectWorkflowModal 
          serviceName={currentServiceName}
          price={currentServicePrice}
          customDetails={currentServiceDetails}
          isOpen={showProjectModal}
          onClose={() => setShowProjectModal(false)}
          onSuccess={() => { onClearInitial(); }}
      />
    </div>
  );
};

export default ServicesPage;
