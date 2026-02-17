
import React from 'react';
import { Shield, Lock, Eye, FileText, ChevronLeft, ArrowRight } from 'lucide-react';

interface PrivacyPageProps {
  onBack: () => void;
}

const PrivacyPage: React.FC<PrivacyPageProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col h-full overflow-y-auto no-scrollbar bg-[#FDFCF8]">
      {/* Header */}
      <header className="relative pt-16 pb-12 px-8 bg-white border-b border-slate-50 rounded-b-[3rem] mb-8 overflow-hidden shadow-[0_4px_30px_-15px_rgba(0,0,0,0.05)] shrink-0 z-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-100 rounded-full blur-[80px] -mr-16 -mt-16 pointer-events-none"></div>
        
        <div className="relative z-10">
           <button 
             onClick={onBack}
             className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-4 border border-slate-100 hover:bg-slate-100 transition-colors"
           >
              <ChevronLeft size={12} /> Retour
           </button>
           <h1 className="text-3xl md:text-4xl font-extrabold font-['Poppins'] text-slate-900 leading-tight mb-2">
             Politique de Confidentialité
           </h1>
           <p className="text-slate-500 font-medium max-w-md text-sm md:text-base">
             Dernière mise à jour : 17 février 2026
           </p>
        </div>
      </header>

      <div className="flex-1 px-6 lg:px-8 pb-24 max-w-4xl mx-auto w-full">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-100 space-y-12">
          
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-[#B48646]">
              <div className="p-2 bg-[#B48646]/10 rounded-lg">
                <FileText size={20} />
              </div>
              <h2 className="text-xl font-bold text-slate-900">1. Collecte des données</h2>
            </div>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base">
              Infini 24 s'engage à ce que la collecte et le traitement de vos données soient conformes au règlement général sur la protection des données (RGPD). Nous utilisons des services tiers comme <strong>Google AdSense</strong> pour diffuser des publicités sur notre site. Ces services peuvent collecter des informations techniques lors de votre navigation pour assurer le bon fonctionnement du site et mesurer l'audience.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-[#B48646]">
              <div className="p-2 bg-[#B48646]/10 rounded-lg">
                <Lock size={20} />
              </div>
              <h2 className="text-xl font-bold text-slate-900">2. Cookies et balises Web</h2>
            </div>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base">
              Google utilise des cookies pour diffuser des annonces sur <strong>infini24.fr</strong>. Grâce au cookie DoubleClick, Google et ses partenaires adaptent les annonces diffusées aux utilisateurs en fonction de leur navigation sur ce site et/ou d'autres sites Web. Les données collectées via ces cookies nous permettent d'améliorer la pertinence des contenus proposés.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-[#B48646]">
              <div className="p-2 bg-[#B48646]/10 rounded-lg">
                <Eye size={20} />
              </div>
              <h2 className="text-xl font-bold text-slate-900">3. Gestion de vos préférences</h2>
            </div>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base mb-6">
              Vous avez le contrôle total sur vos données publicitaires. Vous pouvez choisir de désactiver la publicité personnalisée à tout moment :
            </p>
            <a 
              href="https://adssettings.google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#B48646] font-bold hover:underline group"
            >
              Paramètres des annonces Google <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-[#B48646]">
              <div className="p-2 bg-[#B48646]/10 rounded-lg">
                <Shield size={20} />
              </div>
              <h2 className="text-xl font-bold text-slate-900">4. Consentement (RGPD)</h2>
            </div>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base">
              Conformément aux réglementations européennes, un message de consentement vous est présenté lors de votre première visite pour vous permettre d'accepter ou de refuser l'utilisation des cookies publicitaires. Ce choix est mémorisé localement sur votre appareil et peut être modifié à tout moment en vidant le cache de votre navigateur ou via notre bandeau de cookies.
            </p>
          </section>

          <div className="pt-8 border-t border-slate-50 text-center">
            <p className="text-xs text-slate-400">
              Pour toute question concernant vos données personnelles, vous pouvez nous contacter via notre formulaire de contact.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
