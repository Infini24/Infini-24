
import React, { useState } from 'react';
import { Trophy, Gift, Check, Send, Sparkles, Share2, Info, X, ChevronRight, AlertCircle, Film, Music, Home, Facebook, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import toast from 'react-hot-toast';

interface ContestPageProps {
  onNavigate?: (index: number) => void;
}

const ContestPage: React.FC<ContestPageProps> = ({ onNavigate }) => {
  const [step, setStep] = useState<'form' | 'loading' | 'success'>('form');
  const [showRules, setShowRules] = useState(false);
  const [aiMessage, setAiMessage] = useState<string>("");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const generateAiConfirmation = async (userName: string) => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Tu es l'esprit créatif d'Infini 24. Un utilisateur nommé "${userName}" vient de s'inscrire au jeu concours pour gagner une vidéo souvenir premium (valeur 190€). 
        Rédige un message de confirmation court (2 phrases maximum), très chaleureux, un peu poétique, qui lui souhaite bonne chance et qui mentionne que ses souvenirs sont précieux. Tutoie l'utilisateur.`,
      });
      setAiMessage(response.text || "Tes souvenirs sont des étoiles, et nous avons hâte de les faire briller. Bonne chance pour le tirage !");
    } catch (error) {
      console.error("Gemini Error:", error);
      setAiMessage("Tes souvenirs sont précieux et méritent de briller. Bonne chance pour le tirage au sort !");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep('loading');
    
    // On lance la génération IA en parallèle
    await generateAiConfirmation(formData.name);

    const subject = encodeURIComponent(`[PARTICIPATION CONCOURS] ${formData.name}`);
    const body = encodeURIComponent(`Bonjour Infini 24,

Je souhaite participer au Jeu Concours d'Infini 24 !

NOM : ${formData.name}
EMAIL : ${formData.email}
TEL : ${formData.phone}

J'ai bien pris connaissance du règlement.
Bonne chance à tous !`);

    setTimeout(() => {
        window.location.href = `mailto:dywen.officiel7@gmail.com?subject=${subject}&body=${body}`;
        setStep('success');
        toast.success("IA : Participation analysée avec succès !", { icon: '✨' });
    }, 1500);
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
        {step === 'form' && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom duration-500">
            {/* Lot Preview */}
            <div className="bg-slate-900 rounded-[3rem] p-10 md:p-14 text-white relative overflow-hidden shadow-2xl border border-white/5 group">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] -mr-20 -mt-20"></div>
                
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
                        <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                            <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></div>
                            <p className="text-white font-bold italic tracking-wide">
                                Une création mémorable pour toute une vie.
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
        )}

        {step === 'loading' && (
            <div className="flex flex-col items-center justify-center py-24 text-center space-y-8 animate-pulse">
                <div className="relative">
                    <Loader2 size={80} className="text-[#B48646] animate-spin" />
                    <Sparkles size={24} className="absolute -top-2 -right-2 text-yellow-400 animate-bounce" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">L'IA Infini 24 analyse votre profil...</h2>
                    <p className="text-slate-500 mt-2 font-medium">Préparation de votre message de bienvenue personnalisé.</p>
                </div>
            </div>
        )}

        {step === 'success' && (
          <div className="flex flex-col items-center justify-center py-10 md:py-20 text-center animate-in zoom-in duration-500 max-w-2xl mx-auto">
             <div className="w-32 h-32 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-green-500/10 relative">
                <Check size={64} strokeWidth={3} />
                <Sparkles size={24} className="absolute top-2 right-2 text-yellow-400 animate-pulse" />
             </div>
             
             <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">C'est validé ! ✨</h2>
             
             {/* AI MESSAGE BLOCK */}
             <div className="w-full mb-8 animate-in slide-in-from-top duration-700 delay-300">
                <div className="bg-gradient-to-br from-slate-900 to-blue-950 p-1 border-2 border-blue-500/30 rounded-[2.5rem] shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                    <div className="bg-slate-900 rounded-[2.3rem] p-8 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-20 h-20 bg-blue-500/10 blur-2xl"></div>
                        <div className="flex items-center gap-3 mb-4">
                            <Sparkles size={16} className="text-blue-400" />
                            <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em]">Le mot de l'IA Infini 24</span>
                        </div>
                        <p className="text-white text-lg md:text-xl font-medium leading-relaxed italic">
                           "{aiMessage}"
                        </p>
                    </div>
                </div>
             </div>

             <div className="bg-white p-8 md:p-10 rounded-[3rem] border border-slate-100 shadow-xl space-y-8 mb-10 text-left md:text-center">
                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                    Le gagnant sera annoncé sur <strong>facebook</strong> le <strong>8 mars</strong>. N'oublie pas de bien envoyer le mail qui vient de s'ouvrir pour finaliser ton inscription !
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <button 
                        onClick={() => {
                            if (navigator.share) {
                                navigator.share({
                                    title: 'Infini 24 - Jeu Concours',
                                    text: 'Je viens de participer au Jeu Concours d\'Infini 24 ! Tente ta chance aussi.',
                                    url: window.location.origin + '/concours'
                                });
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
                        <Home size={18} /> Accueil
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
