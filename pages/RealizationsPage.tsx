
import React, { useState } from 'react';
import { Image as ImageIcon, Instagram, Facebook, Maximize2, ExternalLink, X } from 'lucide-react';

// --- TYPES ---
interface ProjectImage {
  url: string;
  caption: string;
  isWide?: boolean; // Pour l'affiche 210x90
}

interface Project {
  id: string;
  title: string;
  category: 'Identité Visuelle' | 'Vidéo' | 'Print' | 'Autre';
  description: string;
  date: string;
  images: ProjectImage[];
  link?: string; // Lien externe (Facebook, Site web...)
}

// --- DATA (VOS PROJETS) ---
const projects: Project[] = [
  {
    id: 'confiserie-parizel',
    title: 'Confiserie Parizel',
    category: 'Identité Visuelle',
    date: 'Décembre 2024',
    link: 'https://www.facebook.com/profile.php?id=100076464574527&locale=fr_FR',
    description: `Pour la Confiserie Parizel, nous avons assuré la conception complète de leur logo original, établissant une identité de marque visuellement chaleureuse et distinctive.
    Afin d'optimiser leur présence sur les évènements, nous avons également géré le design d'une bâche publicitaire grand format (210cm sur 90cm). 
    Cette bâche a été conçue en garantissant une visibilité maximale et renforçant l'attractivité du point de vente durant l'événement..`,
    images: [
      {
        // PHOTO 1 : LE LOGO (Gauche)
        url: 'https://i.postimg.cc/x8JhDKhN/Confiserie1.png', 
        caption: 'Logo Original'
      },
      {
        // PHOTO 2 : LE STAND (Droite)
        url: 'https://i.postimg.cc/L5YwKz7W/595632468_881895807702564_2191728216735661234_n.jpg', 
        caption: 'Mise en situation sur le stand'
      },
      {
        // PHOTO 3 : LA BÂCHE (En dessous, pleine largeur)
        url: 'https://i.postimg.cc/L4J86GF7/bache_confiserie_parizel3.png', 
        caption: 'Design Bâche (210x90cm)',
        isWide: true
      }
    ]
  }
];

// --- COMPONENTS ---

const ImageModal = ({ image, onClose }: { image: ProjectImage | null, onClose: () => void }) => {
  if (!image) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 bg-slate-900/98 backdrop-blur-xl animate-in fade-in duration-300" onClick={onClose}>
      <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 p-3 rounded-full transition-colors z-50">
        <X size={28} />
      </button>
      <div className="w-full h-full flex flex-col items-center justify-center p-2">
        <img 
            src={image.url} 
            alt={image.caption} 
            className="w-auto h-auto max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300" 
            style={{ imageRendering: 'auto' }} // Assure le meilleur rendu possible
        />
        <p className="mt-6 text-white/90 font-medium text-xl tracking-wide">{image.caption}</p>
      </div>
    </div>
  );
};

const RealizationsPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<ProjectImage | null>(null);

  return (
    <div className="flex flex-col h-full overflow-y-auto no-scrollbar bg-[#FDFCF8]">
      
      {/* Banner */}
      <header className="relative pt-16 pb-8 px-8 bg-white border-b border-slate-50 rounded-b-[3rem] mb-6 overflow-hidden shadow-[0_4px_30px_-15px_rgba(0,0,0,0.05)] shrink-0 z-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#B48646]/5 rounded-full blur-[80px] -mr-16 -mt-16 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-slate-900/5 rounded-full blur-[60px] -ml-10 -mb-10 pointer-events-none"></div>
        
        <div className="relative z-10">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B48646]/5 text-[#B48646] text-[10px] font-bold uppercase tracking-widest mb-4 border border-[#B48646]/10">
              <ImageIcon size={12} /> Portfolio
           </div>
           <h1 className="text-3xl md:text-4xl font-extrabold font-['Poppins'] text-slate-900 leading-tight mb-2">
             Nos Réalisations
           </h1>
           <p className="text-slate-500 font-medium max-w-md text-sm md:text-base">
             Découvrez nos derniers projets graphiques et créations sur mesure.
           </p>
        </div>
      </header>

      <div className="flex-1 px-4 lg:px-8 pb-24 max-w-7xl mx-auto w-full space-y-12">
        
        {/* --- PROJECTS GALLERY --- */}
        {projects.length > 0 ? (
          <div className="space-y-12">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                
                {/* Project Header */}
                <div className="p-8 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                      {project.category}
                    </span>
                    <span className="text-xs font-bold text-slate-400">{project.date}</span>
                  </div>
                  
                  {project.link ? (
                    <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center gap-2 text-2xl font-bold text-slate-900 mb-3 hover:text-[#1877F2] hover:underline decoration-2 underline-offset-4 transition-all group"
                        title="Voir la page Facebook"
                    >
                        {project.title}
                        <ExternalLink size={18} className="text-slate-300 group-hover:text-[#1877F2] transition-colors" />
                    </a>
                  ) : (
                    <h2 className="text-2xl font-bold text-slate-900 mb-3">{project.title}</h2>
                  )}

                  <p className="text-slate-600 leading-relaxed text-sm max-w-3xl whitespace-pre-line">
                    {project.description}
                  </p>
                </div>

                {/* Images Grid Optimisée pour le centrage (2 colonnes) */}
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.images.map((img, idx) => (
                    <div 
                      key={idx} 
                      className={`relative group rounded-2xl overflow-hidden cursor-pointer bg-slate-50 border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-md 
                        ${img.isWide ? 'md:col-span-2 aspect-[21/9] md:aspect-[3/1]' : 'aspect-square md:col-span-1'}
                      `}
                      onClick={() => setSelectedImage(img)}
                    >
                      <div className={`w-full h-full flex items-center justify-center ${img.isWide ? 'bg-white' : ''}`}>
                         <img 
                            src={img.url} 
                            alt={img.caption} 
                            className={`transition-transform duration-700 group-hover:scale-[1.02] ${img.isWide ? 'w-full h-full object-contain' : 'w-full h-full object-cover'}`}
                         />
                      </div>
                      
                      <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                         <div className="bg-white/90 p-4 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl text-slate-800">
                            <Maximize2 size={24} />
                         </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <span className="text-white text-xs font-bold">{img.caption}</span>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-slate-400 italic">
            Aucun projet publié pour le moment.
          </div>
        )}


        {/* --- SOCIAL CTA (Footer) --- */}
        <div className="pt-8 border-t border-slate-100 flex flex-col items-center justify-center text-center">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Envie d'en voir plus ?</h3>
            <p className="text-slate-500 text-sm mb-6 max-w-xs mx-auto">
                Retrouvez toutes nos actus et nos stories quotidiennes sur les réseaux.
            </p>
            <div className="flex gap-4">
                <a 
                    href="https://www.instagram.com/infini2.4/" 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white shadow-lg shadow-pink-500/20 hover:scale-[1.02] active:scale-95 transition-all text-sm font-bold"
                >
                    <Instagram size={18} /> Instagram
                </a>

                <a 
                    href="https://www.facebook.com/profile.php?id=61584316950503" 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#1877F2] text-white shadow-lg shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all text-sm font-bold"
                >
                    <Facebook size={18} /> Facebook
                </a>
            </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />
      
    </div>
  );
};

export default RealizationsPage;
