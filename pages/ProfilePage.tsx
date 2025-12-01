import React, { useState, useEffect, useRef } from 'react';
import { User } from '../types';
import { FolderOpen, LogIn, Infinity, Download, ExternalLink, CheckCircle, Clock, AlertCircle, Plus, Trash2, Send, Info, Eye, Edit2, FileCheck, Package, Facebook, UploadCloud, FileText, Loader2, Users, Phone as PhoneIcon, Calendar } from 'lucide-react';
import { getProjects, updateProjectStatus, deleteProject, saveProject, uploadProjectFile, getUsers } from '../db'; // Import du gestionnaire
import toast from 'react-hot-toast';

interface ProfilePageProps {
  user?: User | null;
  onLogout: () => void;
  onLoginClick?: () => void;
}

// Étapes possibles d'un projet
type ProjectStep = 'request_received' | 'in_creation' | 'validation' | 'delivered';

interface ProjectFile {
    name: string;
    url: string;
    date: string;
}

interface LocalProject {
  id: string;
  title: string;
  type: string;
  step: ProjectStep;
  progress: number; // 0 to 100
  downloadUrl?: string;
  date: string;
  clientName?: string; // Pour l'admin
  clientEmail?: string; // Pour filtrage
  price?: number | string;
  files?: ProjectFile[]; // Liste des fichiers envoyés par le client
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, onLogout, onLoginClick }) => {
  
  const [projects, setProjects] = useState<LocalProject[]>([]);
  const [allUsers, setAllUsers] = useState<any[]>([]); // Liste des clients pour l'admin
  const isAdmin = user?.email === 'wendy.toussaint@icloud.com';
  
  // Upload State
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // Chargement des données (Async via db.ts)
  const loadData = async () => {
      // 1. Charger les projets
      const projectsData = await getProjects();
      setProjects(projectsData as LocalProject[]);

      // 2. Charger les utilisateurs (Seulement si Admin)
      if (isAdmin) {
          const usersData = await getUsers();
          setAllUsers(usersData);
      }
  };

  useEffect(() => {
    loadData();
    // Optionnel: Un petit polling pour rafraîchir en temps réel
    const interval = setInterval(loadData, 10000); 
    return () => clearInterval(interval);
  }, [isAdmin]); // Reload when admin status changes

  // --- STATE ADMIN ---
  const [newProjectTitle, setNewProjectTitle] = useState("");
  const [newClientName, setNewClientName] = useState("");
  const [newProjectType, setNewProjectType] = useState("Graphisme");

  // --- ACTIONS ADMIN ---
  const handleAddProject = async () => {
      const newProj = {
          title: newProjectTitle || "Nouveau Projet",
          type: newProjectType,
          step: 'request_received',
          progress: 10,
          date: new Date().toLocaleDateString(),
          clientName: newClientName || "Client Inconnu",
          clientEmail: "", 
      };
      
      await saveProject(newProj);
      await loadData(); // Refresh UI

      setNewProjectTitle("");
      setNewClientName("");
  };

  const handleUpdateStatus = async (id: string | number, step: ProjectStep) => {
      let progress = 10;
      if (step === 'in_creation') progress = 50;
      if (step === 'validation') progress = 80;
      if (step === 'delivered') progress = 100;

      await updateProjectStatus(id, step, progress);
      await loadData();
  };

  const handleDeleteProject = async (id: string | number) => {
      if(window.confirm("Supprimer ce projet de la liste ?")) {
          await deleteProject(id);
          await loadData();
      }
  };

  // --- ACTIONS CLIENT (UPLOAD) ---
  const handleUploadClick = (projectId: string) => {
      setSelectedProjectId(projectId);
      if (fileInputRef.current) {
          fileInputRef.current.click();
      }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || !selectedProjectId) return;

      setUploadingId(selectedProjectId);
      const toastId = toast.loading("Envoi du fichier...");

      try {
          // Trouver le projet pour récupérer l'email du client
          const currentProject = projects.find(p => p.id === selectedProjectId);
          const clientEmail = currentProject?.clientEmail || user?.email || "anonyme";

          await uploadProjectFile(selectedProjectId, file, clientEmail);
          
          toast.success("Fichier envoyé avec succès !", { id: toastId });
          await loadData();
      } catch (error) {
          console.error(error);
          toast.error("Erreur d'envoi. Vérifiez votre connexion.", { id: toastId });
      } finally {
          setUploadingId(null);
          setSelectedProjectId(null);
          // Reset input
          if (fileInputRef.current) fileInputRef.current.value = "";
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
        {renderTimeline(project.step as ProjectStep)}

        {/* --- ZONE FICHIERS (UPLOAD & VIEW) --- */}
        <div className="mt-6 pt-4 border-t border-slate-100/50">
            
            {/* Liste des fichiers envoyés */}
            {project.files && project.files.length > 0 && (
                <div className="mb-4">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1">
                        <FileText size={10} /> Fichiers transmis ({project.files.length})
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {project.files.map((file, idx) => (
                            <a 
                                key={idx} 
                                href={file.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                            >
                                <span className="truncate max-w-[100px]">{file.name}</span>
                                <ExternalLink size={10} />
                            </a>
                        ))}
                    </div>
                </div>
            )}

            <div className="flex flex-col gap-3">
                {/* Bouton Upload (Visible pour le client si projet non livré) */}
                {project.step !== 'delivered' && project.step !== 'request_received' && !isAdmin && (
                    <button 
                        onClick={() => handleUploadClick(project.id)}
                        disabled={uploadingId === project.id}
                        className="w-full bg-white border-2 border-dashed border-slate-300 text-slate-500 hover:border-[#B48646] hover:text-[#B48646] hover:bg-[#B48646]/5 px-4 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2"
                    >
                        {uploadingId === project.id ? (
                            <><Loader2 className="animate-spin" size={18} /> Envoi en cours...</>
                        ) : (
                            <><UploadCloud size={18} /> Ajouter des fichiers (Photos/Logos)</>
                        )}
                    </button>
                )}

                {/* Bouton Téléchargement Final (Si livré) */}
                {project.step === 'delivered' && (
                    <div className="bg-white rounded-2xl p-4 border border-[#B48646]/20 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="text-center md:text-left">
                            <p className="text-sm font-bold text-slate-800">Vos fichiers sont prêts !</p>
                            <p className="text-xs text-slate-500">Téléchargez-les avant expiration.</p>
                        </div>
                        <button className="w-full md:w-auto bg-[#B48646] hover:bg-[#9a733c] text-white px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#B48646]/20">
                            <Download size={18} /> Télécharger
                        </button>
                    </div>
                )}
            </div>
        </div>
    </div>
  );

  // --- FILTERING LOGIC ---
  const displayedProjects = isAdmin 
    ? projects 
    : projects.filter(p => p.clientEmail === user?.email);

  const pendingProjects = displayedProjects.filter(p => p.step === 'request_received');
  const activeProjects = displayedProjects.filter(p => p.step !== 'request_received');


  // --- RENDU VISUEL ---

  return (
    <div className="flex flex-col h-full bg-[#FDFCF8] overflow-y-auto no-scrollbar">
      
      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept="image/*,.pdf,.zip,.rar" // Accept images, pdfs, archives
      />

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
                        {isAdmin ? 'Espace Administrateur' : 'Espace Client'}
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
                {displayedProjects.length === 0 && (
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 mb-8 text-center py-10 text-slate-400">
                        <FolderOpen size={40} className="mx-auto mb-4 opacity-50" />
                        <p className="text-sm">Aucun projet pour le moment.</p>
                        {isAdmin && <p className="text-xs mt-2 text-red-400">Le mode Cloud n'est actif que si configuré.</p>}
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

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Colonne 1 : Création & Statuts */}
                                <div className="space-y-6">
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
                                                        <span className="text-[9px] text-slate-400 truncate">{p.clientName}</span>
                                                        <button onClick={() => handleDeleteProject(p.id)} className="text-red-400 hover:text-red-300 ml-2"><Trash2 size={12}/></button>
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
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Colonne 2 : Clients Inscrits */}
                                <div className="bg-slate-700/50 p-4 rounded-2xl border border-slate-600 flex flex-col">
                                    <h4 className="font-bold text-sm mb-3 flex items-center gap-2"><Users size={14} /> Derniers Clients Inscrits</h4>
                                    <div className="space-y-2 flex-1 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
                                        {allUsers.length === 0 && <p className="text-xs text-slate-500 italic">Aucun client pour le moment.</p>}
                                        {allUsers.map((client, idx) => (
                                            <div key={client.uid || idx} className="bg-slate-800 p-3 rounded-xl border border-slate-600">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p className="font-bold text-xs text-white">{client.name}</p>
                                                        <p className="text-[10px] text-slate-400">{client.email}</p>
                                                    </div>
                                                    {/* Badge Nouveau */}
                                                    {idx < 3 && <span className="text-[9px] bg-red-500/20 text-red-400 px-1.5 rounded font-bold">New</span>}
                                                </div>
                                                <div className="mt-2 pt-2 border-t border-slate-700/50 flex flex-col gap-1">
                                                    {client.phone && (
                                                        <div className="flex items-center gap-1.5 text-[10px] text-slate-300">
                                                            <PhoneIcon size={10} className="text-[#B48646]" /> {client.phone}
                                                        </div>
                                                    )}
                                                    {client.companyName && (
                                                        <div className="flex items-center gap-1.5 text-[10px] text-slate-300">
                                                            <FolderOpen size={10} className="text-[#B48646]" /> {client.companyName}
                                                        </div>
                                                    )}
                                                    <div className="flex items-center gap-1.5 text-[9px] text-slate-500 mt-1">
                                                        <Calendar size={9} /> Inscrit le {new Date(client.createdAt).toLocaleDateString()}
                                                    </div>
                                                </div>
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