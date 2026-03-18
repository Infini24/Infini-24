
import React, { useState, useEffect } from 'react';
import { ChevronLeft, Video, PenTool, LifeBuoy, Palette, Lock, X, Check, ArrowRight, Mail, Eye, Calculator, ShieldCheck, HelpCircle, Trophy, Smartphone, Zap, Cpu, Sparkles } from 'lucide-react';
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

// Unified Services Page with 3-column layout
const ServicesPage: React.FC<{initialService: ServiceType | null, onClearInitial: () => void, onNavigateToContest: () => void}> = ({ initialService, onClearInitial, onNavigateToContest }) => {
  const [selectedCategory, setSelectedCategory] = useState<ServiceType>(initialService || ServiceType.GRAPHIC_DESIGN);
  const [selectedFormulaId, setSelectedFormulaId] = useState<string | null>(null);
  
  // Config state
  const [companyName, setCompanyName] = useState('');
  const [details, setDetails] = useState('');
  const [photos, setPhotos] = useState<number>(60);
  const [isExpress, setIsExpress] = useState(false);
  
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [currentServiceName, setCurrentServiceName] = useState("");
  const [currentServicePrice, setCurrentServicePrice] = useState<number | string>(0);
  const [currentServiceDetails, setCurrentServiceDetails] = useState("");

  const graphicFormulas = [
    { id: 'identity_complete', label: 'Pack Identité Complète', price: 370, desc: 'Logo + Charte + Réseaux', info: 'Un pack complet pour lancer votre marque : logo, charte graphique et visuels réseaux sociaux.' },
    { id: 'logo_creation', label: 'Création & Refonte Logo', price: 200, desc: 'Logo vectoriel haute qualité', info: 'Création d\'un logo unique ou modernisation de votre logo actuel.' },
    { id: 'print', label: 'Cartes de Visite & Flyers', price: 50, desc: 'Design prêt pour impression', info: 'Conception de supports papier professionnels prêts à être imprimés.' },
    { id: 'social_kit', label: 'Kit Réseaux Sociaux', price: 120, desc: 'Bannières et avatars pro', info: 'Habillage complet de vos profils sociaux pour une image cohérente.' },
    { id: 'retouch_express', label: 'Retouche Express', price: 25, desc: 'Correction rapide & pro', info: 'Retouches photo rapides : colorimétrie, suppression d\'objets, etc.' }
  ];

  const videoTypes = [
    { id: 'birthday', label: 'Anniversaire / Retraite', price: 190, desc: 'Forfait 100 photos incluses', info: 'Un montage émouvant pour célébrer une vie ou une carrière.' },
    { id: 'wedding', label: 'Mariage / Baptême', price: 230, desc: 'Forfait 100 photos incluses', info: 'Capturez la magie de vos plus beaux événements familiaux.' },
    { id: 'funeral', label: 'Hommage & Obsèques', price: 190, desc: 'Forfait 100 photos incluses', info: 'Un hommage digne et respectueux pour honorer la mémoire.' },
    { id: 'short', label: 'Short / TikTok / Réel', price: 20, desc: 'Format vertical dynamique', info: 'Vidéo courte et percutante pour vos réseaux sociaux.' },
    { id: 'ads', label: 'Publicité Express', price: 50, desc: 'Boostez votre business', info: 'Vidéo promotionnelle pour mettre en avant vos produits ou services.' },
    { id: 'vhs', label: 'Numérisation VHS', price: 15, desc: 'Vos cassettes sur clé USB/Cloud', info: 'Sauvegardez vos vieux souvenirs VHS sur support numérique.' }
  ];

  const calculatePrice = () => {
    if (!selectedFormulaId) return 0;

    if (selectedCategory === ServiceType.VIDEO) {
      const f = videoTypes.find(f => f.id === selectedFormulaId);
      if (!f) return 0;
      
      let basePrice = f.price;
      let extraCost = 0;
      
      if (selectedFormulaId === 'vhs') {
        basePrice = basePrice * photos;
      } else if (selectedFormulaId === 'short') {
        extraCost = Math.max(0, (photos - 10) * 1);
      } else if (selectedFormulaId === 'ads') {
        extraCost = Math.max(0, (photos - 15) * 2);
      } else {
        // Forfaits 190€ / 230€
        // Inclut 100 photos, puis 1€ par photo sup
        extraCost = Math.max(0, (photos - 100) * 1);
      }
      
      const total = basePrice + extraCost + (isExpress ? 50 : 0);
      return Math.round(total);
    }

    if (selectedCategory === ServiceType.GRAPHIC_DESIGN) {
      const f = graphicFormulas.find(f => f.id === selectedFormulaId);
      if (!f) return 0;
      return f.price + (isExpress ? 50 : 0);
    }

    return 0;
  };

  const currentPrice = calculatePrice();

  const handleValidate = () => {
    if (!selectedFormulaId) {
      toast.error("Veuillez sélectionner une formule");
      return;
    }

    let serviceName = "";
    let fullDetails = "";

    if (selectedCategory === ServiceType.GRAPHIC_DESIGN) {
      const f = graphicFormulas.find(f => f.id === selectedFormulaId);
      serviceName = f?.label || "";
      fullDetails = `• Entreprise : ${companyName}\n• Option Express : ${isExpress ? 'OUI (+50€)' : 'NON'}\n• Préférences : ${details}`;
    } else if (selectedCategory === ServiceType.VIDEO) {
      const f = videoTypes.find(f => f.id === selectedFormulaId);
      serviceName = f?.label || "";
      const unitLabel = selectedFormulaId === 'vhs' ? 'Cassettes' : 'Médias';
      const totalSeconds = photos < 60 ? 240 : photos * 4;
      const m = Math.floor(totalSeconds / 60);
      const s = totalSeconds % 60;
      const musicCount = photos <= 60 ? 1 : photos <= 120 ? 2 : 3;
      
      fullDetails = `• ${unitLabel} : ${photos}\n• Durée estimée : ${m}min${s > 0 ? s : ''}\n• Musiques : ${musicCount}\n• Option Express : ${isExpress ? 'OUI (+50€)' : 'NON'}\n• Inclus : Support graphique complet (habillage texte, transitions pro, effets Ken Burns, générique), retouches légères\n• Détails : ${details}`;
    }

    setCurrentServiceName(serviceName);
    setCurrentServicePrice(currentPrice);
    setCurrentServiceDetails(fullDetails);
    setShowProjectModal(true);
    setSelectedFormulaId(null); // Close the config modal
  };

  const services = [
    { type: ServiceType.GRAPHIC_DESIGN, icon: Palette, label: "Design Graphique", desc: "Logos & Identité" },
    { type: ServiceType.VIDEO, icon: Video, label: "Vidéo & Souvenirs", desc: "Montages Pro" }
  ];

  return (
    <div className="flex flex-col min-h-full relative bg-transparent">
      {/* Header */}
      <div className="pt-12 md:pt-16 pb-6 px-4 text-center relative overflow-hidden">
        <h2 className="text-3xl md:text-5xl font-black text-white mb-2 tracking-tighter relative z-10">
          Nos <span className="text-[#B48646]">Services</span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base relative z-10">
          Configurez votre projet sur-mesure et obtenez un tarif instantané.
        </p>
      </div>

      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-30 bg-slate-950/50 backdrop-blur-xl border-y border-white/5 py-4 mb-8">
        <div className="max-w-[1600px] mx-auto px-4">
          <div className="flex bg-white/5 p-1.5 rounded-[1.5rem] md:rounded-[2rem] gap-1">
            {services.map((s) => (
              <button
                key={s.type}
                onClick={() => {
                  setSelectedCategory(s.type);
                  setSelectedFormulaId(null);
                }}
                className={`flex-1 flex flex-col md:flex-row items-center justify-center gap-1 md:gap-3 py-3 md:py-4 rounded-xl md:rounded-[1.5rem] transition-all duration-500 ${
                  selectedCategory === s.type 
                    ? "bg-gradient-to-r from-[#B48646] to-[#E5B066] text-white shadow-lg shadow-[#B48646]/20 scale-[1.02]" 
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <s.icon size={18} className={selectedCategory === s.type ? "text-white" : "text-[#B48646]"} />
                <div className="text-center md:text-left">
                  <span className="block text-[10px] md:text-sm font-black uppercase tracking-wider">{s.label}</span>
                  <span className={`hidden md:block text-[8px] uppercase tracking-widest font-bold opacity-60`}>{s.desc}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main 3-Column Layout */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 w-full pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start max-w-5xl mx-auto">
          
          {/* Column 1: Design Graphique */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-[#B48646]/10 rounded-2xl text-[#B48646]">
                <Palette size={24} />
              </div>
              <h3 className="text-2xl font-black text-white tracking-tight">Design Graphique</h3>
            </div>
            <div className="space-y-4">
              {graphicFormulas.map((f) => (
                <button
                  key={f.id}
                  onClick={() => {
                    setSelectedCategory(ServiceType.GRAPHIC_DESIGN);
                    setSelectedFormulaId(f.id);
                  }}
                  className={`w-full text-left p-6 rounded-[2rem] border-2 transition-all flex items-center justify-between group ${
                    selectedCategory === ServiceType.GRAPHIC_DESIGN && selectedFormulaId === f.id
                      ? "bg-[#B48646]/10 border-[#B48646] shadow-xl shadow-[#B48646]/10"
                      : "bg-slate-900/40 border-transparent hover:border-white/10 hover:bg-slate-900/60"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${selectedCategory === ServiceType.GRAPHIC_DESIGN && selectedFormulaId === f.id ? 'border-[#B48646]' : 'border-slate-600'}`}>
                      {selectedCategory === ServiceType.GRAPHIC_DESIGN && selectedFormulaId === f.id && <div className="w-3 h-3 rounded-full bg-[#B48646]" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="block font-black text-white text-base md:text-lg">{f.label}</span>
                        <div className="group relative">
                          <HelpCircle size={14} className="text-slate-500 hover:text-[#B48646] cursor-help transition-colors" />
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-900 border border-[#B48646]/30 rounded-lg text-[10px] text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-2xl">
                            {f.info}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">{f.desc}</span>
                    </div>
                  </div>
                  <span className="font-black text-[#B48646] text-lg md:text-xl">{f.price}€</span>
                </button>
              ))}
            </div>
          </div>

          {/* Column 2: Vidéo & Souvenirs */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-[#B48646]/10 rounded-2xl text-[#B48646]">
                <Video size={24} />
              </div>
              <h3 className="text-2xl font-black text-white tracking-tight">Vidéo & Souvenirs</h3>
            </div>
            <div className="space-y-4">
              {videoTypes.map((f) => (
                <button
                  key={f.id}
                  onClick={() => {
                    setSelectedCategory(ServiceType.VIDEO);
                    setSelectedFormulaId(f.id);
                    setPhotos(f.id === 'short' ? 5 : (f.id === 'ads' ? 10 : (f.id === 'vhs' ? 1 : 60)));
                  }}
                  className={`w-full text-left p-6 rounded-[2rem] border-2 transition-all flex items-center justify-between group ${
                    selectedCategory === ServiceType.VIDEO && selectedFormulaId === f.id
                      ? "bg-[#B48646]/10 border-[#B48646] shadow-xl shadow-[#B48646]/10"
                      : "bg-slate-900/40 border-transparent hover:border-white/10 hover:bg-slate-900/60"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${selectedCategory === ServiceType.VIDEO && selectedFormulaId === f.id ? 'border-[#B48646]' : 'border-slate-600'}`}>
                      {selectedCategory === ServiceType.VIDEO && selectedFormulaId === f.id && <div className="w-3 h-3 rounded-full bg-[#B48646]" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="block font-black text-white text-base md:text-lg">{f.label}</span>
                        <div className="group relative">
                          <HelpCircle size={14} className="text-slate-500 hover:text-[#B48646] cursor-help transition-colors" />
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-900 border border-[#B48646]/30 rounded-lg text-[10px] text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-2xl">
                            {f.info}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">{f.desc}</span>
                    </div>
                  </div>
                  <span className="font-black text-[#B48646] text-lg md:text-xl">{f.price}€</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Config Panel (Modal) */}
        {selectedFormulaId && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={() => setSelectedFormulaId(null)}></div>
            
            <div className="relative bg-slate-900 rounded-[1.5rem] sm:rounded-[2rem] border border-white/10 shadow-2xl w-full sm:max-w-lg md:max-w-xl animate-in slide-in-from-bottom sm:zoom-in duration-500 overflow-hidden flex flex-col max-h-[90vh]">
              {/* Modal Header */}
              <div className="p-4 md:p-6 border-b border-white/5 flex items-center justify-between sticky top-0 bg-slate-900 z-20 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#B48646]/20 rounded-xl text-[#B48646]">
                    <Sparkles size={18} className="md:w-5 md:h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs md:text-xl font-black text-white uppercase tracking-tight">Configuration du projet</h3>
                    <p className="text-[9px] md:text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                      {selectedCategory === ServiceType.GRAPHIC_DESIGN ? 'Design Graphique' : 'Vidéo & Souvenirs'}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedFormulaId(null)}
                  className="p-1.5 bg-white/5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-3 md:p-8 space-y-3 md:space-y-6 overflow-y-auto custom-scrollbar flex-1">
                <div className="space-y-3 md:space-y-8">
                  {selectedCategory === ServiceType.GRAPHIC_DESIGN && (
                    <div>
                      <label className="block text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1 mb-1.5">Nom de l'entreprise</label>
                      <input 
                        type="text" 
                        value={companyName} 
                        onChange={(e) => setCompanyName(e.target.value)} 
                        className="w-full px-4 py-3 border-2 border-white/5 rounded-xl focus:border-[#B48646] outline-none transition-all bg-white/5 text-white text-xs md:text-base font-medium" 
                        placeholder="Ex: Boulangerie Durand" 
                      />
                    </div>
                  )}

                  {selectedCategory === ServiceType.VIDEO && (
                    <div className="space-y-2 md:space-y-5">
                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 text-[8px] md:text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">
                          <span>
                            {selectedFormulaId === 'vhs' ? 'Nombre de cassettes' : 'Nombre de rushes / photos'}
                          </span>
                          {selectedFormulaId !== 'vhs' && (
                            <div className="group relative z-[100]">
                              <HelpCircle size={10} className="text-[#B48646] cursor-help" />
                              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-3 bg-slate-900 border border-[#B48646]/30 rounded-xl text-[10px] text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-[110] shadow-[0_0_30px_rgba(0,0,0,0.8)]">
                                <p className="italic leading-relaxed">
                                  {selectedFormulaId === 'short' 
                                    ? '"Rythme ultra-dynamique (1-2s par clip). 10-15 rushes recommandés."'
                                    : selectedFormulaId === 'ads'
                                    ? '"Format percutant axé sur la conversion. Durée optimale : 15 à 30 secondes."'
                                    : '"Rythme émotionnel (4s par photo). 100 photos = ~6min40."'}
                                </p>
                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
                              </div>
                            </div>
                          )}
                        </label>
                        <span className="text-[#B48646] font-black text-sm md:text-xl">{photos}</span>
                      </div>
                      
                      <input 
                        type="range" 
                        min={!['vhs', 'short', 'ads'].includes(selectedFormulaId || '') ? "60" : "1"} 
                        max={selectedFormulaId === 'vhs' ? "50" : "500"} 
                        step="1" 
                        value={photos} 
                        onChange={(e) => setPhotos(parseInt(e.target.value))} 
                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#B48646]" 
                      />

                      {!['vhs', 'short', 'ads'].includes(selectedFormulaId || '') && (
                        <div className="flex gap-2 pt-0.5">
                          <div className="flex-1 bg-white/5 p-2 rounded-xl border border-white/5">
                            <span className="block text-[6px] md:text-[8px] text-slate-500 uppercase font-black mb-0.5">Durée Estimée</span>
                            <span className="text-[10px] md:text-base font-bold text-white">
                              {(() => {
                                if (selectedFormulaId === 'short') {
                                  const totalSeconds = photos * 1.5;
                                  return `~${Math.round(totalSeconds)}s`;
                                }
                                if (selectedFormulaId === 'ads') {
                                  const totalSeconds = photos * 2;
                                  return `~${Math.round(totalSeconds)}s`;
                                }
                                const totalSeconds = photos < 60 ? 240 : photos * 4;
                                const m = Math.floor(totalSeconds / 60);
                                const s = totalSeconds % 60;
                                return `~${m}min${s > 0 ? s : ''}`;
                              })()}
                            </span>
                          </div>
                          <div className="flex-1 bg-white/5 p-2 rounded-xl border border-white/5">
                            <span className="block text-[6px] md:text-[8px] text-slate-500 uppercase font-black mb-0.5">Musiques</span>
                            <span className="text-[10px] md:text-base font-bold text-white">
                              {selectedFormulaId === 'short' || selectedFormulaId === 'ads' 
                                ? '1 titre dynamique' 
                                : (photos <= 60 ? '1 titre' : photos <= 120 ? '2 titres' : '3 titres et +')}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Option Express */}
                  <div className="pt-0.5">
                    <label className="flex items-center gap-2 p-2 bg-white/5 rounded-xl border border-white/10 cursor-pointer hover:bg-white/10 transition-all group">
                      <div className="relative flex items-center justify-center">
                        <input 
                          type="checkbox" 
                          checked={isExpress} 
                          onChange={(e) => setIsExpress(e.target.checked)}
                          className="peer appearance-none w-3.5 h-3.5 border-2 border-[#B48646]/30 rounded-lg checked:bg-[#B48646] checked:border-[#B48646] transition-all cursor-pointer"
                        />
                        <Check size={9} className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" strokeWidth={4} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="text-[9px] md:text-base font-black text-white uppercase tracking-tight">Assistance Rapide</span>
                          <span className="text-[#B48646] font-black text-[10px] md:text-lg">+50€</span>
                        </div>
                        <p className="text-[6px] md:text-[9px] text-slate-500 font-bold uppercase tracking-widest">Livraison Express 24h / 48h</p>
                      </div>
                    </label>
                  </div>

                  <div>
                    <label className="block text-[8px] md:text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1 mb-1">Détails de votre vision</label>
                    <textarea 
                      value={details} 
                      onChange={(e) => setDetails(e.target.value)} 
                      className="w-full px-3 py-2 border-2 border-white/5 rounded-xl outline-none text-[10px] md:text-base font-medium focus:border-[#B48646] bg-white/5 text-white transition-all resize-none" 
                      rows={2} 
                      placeholder="Couleurs, ambiance, préférences..."
                    ></textarea>
                  </div>
                </div>

                <div className="pt-0.5">
                  <div className="bg-slate-950 p-2 md:p-6 rounded-xl border border-white/10 text-center relative overflow-hidden">
                    <div className="absolute top-1 right-1">
                      <div className="flex items-center gap-1 bg-[#B48646]/10 px-1 py-0.5 rounded-full border border-[#B48646]/20">
                        <Cpu size={6} className="text-[#B48646]" />
                        <span className="text-[5px] md:text-[7px] font-black text-[#B48646] uppercase tracking-widest">Finn_Certified</span>
                      </div>
                    </div>
                    
                    <div className="space-y-1 md:space-y-4">
                      <div>
                        <span className="block text-[6px] md:text-[9px] text-[#B48646] uppercase tracking-widest font-black mb-0">Prix Total Estimé</span>
                        <span className="text-base md:text-4xl font-black text-white leading-none">{currentPrice}€</span>
                      </div>

                      {selectedCategory === ServiceType.VIDEO && (
                        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/5">
                          <div className="text-left">
                            <span className="block text-[5px] md:text-[7px] text-slate-500 uppercase font-black mb-0">Durée finale</span>
                            <span className="text-[8px] md:text-sm font-bold text-white">
                              {(() => {
                                if (selectedFormulaId === 'short') {
                                  const totalSeconds = photos * 1.5;
                                  return `~${Math.round(totalSeconds)}s`;
                                }
                                if (selectedFormulaId === 'ads') {
                                  const totalSeconds = photos * 2;
                                  return `~${Math.round(totalSeconds)}s`;
                                }
                                if (selectedFormulaId === 'vhs') {
                                  return `${photos} cassette(s)`;
                                }
                                const totalSeconds = photos < 60 ? 240 : photos * 4;
                                const m = Math.floor(totalSeconds / 60);
                                const s = totalSeconds % 60;
                                return `${m} min ${s > 0 ? s + ' sec' : '00 sec'}`;
                              })()}
                            </span>
                          </div>
                          <div className="text-left">
                            <span className="block text-[5px] md:text-[7px] text-slate-500 uppercase font-black mb-0">Musiques</span>
                            <span className="text-[8px] md:text-sm font-bold text-white">
                              {selectedFormulaId === 'short' || selectedFormulaId === 'ads' 
                                ? '1 titre dynamique' 
                                : selectedFormulaId === 'vhs' 
                                ? 'N/A'
                                : (photos <= 60 ? '1' : photos <= 120 ? '2' : '3')}
                            </span>
                          </div>
                        </div>
                      )}
                      <div className="text-left pt-1 border-t border-white/5">
                        <p className="text-[7px] md:text-xs text-slate-500 font-medium leading-tight">
                          Support graphique complet, transitions pro, effets Ken Burns, générique, retouches légères
                          {isExpress && <span className="text-[#B48646] font-bold"> + Option Express</span>}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sticky Footer Action */}
              <div className="p-3 md:p-8 border-t border-white/5 bg-slate-900/95 backdrop-blur-md sticky bottom-0 z-20 shrink-0">
                <button 
                  onClick={handleValidate}
                  className="w-full bg-gradient-to-r from-[#B48646] via-[#E5B066] to-[#B48646] text-white font-black text-xs md:text-xl py-3 md:py-6 rounded-xl md:rounded-2xl shadow-2xl shadow-[#B48646]/30 hover:scale-[1.02] transition-all active:scale-95 flex items-center justify-center gap-2 border border-white/20 aura-24-hover"
                >
                  Valider la configuration <ArrowRight size={14} className="md:w-6 md:h-6" />
                </button>
              </div>
            </div>
          </div>
        )}
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
