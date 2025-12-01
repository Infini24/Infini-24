import React, { useState, useEffect } from 'react';
import { User, ProjectStatus, ServiceType } from '../types';
import { FolderOpen, LogIn, Infinity, Download, ExternalLink, CheckCircle, Clock, AlertCircle, Plus, Trash2, Send, Info } from 'lucide-react';

interface ProfilePageProps {
  user?: User | null;
  onLogout: () => void;
  onLoginClick?: () => void;
}

// Mock Types for local state
interface LocalProject {
  id: number;
  title: string;
  type: string;
  status: 'pending' | 'in_progress' | 'completed';
  progress: number;
  downloadUrl?: string;
  date: string;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, onLogout, onLoginClick }) => {
  
  // --- STATE DE SIMULATION (Persistant via LocalStorage) ---
  const [projects, setProjects] = useState<LocalProject[]>([]);
  
  // Chargement initial depuis le LocalStorage
  useEffect(() => {
    const savedProjects = localStorage.getItem('infini_projects');
    if (savedProjects) {
        setProjects(JSON.parse(savedProjects));
    } else {
        // Données par défaut si rien en mémoire
        setProjects([
            {
            id: 1,
            title: "Exemple: Pack Identité Visuelle",
            type: "Graphisme",
            status: 'in_progress',
            progress: 60,
            date: "28/11/2025"
            }
        ]);
    }
  }, []);

  // Sauvegarde automatique dans le LocalStorage à chaque changement
  useEffect(() => {
    localStorage.setItem('infini_projects', JSON.stringify(projects));
  }, [projects]);

  // --- STATE ADMIN (Pour simuler vos actions) ---
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [newProjectTitle, setNewProjectTitle] = useState("");
  const [newProjectType, setNewProjectType] = useState("Graphisme");

  // --- ACTIONS ADMIN ---
  const handleAddProject = () => {
      const newProj: LocalProject = {
          id: Date.now(),
          title: newProjectTitle || "Nouveau Projet",
          type: newProjectType,
          status: 'pending',
          progress: 0,
          date: new Date().toLocaleDateString()
      };
      setProjects([newProj, ...projects]);
      setNewProjectTitle("");
  };

  const handleDeliverProject = (id: number) => {
      setProjects(projects.map(p => 
          p.id === id 
          ? { ...p, status: 'completed', progress: 100, downloadUrl: '#' } 
          : p
      ));
  };

  const handleDeleteProject = (id: number) => {
      if(window.confirm("Supprimer ce projet de la simulation ?")) {
          setProjects(projects.filter(p => p.id !== id));
      }
  };


  // --- RENDU VISUEL ---

  return (
    <div className="flex flex-col h-full bg-[#FDFCF8] overflow-y-auto no-scrollbar">
      
      {/* Header */}
      <header className="flex-none pt-14 pb-10 px-6 bg-white border-b border-slate-50 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] relative overflow-hidden rounded-b-[3.5rem] mb-6 z-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#B48646] to-[#F3C06B] rounded-full blur-[80px] opacity-15 -mr-16 -mt-16 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-slate-900 rounded-full blur-[60px] opacity-5 -ml-10 -mb-10"></div>

            <div className="relative z-10 flex flex-col items-center justify-center text-center mt-2">
                <div className="flex items-center justify-center mb-4 relative group cursor-pointer transition-transform duration-500 hover:scale-110">
                     <div className="absolute inset-0 bg-[#B48646] blur-3xl opacity-20 rounded-full group-hover:opacity-40 transition-opacity duration-500"></div>
                     <Infinity size={48} strokeWidth={1.5} className="text-[#B48646] relative z-10 drop-shadow-sm transition-transform duration-700 group-hover:rotate-180" />
                </div>
                
                <h1 className="text-4xl tracking-tighter mb-2 font-['Poppins'] font-bold text-slate-900">
                    Mon Suivi
                </h1>
                
                <div className="inline-block px-4 py-1.5 rounded-full bg-[#B48646]/5 border border-[#B48646]/10 backdrop-blur-sm">
                     <p className="text-[#B48646] text-[10px] font-bold tracking-[0.3em] uppercase">
                        Espace Client
                     </p>
                </div>
            </div>
        </header>

      <div className="flex-1 px-4 lg:px-8 relative z-20 pb-20 flex flex-col items-center justify-start">
        
        {user ? (
             <div className="w-full max-w-3xl animate-in slide-in-from-bottom duration-500">
                
                {/* LISTE DES PROJETS (Vue Client) */}
                <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 mb-8">
                    <div className="flex justify-between items-end mb-6">
                        <h2 className="text-xl font-bold text-slate-900">Vos projets</h2>
                        <span className="text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-full">{projects.length} actif(s)</span>
                    </div>
                    
                    {projects.length === 0 ? (
                        <div className="text-center py-10 text-slate-400">
                            <FolderOpen size={40} className="mx-auto mb-4 opacity-50" />
                            <p className="text-sm">Aucun projet pour le moment.</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {projects.map((project) => (
                                <div key={project.id} className={`rounded-[2rem] p-6 border transition-all duration-300 ${project.status === 'completed' ? 'bg-[#fffcf5] border-[#B48646] shadow-lg shadow-[#B48646]/10' : 'bg-slate-50 border-slate-100'}`}>
                                    
                                    {/* Header Card */}
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm text-xl ${project.status === 'completed' ? 'bg-[#B48646] text-white' : 'bg-white text-slate-700'}`}>
                                                {project.type === 'Graphisme' ? '🎨' : '🎬'}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-900 text-lg leading-tight">{project.title}</h3>
                                                <p className="text-xs text-slate-500 font-medium">Commandé le {project.date}</p>
                                            </div>
                                        </div>
                                        
                                        {/* Status Badge */}
                                        <div className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                                            project.status === 'completed' ? 'bg-green-100 text-green-700' :
                                            project.status === 'in_progress' ? 'bg-blue-50 text-blue-600' :
                                            'bg-slate-200 text-slate-500'
                                        }`}>
                                            {project.status === 'completed' && <CheckCircle size={12}/>}
                                            {project.status === 'in_progress' && <Clock size={12}/>}
                                            {project.status === 'pending' && <AlertCircle size={12}/>}
                                            
                                            {project.status === 'completed' ? 'Livré' : 
                                             project.status === 'in_progress' ? 'En cours' : 'En attente'}
                                        </div>
                                    </div>

                                    {/* Content based on status */}
                                    {project.status === 'completed' ? (
                                        <div className="mt-4 animate-in fade-in">
                                            <div className="bg-white rounded-2xl p-4 border border-[#B48646]/20 flex flex-col md:flex-row items-center justify-between gap-4">
                                                <div className="text-center md:text-left">
                                                    <p className="text-sm font-bold text-slate-800">Vos fichiers sont prêts !</p>
                                                    <p className="text-xs text-slate-500">Téléchargez-les avant le lien expire.</p>
                                                </div>
                                                <button className="w-full md:w-auto bg-[#B48646] hover:bg-[#9a733c] text-white px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#B48646]/20">
                                                    <Download size={18} /> Télécharger
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="mt-4">
                                            <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                                                <span>Avancement</span>
                                                <span>{project.progress}%</span>
                                            </div>
                                            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                                                <div 
                                                    className={`h-full rounded-full transition-all duration-1000 ${project.status === 'in_progress' ? 'bg-blue-500 w-[60%]' : 'bg-slate-300 w-[5%]'}`}
                                                ></div>
                                            </div>
                                            <p className="text-xs text-slate-400 mt-3 font-medium italic">
                                                {project.status === 'in_progress' ? "Nos créatifs travaillent sur votre projet..." : "En attente de validation du devis ou des éléments."}
                                            </p>
                                        </div>
                                    )}

                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Support Card */}
                <div className="bg-[#B48646] text-white p-8 rounded-[2.5rem] shadow-xl shadow-[#B48646]/20 relative overflow-hidden mb-12">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-white blur-[50px] opacity-20 rounded-full"></div>
                     <h3 className="text-lg font-bold mb-2 relative z-10">Une question sur un projet ?</h3>
                     <p className="text-sm opacity-90 mb-6 relative z-10">Utilisez la messagerie WhatsApp pour une réponse rapide.</p>
                     <a href="https://wa.me/33663083676" target="_blank" rel="noreferrer" className="inline-flex bg-white text-[#B48646] px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors relative z-10 items-center gap-2">
                        Contacter le support <ExternalLink size={16}/>
                     </a>
                </div>

                {/* --- ZONE ADMIN (SIMULATION) --- */}
                <div className="border-t-2 border-dashed border-slate-200 pt-8 mt-8">
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-4 flex gap-3 text-xs text-blue-700">
                         <Info size={20} className="shrink-0" />
                         <p>
                             <strong>Note importante :</strong> Ceci est un <em>simulateur local</em>. 
                             Les projets que vous ajoutez ici ne sont visibles que sur <strong>votre appareil</strong>. 
                             Pour que vos clients voient leurs projets, vous devrez connecter une base de données ou leur envoyer les fichiers par Email / WhatsApp.
                         </p>
                    </div>

                    <button 
                        onClick={() => setShowAdminPanel(!showAdminPanel)}
                        className="text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-[#B48646] transition-colors mb-4 flex items-center gap-2"
                    >
                        {showAdminPanel ? "Masquer" : "Afficher"} le simulateur Admin
                    </button>

                    {showAdminPanel && (
                        <div className="bg-slate-800 text-white p-6 rounded-[2rem] shadow-2xl">
                            <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div> Interface Administrateur (Démo)</h3>
                            <p className="text-xs text-slate-400 mb-6">Utilisez ce panneau pour tester l'affichage comme si vous étiez le gestionnaire.</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Ajouter un projet */}
                                <div className="bg-slate-700/50 p-4 rounded-2xl border border-slate-600">
                                    <h4 className="font-bold text-sm mb-3">1. Créer un projet (Test)</h4>
                                    <div className="space-y-3">
                                        <input 
                                            type="text" 
                                            placeholder="Nom du projet" 
                                            value={newProjectTitle}
                                            onChange={(e) => setNewProjectTitle(e.target.value)}
                                            className="w-full bg-slate-900 border border-slate-600 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#B48646]"
                                        />
                                        <select 
                                            value={newProjectType}
                                            onChange={(e) => setNewProjectType(e.target.value)}
                                            className="w-full bg-slate-900 border border-slate-600 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#B48646]"
                                        >
                                            <option value="Graphisme">Graphisme</option>
                                            <option value="Vidéo">Vidéo</option>
                                        </select>
                                        <button onClick={handleAddProject} className="w-full bg-slate-600 hover:bg-slate-500 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2">
                                            <Plus size={14} /> Ajouter à la liste
                                        </button>
                                    </div>
                                </div>

                                {/* Actions sur les projets */}
                                <div className="bg-slate-700/50 p-4 rounded-2xl border border-slate-600">
                                    <h4 className="font-bold text-sm mb-3">2. Gérer les projets</h4>
                                    <div className="space-y-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                                        {projects.map(p => (
                                            <div key={p.id} className="flex items-center justify-between bg-slate-800 p-2 rounded-lg text-xs">
                                                <span className="truncate max-w-[80px]">{p.title}</span>
                                                <div className="flex gap-1">
                                                    {p.status !== 'completed' && (
                                                        <button 
                                                            onClick={() => handleDeliverProject(p.id)}
                                                            className="bg-green-600 hover:bg-green-500 text-white p-1.5 rounded-lg"
                                                            title="Simuler la livraison"
                                                        >
                                                            <Send size={12} />
                                                        </button>
                                                    )}
                                                    <button 
                                                        onClick={() => handleDeleteProject(p.id)}
                                                        className="bg-red-600 hover:bg-red-500 text-white p-1.5 rounded-lg"
                                                        title="Supprimer"
                                                    >
                                                        <Trash2 size={12} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

             </div>
        ) : (
             /* Empty State - Not Logged In */
            <div className="w-full max-w-md bg-white rounded-[3rem] p-10 shadow-2xl shadow-slate-200/50 border border-slate-50 text-center relative overflow-hidden group mt-10">
                 <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 shadow-inner mx-auto">
                    <FolderOpen size={36} className="text-slate-300" />
                </div>
                
                <h2 className="text-xl font-bold text-slate-900 mb-2">Espace Client Sécurisé</h2>
                <p className="text-slate-500 text-sm leading-relaxed mb-8">
                    Connectez-vous pour suivre l'avancement de vos commandes, valider les maquettes et télécharger vos fichiers finaux.
                </p>

                {onLoginClick && (
                    <button 
                        onClick={onLoginClick}
                        className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-[#B48646] hover:shadow-[#B48646]/30 transition-all flex items-center justify-center gap-2 group-hover:-translate-y-1"
                    >
                        <LogIn size={18} /> Se connecter
                    </button>
                )}
            </div>
        )}

      </div>
    </div>
  );
};

export default ProfilePage;