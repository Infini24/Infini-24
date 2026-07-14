import React, { useState, useEffect, useCallback } from 'react';
import { 
  Facebook, 
  MessageSquare, 
  ThumbsUp, 
  Share2, 
  Calendar, 
  Settings, 
  Key, 
  AlertTriangle, 
  RefreshCw, 
  ExternalLink, 
  Info, 
  Check, 
  ChevronRight,
  Sparkles,
  HelpCircle,
  FileText,
  Send
} from 'lucide-react';
import toast from 'react-hot-toast';

interface FBComment {
  author: string;
  text: string;
  date: string;
}

interface FBPost {
  id: string;
  author: string;
  avatar: string;
  date: string;
  content: string;
  image?: string;
  likes: number;
  shares: number;
  commentsList: FBComment[];
}

interface FacebookPageProps {
  onNavigate?: (index: number) => void;
}

const FacebookPage: React.FC<FacebookPageProps> = ({ onNavigate }) => {
  const pageId = "61584316950503";
  const messengerUrl = "https://m.me/61584316950503";
  const pageProfileUrl = "https://www.facebook.com/profile.php?id=61584316950503";

  // New Official Token provided by user
  const defaultToken = (import.meta.env.VITE_FACEBOOK_TOKEN as string) || "EAAeKRyU3NhsBR6IpSo8v8bQN303HBK2cbYRQfbCpbLBAzvTulTuEAgeo0Eao6ZBYlZCeUhe88GMl1b0r9mrIVE6JLyWD2NWSN6WNI47WHVQ49xEXj4dRkxdF607lp8AypZAlFGyv3OJ8avWq6K7KVnAxaDAc5fT63gp5zKulZCCbjt1qI0fmeOC5ifVvUrYrCPZCG0ARIZC8E7NhdcKtsOwkqrYucYocLbfc78GsuEZAR50ZCtnnRxDksjV0NLVQguOSJAtEgwhMJhvhS9A9hoVbU74y";

  // State
  const [accessToken, setAccessToken] = useState<string>(() => {
    const envToken = import.meta.env.VITE_FACEBOOK_TOKEN as string;
    if (envToken && envToken.trim() !== "") {
      return envToken.trim();
    }
    const stored = localStorage.getItem('fb_page_access_token');
    // Force update if empty or if it's the old invalid token prefix
    if (!stored || stored.startsWith("EAAYF6ZCDDV")) {
      return defaultToken;
    }
    return stored;
  });
  
  const [activeSubTab, setActiveSubTab] = useState<'api' | 'guide'>('api');
  const [pageName, setPageName] = useState("INFINI24 - Créateur de Souvenirs");
  const [pagePicture, setPagePicture] = useState("https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=2070&auto=format&fit=crop");
  
  const [isTokenEditing, setIsTokenEditing] = useState(false);
  const [tempToken, setTempToken] = useState('');
  const [apiPosts, setApiPosts] = useState<FBPost[]>([]);
  const [isLoadingApi, setIsLoadingApi] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [showErrorBanner, setShowErrorBanner] = useState(true);

  // Fallback demo posts to keep app beautiful if API token fails
  const demoPosts: FBPost[] = [
    {
      id: "demo-1",
      author: "INFINI24 - Créateur de Souvenirs",
      avatar: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=2070&auto=format&fit=crop",
      date: "12 Juillet 2026 à 14:30",
      content: "✨ Retour en images sur notre dernier événement de ce week-end ! Nos photobooths ont illuminé le mariage de Sophie & Thomas. Des sourires, de la joie et des souvenirs capturés pour l'éternité. Merci de nous faire confiance pour sublimer vos plus beaux moments ! ❤️📸\n\nBesoin d'un créateur de souvenirs pour votre prochain événement en Dordogne ou Gironde ? Contactez-nous dès aujourd'hui !",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop",
      likes: 48,
      shares: 12,
      commentsList: [
        { author: "Sophie Robert", text: "Une prestation incroyable ! Nos invités ont adoré le photobooth, les photos sont d'une qualité exceptionnelle ! Merci encore !", date: "12 Juil" },
        { author: "Marc Lemaire", text: "Au top ! Je recommande vivement pour tous vos événements !", date: "13 Juil" }
      ]
    },
    {
      id: "demo-2",
      author: "INFINI24 - Créateur de Souvenirs",
      avatar: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=2070&auto=format&fit=crop",
      date: "05 Juillet 2026 à 09:15",
      content: "🌟 NOUVEAUTÉ 2026 🌟\nNous sommes ravis de vous présenter notre tout nouveau miroir magique photobooth interactif ! 🪞✨ Une expérience encore plus immersive avec animations personnalisées, signature sur écran, et impressions instantanées ultra haute qualité.\n\nIdéal pour les mariages, anniversaires, lancements de produits et soirées d'entreprise.",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
      likes: 35,
      shares: 5,
      commentsList: [
        { author: "Entreprise Innov", text: "Utilisé lors de notre gala de fin d'année, un franc succès ! Les collaborateurs sont repartis ravis.", date: "06 Juil" }
      ]
    }
  ];

  // Local interaction states
  const [activeReaction, setActiveReaction] = useState<Record<string, string>>({});
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [userComments, setUserComments] = useState<Record<string, FBComment[]>>({});

  const handleReact = (postId: string, reaction: string) => {
    setActiveReaction(prev => ({
      ...prev,
      [postId]: prev[postId] === reaction ? '' : reaction
    }));
    toast.success(`Réaction enregistrée sur la publication !`);
  };

  const handleAddComment = (postId: string) => {
    const text = commentInputs[postId]?.trim();
    if (!text) return;

    const newComment: FBComment = {
      author: "Vous (Visiteur)",
      text: text,
      date: "À l'instant"
    };

    setUserComments(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newComment]
    }));

    setCommentInputs(prev => ({
      ...prev,
      [postId]: ''
    }));

    toast.success("Votre commentaire a été simulé avec succès !");
  };

  // Fetch from Facebook API
  const fetchFacebookPosts = useCallback(async (tokenToUse: string) => {
    if (!tokenToUse) return;
    setIsLoadingApi(true);
    setApiError(null);
    setShowErrorBanner(true);

    let targetEndpoint = "me";
    let name = "INFINI24 - Créateur de Souvenirs";
    let picture = "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=2070&auto=format&fit=crop";

    try {
      // First, try fetching metadata from /me
      const meMetaRes = await fetch(
        `https://graph.facebook.com/v19.0/me?fields=id,name,picture.type(large)&access_token=${tokenToUse}`
      );
      const meMetaData = await meMetaRes.json();
      
      if (meMetaData && !meMetaData.error) {
        targetEndpoint = "me";
        if (meMetaData.name) name = meMetaData.name;
        if (meMetaData.picture?.data?.url) picture = meMetaData.picture.data.url;
      } else {
        // Fallback to explicit page ID if /me fails
        const pageMetaRes = await fetch(
          `https://graph.facebook.com/v19.0/${pageId}?fields=id,name,picture.type(large)&access_token=${tokenToUse}`
        );
        const pageMetaData = await pageMetaRes.json();
        if (pageMetaData && !pageMetaData.error) {
          targetEndpoint = pageId;
          if (pageMetaData.name) name = pageMetaData.name;
          if (pageMetaData.picture?.data?.url) picture = pageMetaData.picture.data.url;
        } else {
          console.warn("Meta API Metadata checks failed, continuing with /me as a best effort.", meMetaData?.error);
        }
      }
    } catch (metaErr) {
      console.warn("Meta API metadata fetch failed, continuing with /me", metaErr);
    }

    setPageName(name);
    setPagePicture(picture);

    try {
      // Fetch feed from target endpoint
      let response = await fetch(
        `https://graph.facebook.com/v19.0/${targetEndpoint}/posts?fields=id,message,story,created_time,full_picture,shares,likes.summary(true).limit(0),comments.limit(10){id,message,from,created_time}&access_token=${tokenToUse}`
      );

      let data = await response.json();

      // Fallback switch if the main target failed
      if (data.error) {
        const altEndpoint = targetEndpoint === "me" ? pageId : "me";
        console.log(`Primary feed endpoint failed, trying fallback to: ${altEndpoint}...`);
        
        const fallbackRes = await fetch(
          `https://graph.facebook.com/v19.0/${altEndpoint}/posts?fields=id,message,story,created_time,full_picture,shares,likes.summary(true).limit(0),comments.limit(10){id,message,from,created_time}&access_token=${tokenToUse}`
        );
        const fallbackData = await fallbackRes.json();
        
        if (!fallbackData.error) {
          data = fallbackData;
          targetEndpoint = altEndpoint;
        }
      }

      if (data.error) {
        throw new Error(data.error.message || "Erreur de connexion avec l'API Facebook.");
      }

      if (data.data) {
        // Map API posts to our FBPost interface
        const formattedPosts: FBPost[] = data.data.map((item: any) => {
          let formattedDate = "Publication récente";
          try {
            if (item.created_time) {
              const dateObj = new Date(item.created_time);
              formattedDate = dateObj.toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              });
            }
          } catch (e) {
            console.error(e);
          }

          // Fetch comments
          const rawComments = item.comments?.data || [];
          const commentsList = rawComments.map((c: any) => {
            let formattedCommentDate = "Récemment";
            try {
              if (c.created_time) {
                formattedCommentDate = new Date(c.created_time).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
              }
            } catch (e) {
              console.error(e);
            }
            return {
              author: c.from?.name || "Abonné Facebook",
              text: c.message || "",
              date: formattedCommentDate
            };
          });

          return {
            id: item.id,
            author: name,
            avatar: picture,
            date: formattedDate,
            content: item.message || item.story || "Publication sans texte.",
            image: item.full_picture || undefined,
            likes: item.likes?.summary?.total_count || 0,
            shares: item.shares?.count || 0,
            commentsList: commentsList
          };
        });

        setApiPosts(formattedPosts);
        toast.success("Flux Facebook mis à jour avec succès !");
      }
    } catch (err: any) {
      console.error("Facebook Feed Fetch Error:", err);
      if (err.message?.includes("Failed to fetch") || err.name === "TypeError" || !navigator.onLine) {
        setApiError("Failed to fetch (Bloqué par votre navigateur ou un AdBlocker comme uBlock/Brave/Safari, ou problème de connexion)");
      } else {
        setApiError(err.message || "Impossible de charger le flux Facebook.");
      }
    } finally {
      setIsLoadingApi(false);
    }
  }, [pageId]);

  // Handle Token Save
  const saveToken = (newToken: string) => {
    const cleanToken = newToken.trim();
    if (!cleanToken) {
      localStorage.removeItem('fb_page_access_token');
      setAccessToken(defaultToken);
      fetchFacebookPosts(defaultToken);
      toast.success("Jeton réinitialisé par défaut.");
    } else {
      localStorage.setItem('fb_page_access_token', cleanToken);
      setAccessToken(cleanToken);
      fetchFacebookPosts(cleanToken);
      toast.success("Nouveau jeton d'accès enregistré !");
    }
    setIsTokenEditing(false);
  };

  useEffect(() => {
    fetchFacebookPosts(accessToken);
  }, [accessToken, fetchFacebookPosts]);

  const displayedPosts = apiPosts.length > 0 ? apiPosts : demoPosts;

  return (
    <div className="flex flex-col min-h-screen bg-transparent text-slate-100">
      {/* Header section with cover and profile picture */}
      <div className="relative w-full h-48 md:h-72 bg-slate-950 overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-cover bg-center opacity-40 blur-[2px]" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=2070&auto=format&fit=crop')` }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
        
        <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row items-center md:items-end gap-6 z-10 text-center md:text-left">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#B48646] to-[#E5B066] rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
            <img 
              src={pagePicture} 
              alt="Profile" 
              className="relative w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-slate-900 object-cover shadow-2xl bg-slate-800"
              onError={() => setPagePicture("https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=2070&auto=format&fit=crop")}
            />
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white font-sans">{pageName}</h1>
              <span className="self-center md:self-start inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B48646]/20 text-[#E5B066] text-xs font-bold border border-[#B48646]/30 shadow-sm backdrop-blur-md">
                <Check size={12} className="text-[#E5B066]" /> Page Officielle
              </span>
            </div>
            <p className="text-slate-300 text-sm max-w-2xl font-light">
              Restez connectés avec l'actualité en direct de votre créateur de souvenirs d'exception en Aquitaine.
            </p>
          </div>
        </div>
      </div>

      {/* Primary Sub-Navigation Bar */}
      <div className="bg-slate-950/80 border-y border-white/5 py-3 sticky top-0 z-40 backdrop-blur-md px-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSubTab('api')}
            className={`px-5 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${activeSubTab === 'api' ? 'bg-[#B48646] text-white shadow-lg shadow-[#B48646]/20' : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'}`}
          >
            <Facebook size={14} /> L'Actu Live
          </button>
          <button
            onClick={() => setActiveSubTab('guide')}
            className={`px-5 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${activeSubTab === 'guide' ? 'bg-[#B48646] text-white shadow-lg shadow-[#B48646]/20' : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'}`}
          >
            <Settings size={14} /> Configuration API
          </button>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={messengerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-2 transition-all hover:scale-[1.02] shadow-lg shadow-blue-600/10 active:scale-95"
          >
            <MessageSquare size={14} /> Nous contacter
          </a>
          <a
            href={pageProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all border border-white/10"
            title="Visiter la page Facebook d'Infini 24"
          >
            <ExternalLink size={16} />
          </a>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl w-full mx-auto p-4 md:p-8 space-y-8 pb-24">
        {activeSubTab === 'api' && (
          <div className="space-y-8">
            {/* API Status / Error Display */}
            {apiError && showErrorBanner ? (
              <div className="bg-slate-900/90 border border-rose-500/30 rounded-3xl p-6 text-left space-y-4 shadow-xl">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-rose-500/10 text-rose-400 rounded-2xl shrink-0">
                    <AlertTriangle size={24} />
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-white text-base">⚠️ Liaison Facebook temporairement inactive</h3>
                      <span className="text-[10px] bg-rose-500/20 text-rose-300 font-mono px-2 py-0.5 rounded-full border border-rose-500/30">
                        Diagnostics API
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed mt-1">
                      Le jeton d'accès Facebook est expiré ou n'a pas les permissions requises. Facebook exige l'autorisation <code className="bg-slate-950 px-1 py-0.5 rounded text-rose-300 font-mono text-[10px]">pages_read_engagement</code> pour diffuser les posts d'une page publique sur un site externe.
                    </p>
                  </div>
                </div>

                <div className="bg-slate-950/60 p-4 rounded-2xl border border-white/5 space-y-3">
                  <span className="font-bold text-[#B48646] text-xs block">💡 Comment l'administrateur peut régler cela en 1 minute :</span>
                  <ol className="list-decimal pl-5 space-y-2 text-xs text-slate-400">
                    <li>Allez dans l'onglet <button onClick={() => setActiveSubTab('guide')} className="text-[#E5B066] hover:underline font-bold inline-flex items-center gap-0.5">Configuration API <ChevronRight size={10} /></button> ci-dessus.</li>
                    <li>Saisissez un jeton d'accès de page Facebook valide ou laissez-vous guider par notre tutoriel rapide.</li>
                  </ol>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    onClick={() => setActiveSubTab('guide')}
                    className="px-4 py-2 rounded-xl bg-[#B48646] hover:bg-[#966d35] text-white text-xs font-bold transition-all active:scale-95"
                  >
                    Gérer le Jeton API
                  </button>
                  <button
                    onClick={() => {
                      setShowErrorBanner(false);
                      toast.success("Affichage du flux de démonstration d'Infini 24");
                    }}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold transition-all active:scale-95 border border-white/10"
                  >
                    Ignorer et voir le flux de démonstration
                  </button>
                </div>

                <div className="text-[10px] text-slate-500 pt-2 border-t border-white/5">
                  <span className="font-bold">Message technique retourné par l'API :</span>
                  <pre className="mt-1 bg-slate-950 p-2 rounded-lg font-mono text-rose-400/80 overflow-x-auto whitespace-pre-wrap">{apiError}</pre>
                </div>
              </div>
            ) : apiError && !showErrorBanner ? (
              <div className="bg-amber-500/10 border border-amber-500/20 text-amber-400 p-4 rounded-2xl text-xs flex items-center justify-between gap-3 shadow-md">
                <div className="flex items-center gap-2">
                  <Info size={16} className="shrink-0 text-amber-400" />
                  <span>Le flux de démonstration d'Infini 24 est actuellement actif (Mode déconnecté).</span>
                </div>
                <button
                  onClick={() => setShowErrorBanner(true)}
                  className="text-[10px] font-bold text-amber-300 hover:underline shrink-0"
                >
                  Détails diagnostics
                </button>
              </div>
            ) : null}

            {/* Reload button for live feed */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Sparkles size={18} className="text-[#E5B066]" /> Publications Récentes
                </h2>
                <p className="text-xs text-slate-400">
                  {apiPosts.length > 0 ? "Connecté en temps réel avec l'API Graph Meta." : "Visualisation hors-ligne de démonstration."}
                </p>
              </div>
              <button
                onClick={() => fetchFacebookPosts(accessToken)}
                disabled={isLoadingApi}
                className="p-3 bg-white/5 hover:bg-white/10 disabled:opacity-50 text-slate-300 rounded-xl transition-all border border-white/10 flex items-center gap-2 text-xs font-bold active:scale-95"
              >
                <RefreshCw size={14} className={isLoadingApi ? "animate-spin text-[#E5B066]" : ""} />
                Actualiser
              </button>
            </div>

            {/* Main Dynamic Post Feed */}
            <div className="space-y-6">
              {displayedPosts.map((post) => {
                const combinedComments = [...(post.commentsList || []), ...(userComments[post.id] || [])];
                return (
                  <div key={post.id} className="bg-slate-900/40 backdrop-blur-md rounded-3xl border border-white/5 overflow-hidden shadow-lg hover:border-white/10 transition-all duration-300 group">
                    {/* Post Header */}
                    <div className="p-6 flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <img 
                          src={post.avatar} 
                          alt="Avatar" 
                          className="w-12 h-12 rounded-full object-cover border border-white/10 bg-slate-800"
                        />
                        <div>
                          <h3 className="font-bold text-white text-sm group-hover:text-[#E5B066] transition-colors">{post.author}</h3>
                          <div className="flex items-center gap-2 text-slate-400 text-xs mt-0.5">
                            <Calendar size={12} />
                            <span>{post.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-2 bg-[#B48646]/10 text-[#E5B066] rounded-xl border border-[#B48646]/20">
                        <Facebook size={16} />
                      </div>
                    </div>

                    {/* Post Content */}
                    <div className="px-6 pb-4">
                      <p className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">{post.content}</p>
                    </div>

                    {/* Post Image Attachment */}
                    {post.image && (
                      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950 border-y border-white/5">
                        <img 
                          src={post.image} 
                          alt="Publication attachment" 
                          className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}

                    {/* Actions and Metrics */}
                    <div className="px-6 py-4 bg-slate-950/20 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                      <div className="flex items-center gap-6">
                        <button 
                          onClick={() => handleReact(post.id, 'like')}
                          className={`flex items-center gap-2 hover:text-white transition-colors py-1 px-2.5 rounded-lg ${activeReaction[post.id] === 'like' ? 'text-[#E5B066] bg-[#B48646]/10' : ''}`}
                        >
                          <ThumbsUp size={14} />
                          <span className="font-medium">{post.likes + (activeReaction[post.id] === 'like' ? 1 : 0)} J'aime</span>
                        </button>
                        <div className="flex items-center gap-2 py-1">
                          <MessageSquare size={14} />
                          <span className="font-medium">{combinedComments.length} Commentaires</span>
                        </div>
                      </div>

                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(`${pageProfileUrl}`);
                          toast.success("Lien de la page copié dans le presse-papier !");
                        }}
                        className="flex items-center gap-2 hover:text-white transition-colors py-1 px-2.5 rounded-lg"
                      >
                        <Share2 size={14} />
                        <span className="font-medium">Partager</span>
                      </button>
                    </div>

                    {/* Comments Area */}
                    <div className="px-6 py-6 bg-slate-950/40 border-t border-white/5 space-y-4">
                      {combinedComments.length > 0 ? (
                        <div className="space-y-3 max-h-60 overflow-y-auto pr-2 no-scrollbar">
                          {combinedComments.map((comment, idx) => (
                            <div key={idx} className="bg-slate-900/60 p-3 rounded-2xl border border-white/5 space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-xs text-white">{comment.author}</span>
                                <span className="text-[10px] text-slate-500">{comment.date}</span>
                              </div>
                              <p className="text-xs text-slate-300 leading-normal">{comment.text}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-slate-500 italic">Aucun commentaire visible pour le moment. Soyez le premier à réagir !</p>
                      )}

                      {/* Comment Input */}
                      <div className="flex items-center gap-2 pt-2">
                        <input
                          type="text"
                          placeholder="Écrire un commentaire..."
                          value={commentInputs[post.id] || ''}
                          onChange={(e) => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleAddComment(post.id);
                          }}
                          className="flex-1 bg-slate-950/80 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#B48646] transition-colors"
                        />
                        <button
                          onClick={() => handleAddComment(post.id)}
                          className="p-2.5 rounded-xl bg-[#B48646] hover:bg-[#966d35] text-white transition-all active:scale-95 shrink-0"
                        >
                          <Send size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeSubTab === 'guide' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Token Settings Card */}
            <div className="bg-slate-900/40 backdrop-blur-md rounded-3xl border border-white/5 p-6 md:p-8 space-y-6 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#B48646]/10 text-[#E5B066] flex items-center justify-center">
                    <Key size={18} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">Jeton de Page Facebook</h2>
                    <p className="text-xs text-slate-400">Gérez le code d'accès API pour la diffusion des publications</p>
                  </div>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono">
                  Sécurisé en Local
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-300 block">Jeton d'accès (Page Access Token)</label>
                {isTokenEditing ? (
                  <div className="space-y-3">
                    <textarea
                      value={tempToken}
                      onChange={(e) => setTempToken(e.target.value)}
                      placeholder="Collez votre code d'accès Facebook ici..."
                      rows={4}
                      className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 text-xs font-mono text-slate-300 placeholder-slate-600 focus:outline-none focus:border-[#B48646] transition-colors resize-none leading-relaxed"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => saveToken(tempToken)}
                        className="px-4 py-2 bg-[#B48646] hover:bg-[#966d35] text-white text-xs font-bold rounded-xl transition-all active:scale-95"
                      >
                        Sauvegarder
                      </button>
                      <button
                        onClick={() => setIsTokenEditing(false)}
                        className="px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold rounded-xl transition-all border border-white/10"
                      >
                        Annuler
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-950 p-4 rounded-2xl border border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <code className="text-xs font-mono text-slate-400 block truncate">
                        {accessToken ? `${accessToken.substring(0, 45)}...` : "Aucun jeton configuré"}
                      </code>
                    </div>
                    <div className="flex gap-2 shrink-0 w-full md:w-auto">
                      <button
                        onClick={() => {
                          setIsTokenEditing(true);
                          setTempToken(accessToken);
                        }}
                        className="flex-1 md:flex-initial px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-xs font-bold transition-all active:scale-95"
                      >
                        Modifier le code d'accès
                      </button>
                      <button
                        onClick={() => saveToken('')}
                        className="px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 text-xs font-bold transition-all"
                        title="Réinitialiser par défaut"
                      >
                        Réinitialiser
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Step-by-Step Meta Developer Guide */}
            <div className="bg-slate-900/40 backdrop-blur-md rounded-3xl border border-white/5 p-6 md:p-8 space-y-6 shadow-xl text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-600/10 text-blue-400 flex items-center justify-center">
                  <HelpCircle size={18} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Comment obtenir un Jeton permanent ?</h2>
                  <p className="text-xs text-slate-400">Tutoriel d'intégration complet pour votre Page Facebook</p>
                </div>
              </div>

              <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
                <p>
                  Pour que le site puisse lire de manière stable et sécurisée les publications de votre page Facebook, vous devez générer un jeton d'accès possédant l'autorisation <strong className="text-slate-100 font-mono text-[10px] bg-slate-950 px-1 py-0.5 rounded">pages_read_engagement</strong>.
                </p>

                <div className="grid md:grid-cols-2 gap-4 pt-2">
                  <div className="bg-slate-950/40 p-5 rounded-2xl border border-white/5 space-y-3">
                    <span className="font-bold text-[#E5B066] block">⚡ Option Rapide (Pour tester)</span>
                    <ol className="list-decimal pl-5 space-y-2 text-slate-400">
                      <li>Ouvrez le <a href="https://developers.facebook.com/tools/explorer/" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline font-semibold inline-flex items-center gap-0.5">Graph Explorer de Meta <ExternalLink size={10} /></a>.</li>
                      <li>Sous <strong>Permissions</strong> à droite, cliquez sur "Add a permission" et choisissez <strong>pages_read_engagement</strong> et <strong>pages_show_list</strong>.</li>
                      <li>Dans le champ <strong>User or Page</strong>, choisissez spécifiquement votre page <strong>"INFINI24 - Créateur de Souvenirs"</strong>.</li>
                      <li>Cliquez sur <strong>Generate Access Token</strong> puis copiez le code obtenu dans le formulaire ci-dessus.</li>
                    </ol>
                  </div>

                  <div className="bg-slate-950/40 p-5 rounded-2xl border border-white/5 space-y-3">
                    <span className="font-bold text-[#E5B066] block">🔒 Option Définitive (Sans expiration)</span>
                    <ul className="list-disc pl-5 space-y-2 text-slate-400">
                      <li>Créez une application de type "Business" sur <a href="https://developers.facebook.com/" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline inline-flex items-center gap-0.5">Meta for Developers <ExternalLink size={10} /></a>.</li>
                      <li>Associez-y votre page Facebook Infini 24 dans les réglages d'accès.</li>
                      <li>Configurez un <strong>System User</strong> permanent sous votre compte Business Manager Meta, attribuez-lui l'accès à la page et générez un jeton d'accès permanent.</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-600/10 border border-blue-500/20 rounded-2xl p-4 flex items-start gap-3 text-slate-300 mt-4">
                  <Info size={16} className="text-blue-400 shrink-0 mt-0.5" />
                  <p className="text-[11px] leading-normal">
                    <strong>Note de confidentialité :</strong> Le code d'accès saisi est stocké uniquement de manière sécurisée dans le stockage local de votre propre navigateur (localStorage). Il n'est jamais transmis à d'autres serveurs tiers que les serveurs officiels de Facebook.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FacebookPage;
