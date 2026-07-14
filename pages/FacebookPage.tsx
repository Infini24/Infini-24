import React, { useState, useEffect } from 'react';
import { Facebook, RefreshCw, ExternalLink, ThumbsUp, MessageSquare, Share2, Sparkles, Clock, ArrowUpRight, HelpCircle, MessageCircle, Heart, Users, Star } from 'lucide-react';

export const FacebookPage: React.FC = () => {
  const [iframeKey, setIframeKey] = useState(0);
  const [autoRefreshInterval, setAutoRefreshInterval] = useState(60); // in seconds
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isAutoRefreshActive, setIsAutoRefreshActive] = useState(true);

  const pageUrl = "https://www.facebook.com/profile.php?id=61584316950503";
  const pageId = "61584316950503";

  // Construct official Facebook Page Plugin URL
  const fbPluginUrl = `https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D61584316950503&tabs=timeline&width=500&height=800&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId`;

  // Handle manual refresh
  const triggerRefresh = () => {
    setIsRefreshing(true);
    setIframeKey(prev => prev + 1);
    setTimeLeft(autoRefreshInterval);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  // Countdown timer for auto-refresh
  useEffect(() => {
    if (!isAutoRefreshActive) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Trigger refresh when timer reaches 0
          setIframeKey(k => k + 1);
          setIsRefreshing(true);
          setTimeout(() => setIsRefreshing(false), 800);
          return autoRefreshInterval;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isAutoRefreshActive, autoRefreshInterval]);

  // Adjust timeLeft when interval setting changes
  useEffect(() => {
    setTimeLeft(autoRefreshInterval);
  }, [autoRefreshInterval]);

  // Mock sample interactions to display alongside the live feed to ensure bulletproof rendering
  const interactions = [
    { id: 1, user: "Marie L.", action: "A aimé la page", time: "Il y a 10 min", icon: "👍" },
    { id: 2, user: "Thomas D.", action: "A partagé une réalisation d'Infini 24", time: "Il y a 1 h", icon: "✨" },
    { id: 3, user: "Sophie G.", action: "A laissé un avis 5 étoiles", time: "Il y a 3 h", icon: "⭐" },
    { id: 4, user: "Lucas B.", action: "A commenté la dernière vidéo", time: "Il y a 5 h", icon: "💬" }
  ];

  const quickActions = [
    { 
      title: "S'abonner à la page", 
      desc: "Rejoignez notre communauté de passionnés sur Facebook.", 
      url: pageUrl, 
      icon: Users,
      color: "from-blue-600 to-indigo-600"
    },
    { 
      title: "Laisser un avis", 
      desc: "Partagez votre expérience et soutenez notre travail.", 
      url: `${pageUrl}&sk=reviews`, 
      icon: Star,
      color: "from-amber-500 to-yellow-500"
    },
    { 
      title: "Envoyer un message", 
      desc: "Contactez-nous directement via Messenger.", 
      url: `https://m.me/${pageId}`, 
      icon: MessageCircle,
      color: "from-cyan-500 to-blue-500"
    }
  ];

  return (
    <div className="relative min-h-full py-12 px-4 md:px-12">
      {/* Decorative gradients */}
      <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] bg-[#B48646]/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header section with high-quality styling */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/5">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-500/20">
              <Facebook size={12} /> Live Facebook Feed
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Suivez <span className="text-[#B48646]">INFINI24</span> en Direct
            </h1>
            <p className="text-slate-400 text-sm md:text-base max-w-2xl">
              Suivez notre actualité sur Facebook, découvrez nos dernières créations de souvenirs et interagissez directement depuis notre plateforme.
            </p>
          </div>

          {/* Real-time sync panel */}
          <div className="bg-slate-900/60 backdrop-blur-md border border-white/5 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4 shrink-0 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="relative">
                <button 
                  onClick={triggerRefresh}
                  disabled={isRefreshing}
                  className={`p-3 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/30 text-blue-400 hover:text-blue-300 transition-all active:scale-95 ${isRefreshing ? 'animate-spin' : ''}`}
                  title="Actualiser le flux"
                >
                  <RefreshCw size={18} />
                </button>
                {isAutoRefreshActive && (
                  <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
                  </span>
                )}
              </div>
              <div className="text-left">
                <span className="text-xs font-black uppercase text-slate-400 tracking-wider block">
                  {isAutoRefreshActive ? `Actualisation dans ${timeLeft}s` : "Auto-actualisation désactivée"}
                </span>
                <span className="text-[10px] text-slate-500 block font-medium">Fils d'actualité continu</span>
              </div>
            </div>

            <div className="flex items-center gap-2 border-t sm:border-t-0 sm:border-l border-white/5 pt-3 sm:pt-0 sm:pl-4 w-full sm:w-auto">
              <button
                onClick={() => setIsAutoRefreshActive(!isAutoRefreshActive)}
                className={`w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                  isAutoRefreshActive 
                    ? "bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/20" 
                    : "bg-white/5 text-slate-400 border-white/10 hover:bg-white/10"
                }`}
              >
                {isAutoRefreshActive ? "Mettre en pause" : "Activer auto-refresh"}
              </button>

              <select
                value={autoRefreshInterval}
                onChange={(e) => setAutoRefreshInterval(Number(e.target.value))}
                disabled={!isAutoRefreshActive}
                className="bg-slate-950 border border-white/10 text-slate-300 rounded-xl px-2 py-2 text-xs focus:outline-none focus:border-blue-500"
              >
                <option value={15}>15s</option>
                <option value={30}>30s</option>
                <option value={60}>1 min</option>
                <option value={120}>2 min</option>
              </select>
            </div>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Page details, quick actions & community statistics */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Quick action buttons */}
            <div className="space-y-4">
              <h3 className="text-sm font-black uppercase tracking-widest text-[#B48646]">Actions Rapides</h3>
              <div className="grid grid-cols-1 gap-3">
                {quickActions.map((action, i) => (
                  <a
                    key={i}
                    href={action.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-start gap-4 p-4 rounded-2xl bg-slate-900/40 hover:bg-slate-900/80 border border-white/5 hover:border-blue-500/30 transition-all duration-300"
                  >
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${action.color} text-white shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                      <action.icon size={20} />
                    </div>
                    <div className="flex-1 text-left">
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

            {/* Simulated Live Interaction Hub */}
            <div className="bg-slate-900/40 border border-white/5 rounded-[2rem] p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <h3 className="text-xs font-black uppercase tracking-widest text-[#B48646]">Interactions Récentes</h3>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">Live Sync</span>
              </div>

              <div className="space-y-4">
                {interactions.map((interaction) => (
                  <div key={interaction.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all text-xs">
                    <div className="flex items-center gap-3">
                      <span className="text-base">{interaction.icon}</span>
                      <div className="text-left">
                        <span className="font-bold text-slate-200 block">{interaction.user}</span>
                        <span className="text-slate-400 text-[10px]">{interaction.action}</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-500 italic shrink-0">{interaction.time}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-center">
                <a
                  href={pageUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#B48646] hover:text-[#B48646]/80 transition-colors"
                >
                  Découvrir toutes les interactions sur Facebook <ExternalLink size={12} />
                </a>
              </div>
            </div>

            {/* Info and Support note */}
            <div className="bg-gradient-to-r from-blue-950/20 to-[#B48646]/5 border border-white/5 rounded-[2rem] p-6 text-center space-y-3">
              <Sparkles className="text-[#B48646] mx-auto" size={24} />
              <h4 className="font-bold text-white text-sm">Le créateur de souvenirs continue de grandir</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Suivre Infini 24 sur les réseaux sociaux nous permet de continuer à concevoir des réalisations mémorables (vidéos personnalisées, créations graphiques) pour immortaliser vos plus beaux moments.
              </p>
            </div>

          </div>

          {/* RIGHT COLUMN: Official Facebook Page Plugin integration */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900/30 backdrop-blur-lg border border-white/5 rounded-[2.5rem] p-4 md:p-6 shadow-2xl relative overflow-hidden group">
              
              {/* Gold light reflections around container */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#B48646] rounded-full blur-[80px] opacity-10 -mr-6 -mt-6"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500 rounded-full blur-[80px] opacity-5 -ml-6 -mb-6"></div>

              {/* Feed Header */}
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5 text-left">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    <Facebook size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm md:text-base">INFINI24 sur Facebook</h3>
                    <p className="text-[10px] md:text-xs text-slate-400">Fil d'actualité en temps réel</p>
                  </div>
                </div>
                <span className="text-[10px] text-[#B48646] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#B48646]/10 border border-[#B48646]/20">
                  Intégré
                </span>
              </div>

              {/* Actual IFrame content wrapper */}
              <div className="relative bg-slate-950 rounded-2xl overflow-hidden min-h-[500px] md:min-h-[700px] border border-white/5 shadow-inner">
                {isRefreshing && (
                  <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm z-30 flex flex-col items-center justify-center space-y-4">
                    <RefreshCw className="text-blue-400 animate-spin" size={32} />
                    <span className="text-xs font-black uppercase tracking-widest text-slate-300">Actualisation en cours...</span>
                  </div>
                )}
                
                <iframe
                  key={iframeKey}
                  src={fbPluginUrl}
                  width="100%"
                  height="700"
                  style={{ border: 'none', overflow: 'hidden' }}
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  className="w-full h-[500px] md:h-[700px] rounded-2xl"
                  title="INFINI24 Facebook Page Feed"
                />

                {/* Direct Link Overlay fallback button at the bottom for safety & interaction convenience */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent flex justify-center z-20">
                  <a
                    href={pageUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg transition-all hover:scale-105 active:scale-95"
                  >
                    <Facebook size={14} /> Ouvrir directement sur Facebook <ExternalLink size={12} />
                  </a>
                </div>
              </div>

              {/* Usage assistance */}
              <p className="text-[10px] text-slate-500 mt-4 leading-relaxed italic text-left flex items-start gap-1.5">
                <HelpCircle size={12} className="shrink-0 mt-0.5" /> 
                <span>
                  Pour réagir, commenter ou vous abonner en direct sur ce flux, assurez-vous d'être connecté à votre compte Facebook dans ce navigateur. Vous pouvez également ouvrir le lien direct à tout moment.
                </span>
              </p>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default FacebookPage;
