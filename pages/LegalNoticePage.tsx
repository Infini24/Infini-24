
import React from 'react';
import { Building2, Server, Copyright, Tag, ShieldCheck, ChevronLeft, Scale, MessageSquare } from 'lucide-react';

interface LegalNoticePageProps {
  onBack: () => void;
}

const LegalNoticePage: React.FC<LegalNoticePageProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col min-h-full bg-transparent relative">
      <div className="flex-1 px-6 lg:px-8 py-12 md:py-24 max-w-[1600px] mx-auto w-full">
        <div className="bg-slate-900/40 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-white/5 space-y-12">
          <button 
             onClick={onBack}
             className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-4 border border-white/10 hover:bg-white/10 transition-colors"
           >
              <ChevronLeft size={12} /> Retour
           </button>
           <h1 className="text-2xl md:text-3xl font-black text-white mb-8">Mentions Légales</h1>
          
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-[#B48646]">
              <div className="p-2 bg-[#B48646]/10 rounded-lg">
                <Building2 size={20} />
              </div>
              <h2 className="text-xl font-bold text-white">1. Éditeur du site</h2>
            </div>
            <div className="text-slate-300 space-y-2 text-sm md:text-base">
              <p>Le site <strong>https://infini24.fr</strong> est édité par :</p>
              <p><strong>Nom :</strong> Wendy Toussaint (Nom commercial : Infini 24)</p>
              <p><strong>Statut :</strong> Entrepreneur Individuel (EI)</p>
              <p><strong>Siège social :</strong> 41 RUE des Charmes, 08440 Ville-sur-Lumes, France</p>
              <p><strong>SIRET :</strong> 994 527 976 00017</p>
              <p><strong>Code APE :</strong> 74.10Z (Activités spécialisées de design)</p>
              <p><strong>Contact :</strong> infini.24@hotmail.com</p>
              <p><strong>TVA :</strong> TVA non applicable, article 293 B du Code Général des Impôts (CGI).</p>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-[#B48646]">
              <div className="p-2 bg-[#B48646]/10 rounded-lg">
                <Server size={20} />
              </div>
              <h2 className="text-xl font-bold text-white">2. Hébergement du site</h2>
            </div>
            <div className="text-slate-300 space-y-2 text-sm md:text-base">
              <p>Le site est hébergé par Google Cloud France / Firebase :</p>
              <p><strong>Société :</strong> Google Ireland Limited</p>
              <p><strong>Adresse :</strong> Gordon House, Barrow Street, Dublin 4, Irlande.</p>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-[#B48646]">
              <div className="p-2 bg-[#B48646]/10 rounded-lg">
                <Copyright size={20} />
              </div>
              <h2 className="text-xl font-bold text-white">3. Propriété intellectuelle</h2>
            </div>
            <p className="text-slate-300 leading-relaxed text-sm md:text-base">
              L'ensemble des contenus (textes, logos, simulateur de prix, éléments graphiques des services "Montage Short/TikTok" et "Publicité Express") est la propriété exclusive de <strong>Infini 24</strong>. Toute reproduction, représentation, modification ou adaptation totale ou partielle de ces éléments est interdite sans l'autorisation écrite préalable de l'éditeur.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-[#B48646]">
              <div className="p-2 bg-[#B48646]/10 rounded-lg">
                <Tag size={20} />
              </div>
              <h2 className="text-xl font-bold text-white">4. Services et Simulateur de tarifs</h2>
            </div>
            <p className="text-slate-300 leading-relaxed text-sm md:text-base">
              Les tarifs affichés sur le site (ex: Montage dès 20€, Publicité dès 50€) sont donnés à titre indicatif. Les résultats issus du simulateur de prix ne constituent pas un devis contractuel définitif mais une estimation. <strong>Infini 24</strong> se réserve le droit de valider ou de réviser le tarif final après analyse précise du projet.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-[#B48646]">
              <div className="p-2 bg-[#B48646]/10 rounded-lg">
                <ShieldCheck size={20} />
              </div>
              <h2 className="text-xl font-bold text-white">5. Protection des données personnelles (RGPD)</h2>
            </div>
            <div className="text-slate-300 space-y-4 text-sm md:text-base">
              <p>Conformément au Règlement Général sur la Protection des Données (RGPD) :</p>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>Données collectées :</strong> Nous collectons uniquement les données nécessaires au traitement de vos commandes et à l'analyse d'audience via Google Analytics.</li>
                <li><strong>Finalité :</strong> Gestion de la relation client et amélioration de l'expérience utilisateur.</li>
                <li><strong>Cookies :</strong> Ce site utilise des cookies (Google AdSense et Analytics). Vous pouvez gérer vos préférences via le bandeau de consentement présent sur le site.</li>
                <li><strong>Vos droits :</strong> Vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles. Pour l'exercer, contactez-nous à : <strong>infini.24@hotmail.com</strong>.</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-[#B48646]">
              <div className="p-2 bg-[#B48646]/10 rounded-lg">
                <MessageSquare size={20} />
              </div>
              <h2 className="text-xl font-bold text-white">6. Médiation de la consommation</h2>
            </div>
            <p className="text-slate-300 leading-relaxed text-sm md:text-base">
              Conformément aux articles L.616-1 et R.616-1 du code de la consommation, en cas de litige, vous pouvez déposer une réclamation auprès de notre service client par mail. Si aucune solution n'est trouvée, vous avez le droit de recourir gratuitement à un médiateur de la consommation.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-[#B48646]">
              <div className="p-2 bg-[#B48646]/10 rounded-lg">
                <Scale size={20} />
              </div>
              <h2 className="text-xl font-bold text-white">7. Clause de Limitation de Responsabilité – Simulateur de prix</h2>
            </div>
            <div className="text-slate-300 space-y-4 text-sm md:text-base">
              <p><strong>Responsabilité relative au simulateur de prix :</strong></p>
              <p>Le simulateur de prix disponible sur le site <strong>https://infini24.fr</strong> est mis à disposition des utilisateurs à titre purement informatif et indicatif. Les estimations de tarifs générées par cet outil ne constituent en aucun cas une offre contractuelle ferme ou un devis définitif engageant l'éditeur.</p>
              <p>Infini 24 ne saurait être tenu responsable des conséquences liées à :</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Toute erreur de calcul, bug technique ou dysfonctionnement informatique affichant un tarif manifestement erroné ou dérisoire.</li>
                <li>Une mauvaise configuration des options choisies par l'utilisateur ne reflétant pas la réalité technique de son projet.</li>
              </ul>
              <p>L'éditeur se réserve le droit de rectifier tout tarif erroné issu du simulateur et de proposer un devis ferme après analyse humaine et technique de la demande du client. Seul le devis signé par les deux parties fait foi et engage la responsabilité de Infini 24.</p>
            </div>
          </section>

          <div className="pt-8 border-t border-white/5 text-center">
            <p className="text-xs text-slate-500 italic">
              Infini 24 – Créateur de souvenirs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalNoticePage;
