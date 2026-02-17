
import React from 'react';
import { FileText, Building2, Server, Copyright, Tag, ShieldCheck, ChevronLeft } from 'lucide-react';

interface LegalNoticePageProps {
  onBack: () => void;
}

const LegalNoticePage: React.FC<LegalNoticePageProps> = ({ onBack }) => {
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
             Mentions Légales
           </h1>
           <p className="text-slate-500 font-medium max-w-md text-sm md:text-base">
             Informations réglementaires concernant Infini 24.
           </p>
        </div>
      </header>

      <div className="flex-1 px-6 lg:px-8 pb-24 max-w-4xl mx-auto w-full">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-100 space-y-12">
          
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-[#B48646]">
              <div className="p-2 bg-[#B48646]/10 rounded-lg">
                <Building2 size={20} />
              </div>
              <h2 className="text-xl font-bold text-slate-900">1. Éditeur du site</h2>
            </div>
            <div className="text-slate-600 space-y-2 text-sm md:text-base">
              <p>Le site <strong>https://infini24.fr</strong> est édité par :</p>
              <p className="font-bold text-slate-900">Toussaint Wendy de Infini24</p>
              <p><strong>Domiciliation :</strong> Ville-sur-Lumes, Ardennes, France</p>
              <p><strong>Contact :</strong> dywen.officiel7@gmail.com</p>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-[#B48646]">
              <div className="p-2 bg-[#B48646]/10 rounded-lg">
                <Server size={20} />
              </div>
              <h2 className="text-xl font-bold text-slate-900">2. Hébergement du site</h2>
            </div>
            <div className="text-slate-600 space-y-2 text-sm md:text-base">
              <p>Le site est hébergé par Google Cloud France / Firebase :</p>
              <p className="font-bold text-slate-900">Société : Google Ireland Limited</p>
              <p><strong>Adresse :</strong> Gordon House, Barrow Street, Dublin 4, Irlande.</p>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-[#B48646]">
              <div className="p-2 bg-[#B48646]/10 rounded-lg">
                <Copyright size={20} />
              </div>
              <h2 className="text-xl font-bold text-slate-900">3. Propriété intellectuelle</h2>
            </div>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base">
              Tous les contenus présents sur le site (logos, textes, simulateur de prix, éléments graphiques des services "Montage Short/TikTok" et "Publicité Express") sont la propriété exclusive de <strong>Infini 24</strong>. Toute reproduction, même partielle, est interdite sans autorisation préalable.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-[#B48646]">
              <div className="p-2 bg-[#B48646]/10 rounded-lg">
                <Tag size={20} />
              </div>
              <h2 className="text-xl font-bold text-slate-900">4. Services et Tarifs</h2>
            </div>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base">
              Les tarifs affichés sur le site (ex: Montage dès 20€, Publicité dès 50€) sont donnés à titre indicatif et peuvent varier selon la complexité du projet via notre simulateur de prix. <strong>Infini 24</strong> se réserve le droit de modifier ses tarifs à tout moment.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-[#B48646]">
              <div className="p-2 bg-[#B48646]/10 rounded-lg">
                <ShieldCheck size={20} />
              </div>
              <h2 className="text-xl font-bold text-slate-900">5. Protection des données (RGPD)</h2>
            </div>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base">
              Conformément au Règlement Général sur la Protection des Données (RGPD), Infini 24 s'engage à protéger la vie privée de ses utilisateurs.
            </p>
            <ul className="list-disc ml-6 space-y-2 text-sm text-slate-600">
              <li><strong>Données collectées :</strong> Nous collectons uniquement les données nécessaires au traitement de vos projets vidéo et à l'analyse de l'audience via Google Analytics.</li>
              <li><strong>Cookies :</strong> Ce site utilise des cookies via Google AdSense pour l'affichage de publicités personnalisées.</li>
              <li><strong>Droit d'accès :</strong> Vous disposez d'un droit d'accès, de rectification et de suppression de vos données en nous contactant à : <strong>dywen.officiel7@gmail.com</strong></li>
            </ul>
          </section>

          <div className="pt-8 border-t border-slate-50 text-center">
            <p className="text-xs text-slate-400 italic">
              Infini 24 – Créateur de souvenirs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalNoticePage;
