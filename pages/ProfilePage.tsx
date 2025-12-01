import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { FolderOpen, LogIn, Infinity, Download, ExternalLink, CheckCircle, Clock, AlertCircle, Plus, Trash2, Send, Info, Eye, Edit2, FileCheck, Package, Facebook } from 'lucide-react';

interface ProfilePageProps {
  user?: User | null;
  onLogout: () => void;
  onLoginClick?: () => void;
}

// Étapes possibles d'un projet
type ProjectStep = 'request_received' | 'in_creation' | 'validation' | 'delivered';

interface LocalProject {
  id: number;
  title: string;
  type: string;
  step: ProjectStep;
  progress: number; // 0 to 100
  downloadUrl?: string;
  date: string;
  clientName?: string; // Pour l'admin
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, onLogout, onLoginClick }) => {
  
  // --- STATE DE SIMULATION (Persistant via LocalStorage) ---
  const [projects, setProjects] = useState<LocalProject[]>([]);
  const isAdmin = user?.email === 'wendy.toussaint@icloud.com';
  
  // Chargement initial depuis le LocalStorage
  useEffect(() => {
    const savedProjects = localStorage.getItem('infini_projects_v4'); // Changement de clé pour vider le cache précédent
    if (savedProjects) {
        setProjects(JSON.parse(savedProjects));
    } else {
        // Données par défaut : Aucune (Liste vide)
        setProjects([]);
    }
  }, []);

  // Sauvegarde automatique dans le LocalStorage à chaque changement
  useEffect(() => {
    localStorage.setItem('infini_projects_v4', JSON.stringify(projects));
  }, [projects]);

  // --- STATE ADMIN ---
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [newProjectTitle, setNewProjectTitle] = useState("");
  const [newClientName, setNewClientName] = useState("");
  const [newProjectType, setNewProjectType] = useState("Graphisme");

  // --- ACTIONS ADMIN ---
  const handleAddProject = () => {
      const newProj: LocalProject = {
          id: Date.now(),
          title: newProjectTitle || "Nouveau Projet",
          type: newProjectType,
          step: 'request_received',
          progress: 10,
          date: new Date().toLocaleDateString(),
          clientName: newClientName || "Client Inconnu"
      };
      setProjects([newProj, ...projects]);
      setNewProjectTitle("");
      setNewClientName("");
  };

  const handleUpdateStatus = (id: number, step: ProjectStep) => {
      let progress = 10;
      if (step === 'in_creation') progress = 50;
      if (step === 'validation') progress = 80;
      if (step === 'delivered') progress = 100;

      setProjects(projects.map(p => 
          p.id === id 
          ? { ...p, step: step, progress: progress, downloadUrl: step === 'delivered' ? '#' : undefined } 
          : p
      ));
  };

  const handleDeleteProject = (id: number) => {
      if(window.confirm("Supprimer ce projet de la liste ?")) {
          setProjects(projects.filter(p => p.id !== id));
      }
  };

  // --- HELPER: RENDER TIMELINE (Vue Client) ---
  const renderTimeline = (step: ProjectStep) => {
      const steps = [
          { key: 'request_received', label: 'Demande reçue', icon: Send },
          { key: 'in_creation', label: 'Création', icon: Edit2 },
          { key: 'validation', label: 'Validation', icon: FileCheck },
          { key: 'delivered', label: 'Livraison', icon: Package },
      ];

      const currentIdx = steps.findIndex(s => s.key === step);

      return (
          <div className="relative flex justify-between items-center mt-6 mb-2 px-2">
              {/* Progress Line */}
              <div className="absolute top-4 left-0 right-0 h-1 bg-slate-100 -z-10 rounded-full">
                  <div 
                    className="h-full bg-[#B48646] transition-all duration-1000 rounded-full"
                    style={{ width: `${(currentIdx / (steps.length - 1)) * 100}%` }}
                  ></div>
              </div>

              {steps.map((s, idx) => {
                  const isActive = idx <= currentIdx;
                  const isCurrent = idx === currentIdx;
                  return (
                      <div key={s.key} className="flex flex-col items-center gap-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${isActive ? 'bg-[#B48646] border-[#B48646] text-white shadow-lg shadow-[#B48646]/30' : 'bg-white border-slate-200 text-slate-300'}`}>
                              <s.icon size={14} strokeWidth={isCurrent ? 2.5 : 2} />
                          </div>
                          <span className={`text-[9px] font-bold uppercase tracking-wide ${isActive ? 'text-slate-900' : 'text-slate-300'}`}>{s.label}</span>
                      </div>
                  )
              })}
          </div>
      );
  };

  const renderProjectCard = (project: LocalProject) => (
    <div key={project.id} className={`rounded-[2rem] p-6 border transition-all duration-300 mb-6 ${project.step === 'delivered' ? 'bg-[#fffcf5] border-[#B48646] shadow-lg shadow-[#B48646]/10' : 'bg-slate-50 border-slate-100'}`}>
        {/* Header Card */}
        <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm text-xl ${project.step === 'delivered' ? 'bg-[#B48646] text-white' : 'bg-white text-slate-700'}`}>
                    {project.type === 'Graphisme' ? '🎨' : '🎬'}
                </div>
                <div>
                    <h3 className="font-bold text-slate-900 text-lg leading-tight">{project.title}</h3>
                    <p className="text-xs text-slate-500 font-medium">
                        Commandé le {project.date} 
                        {isAdmin && <span className="text-[#B48646] font-bold"> • {project.clientName}</span>}
                    </p>
                </div>
            </div>
        </div>

        {/* Timeline VISUELLE */}
        {renderTimeline(project.step)}

        {/* Action (Téléchargement) */}
        {project.step === 'delivered' && (
            <div className="mt-6 animate-in fade-in">
                <div className="bg-white rounded-2xl p-4 border border-[#B48646]/20 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-center md:text-left">
                        <p className="text-sm font-bold text-slate-800">Vos fichiers sont prêts !</p>
                        <p className="text-xs text-slate-500">Téléchargez-les avant expiration.</p>
                    </div>
                    <button className="w-full md:w-auto bg-[#B48646] hover:bg-[#9a733c] text-white px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#B48646]/20">
                        <Download size={18} /> Télécharger
                    </button>
                </div>
            </div>
        )}
    </div>
  );

  // Séparation des projets
  const pendingProjects = projects.filter(p => p.step === 'request_received');
  const activeProjects = projects.filter(p => p.step !== 'request_received');


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
                
                {/* 1. SECTION: DEMANDES EN ATTENTE */}
                {pendingProjects.length > 0 && (
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 mb-8">
                        <div className="flex justify-between items-end mb-6">
                            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                <Clock className="text-orange-500" size={24} /> En attente
                            </h2>
                            <span className="text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-full">{pendingProjects.length} demande(s)</span>
                        </div>
                        <div>
                            {pendingProjects.map(renderProjectCard)}
                        </div>
                    </div>
                )}

                {/* 2. SECTION: PROJETS ACTIFS & TERMINÉS */}
                {activeProjects.length > 0 && (
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 mb-8">
                        <div className="flex justify-between items-end mb-6">
                            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                <FolderOpen className="text-[#B48646]" size={24} /> Projets actifs
                            </h2>
                            <span className="text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-full">{activeProjects.length} en cours</span>
                        </div>
                        <div>
                            {activeProjects.map(renderProjectCard)}
                        </div>
                    </div>
                )}

                {/* EMPTY STATE (Si aucune liste n'a de projet) */}
                {projects.length === 0 && (
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 mb-8 text-center py-10 text-slate-400">
                        <FolderOpen size={40} className="mx-auto mb-4 opacity-50" />
                        <p className="text-sm">Aucun projet pour le moment.</p>
                    </div>
                )}

                {/* Support Card (Visible only for non-admins) */}
                {!isAdmin && (
                    <div className="bg-[#B48646] text-white p-8 rounded-[2.5rem] shadow-xl shadow-[#B48646]/20 relative overflow-hidden mb-12">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white blur-[50px] opacity-20 rounded-full"></div>
                        <h3 className="text-lg font-bold mb-2 relative z-10">Une question sur un projet ?</h3>
                        <p className="text-sm opacity-90 mb-6 relative z-10">Utilisez nos messageries pour une réponse rapide.</p>
                        
                        <div className="flex flex-col sm:flex-row gap-3 relative z-10">
                            <a href="https://wa.me/33663083676" target="_blank" rel="noreferrer" className="flex-1 flex justify-center bg-white text-[#B48646] px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors items-center gap-2">
                                <span className="truncate">WhatsApp</span> <ExternalLink size={16}/>
                            </a>
                            <a href="https://www.facebook.com/profile.php?id=61584316950503" target="_blank" rel="noreferrer" className="flex-1 flex justify-center bg-white/10 border border-white/20 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-white/20 transition-colors items-center gap-2">
                                <Facebook size={18}/> <span className="truncate">Facebook</span>
                            </a>
                        </div>
                    </div>
                )}

                {/* --- ZONE ADMIN (VISIBLE UNIQUEMENT PAR L'ADMINISTRATEUR) --- */}
                {isAdmin && (
                    <div className="border-t-2 border-dashed border-slate-200 pt-8 mt-8">
                        <div className="bg-slate-800 text-white p-6 rounded-[2rem] shadow-2xl">
                            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div> 
                                Dashboard Administrateur
                            </h3>
                            <p className="text-xs text-slate-400 mb-6">Gérez les demandes reçues par Email / WhatsApp ici.</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Ajouter un projet */}
                                <div className="bg-slate-700/50 p-4 rounded-2xl border border-slate-600">
                                    <h4 className="font-bold text-sm mb-3 flex items-center gap-2"><Plus size={14} /> Nouvelle Demande Reçue</h4>
                                    <div className="space-y-3">
                                        <input 
                                            type="text" 
                                            placeholder="Nom du projet (ex: Logo)" 
                                            value={newProjectTitle}
                                            onChange={(e) => setNewProjectTitle(e.target.value)}
                                            className="w-full bg-slate-900 border border-slate-600 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#B48646]"
                                        />
                                        <input 
                                            type="text" 
                                            placeholder="Nom du client" 
                                            value={newClientName}
                                            onChange={(e) => setNewClientName(e.target.value)}
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
                                        <button onClick={handleAddProject} className="w-full bg-green-600 hover:bg-green-500 text-white py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors">
                                            Créer le dossier
                                        </button>
                                    </div>
                                </div>

                                {/* Gérer les statuts */}
                                <div className="bg-slate-700/50 p-4 rounded-2xl border border-slate-600">
                                    <h4 className="font-bold text-sm mb-3">Mise à jour des statuts</h4>
                                    <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                        {projects.map(p => (
                                            <div key={p.id} className="bg-slate-800 p-3 rounded-xl border border-slate-600">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="font-bold text-xs truncate max-w-[100px]">{p.title}</span>
                                                    <button onClick={() => handleDeleteProject(p.id)} className="text-red-400 hover:text-red-300"><Trash2 size={12}/></button>
                                                </div>
                                                <div className="grid grid-cols-4 gap-1">
                                                    <button 
                                                        onClick={() => handleUpdateStatus(p.id, 'request_received')} 
                                                        className={`h-1.5 rounded-full ${p.step === 'request_received' ? 'bg-blue-500' : 'bg-slate-600'}`}
                                                        title="Reçu"
                                                    />
                                                    <button 
                                                        onClick={() => handleUpdateStatus(p.id, 'in_creation')} 
                                                        className={`h-1.5 rounded-full ${p.step === 'in_creation' ? 'bg-orange-500' : 'bg-slate-600'}`}
                                                        title="Création"
                                                    />
                                                    <button 
                                                        onClick={() => handleUpdateStatus(p.id, 'validation')} 
                                                        className={`h-1.5 rounded-full ${p.step === 'validation' ? 'bg-purple-500' : 'bg-slate-600'}`}
                                                        title="Validation"
                                                    />
                                                    <button 
                                                        onClick={() => handleUpdateStatus(p.id, 'delivered')} 
                                                        className={`h-1.5 rounded-full ${p.step === 'delivered' ? 'bg-green-500' : 'bg-slate-600'}`}
                                                        title="Livré"
                                                    />
                                                </div>
                                                <p className="text-[10px] text-slate-400 mt-1 text-center">
                                                    {p.step === 'request_received' && 'Reçu'}
                                                    {p.step === 'in_creation' && 'Création'}
                                                    {p.step === 'validation' && 'Valid.'}
                                                    {p.step === 'delivered' && 'Livré'}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

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