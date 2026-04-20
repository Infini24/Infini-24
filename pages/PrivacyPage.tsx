
import React from 'react';
import { Shield, Lock, Eye, FileText, ChevronLeft, ArrowRight, UserCheck, Database, Share2, ShieldCheck } from 'lucide-react';

interface PrivacyPageProps {
  onBack: () => void;
}

const PrivacyPage: React.FC<PrivacyPageProps> = ({ onBack }) => {
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
           <h1 className="text-2xl md:text-3xl font-black text-white mb-8">Politique de Confidentialité</h1>
          
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-[#B48646]">
              <div className="p-2 bg-[#B48646]/10 rounded-lg">
                <UserCheck size={20} />
              </div>
              <h2 className="text-xl font-bold text-white">1. Responsable du traitement</h2>
            </div>
            <p className="text-slate-300 leading-relaxed text-sm md:text-base">
              Le responsable du traitement des données personnelles est <strong>Wendy Toussaint (EI - Infini 24)</strong>, situé au 41 RUE des Charmes, 08440 Ville-sur-Lumes, France.<br />
              <strong>Contact :</strong> infini.24@hotmail.com
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-[#B48646]">
              <div className="p-2 bg-[#B48646]/10 rounded-lg">
                <FileText size={20} />
              </div>
              <h2 className="text-xl font-bold text-white">2. Données collectées et finalités</h2>
            </div>
            <div className="text-slate-300 space-y-4 text-sm md:text-base">
              <p>Nous collectons des données de deux manières :</p>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>Données fournies par l'utilisateur :</strong> Via le simulateur de prix ou par contact direct (nom, email, détails du projet de montage). Ces données sont utilisées exclusivement pour établir vos devis et réaliser vos prestations.</li>
                <li><strong>Données collectées automatiquement :</strong> Via Google Analytics (mesure d'audience) et Google AdSense (publicité). Ces services tiers collectent des informations techniques (adresse IP anonymisée, type de navigateur, parcours sur le site).</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-[#B48646]">
              <div className="p-2 bg-[#B48646]/10 rounded-lg">
                <Eye size={20} />
              </div>
              <h2 className="text-xl font-bold text-white">3. Cookies et Publicité (Google AdSense & Analytics)</h2>
            </div>
            <div className="text-slate-300 space-y-4 text-sm md:text-base">
              <p>Ce site utilise des cookies pour améliorer l'expérience utilisateur et diffuser des annonces pertinentes.</p>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>Cookie DoubleClick :</strong> Google utilise des cookies pour adapter les annonces en fonction de votre navigation sur ce site et d'autres sites web.</li>
                <li><strong>Désactivation :</strong> Vous pouvez désactiver la publicité personnalisée via les <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-[#B48646] font-bold hover:underline">Paramètres des annonces Google</a>.</li>
                <li><strong>Analytics :</strong> Les données de navigation nous aident à comprendre quelles pages sont les plus consultées pour améliorer nos services de design.</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-[#B48646]">
              <div className="p-2 bg-[#B48646]/10 rounded-lg">
                <Database size={20} />
              </div>
              <h2 className="text-xl font-bold text-white">4. Conservation des données</h2>
            </div>
            <div className="text-slate-300 space-y-4 text-sm md:text-base">
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>Données clients :</strong> Les informations liées à vos commandes sont conservées pendant toute la durée de la relation commerciale, puis archivées selon les obligations légales comptables.</li>
                <li><strong>Données de navigation :</strong> Les données collectées par les cookies tiers ont une durée de vie limitée (généralement 13 mois maximum).</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-[#B48646]">
              <div className="p-2 bg-[#B48646]/10 rounded-lg">
                <Share2 size={20} />
              </div>
              <h2 className="text-xl font-bold text-white">5. Partage des données</h2>
            </div>
            <p className="text-slate-300 leading-relaxed text-sm md:text-base">
              Infini 24 s'engage à ne jamais vendre, louer ou céder vos données personnelles à des tiers à des fins de marketing. Les seules transmissions de données concernent nos prestataires techniques strictement nécessaires au fonctionnement du site (Hébergeur Firebase, Google pour la publicité et l'analyse).
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-[#B48646]">
              <div className="p-2 bg-[#B48646]/10 rounded-lg">
                <ShieldCheck size={20} />
              </div>
              <h2 className="text-xl font-bold text-white">6. Vos Droits (RGPD)</h2>
            </div>
            <div className="text-slate-300 space-y-4 text-sm md:text-base">
              <p>Conformément à la réglementation européenne, vous disposez des droits suivants :</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Droit d'accès, de rectification et de suppression de vos données.</li>
                <li>Droit d'opposition ou de limitation du traitement.</li>
                <li>Droit à la portabilité de vos données.</li>
              </ul>
              <p>Pour exercer ces droits, envoyez simplement un email à : <strong>infini.24@hotmail.com</strong>. Nous traiterons votre demande sous 30 jours.</p>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-[#B48646]">
              <div className="p-2 bg-[#B48646]/10 rounded-lg">
                <Lock size={20} />
              </div>
              <h2 className="text-xl font-bold text-white">7. Sécurité</h2>
            </div>
            <p className="text-slate-300 leading-relaxed text-sm md:text-base">
              Nous mettons en œuvre des mesures de sécurité techniques (protocole HTTPS, sécurisation des accès Firebase) pour protéger vos données contre tout accès non autorisé ou toute divulgation.
            </p>
          </section>

          <div className="pt-8 border-t border-white/5 text-center">
            <p className="text-xs text-slate-500 italic">
              Infini 24 – Votre vie privée, notre priorité.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
