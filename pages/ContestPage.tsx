
import React, { useState } from 'react';
import { Trophy, Gift, Check, Send, Sparkles, Share2, Info, X, ChevronRight, AlertCircle, Film, Music, Star, Home, Facebook } from 'lucide-react';
import toast from 'react-hot-toast';

interface ContestPageProps {
  onNavigate?: (index: number) => void;
}

const ContestPage: React.FC<ContestPageProps> = ({ onNavigate }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [showRules, setShowRules] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const subject = encodeURIComponent(`[PARTICIPATION CONCOURS] ${formData.name}`);
    const body = encodeURIComponent(`Bonjour Infini 24,

Je souhaite participer au Jeu Concours d'Infini 24 !

NOM : ${formData.name}
EMAIL : ${formData.email}
TEL : ${formData.phone}

J'ai bien pris connaissance du règlement.
Bonne chance à tous !`);

    toast.success("Envoi de votre participation...", { icon: '✨' });
    
    setTimeout(() => {
        window.location.href = `mailto:dywen.officiel7@gmail.com?subject=${subject}&body=${body}`;
        setStep('success');
    }, 1000);
  };

  const RulesModal = () => (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="bg-white rounded-[2.5rem] w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col shadow-2xl">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-800">
                        <Info size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Règlement du Jeu</h3>
                </div>
                <button onClick={() => setShowRules(false)} className="p-3 bg-slate-50 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
                    <X size={20} />
                </button>
            </div>
            <div className="p-8 overflow-y-auto no-scrollbar space-y-8 text-sm leading-relaxed text-slate-600">
                <section>
                    <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">1. Organisateur</h4>
                    <p>Le Jeu Concours est organisé par Infini 24 via le site Infini24.fr.</p>
                </section>
                <section>
                    <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">2. Durée</h4>
                    <p>Le jeu commence le 14 Février 2025 et se terminera le 1er Mars 2025 à minuit. Le tirage au sort aura lieu le 08 Mars 2025.</p>
                </section>
                <section>
                    <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">3. Lot à gagner</h4>
                    <p>Le gagnant remportera la création d'une vidéo souvenir personnalisée "Premium", d'une valeur de 190€.</p>
                </section>
                <section>
                    <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">4. Conditions</h4>
                    <p>La participation est gratuite et sans obligation d'achat. Ouvert à toute personne majeure résidant en France. Une seule participation par foyer.</p>
                </section>
                <section className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2"><AlertCircle size={16} className="text-[#B48646]" /> RGPD</h4>
                    <p className="text-xs">Les informations collectées sont utilisées exclusivement pour la gestion du concours. Conformément à la loi, vous disposez d'un droit d'accès et de suppression de vos données.</p>
                </section>
            </div>
        </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full overflow-y-auto no-scrollbar bg-[#FDFCF8]">
      
      {/* Banner */}
      <header className="relative pt-16 pb-12 px-8 bg-white border-b border-slate-50 rounded-b-[3rem] mb-8 overflow-hidden shadow-[0_4px_30px_-15px_rgba(0,0,0,0.05)] shrink-0 z-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] -mr-16 -mt-16 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#B48646]/5 rounded-full blur-[60px] -ml-10 -mb-10 pointer-events-none"></div>
        
        <div className="relative z-10">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest mb-4 border border-blue-100">
              <Trophy size={12} /> Évènement
           </div>
           <h1 className="text-3xl md:text-4xl font-extrabold font-['Poppins'] text-slate-900 leading-tight mb-2">
             Jeu Concours
           </h1>
           <p className="text-slate-500 font-medium max-w-md text-sm md:text-base">
             Du 14 Février au 1er Mars, participez à notre tirage au sort !
           </p>
        </div>
      </header>

      <div className="flex-1 px-4 lg:px-8 pb-24 max-w-4xl mx-auto w-full">
        {step === 'form' ? (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom duration-500">
            {/* Lot Preview Improved */}
            <div className="bg-slate-900 rounded-[3rem] p-10 md:p-14 text-white relative overflow-hidden shadow-2xl border border-white/5 group">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#B48646]/10 rounded-full blur-[80px] -ml-20 -mb-20"></div>
                
                <div className="relative z-10 space-y-8">
                    <div className="flex flex-col items-center md:items-start gap-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-[#B48646] to-[#E5B066] rounded-3xl flex items-center justify-center text-white shadow-2xl transform group-hover:rotate-6 transition-transform duration-500">
                            <Gift size={40} strokeWidth={1.5} />
                        </div>
                        <div className="text-center md:text-left space-y-1">
                            <h2 className="text-2xl md:text-4xl font-black tracking-tight text-[#B48646]">
                                Votre Histoire en Format Cinéma ✨
                            </h2>
                            <p className="text-white/60 font-black text-xl md:text-2xl tracking-widest uppercase">
                                (Valeur 190€)
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <p className="text-slate-300 text-lg md:text-xl font-medium leading-relaxed">
                            Le grand gagnant recevra notre <span className="text-white font-bold">Pack Vidéo Premium</span> : une création magistrale regroupant vos 100 plus beaux souvenirs.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                            <div className="flex gap-4 items-start p-4 rounded-2xl bg-white/5 border border-white/5">
                                <Film className="text-[#B48646] shrink-0" size={24} />
                                <div>
                                    <h4 className="font-bold text-white text-sm mb-1 uppercase tracking-wide">Réalisation Pro</h4>
                                    <p className="text-slate-400 text-xs leading-relaxed">Effets cinématographiques, transitions fluides et étalonnage professionnel.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start p-4 rounded-2xl bg-white/5 border border-white/5">
                                <Music className="text-[#B48646] shrink-0" size={24} />
                                <div>
                                    <h4 className="font-bold text-white text-sm mb-1 uppercase tracking-wide">Ambiance Sonore</h4>
                                    <p className="text-slate-400 text-xs leading-relaxed">Choisissez votre musique préférée ou laissez nos experts sublimer votre surprise.</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                            <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></div>
                            <p className="text-white font-bold italic tracking-wide">
                                Résultat : Une vidéo mémorable, prête à émouvoir et à durer toute une vie.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form */}
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-100">
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Nom & Prénom</label>
                            <input 
                                type="text" 
                                required 
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 rounded-2xl outline-none transition-all text-sm font-medium" 
                                placeholder="Votre nom complet"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Téléphone</label>
                            <input 
                                type="tel" 
                                required 
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 rounded-2xl outline-none transition-all text-sm font-medium" 
                                placeholder="Ex: 06 12 34 56 78"
                            />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Adresse Email</label>
                            <input 
                                type="email" 
                                required 
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 rounded-2xl outline-none transition-all text-sm font-medium" 
                                placeholder="votre@email.com"
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <button 
                            type="submit" 
                            className="w-full bg-slate-900 text-white font-bold py-6 rounded-3xl shadow-xl shadow-blue-900/10 hover:bg-blue-600 hover:scale-[1.02] active:scale-95 transition-all text-lg flex items-center justify-center gap-3 group"
                        >
                            <Sparkles size={20} className="text-yellow-400" /> 
                            Valider ma participation 
                            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <p className="text-center mt-6">
                            <button 
                                type="button" 
                                onClick={() => setShowRules(true)}
                                className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] hover:text-slate-600 underline underline-offset-4"
                            >
                                Lire le règlement du jeu
                            </button>
                        </p>
                    </div>
                </form>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 md:py-20 text-center animate-in zoom-in duration-500 max-w-2xl mx-auto">
             <div className="w-32 h-32 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-green-500/10 relative">
                <Check size={64} strokeWidth={3} />
                <Sparkles size={24} className="absolute top-2 right-2 text-yellow-400 animate-pulse" />
             </div>
             
             <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">Félicitations, vous êtes en lice ! ✨</h2>
             
             <div className="bg-white p-8 md:p-10 rounded-[3rem] border border-slate-100 shadow-xl space-y-8 mb-10 text-left md:text-center">
                <p className="text-slate-600 text-lg md:text-xl font-medium leading-relaxed">
                    Votre participation à <span className="text-[#B48646] font-bold">L'Expérience du jeu concours d'Infini24</span> a bien été enregistrée. Nous avons hâte de découvrir, peut-être, vos plus beaux souvenirs pour les transformer en cinéma.
                </p>
                
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-left space-y-4">
                    <div className="flex gap-4 items-center text-[#B48646]">
                        <Facebook size={24} />
                        <h4 className="font-black text-xs uppercase tracking-widest">Restez connecté !</h4>
                    </div>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">
                        Le gagnant sera annoncé sur <strong>facebook</strong> le <strong>8 mars</strong>. En attendant, suivez nos dernières créations sur nos réseaux sociaux pour vous inspirer.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <button 
                        onClick={() => {
                            if (navigator.share) {
                                navigator.share({
                                    title: 'Infini 24 - Jeu Concours',
                                    text: 'Je viens de participer au Jeu Concours d\'Infini 24 ! Tente ta chance aussi.',
                                    url: window.location.origin + '/concours'
                                });
                            } else {
                                toast.success("Lien copié !");
                            }
                        }}
                        className="w-full bg-slate-100 text-slate-900 font-bold py-4 rounded-2xl hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                    >
                        <Share2 size={18} /> Partager le jeu
                    </button>

                    <button 
                        onClick={() => onNavigate && onNavigate(0)}
                        className="w-full bg-[#B48646] text-white font-bold py-4 rounded-2xl hover:bg-slate-900 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#B48646]/20"
                    >
                        <Home size={18} /> Retour à l'accueil
                    </button>
                </div>
             </div>
          </div>
        )}
      </div>

      {showRules && <RulesModal />}
    </div>
  );
};

export default ContestPage;
