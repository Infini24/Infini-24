
import React, { useState } from 'react';
import { Image as ImageIcon, Instagram, Facebook, Maximize2, ExternalLink, X, Play, Film } from 'lucide-react';

// --- TYPES ---
interface ProjectImage {
  url: string;
  caption: string;
  isWide?: boolean; 
}

interface Project {
  id: string;
  title: string;
  category: 'Identité Visuelle' | 'Vidéo' | 'Print' | 'Autre';
  description: string;
  date: string;
  images?: ProjectImage[];
  videoUrl?: string; // Support pour les exemples vidéo (URL YouTube ID ou MP4)
  videoPoster?: string; // Image d'aperçu pour la vidéo
  link?: string; 
}

// --- DATA (VOS PROJETS) ---
const projects: Project[] = [
  {
    id: 'hommage-souvenirs',
    title: 'Hommage & Obsèques',
    category: 'Vidéo',
    date: 'Janvier 2025',
    description: "La création d'un montage vidéo pour un hommage est un exercice de sensibilité et de respect. Chez Infini 24, nous sélectionnons avec soin vos photos et musiques pour créer une œuvre digne, retraçant une vie avec émotion. Ce projet d'exemple illustre notre capacité à transformer des souvenirs statiques en un récit cinématographique poignant, idéal pour les cérémonies d'obsèques ou les commémorations familiales.",
    videoUrl: 'jN30d1i963M', // ID de votre vidéo YouTube
    videoPoster: 'https://images.unsplash.com/photo-1464692805480-a69dfaafdb0d?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 'confiserie-parizel',
    title: 'Confiserie Parizel',
    category: 'Identité Visuelle',
    date: 'Décembre 2024',
    link: 'https://www.facebook.com/profile.php?id=100076464574527&locale=fr_FR',
    description: "Pour la Confiserie Parizel, nous avons assuré la conception complète de leur logo original, établissant une identité de marque visuellement chaleureuse et distinctive. Afin d'optimiser leur présence sur les évènements, nous avons également géré le design d'une bâche publicitaire grand format (210cm sur 90cm). Cette bâche a été conçue en garantissant une visibilité maximale et renforçant l'attractivité du point de vente durant l'événement.",
    images: [
      {
        url: 'https://i.postimg.cc/x8JhDKhN/Confiserie1.png', 
        caption: 'Logo Original'
      },
      {
        url: 'https://i.postimg.cc/L5YwKz7W/595632468_881895807702564_2191728216735661234_n.jpg', 
        caption: 'Mise en situation sur le stand'
      },
      {
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
        <div className="relative">
          <img 
              src={image.url} 
              alt={image.caption} 
              className="w-auto h-auto max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300 pointer-events-none select-none" 
              referrerPolicy="no-referrer"
          />
          {/* Shield */}
          <div className="absolute inset-0 z-10" />
        </div>
        <p className="mt-6 text-white/90 font-medium text-xl tracking-wide">{image.caption}</p>
      </div>
    </div>
  );
};

const RealizationsPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<ProjectImage | null>(null);

  return (
    <div className="flex flex-col min-h-full bg-transparent relative overflow-hidden">
      {/* Filigrane Finn */}
      <div className="absolute top-20 -right-20 w-96 h-96 opacity-[0.02] pointer-events-none rotate-12">
          <img 
              src="https://res.cloudinary.com/dmgqewagr/image/upload/v1773739523/Portrait.png" 
              alt="" 
              className="w-full h-full object-contain grayscale"
              referrerPolicy="no-referrer"
          />
      </div>

      <div className="flex-1 px-4 lg:px-8 py-12 md:py-24 max-w-7xl mx-auto w-full space-y-12 relative z-10">
        
        {/* --- PROJECTS GALLERY --- */}
        <div className="space-y-12">
          {projects.map((project) => (
            <div key={project.id} className="bg-slate-900/40 backdrop-blur-md rounded-[2.5rem] shadow-xl border border-white/5 overflow-visible group">
              
              {/* Project Header */}
              <div className="p-8 pb-4">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${project.category === 'Vidéo' ? 'bg-[#B48646]/20 text-[#B48646]' : 'bg-white/5 text-slate-400'}`}>
                    {project.category}
                  </span>
                  <span className="text-xs font-bold text-slate-500">{project.date}</span>
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                  {project.title}
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="hover:text-[#1877F2] transition-colors">
                      <ExternalLink size={18} className="opacity-30 hover:opacity-100" />
                    </a>
                  )}
                </h2>

                <p className="text-slate-400 leading-relaxed text-sm max-w-3xl whitespace-pre-line">
                  {project.description}
                </p>
              </div>

              {/* VIDEO PLAYER (Rétabli à la version stable) */}
              {project.videoUrl && (
                <div className="p-4 pt-2">
                  <div className="relative rounded-[2rem] overflow-hidden bg-slate-950 aspect-video shadow-2xl border border-white/5 group/video">
                    {project.videoUrl.length === 11 ? (
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${project.videoUrl}?rel=0&modestbranding=1&playsinline=1`}
                        title={project.title}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <video 
                        src={project.videoUrl} 
                        poster={project.videoPoster}
                        controls 
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  {project.category === 'Vidéo' && (
                    <p className="mt-3 px-4 text-[10px] text-slate-500 font-medium italic text-center">
                      Lecture directe activée.
                    </p>
                  )}
                </div>
              )}

              {/* IMAGES GRID (Si images disponibles) */}
              {project.images && (
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.images.map((img, idx) => (
                    <div 
                      key={idx} 
                      className={`relative group/img rounded-2xl overflow-hidden cursor-pointer bg-slate-950/50 border border-white/5 shadow-sm transition-all duration-300 hover:shadow-md 
                        ${img.isWide ? 'md:col-span-2 aspect-[21/9] md:aspect-[3/1]' : 'aspect-square md:col-span-1'}
                      `}
                      onClick={() => setSelectedImage(img)}
                    >
                      <div className={`w-full h-full flex items-center justify-center ${img.isWide ? 'bg-slate-950' : ''}`}>
                         <img 
                            src={img.url} 
                            alt={img.caption} 
                            className={`transition-transform duration-700 group-hover/img:scale-[1.02] ${img.isWide ? 'w-full h-full object-contain' : 'w-full h-full object-cover'} pointer-events-none select-none`}
                            referrerPolicy="no-referrer"
                         />
                      </div>
                      
                      <div className="absolute inset-0 bg-slate-900/0 group-hover/img:bg-slate-900/10 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                         <div className="bg-white/90 p-4 rounded-full opacity-0 group-hover/img:opacity-100 transform translate-y-4 group-hover/img:translate-y-0 transition-all duration-300 shadow-xl text-slate-800">
                            <Maximize2 size={24} />
                         </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <span className="text-white text-xs font-bold">{img.caption}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          ))}
        </div>

        {/* --- SOCIAL CTA (Footer) --- */}
        <div className="pt-8 pb-12 border-t border-white/5 flex flex-col items-center justify-center text-center">
            <h3 className="text-lg font-bold text-white mb-2">Envie d'en voir plus ?</h3>
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
