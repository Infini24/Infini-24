import React, { useState, useEffect } from 'react';
import { 
  Facebook, 
  RefreshCw, 
  ExternalLink, 
  ThumbsUp, 
  MessageSquare, 
  Share2, 
  Sparkles, 
  ArrowUpRight, 
  HelpCircle, 
  MessageCircle, 
  Heart, 
  Users, 
  Star,
  Info,
  Send,
  Lock,
  Eye,
  CheckCircle,
  AlertTriangle,
  Code
} from 'lucide-react';
import toast from 'react-hot-toast';

interface FBPost {
  id: string;
  author: string;
  avatar: string;
  date: string;
  content: string;
  image?: string;
  likes: number;
  commentsCount: number;
  shares: number;
  comments: { author: string; text: string; date: string }[];
}

export const FacebookPage: React.FC = () => {
  const pageUrl = "https://www.facebook.com/profile.php?id=61584316950503";
  const pageId = "61584316950503";
  const messengerUrl = "https://m.me/61584316950503";

  // State
  const [activeSubTab, setActiveSubTab] = useState<'iframe' | 'api' | 'guide'>('iframe');
  const [accessToken, setAccessToken] = useState<string>(() => {
    return localStorage.getItem('fb_page_access_token') || '';
  });
  const [isTokenEditing, setIsTokenEditing] = useState(false);
  const [tempToken, setTempToken] = useState('');
  const [apiPosts, setApiPosts] = useState<FBPost[]>([]);
  const [isLoadingApi, setIsLoadingApi] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Local interaction states
  const [activeReaction, setActiveReaction] = useState<Record<string, string>>({});
  const [showCommentInput, setShowCommentInput] = useState<Record<string, boolean>>({});
  const [newCommentText, setNewCommentText] = useState<Record<string, string>>({});

  // Base fallback posts when API is not configured
  const [fallbackPosts, setFallbackPosts] = useState<FBPost[]>([
    {
      id: "post-1",
      author: "INFINI24 - Créateur de Souvenirs",
      avatar: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=2070&auto=format&fit=crop",
      date: "Hier à 14:32",
      content: "🎥 Retrospective d'anniversaire spéciale pour ma fille fêtant ses 14 ans ! ✨ De sa naissance à aujourd'hui, un montage chargé d'émotion, rythmé sur 2 pistes musicales (valeur : 220€). Un magnifique cadeau pour immortaliser toute une vie de souvenirs. Découvrez la vidéo complète sur notre onglet Réalisations ! ❤️",
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=2070&auto=format&fit=crop",
      likes: 42,
      commentsCount: 8,
      shares: 3,
      comments: [
        { author: "Marie Laurent", text: "Magnifique travail d'émotion ! Un superbe cadeau d'anniversaire.", date: "Il y a 10 h" },
        { author: "Thierry Dubois", text: "Le choix des musiques est exceptionnel, bravo !", date: "Il y a 6 h" }
      ]
    },
    {
      id: "post-2",
      author: "INFINI24 - Créateur de Souvenirs",
      avatar: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=2070&auto=format&fit=crop",
      date: "9 Juillet 2026",
      content: "🍬 Découvrez notre collaboration avec la Confiserie Parizel ! Valorisez votre commerce et l'histoire de votre savoir-faire artisanal avec un montage vidéo de qualité cinéma. Contactez-nous pour étudier votre projet de communication ! 🎞️",
      image: "https://images.unsplash.com/photo-1581798459219-318e76aecc7b?q=80&w=2070&auto=format&fit=crop",
      likes: 29,
      commentsCount: 4,
      shares: 1,
      comments: [
        { author: "Marc Parizel", text: "Une vidéo qui représente à merveille notre passion, merci à Infini 24 !", date: "Il y a 3 jours" }
      ]
    }
  ]);

  // Fetch from Real Meta Graph API if access token is configured
  const fetchRealFacebookData = async (tokenToUse: string) => {
    if (!tokenToUse) return;
    setIsLoadingApi(true);
    setApiError(null);

    try {
      // Fetch feed with fields
      const response = await fetch(
        `https://graph.facebook.com/v19.0/${pageId}/posts?fields=id,message,story,created_time,full_picture,shares,likes.summary(true).limit(0),comments.limit(10){id,message,from,created_time}&access_token=${tokenToUse}`
      );

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message || "Erreur de connexion avec l'API Facebook.");
      }

      if (data.data) {
        // Map API posts to our FBPost interface
        const formattedPosts: FBPost[] = data.data.map((item: any) => {
          const dateObj = new Date(item.created_time);
          const formattedDate = dateObj.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          });

          // Fetch comments
          const rawComments = item.comments?.data || [];
          const commentsList = rawComments.map((c: any) => ({
            author: c.from?.name || "Abonné Facebook",
            text: c.message || "",
            date: new Date(c.created_time).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
          }));

          return {
            id: item.id,
            author: "INFINI24 - Créateur de Souvenirs",
            avatar: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=2070&auto=format&fit=crop",
            date: formattedDate,
            content: item.message || item.story || "Publication sans texte.",
            image: item.full_picture || undefined,
            likes: item.likes?.summary?.total_count || 0,
            commentsCount: item.comments?.summary?.total_count || rawComments.length,
            shares: item.shares?.count || 0,
            comments: commentsList
          };
        });

        setApiPosts(formattedPosts);
        toast.success("Publications synchronisées en direct !", { icon: '⚡' });
      } else {
        setApiPosts([]);
      }
    } catch (err: any) {
      console.error(err);
      setApiError(err.message || "Impossible de charger le flux en direct.");
      toast.error("Erreur de synchronisation API");
    } finally {
      setIsLoadingApi(false);
    }
  };

  // Run on mount or when token changes
  useEffect(() => {
    if (accessToken) {
      fetchRealFacebookData(accessToken);
    }
  }, [accessToken]);

  const handleSaveToken = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempToken.trim()) return;

    localStorage.setItem('fb_page_access_token', tempToken.trim());
    setAccessToken(tempToken.trim());
    setIsTokenEditing(false);
    fetchRealFacebookData(tempToken.trim());
  };

  const handleClearToken = () => {
    localStorage.removeItem('fb_page_access_token');
    setAccessToken('');
    setApiPosts([]);
    setTempToken('');
    toast.success("Token de connexion supprimé");
  };

  const handleReaction = (postId: string, reaction: string, isApiPost: boolean) => {
    const isRemove = activeReaction[postId] === reaction;
    setActiveReaction(prev => ({
      ...prev,
      [postId]: isRemove ? '' : reaction
    }));

    const updatePostFn = (post: FBPost) => {
      if (post.id === postId) {
        let diff = isRemove ? -1 : 1;
        if (activeReaction[postId] && !isRemove) {
          diff = 0; // simply switched reaction type
        }
        return {
          ...post,
          likes: post.likes + diff
        };
      }
      return post;
    };

    if (isApiPost) {
      setApiPosts(prev => prev.map(updatePostFn));
    } else {
      setFallbackPosts(prev => prev.map(updatePostFn));
    }
  };

  const handleAddComment = (postId: string, e: React.FormEvent, isApiPost: boolean) => {
    e.preventDefault();
    const commentText = newCommentText[postId];
    if (!commentText || !commentText.trim()) return;

    const updatePostFn = (post: FBPost) => {
      if (post.id === postId) {
        return {
          ...post,
          commentsCount: post.commentsCount + 1,
          comments: [
            ...post.comments,
            {
              author: "Visiteur d'Infini 24",
              text: commentText.trim(),
              date: "À l'instant"
            }
          ]
        };
      }
      return post;
    };

    if (isApiPost) {
      setApiPosts(prev => prev.map(updatePostFn));
    } else {
      setFallbackPosts(prev => prev.map(updatePostFn));
    }

    setNewCommentText(prev => ({ ...prev, [postId]: '' }));
    toast.success("Votre commentaire a été publié localement !", { icon: '💬' });
  };

  const quickActions = [
    { 
      title: "Visiter notre profil Facebook", 
      desc: "Découvrez notre page officielle et abonnez-vous pour soutenir notre travail.", 
      url: pageUrl, 
      icon: Users,
      color: "from-blue-600 to-indigo-600"
    },
    { 
      title: "Nous contacter sur Messenger", 
      desc: "Envoyez-nous un message privé directement pour toute demande de projet.", 
      url: messengerUrl, 
      icon: MessageCircle,
      color: "from-cyan-500 to-blue-500"
    },
    { 
      title: "Laisser un avis 5 étoiles", 
      desc: "Donnez votre avis sur nos montages vidéos et graphismes personnalisés.", 
      url: `${pageUrl}&sk=reviews`, 
      icon: Star,
      color: "from-amber-500 to-yellow-500"
    }
  ];

  const currentPosts = accessToken && apiPosts.length > 0 ? apiPosts : fallbackPosts;

  return (
    <div className="relative min-h-full py-12 px-4 md:px-12">
      {/* Decorative gradients */}
      <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] bg-[#B48646]/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header section with high-quality styling */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/5">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-500/20">
              <Facebook size={12} strokeWidth={2.5} /> Live Facebook Hub
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight text-left">
              Suivez <span className="text-[#B48646]">INFINI24</span> en Direct
            </h1>
            <p className="text-slate-400 text-sm md:text-base max-w-2xl text-left">
              Découvrez nos dernières actualités Facebook, vidéos souvenirs et interagissez directement depuis notre plateforme de démonstration.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {accessToken && (
              <button 
                onClick={() => fetchRealFacebookData(accessToken)}
                disabled={isLoadingApi}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 transition-all active:scale-95 text-sm font-semibold"
              >
                <RefreshCw size={16} className={isLoadingApi ? "animate-spin" : ""} />
                <span>Synchroniser API</span>
              </button>
            )}
            <a 
              href={pageUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1877F2] hover:bg-[#1877F2]/90 text-white font-bold transition-all active:scale-95 text-sm shadow-md shadow-[#1877F2]/20"
            >
              <Facebook size={16} />
              <span>Ouvrir Facebook</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>

        {/* Warning & Explanations panel regarding Iframe Blocks */}
        <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-6 text-left space-y-4">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-500/10 text-amber-500 rounded-2xl shrink-0">
              <AlertTriangle size={24} />
            </div>
            <div className="space-y-1 flex-1">
              <h3 className="font-bold text-white text-base">Pourquoi le message "Ce contenu a été bloqué" apparaît-il ?</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Le module d'intégration standard (Iframe) de Facebook est très sensible. Si votre Page Facebook comporte des <strong>restrictions d'âge (ex: +18 ans)</strong> ou des <strong>restrictions géographiques (ex: visible uniquement en France)</strong> dans ses paramètres de page, Facebook <strong>interdit</strong> d'afficher l'iframe à des visiteurs anonymes pour des raisons de confidentialité.
              </p>
            </div>
          </div>
          
          <div className="bg-slate-950/60 p-4 rounded-2xl border border-white/5 space-y-2 text-xs text-slate-400">
            <span className="font-bold text-white block">💡 Solutions pour régler ce problème définitivement :</span>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong className="text-slate-300">Option A : Supprimer les restrictions de la Page Facebook.</strong> Allez sur Facebook &gt; Paramètres de la Page &gt; Public &gt; et assurez-vous que les restrictions de pays et d'âge sont réglées sur "Tout le monde".
              </li>
              <li>
                <strong className="text-slate-300">Option B : Utiliser la connexion API officielle d'INFINI24 (Recommandé).</strong> Connectez directement les publications en direct grâce à un jeton d'accès sans aucune contrainte d'Iframe !
              </li>
            </ul>
          </div>
        </div>

        {/* Interactive Navigation Sub-Tabs */}
        <div className="flex border-b border-white/5 pb-1 gap-2">
          <button
            onClick={() => setActiveSubTab('iframe')}
            className={`px-5 py-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeSubTab === 'iframe' 
                ? 'border-[#B48646] text-[#B48646]' 
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Eye size={16} />
            <span>Flux Intégré (Iframe Officielle)</span>
          </button>
          <button
            onClick={() => setActiveSubTab('api')}
            className={`px-5 py-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeSubTab === 'api' 
                ? 'border-[#B48646] text-[#B48646]' 
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles size={16} />
            <span>Flux Direct (API Graph Facebook)</span>
            {accessToken && (
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            )}
          </button>
          <button
            onClick={() => setActiveSubTab('guide')}
            className={`px-5 py-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeSubTab === 'guide' 
                ? 'border-[#B48646] text-[#B48646]' 
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Code size={16} />
            <span>Guide de Liaison Réelle</span>
          </button>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Page details, quick actions & statistics */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick action buttons */}
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-[#B48646] text-left">Actions Rapides</h3>
              <div className="grid grid-cols-1 gap-3">
                {quickActions.map((action, i) => (
                  <a
                    key={i}
                    href={action.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-start gap-4 p-4 rounded-2xl bg-slate-900/40 hover:bg-slate-900/80 border border-white/5 hover:border-blue-500/30 transition-all duration-300 text-left"
                  >
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${action.color} text-white shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                      <action.icon size={18} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5 font-bold text-white group-hover:text-blue-400 transition-colors">
                        <span>{action.title}</span>
                        <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{action.desc}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Simulated Live Interaction Info card */}
            <div className="bg-slate-900/40 border border-white/5 rounded-[2rem] p-6 space-y-4 text-left">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                  <h3 className="text-xs font-black uppercase tracking-widest text-[#B48646]">Statut de Connexion</h3>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">Live Info</span>
              </div>

              <div className="space-y-3 text-xs">
                <p className="text-slate-300 leading-relaxed">
                  Le site d'INFINI24 prend entièrement en charge le rendu du flux via deux canaux sécurisés.
                </p>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                  <span className="text-slate-400">Page ID Facebook :</span>
                  <span className="font-mono text-slate-200">{pageId}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                  <span className="text-slate-400">Mode actif actuel :</span>
                  <span className="font-bold text-[#B48646] uppercase">
                    {accessToken ? "API Graph Directe" : "Iframe Standard / Demo"}
                  </span>
                </div>
              </div>
            </div>

            {/* Info and Support note */}
            <div className="bg-gradient-to-r from-blue-950/20 to-[#B48646]/5 border border-white/5 rounded-[2rem] p-6 text-left space-y-3">
              <Sparkles className="text-[#B48646]" size={24} />
              <h4 className="font-bold text-white text-sm">Des créations mémorables</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Suivre Infini 24 sur les réseaux sociaux vous permet de continuer à concevoir des réalisations mémorables (vidéos personnalisées, créations graphiques) pour immortaliser vos plus beaux moments.
              </p>
            </div>

          </div>

          {/* RIGHT COLUMN: The Interactive Display according to the Sub-Tab */}
          <div className="lg:col-span-7">

            {/* SUB-TAB 1: OFFICIAL IFRAME INTEGRATION (Requested by the User) */}
            {activeSubTab === 'iframe' && (
              <div className="bg-slate-900/30 backdrop-blur-lg border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl relative">
                
                {/* Embed header */}
                <div className="p-6 border-b border-white/5 flex items-center justify-between text-left">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      <Facebook size={18} />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm md:text-base">Aperçu Facebook Officiel</h3>
                      <p className="text-[10px] md:text-xs text-slate-400">Plugin officiel fourni par vos soins</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-[#B48646] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#B48646]/10 border border-[#B48646]/20">
                    IFRAME
                  </span>
                </div>

                {/* Actual Iframe Integration with exact user style */}
                <div className="relative bg-white" style={{ minHeight: '650px' }}>
                  <iframe 
                    src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D61584316950503&tabs=timeline&width=500&height=650&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false&appId" 
                    width="100%" 
                    height="650" 
                    style={{ border: 'none', overflow: 'hidden', background: '#ffffff', width: '100%', height: '650px', borderRadius: '0 0 20px 20px' }} 
                    scrolling="no" 
                    frameBorder="0" 
                    allowFullScreen={true} 
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    title="INFINI24 Live Facebook Feed Iframe"
                  />
                </div>

                {/* Bottom Assistance Message */}
                <div className="p-4 bg-slate-950/80 border-t border-white/5 text-left text-[11px] text-slate-400 space-y-1">
                  <p className="flex items-center gap-1 font-bold text-amber-400">
                    <Info size={12} /> Des difficultés à charger l'Iframe ?
                  </p>
                  <p className="leading-relaxed">
                    Si l'Iframe ci-dessus affiche "Ce contenu a été bloqué", cela signifie que Facebook applique des critères de restriction d'âge ou de pays sur votre profil/page. Cliquez sur le bouton de l'onglet <strong>"Flux Direct (API Graph Facebook)"</strong> ci-dessus pour connecter et récupérer vos publications d'une autre manière moderne.
                  </p>
                </div>
              </div>
            )}

            {/* SUB-TAB 2: DIRECT GRAPH API STREAM (Solution to bypass Iframe errors and fetch real interaction) */}
            {activeSubTab === 'api' && (
              <div className="space-y-6 text-left">
                
                {/* Access Token Configuration Container */}
                <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Lock size={16} className="text-[#B48646]" />
                      <span>Configuration de la Connexion API Graph</span>
                    </h3>
                    {accessToken && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
                        Connecté
                      </span>
                    )}
                  </div>

                  {!accessToken && !isTokenEditing ? (
                    <div className="space-y-3">
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Pour lier vos publications en temps réel sans iframe, connectez votre jeton d'accès permanent Facebook. Vos données proviendront de manière sécurisée en direct.
                      </p>
                      <button
                        onClick={() => setIsTokenEditing(true)}
                        className="px-4 py-2 rounded-xl bg-[#B48646] hover:bg-[#B48646]/80 text-black text-xs font-black transition-all"
                      >
                        Saisir mon Access Token Facebook Page
                      </button>
                    </div>
                  ) : isTokenEditing ? (
                    <form onSubmit={handleSaveToken} className="space-y-3">
                      <label className="block text-slate-400 text-xs font-semibold">
                        Jeton d'accès à la Page Facebook (Access Token) :
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="password"
                          placeholder="EAA..."
                          value={tempToken}
                          onChange={(e) => setTempToken(e.target.value)}
                          className="flex-1 bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#B48646]"
                          required
                        />
                        <button
                          type="submit"
                          className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shrink-0"
                        >
                          Sauvegarder
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsTokenEditing(false)}
                          className="px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 text-xs font-semibold transition-all shrink-0"
                        >
                          Annuler
                        </button>
                      </div>
                      <p className="text-[10px] text-slate-500">
                        Votre clé reste 100% privée, stockée uniquement dans votre propre navigateur pour l'intégration.
                      </p>
                    </form>
                  ) : (
                    <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-950/80 border border-white/5">
                      <div className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-emerald-500" />
                        <span className="text-xs text-slate-300">Votre Page est liée en direct via API</span>
                      </div>
                      <button
                        onClick={handleClearToken}
                        className="text-[10px] font-bold text-rose-400 hover:text-rose-300 transition-colors"
                      >
                        Déconnecter la clé
                      </button>
                    </div>
                  )}
                </div>

                {/* API Status / Error Display */}
                {apiError && (
                  <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-4 rounded-2xl text-xs flex items-start gap-3">
                    <Info size={16} className="shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <span className="font-bold">Erreur de connexion API :</span>
                      <p>{apiError}</p>
                    </div>
                  </div>
                )}

                {/* Main Dynamic Post Feed */}
                <div className="space-y-6">
                  {isLoadingApi ? (
                    <div className="py-20 flex flex-col items-center justify-center space-y-3 bg-slate-900/10 rounded-[2.5rem] border border-white/5">
                      <RefreshCw className="text-blue-400 animate-spin" size={32} />
                      <span className="text-xs text-slate-400">Récupération des vrais commentaires et likes...</span>
                    </div>
                  ) : (
                    currentPosts.map((post) => (
                      <div key={post.id} className="bg-slate-900/40 border border-white/5 rounded-[2.5rem] overflow-hidden shadow-xl hover:border-white/10 transition-colors">
                        
                        {/* Post Header */}
                        <div className="p-6 flex items-start gap-4">
                          <img 
                            src={post.avatar} 
                            alt="Avatar" 
                            className="h-10 w-10 rounded-full object-cover border border-white/15"
                            referrerPolicy="no-referrer"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-white text-sm hover:underline cursor-pointer">{post.author}</span>
                              <span className="text-blue-400 text-xs" title="Certifié">✓</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                              <span>{post.date}</span>
                              <span>•</span>
                              <Facebook size={12} />
                            </div>
                          </div>
                        </div>

                        {/* Post Content */}
                        <div className="px-6 pb-4">
                          <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">{post.content}</p>
                        </div>

                        {/* Post Image (if any) */}
                        {post.image && (
                          <div className="border-y border-white/5 bg-slate-950 overflow-hidden max-h-96 flex items-center justify-center">
                            <img 
                              src={post.image} 
                              alt="Publication" 
                              className="w-full h-auto object-cover hover:scale-102 transition-transform duration-500"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        )}

                        {/* Post Stats */}
                        <div className="px-6 py-3 flex items-center justify-between border-b border-white/5 text-xs text-slate-400">
                          <div className="flex items-center gap-1">
                            <span className="text-base">👍❤️</span>
                            <span className="font-medium text-slate-300">{post.likes} personnes ont réagi</span>
                          </div>
                          <div className="flex gap-3">
                            <span>{post.comments.length} commentaire{post.comments.length > 1 ? 's' : ''}</span>
                            <span>•</span>
                            <span>{post.shares} partages</span>
                          </div>
                        </div>

                        {/* Post Action Buttons */}
                        <div className="px-6 py-2 flex items-center justify-between text-xs font-semibold text-slate-400">
                          <button 
                            onClick={() => handleReaction(post.id, 'like', !!accessToken)}
                            className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all hover:bg-white/5 ${activeReaction[post.id] === 'like' ? 'text-blue-500 font-bold' : ''}`}
                          >
                            <ThumbsUp size={14} />
                            <span>{activeReaction[post.id] === 'like' ? "J'aime" : "J'aime"}</span>
                          </button>
                          
                          <button 
                            onClick={() => handleReaction(post.id, 'heart', !!accessToken)}
                            className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all hover:bg-white/5 ${activeReaction[post.id] === 'heart' ? 'text-rose-500 font-bold' : ''}`}
                          >
                            <Heart size={14} />
                            <span>{activeReaction[post.id] === 'heart' ? "J'adore" : "J'adore"}</span>
                          </button>

                          <button 
                            onClick={() => setShowCommentInput(prev => ({ ...prev, [post.id]: !prev[post.id] }))}
                            className="flex items-center gap-2 px-3 py-2 rounded-xl transition-all hover:bg-white/5"
                          >
                            <MessageSquare size={14} />
                            <span>Commenter</span>
                          </button>
                        </div>

                        {/* Comments Section */}
                        <div className="bg-slate-950/40 px-6 py-4 space-y-4">
                          {/* Comments List */}
                          {post.comments.length > 0 && (
                            <div className="space-y-3">
                              {post.comments.map((comment, index) => (
                                <div key={index} className="flex gap-3 items-start text-xs animate-in fade-in duration-200">
                                  <div className="bg-white/5 px-2.5 py-1.5 rounded-2xl flex-1 max-w-[90%]">
                                    <div className="flex items-center justify-between gap-4 mb-1">
                                      <span className="font-bold text-slate-200">{comment.author}</span>
                                      <span className="text-[10px] text-slate-500">{comment.date}</span>
                                    </div>
                                    <p className="text-slate-300 leading-relaxed break-words">{comment.text}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* New Comment Input */}
                          {showCommentInput[post.id] && (
                            <form onSubmit={(e) => handleAddComment(post.id, e, !!accessToken)} className="flex gap-2 pt-2 animate-in slide-in-from-top-2 duration-200">
                              <input 
                                type="text" 
                                placeholder="Laisser un commentaire officiel..." 
                                value={newCommentText[post.id] || ''}
                                onChange={(e) => setNewCommentText(prev => ({ ...prev, [post.id]: e.target.value.slice(0, 200) }))}
                                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#B48646] transition-colors"
                                required
                              />
                              <button 
                                type="submit"
                                disabled={!(newCommentText[post.id] || '').trim()}
                                className="p-2 rounded-xl bg-[#B48646] hover:bg-[#B48646]/80 text-black font-bold disabled:bg-slate-800 disabled:text-slate-500 transition-all flex items-center justify-center shrink-0"
                              >
                                <Send size={12} />
                              </button>
                            </form>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* SUB-TAB 3: EXHAUSTIVE DEVELOPER CONFIGURATION GUIDE */}
            {activeSubTab === 'guide' && (
              <div className="bg-slate-900/50 border border-white/10 rounded-[2.5rem] p-6 text-left space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Sparkles size={20} className="text-[#B48646]" />
                    <span>Liaison réelle pas-à-pas avec Meta Graph API</span>
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Afin d'afficher vos publications et commentaires sans les contraintes de blocage liées aux iframes tiers, configurez votre Jeton de Page officiel :
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-[#B48646]/10 text-[#B48646] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-xs">Accédez au portail Développeurs</h4>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Rendez-vous sur <a href="https://developers.facebook.com" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">developers.facebook.com</a> et connectez-vous avec votre profil propriétaire de la page.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-[#B48646]/10 text-[#B48646] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-xs">Créez une Application</h4>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Créez une nouvelle application de type "Autre" ou "Entreprise", et sélectionnez le cas d'usage "Page API" ou "Feed".
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-[#B48646]/10 text-[#B48646] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-xs">Générez un Jeton d'accès permanent</h4>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Utilisez l'outil "Graph API Explorer" pour donner les permissions <code className="bg-slate-950 px-1 py-0.5 rounded text-rose-400 font-mono text-[10px]">pages_read_engagement</code> et <code className="bg-slate-950 px-1 py-0.5 rounded text-rose-400 font-mono text-[10px]">pages_show_list</code>. Générez le jeton et convertissez-le en Jeton Permanent (sans expiration).
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-[#B48646]/10 text-[#B48646] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      4
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-xs">Insérez le jeton sur INFINI24</h4>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Collez le jeton obtenu directement dans l'onglet <strong>"Flux Direct (API Graph Facebook)"</strong> ci-dessus pour activer immédiatement l'alimentation temps réel !
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-start gap-3">
                  <Info size={16} className="text-blue-400 shrink-0 mt-0.5" />
                  <div className="text-[11px] text-slate-300 leading-relaxed">
                    <span className="font-bold text-white block mb-1">Rappel sur les restrictions :</span>
                    Par défaut, si vous préférez utiliser l'iframe standard (Tab 1), assurez-vous que la Page Facebook n'a aucune restriction d'âge (ex: +13 ans, +18 ans) ni restriction de pays dans l'onglet Confidentialité de Facebook. Autrement, le navigateur affichera systématiquement l'erreur de blocage à vos internautes.
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};

export default FacebookPage;
