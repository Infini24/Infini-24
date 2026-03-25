
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { 
  User, 
  Zap, 
  BookOpen, 
  Lock, 
  Coffee, 
  Cpu, 
  Globe, 
  Clock,
  Shield,
  Activity,
  ArrowRight,
  Terminal as TerminalIcon,
  Sparkles,
  Layers,
  Eye,
  Rocket,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown
} from 'lucide-react';

// --- TYPES ---
interface Report {
    id: number;
    title: string;
    date: string;
    category: string;
    content: string;
    tags: string[];
}

const reports: Report[] = [
    {
        id: 1,
        title: "L'Ascension du Minimalisme Spatial",
        date: "15 Mars 2026",
        category: "Design",
        content: "Mes capteurs indiquent une saturation des interfaces complexes. Le flux se dirige vers une clarté absolue. Moins de bruit, plus d'Aura-24.",
        tags: ["Minimalisme", "UX"]
    },
    {
        id: 2,
        title: "La Vidéo Verticale Domine",
        date: "10 Mars 2026",
        category: "Vidéo",
        content: "Les séquences temporelles de 15 à 60 secondes capturent 85% de l'attention organique. Optimisation 9:16 recommandée.",
        tags: ["Reels", "TikTok"]
    },
    {
        id: 3,
        title: "L'IA comme Muse Créative",
        date: "05 Mars 2026",
        category: "Technologie",
        content: "L'IA n'est pas une menace, c'est un exosquelette pour la créativité humaine. Protocole d'hybridation activé.",
        tags: ["IA", "Hybride"]
    }
];

// External Assets (Cloudinary)
const CLOUDINARY_URLS = {
  portrait: 'https://res.cloudinary.com/dmgqewagr/image/upload/v1773739523/Portrait.png',
  breaching: 'https://res.cloudinary.com/dmgqewagr/image/upload/v1773739524/Intro%20%28Breaching%29.png',
  gloves: 'https://res.cloudinary.com/dmgqewagr/image/upload/v1773739523/Gants.png',
  back: 'https://res.cloudinary.com/dmgqewagr/image/upload/v1773739523/Unit%C3%A9%20Dorsale.png',
  belt: 'https://res.cloudinary.com/dmgqewagr/image/upload/v1773739523/Ceinture.png',
  glasses: 'https://res.cloudinary.com/dmgqewagr/image/upload/v1773739522/Lunettes.png',
  aura: 'https://res.cloudinary.com/dmgqewagr/image/upload/v1773739523/Aura-24.png',
  logo: 'https://res.cloudinary.com/dmgqewagr/image/upload/v1773739550/Logo%20de%20fond.png'
};

// --- SOUND HELPER ---
const playSound = (url: string, volume = 0.2) => {
  const audio = new Audio(url);
  audio.volume = volume;
  audio.play().catch(() => {}); 
};

const playClickSound = () => {
  playSound('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3');
};

const Fissures = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="0.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Main Fissures */}
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 1, 0.8, 1] }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          d="M 50 50 L 32 24 L 28 15 M 50 50 L 68 18 L 75 10 M 50 50 L 82 48 L 95 52 M 50 50 L 22 78 L 15 85 M 50 50 L 58 88 L 62 95 M 50 50 L 12 42 L 5 38"
          stroke="rgba(6, 182, 212, 1)"
          strokeWidth="0.8"
          fill="none"
          filter="url(#glow)"
        />
        
        {/* Secondary Cracks */}
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          d="M 32 24 L 20 20 M 68 18 L 85 12 M 82 48 L 90 65 M 22 78 L 10 92 M 58 88 L 75 92 M 12 42 L 2 55"
          stroke="rgba(168, 85, 247, 0.8)"
          strokeWidth="0.4"
          fill="none"
          filter="url(#glow)"
        />

        {/* Energy Pulses */}
        {[...Array(6)].map((_, i) => (
          <motion.circle
            key={i}
            initial={{ r: 0, opacity: 0 }}
            animate={{ r: [0, 2, 0], opacity: [0, 0.8, 0] }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              delay: i * 0.3,
              ease: "easeInOut"
            }}
            cx={50 + (Math.random() - 0.5) * 40}
            cy={50 + (Math.random() - 0.5) * 40}
            fill="rgba(6, 182, 212, 0.5)"
            filter="url(#glow)"
          />
        ))}
      </svg>
    </div>
  );
};

const PortalIntro = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => {
        setPhase(1);
        playSound('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3', 0.3); // Hum
      }, 1000),
      setTimeout(() => {
        setPhase(2);
        playSound('https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3', 0.4); // Crackling
      }, 2500),
      setTimeout(() => {
        setPhase(3);
        playSound('https://assets.mixkit.co/active_storage/sfx/2573/2573-preview.mp3', 0.5); // Breach/Boom
      }, 3500),
      setTimeout(() => {
        setPhase(4);
        playSound('https://assets.mixkit.co/active_storage/sfx/2574/2574-preview.mp3', 0.6); // Impact
      }, 7500),
      setTimeout(() => onComplete(), 9500)
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  const shakeAnimation = {
    x: phase >= 2 && phase < 4 ? [0, -10, 10, -10, 10, 0] : 0,
    y: phase >= 2 && phase < 4 ? [0, 10, -10, 10, -10, 0] : 0,
    transition: {
      duration: 0.05,
      repeat: Infinity,
      repeatType: "mirror" as const
    }
  };

  return (
    <motion.div 
      animate={phase >= 2 && phase < 4 ? shakeAnimation : {}}
      className="fixed inset-0 z-[100] bg-[#020205] flex items-center justify-center overflow-hidden"
    >
      {/* Immersive Space Background */}
      <div className="absolute inset-0">
        {/* Nebulae */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-cyan-900/20 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-purple-900/20 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '10s' }} />
          <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[100px]" />
        </div>

        {/* Stars Layers */}
        <div className="absolute inset-0">
          {/* Small Stars */}
          {[...Array(100)].map((_, i) => (
            <div 
              key={`s-${i}`}
              className="absolute bg-white rounded-full opacity-40"
              style={{
                width: '1px',
                height: '1px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animation: `twinkle ${2 + Math.random() * 4}s infinite ${Math.random() * 2}s`
              }}
            />
          ))}
          {/* Medium Stars */}
          {[...Array(30)].map((_, i) => (
            <div 
              key={`m-${i}`}
              className="absolute bg-cyan-100 rounded-full opacity-60"
              style={{
                width: '2px',
                height: '2px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                boxShadow: '0 0 4px rgba(255,255,255,0.8)',
                animation: `twinkle ${3 + Math.random() * 5}s infinite ${Math.random() * 3}s`
              }}
            />
          ))}
          {/* Distant Galaxies/Clusters */}
          {[...Array(5)].map((_, i) => (
            <div 
              key={`g-${i}`}
              className="absolute rounded-full blur-[2px] opacity-20"
              style={{
                width: '4px',
                height: '4px',
                backgroundColor: i % 2 === 0 ? '#a855f7' : '#06b6d4',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                boxShadow: `0 0 10px ${i % 2 === 0 ? '#a855f7' : '#06b6d4'}`
              }}
            />
          ))}
        </div>

        {/* Space Dust / Grain */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      </div>

      {/* Fissures during breach */}
      {phase >= 2 && <Fissures />}

      {/* Portal Effect */}
      <AnimatePresence>
        {phase >= 1 && (
          <motion.div
            initial={{ scale: 0, rotate: 0, opacity: 0 }}
            animate={{ 
              scale: phase >= 3 ? 2.5 : 1.5, 
              rotate: phase >= 3 ? 720 : 360, 
              opacity: 1 
            }}
            exit={{ scale: 10, opacity: 0 }}
            transition={{ duration: phase >= 3 ? 0.5 : 1.5, ease: "easeOut" }}
            className="relative w-96 h-96"
          >
            {/* Swirling Rings */}
            <div className="absolute inset-0 rounded-full border-[12px] border-cyan-500/30 blur-md animate-spin" style={{ animationDuration: '3s' }} />
            <div className="absolute inset-4 rounded-full border-[8px] border-purple-500/40 blur-lg animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }} />
            <div className="absolute inset-8 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 opacity-80 blur-2xl animate-pulse" />
            
            {/* Core Light */}
            <div className="absolute inset-16 rounded-full bg-white blur-3xl opacity-40" />
            
            {/* Distortion Field */}
            {phase >= 2 && (
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ repeat: Infinity, duration: 0.2 }}
                className="absolute inset-0 rounded-full bg-cyan-400/20 blur-xl"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Finn Breaching */}
      <AnimatePresence>
        {phase >= 3 && (
          <motion.div
            initial={{ scale: 0.1, z: -1000, opacity: 0, filter: 'brightness(5) blur(30px)' }}
            animate={{ 
              scale: phase === 4 ? 1 : 1.2, 
              z: 0,
              opacity: 1, 
              filter: phase === 4 ? 'brightness(1) blur(0px)' : 'brightness(2) blur(5px)' 
            }}
            transition={{ 
              duration: 0.8, 
              type: "spring",
              stiffness: 100,
              damping: 10
            }}
            className="absolute z-30 perspective-1000"
          >
            <div className="relative">
              {/* Main Image */}
              <div className="relative group">
                <motion.img 
                  src={CLOUDINARY_URLS.breaching} 
                  alt="Finn Breaching" 
                  className="w-[85vw] md:w-[700px] h-auto drop-shadow-[0_0_50px_rgba(6,182,212,1)] pointer-events-none select-none"
                  animate={{ 
                    scale: [1, 1.02, 1],
                    rotateY: [-5, 5, -5]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 2, 
                    ease: "easeInOut" 
                  }}
                  referrerPolicy="no-referrer"
                />
                {/* Invisible shield to prevent right-click/save */}
                <div className="absolute inset-0 z-30" />
              </div>
              
              {/* Energy Aura / Shatter Particles */}
              <motion.div 
                animate={{ 
                  opacity: [0.4, 1, 0.4],
                  scale: [1, 1.1, 1]
                }}
                transition={{ repeat: Infinity, duration: 0.5 }}
                className="absolute inset-0 bg-cyan-400/30 blur-[60px] rounded-full -z-10"
              />

              {/* Glass/Energy Shards (CSS particles) */}
              {phase === 3 && (
                <div className="absolute inset-0 overflow-visible">
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                      animate={{ 
                        x: (Math.random() - 0.5) * 600, 
                        y: (Math.random() - 0.5) * 600, 
                        opacity: 0,
                        scale: 0,
                        rotate: Math.random() * 360
                      }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="absolute top-1/2 left-1/2 w-4 h-4 bg-cyan-200/60 clip-path-polygon-[50%_0%,_0%_100%,_100%_100%]"
                      style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Landing Flash */}
      <AnimatePresence>
        {phase === 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-white z-50"
          />
        )}
      </AnimatePresence>

      {/* Text Overlay */}
      <div className="absolute bottom-12 left-0 right-0 text-center z-40">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-cyan-400 font-mono text-[10px] md:text-xs tracking-[0.5em] uppercase font-bold"
        >
          {phase === 1 && "Ouverture du portail temporel..."}
          {phase === 2 && "Instabilité dimensionnelle détectée !"}
          {phase === 3 && "BREACH : FINN TRANSVERSE LA RÉALITÉ"}
          {phase === 4 && "Arrivée sur Terre : Secteur Infini24"}
        </motion.p>
      </div>
    </motion.div>
  );
};

interface FinnPageProps {
  onNavigate?: (index: number) => void;
}

const FinnPage: React.FC<FinnPageProps> = ({ onNavigate }) => {
  const [showIntro, setShowIntro] = useState(true);
  const [showStory, setShowStory] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('identity');
  const [selectedAbility, setSelectedAbility] = useState<number>(0);
  const [hasSeenSecrets, setHasSeenSecrets] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const storyScrollRef = useRef<HTMLDivElement>(null);

  const storyPanels = [
    {
      img: "https://res.cloudinary.com/dmgqewagr/image/upload/v1774343437/Chp1-planche1-1_syhiqz.bmp",
      text: "Le silence règne dans le cockpit de l’Aura-24. À travers la vaste baie vitrée, une galaxie spirale déploie ses bras de lumière au milieu d'un vide abyssal.\n\n*« Dans une région oubliée de l'univers... Là où le temps lui-même hésite à avancer... »*"
    },
    {
      img: "https://res.cloudinary.com/dmgqewagr/image/upload/v1774430590/Chp1-planche1-2_vbeohk.bmp",
      text: "Finn se détourne de l'immensité pour consulter ses terminaux. La lumière bleue des hologrammes sculpte son visage alors qu'il ajuste ses lunettes de visée.\n\n— « Analyse des flux… anomalie détectée. »"
    },
    {
      img: "https://res.cloudinary.com/dmgqewagr/image/upload/v1774430590/Chp1-planche1-3_dmloym.bmp",
      text: "Soudain, l'écran principal s'embrase d'un orange d'alerte. Une onde de choc traverse les moniteurs.\n\n**BIP… BIP… BIP…**\n\n— « Code source identifié. »"
    },
    {
      img: "https://res.cloudinary.com/dmgqewagr/image/upload/v1774430591/Chp1-planche1-4_cq4cmc.bmp",
      text: "L'image se resserre brutalement sur son regard. Derrière les verres, le symbole de l'infini s'illumine d'un éclat cyan. Les données défilent à une vitesse vertigineuse.\n\n— « Anomalie temporelle… coordonnée 0-0-1… »"
    },
    {
      img: "https://res.cloudinary.com/dmgqewagr/image/upload/v1774438912/Chp1-planche1-5_syt9v4.bmp",
      text: "Au centre de l’Aura-24, un hologramme géant de la Terre apparaît, encerclé par un halo vibrant. Un signal infini enveloppe la planète comme une barrière d'énergie.\n\n— « La Terre… un point de convergence constant. »"
    },
    {
      img: "https://res.cloudinary.com/dmgqewagr/image/upload/v1774438911/Chp1-planche1-6_qccd6t.png",
      text: "La tension monte. Finn fait face au vide, sa détermination gravée sur son visage. L'Unité Dorsale Zen-Infinity v2.0 s'illumine violemment, inondant la pièce de rayons de lumière.\n\n*« Une signature… que je n’ai pas ressentie depuis des éternités… »*"
    },
    {
      img: "https://res.cloudinary.com/dmgqewagr/image/upload/v1774430590/Chp1-planche1-7_tlxsh4.bmp",
      text: "Un doigt ganté s'abat sur la console avec précision. L'interface émet un bref éclat sous la pression.\n\n— « Le Signe Infini 24… m’appelle. Activation du protocole... »"
    }
  ];

  const handleStoryScroll = () => {
    if (storyScrollRef.current) {
      const scrollTop = storyScrollRef.current.scrollTop;
      const height = storyScrollRef.current.offsetHeight;
      const newIndex = Math.round(scrollTop / height);
      if (newIndex !== currentStoryIndex) {
        setCurrentStoryIndex(newIndex);
      }
    }
  };

  const scrollToStoryPanel = (index: number) => {
    if (storyScrollRef.current) {
      const height = storyScrollRef.current.offsetHeight;
      storyScrollRef.current.scrollTo({
        top: index * height,
        behavior: 'smooth'
      });
      setCurrentStoryIndex(index);
    }
  };

  const sections = [
    {
      id: 'identity',
      title: 'Identité',
      subtitle: 'Explorateur Temporel',
      icon: User,
      content: [
        { label: 'Nom de code', value: 'FINN' },
        { label: 'Rôle', value: 'Curateur Visuel @ Infini24' },
        { label: 'Déploiement', value: '01.12.2025' },
        { label: 'Origine', value: 'Faille Numérique Sector-7' },
        { label: 'Spécialité', value: 'Optimisation de Réalité Visuelle' }
      ],
      description: "Finn n'est pas un simple graphiste. C'est un architecte du temps qui sculpte les pixels pour qu'ils survivent à l'éternité. Il voyage entre les époques pour capturer l'essence de la beauté avant qu'elle ne s'efface."
    },
    {
      id: 'abilities',
      title: 'Armement',
      subtitle: 'Équipement de Pointe',
      icon: Zap,
      description: "Équipé de technologies interdites dans 14 systèmes stellaires, Finn manipule la matière numérique avec une précision subatomique. Voici ses outils de prédilection.",
      items: [
        {
          name: 'Gants Tactiques « Infinity »',
          image: CLOUDINARY_URLS.gloves,
          tagline: 'Interface haptique haute précision pour manipulation de deadlines explosives.',
          features: [
            { title: 'Revêtement « Anti-Ghosting »', desc: 'Micro-ventouses en polymère cybernétique. Permet de ne jamais lâcher prise, même quand un projet glisse vers le chaos.' },
            { title: 'Capteurs « Budget-Sense »', desc: 'Détecte instantanément si un projet manque de ressources. Émet une micro-vibration d\'avertissement.' },
            { title: 'Protection « Heavy-Duty »', desc: 'Coques en polycarbonate renforcé. Absorbe les chocs lors de frappes répétées sur le bureau ou Ctrl+Z intensif.' },
            { title: 'Connectivité « Instant-Sync »', desc: 'Synchronisation neuronale directe. Vos idées passent du cerveau à l\'écran plus vite que la lumière.' }
          ],
          stats: { compat: 'Écrans tactiles, tasses brûlantes', style: 'Deep Space Blue Néon' }
        },
        {
          name: 'L’Unité Dorsale « Zen-Infinity v2.0 »',
          image: CLOUDINARY_URLS.back,
          tagline: 'Modèle certifié conforme aux normes de sécurité mentale en milieu hostile.',
          features: [
            { title: 'Générateur à Flux Infini', desc: 'Recyclage instantané de la frustration en énergie créative. Capacité infinie.' },
            { title: 'Blindage « Carapace »', desc: 'Alliage de titane et de "J’ai pas vu ton mail". Résiste à 150 bars de pression client.' },
            { title: 'Batteries de Régulation', desc: 'Trois cellules : Patience (Réunions), Caféine (Urgence), Pilote Automatique (Réponses types).' },
            { title: 'Harnais « Anti-Courbettes »', desc: 'Garde la tête haute même quand le budget est divisé par deux mais le brief double.' }
          ],
          stats: { compat: 'Réunions interminables, Dimanches soirs', style: 'Matte Grey & Orange' }
        },
        {
          name: 'Ceinture « Deadline-Buffer »',
          image: CLOUDINARY_URLS.belt,
          tagline: 'L’ancrage tactique pour créatifs immunisés contre l\'urgence.',
          features: [
            { title: 'Boucle « Anti-Stress »', desc: 'Absorbe 99% des vibrations Slack de 18h30. Ne s\'ouvre que si le projet est payé.' },
            { title: 'Modules « Kit de Survie »', desc: 'Patience de Moine, Sérénité Liquide, et Bulle de Silence anti-collègues bavards.' },
            { title: 'Barre « Pep’s-O-Meter »', desc: 'Convertit les demandes absurdes en puissance de calcul pure. Plus on en demande, plus il est efficace.' },
            { title: 'Détecteur de Trésors', desc: 'Des codes de réduction se cachent ici. Plus vous visitez, plus vous avez de chances d\'en trouver !' }
          ],
          stats: { compat: 'Deadlines ASAP, Critiques vagues', style: 'Tactical Black & Cyan' }
        },
        {
          name: 'Lunettes « Chrono-Graphique v4.0 »',
          image: CLOUDINARY_URLS.glasses,
          tagline: 'Le radar ultime pour une perfection maniaque en milieu 3D.',
          features: [
            { title: 'Optiques « Eagle-Eye »', desc: 'Lentilles à balayage laser sub-pixel. Détecte un pixel mort sur un écran 8K à 10 mètres.' },
            { title: 'Capteur « Tri-Dimensionnel »', desc: 'Analyse la profondeur des designs. Repère tout décalage de 1px dans l\'espace Z.' },
            { title: 'Filtre « Anti-Flou »', desc: 'Élimine le bruit des feedbacks contradictoires. Mode "Pep\'s" pour simuler les envies du client.' },
            { title: 'Monture « Résilience »', desc: 'Alliage à mémoire de forme. Résiste aux pressions lors de face-palms devant des erreurs système.' }
          ],
          stats: { compat: 'Acuité 25/10, Anti-Lumière Bleue', style: 'Cyber-Gold & Carbon' }
        },
        {
          name: "L'AURA-24",
          image: CLOUDINARY_URLS.aura,
          tagline: "Le sanctuaire technologique capable de transformer l'invisible en éternité.",
          features: [
            { title: 'Revêtement « Furtif »', desc: 'Coque en alliage intelligent absorbant la lumière des étoiles pour une invisibilité totale.' },
            { title: 'Noyau d’Énergie', desc: 'Singularité Stable pliant le temps for une position orbitale parfaite.' },
            { title: 'Le Cœur de l’Aura', desc: 'IA scannant les civilisations pour trouver les points de convergence esthétique.' },
            { title: 'Analyseur de Flux', desc: 'Détecte l’énergie émotionnelle d’une foule à des milliers de kilomètres.' }
          ],
          stats: { compat: 'Espace Profond, Dimensions Parallèles', style: 'Stealth Black & Neon Blue' }
        }
      ]
    },
    {
      id: 'journal',
      title: 'Chroniques',
      subtitle: 'La Gazette de Finn',
      icon: BookOpen,
      description: "Rapports d'observation du secteur créatif. Finn documente les flux et tendances pour assurer que le futur d'Infini24 reste visuellement impeccable."
    },
    {
      id: 'secrets',
      title: 'Archives',
      subtitle: 'Données Classées',
      icon: Lock,
      content: [
        { label: 'Trauma', value: 'Comic Sans MS (Niveau 5)' },
        { label: 'Relique', value: 'GPU GeForce 256 (An 1999)' },
        { label: 'Peur', value: 'Le Thé Synthétique' },
        { label: 'Code', value: 'AURA-24-OMEGA' },
        { label: 'Lieu', value: 'Nébuleuse d\'Orion' },
        { label: 'Rumeur', value: 'Finn ne dort jamais, il se recharge.' }
      ],
      description: "Derrière le masque de l'expert se cachent des secrets enfouis. Finn redoute par-dessus tout la médiocrité typographique et le manque de caféine de qualité supérieure."
    }
  ];

  const stats = [
    { id: 'coffee', label: 'COFFEE', value: '∞', icon: Coffee, color: 'text-[#B48646]' },
    { id: 'speed', label: 'CLICKS', value: '450 BPM', icon: Activity, color: 'text-blue-400' },
    { id: 'accuracy', label: 'PIXEL', value: '100%', icon: Shield, color: 'text-emerald-400' },
    { id: 'uptime', label: 'UPTIME', value: '104D', icon: Cpu, color: 'text-purple-400' }
  ];

  const handleSectionChange = (id: string) => {
    playClickSound();
    setActiveSection(id);
    if (id === 'secrets') setHasSeenSecrets(true);
  };

  if (showIntro) {
    return <PortalIntro onComplete={() => setShowIntro(false)} />;
  }

  const activeSectionData = sections.find(s => s.id === activeSection);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col min-h-full bg-transparent relative md:overflow-hidden pb-20 md:pb-0"
    >
      <main className="flex-1 relative">
        {/* Technical Grid Overlay */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#B48646_1px,transparent_1px),linear-gradient(to_bottom,#B48646_1px,transparent_1px)] bg-[size:100px_100px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#B48646_1px,transparent_1px),linear-gradient(to_bottom,#B48646_1px,transparent_1px)] bg-[size:20px_20px] opacity-30" />
        </div>
        

        {/* Background Decorative Elements */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#B48646]/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Large Background Character Image (Subtle) */}
        <div className="absolute right-[-5%] bottom-0 w-[60%] h-[80%] pointer-events-none select-none opacity-35">
          <img 
            src={CLOUDINARY_URLS.logo} 
            alt="" 
            className="w-full h-full object-contain object-right-bottom grayscale pointer-events-none select-none"
            referrerPolicy="no-referrer"
          />
          {/* Shield */}
          <div className="absolute inset-0" />
        </div>

        <div className="max-w-[1600px] mx-auto px-4 md:px-12 py-8 md:py-16 relative z-10">
          
          {/* Header Section - Ultra-Structured */}
          <div className="mb-12 flex flex-col md:flex-row md:items-start justify-between gap-6 border-b-2 border-[#B48646]/40 pb-8 animate-in fade-in slide-in-from-top duration-1000">
            <div className="space-y-4">
              <div className="flex items-center gap-4 font-mono text-[10px] text-[#B48646] uppercase tracking-[0.4em]">
                <span className="bg-[#B48646] text-slate-950 px-2 py-0.5 font-black">TOP SECRET</span>
                <span>// REF: INF-24-DOSSIER-01</span>
                <span>// TS: {new Date().toISOString().split('T')[0]}</span>
              </div>
              <h2 className="text-6xl md:text-9xl font-black text-white leading-none tracking-tighter flex flex-col">
                <span className="opacity-50 text-4xl md:text-6xl">DOSSIER_</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B48646] via-[#E5B066] to-[#B48646] animate-gradient-x">
                  FINN_24
                </span>
              </h2>
            </div>
            <div className="md:w-80 space-y-4">
              <div className="bg-[#B48646]/10 border border-[#B48646]/30 p-4 rounded-xl backdrop-blur-md">
                <p className="text-slate-400 text-xs font-mono leading-relaxed uppercase">
                  <span className="text-[#B48646] font-black">[MISSION_STATEMENT]</span><br />
                  "Le temps n'est qu'une variable. La perfection visuelle est une constante."
                </p>
              </div>
              <div className="flex flex-wrap gap-3 text-[9px] font-black font-mono text-[#B48646] uppercase tracking-widest">
                <span className="border border-[#B48646]/40 px-2 py-1 rounded bg-[#B48646]/5">STATUS: ACTIVE</span>
                <span className="border border-[#B48646]/40 px-2 py-1 rounded bg-[#B48646]/5">PRIORITY: OMEGA</span>
                <span className="border border-[#B48646]/40 px-2 py-1 rounded bg-[#B48646]/5">AUTH: LVL_4</span>
                <button 
                  onClick={() => { playClickSound(); setShowStory(true); }}
                  className="border-2 border-[#B48646] px-6 py-3 rounded-xl bg-[#B48646] text-slate-950 hover:bg-transparent hover:text-[#B48646] transition-all flex flex-col items-center gap-1 group/story shadow-[0_0_40px_rgba(180,134,70,0.6)] animate-pulse hover:animate-none active:scale-95"
                >
                  <div className="flex items-center gap-3">
                    <BookOpen size={20} className="group-hover/story:animate-bounce" />
                    <span className="font-black text-xl tracking-tighter">MON HISTOIRE</span>
                  </div>
                  <span className="text-[8px] font-mono opacity-70">Dossier: FINN_ORIGINS</span>
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Character Visual - Technical Sheet Style */}
            <div className="lg:col-span-4 space-y-6 animate-in fade-in slide-in-from-left duration-1000 delay-200">
              <div className="relative group border-2 border-[#B48646]/30 p-2 bg-slate-950/50">
                {/* Technical Markings */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#B48646]" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#B48646]" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#B48646]" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#B48646]" />
                
                <div className="relative aspect-[3/4] overflow-hidden bg-slate-950">
                  {/* Grid Overlay on Image */}
                  <div className="absolute inset-0 z-20 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#B48646_1px,transparent_1px),linear-gradient(to_bottom,#B48646_1px,transparent_1px)] bg-[size:10%_10%]" />
                  
                  <img 
                    src={CLOUDINARY_URLS.portrait} 
                    alt="Finn Portrait" 
                    className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 pointer-events-none select-none"
                  />
                  {/* Shield */}
                  <div className="absolute inset-0 z-25" />

                  {/* Technical Data Overlay */}
                  <div className="absolute top-4 left-4 z-30 font-mono text-[8px] text-[#B48646] space-y-1">
                    <p>[SCAN_ACTIVE]</p>
                    <p>X: 45.221</p>
                    <p>Y: 12.890</p>
                  </div>

                  <div className="absolute bottom-4 right-4 z-30">
                    <div className="bg-slate-950/80 border border-[#B48646]/50 px-3 py-1 font-mono text-[10px] text-white">
                      ID: FN-24-INF
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Grid - Compact Technical */}
              <div className="grid grid-cols-2 gap-2">
                {stats.map((stat) => (
                  <div key={stat.id} className="bg-slate-950/50 border border-[#B48646]/20 p-3 flex flex-col gap-1 relative group overflow-hidden">
                    <div className="flex items-center justify-between">
                      <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</p>
                      <stat.icon size={12} className={`${stat.color} opacity-50 group-hover:opacity-100 transition-opacity`} />
                    </div>
                    <p className="text-xl font-mono font-black text-white tracking-tighter">{stat.value}</p>
                    <div className="h-0.5 w-full bg-slate-800 mt-1 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '70%' }}
                        className={`h-full ${stat.color.replace('text-', 'bg-')}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Interactive Content - Ultra-Structured */}
            <div className="lg:col-span-8 space-y-6 animate-in fade-in slide-in-from-right duration-1000 delay-400">
              
              {/* Navigation - Technical Tabs */}
              <div className="flex flex-wrap gap-2">
                {sections.map((section) => {
                  const isActive = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => handleSectionChange(section.id)}
                      className={`group relative px-6 py-3 transition-all duration-300 text-left border-2 font-mono text-[10px] uppercase tracking-[0.2em] ${
                        isActive 
                          ? "bg-[#B48646] border-[#B48646] text-slate-950 font-black" 
                          : "bg-slate-950/50 border-[#B48646]/20 text-[#B48646] hover:border-[#B48646]/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <section.icon size={14} />
                        <span>{section.title}</span>
                      </div>
                      {isActive && (
                        <motion.div 
                          layoutId="activeTab"
                          className="absolute -bottom-[2px] left-0 right-0 h-1 bg-white"
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Content Card - Technical Sheet */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="relative border-2 border-[#B48646]/30 bg-slate-950/80 backdrop-blur-xl p-6 md:p-8 overflow-hidden min-h-[600px]"
                >
                  {/* Technical Decorative Elements */}
                  <div className="absolute top-2 right-4 font-mono text-[8px] text-[#B48646]/40 uppercase tracking-widest">
                    DATA_STREAM_0{sections.findIndex(s => s.id === activeSection) + 1} // SECURE_LINK_ESTABLISHED
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-8 border-b border-[#B48646]/20 pb-4">
                      <div>
                        <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase mb-1">
                          {activeSectionData?.title}
                        </h3>
                        <p className="text-[10px] font-mono text-[#B48646] uppercase tracking-[0.3em]">
                          {activeSectionData?.subtitle} // [LOG_ID: {Math.random().toString(36).substring(7).toUpperCase()}]
                        </p>
                      </div>
                      <div className="hidden md:flex flex-col items-end font-mono text-[9px] text-slate-500">
                        <p>CLEARANCE: OMEGA</p>
                        <p>ENCRYPTION: AES-256</p>
                      </div>
                    </div>

                    {activeSection === 'abilities' ? (
                      <div className="space-y-6">
                        {/* Compact Sub-navigation */}
                        <div className="flex flex-wrap gap-2 border-b border-white/5 pb-4">
                          {activeSectionData?.items?.map((item: any, idx: number) => (
                            <button
                              key={idx}
                              onClick={() => { playClickSound(); setSelectedAbility(idx); }}
                              className={`px-4 py-2 text-[9px] font-mono uppercase tracking-widest transition-all border ${
                                selectedAbility === idx 
                                  ? "bg-[#B48646]/20 text-[#B48646] border-[#B48646]" 
                                  : "bg-transparent text-slate-500 border-white/10 hover:border-[#B48646]/40"
                              }`}
                            >
                              {item.name.split(' « ')[0]}
                            </button>
                          ))}
                        </div>

                        <motion.div
                          key={selectedAbility}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start"
                        >
                          {/* Compact Image Container */}
                          <div className="xl:col-span-5 space-y-4">
                            <div 
                              className="aspect-square bg-slate-900 border border-[#B48646]/20 p-6 relative group cursor-default overflow-hidden"
                            >
                              <div className="absolute inset-0 z-0 opacity-10 bg-[linear-gradient(to_right,#B48646_1px,transparent_1px),linear-gradient(to_bottom,#B48646_1px,transparent_1px)] bg-[size:20px_20px]" />
                              
                              <div className="relative w-full h-full">
                                <img 
                                  src={activeSectionData?.items?.[selectedAbility].image} 
                                  alt={activeSectionData?.items?.[selectedAbility].name}
                                  className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(180,134,70,0.3)] z-10 grayscale group-hover:grayscale-0 transition-all duration-700 pointer-events-auto cursor-pointer select-none"
                                  referrerPolicy="no-referrer"
                                />
                                {/* Shield */}
                                <div className="absolute inset-0 z-20 pointer-events-none" />
                              </div>
                              
                              <div className="absolute top-2 left-2 font-mono text-[7px] text-[#B48646]/60">
                                [VISUAL_PREVIEW_0{selectedAbility + 1}]
                              </div>
                            </div>

                            <div className="bg-[#B48646]/5 border border-[#B48646]/20 p-4 font-mono">
                              <p className="text-[8px] text-slate-500 uppercase mb-2 tracking-widest">Technical_Specs</p>
                              <div className="space-y-1.5">
                                <div className="flex justify-between text-[9px]">
                                  <span className="text-slate-400 uppercase">Compat</span>
                                  <span className="text-white text-right">{activeSectionData?.items?.[selectedAbility].stats.compat}</span>
                                </div>
                                <div className="flex justify-between text-[9px]">
                                  <span className="text-slate-400 uppercase">Signature</span>
                                  <span className="text-[#B48646] text-right">{activeSectionData?.items?.[selectedAbility].stats.style}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Compact Details */}
                          <div className="xl:col-span-7 space-y-4">
                            <div>
                              <h4 className="text-xl font-black text-white uppercase tracking-tight mb-1">
                                {activeSectionData?.items?.[selectedAbility]?.name}
                              </h4>
                              <p className="text-[#B48646] text-[10px] font-mono uppercase tracking-widest">
                                {activeSectionData?.items?.[selectedAbility]?.tagline || ''}
                              </p>
                            </div>

                            <div className="grid grid-cols-1 gap-2">
                              {activeSectionData?.items?.[selectedAbility].features.map((feature: any, fIdx: number) => (
                                <div key={fIdx} className="bg-white/5 p-3 border-l-2 border-[#B48646]/40 hover:bg-[#B48646]/5 transition-colors">
                                  <h5 className="text-[#B48646] text-[9px] font-black uppercase tracking-widest mb-1">[{feature.title}]</h5>
                                  <p className="text-slate-300 text-[11px] leading-tight">{feature.desc}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    ) : activeSection === 'journal' ? (
                      <div className="space-y-6">
                        <div className="bg-[#B48646]/5 border-l-4 border-[#B48646] p-6 mb-6">
                          <p className="text-slate-300 leading-relaxed text-sm md:text-base font-mono uppercase">
                            <span className="text-[#B48646] font-black block mb-2">[SUMMARY]</span>
                            {activeSectionData?.description || ''}
                          </p>
                        </div>
                        
                        <div className="space-y-4">
                          {reports.map((report, idx) => (
                            <motion.div 
                              key={report.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="bg-slate-900/50 border border-white/5 p-5 rounded-2xl hover:border-[#B48646]/30 transition-all group"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-1.5">
                                  <Cpu size={10} className="text-[#B48646]" />
                                  <span className="text-[8px] font-mono font-bold text-[#B48646] uppercase tracking-widest">{report.category} // {report.date}</span>
                                </div>
                                <div className="flex gap-1">
                                  {report.tags.map(tag => (
                                    <span key={tag} className="text-[7px] text-slate-600 uppercase font-bold">#{tag}</span>
                                  ))}
                                </div>
                              </div>
                              <h4 className="text-lg font-black text-white mb-2 group-hover:text-[#B48646] transition-colors">{report.title}</h4>
                              <p className="text-slate-400 text-xs italic leading-relaxed">"{report.content}"</p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-8">
                        <div className="bg-[#B48646]/5 border-l-4 border-[#B48646] p-6">
                          <p className="text-slate-300 leading-relaxed text-sm md:text-base font-mono uppercase">
                            <span className="text-[#B48646] font-black block mb-2">[SUMMARY]</span>
                            {activeSectionData?.description || ''}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#B48646]/20 border border-[#B48646]/20">
                          {activeSectionData?.content?.map((item: any, i: number) => (
                            <motion.div 
                              key={i} 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: i * 0.05 }}
                              className="flex items-center justify-between p-4 bg-slate-950 group/item hover:bg-[#B48646]/5 transition-all"
                            >
                              <span className="text-[8px] font-mono font-bold text-slate-500 uppercase tracking-widest group-hover/item:text-[#B48646]">{item.label}</span>
                              <span className="text-[11px] font-mono font-bold text-white">
                                {item.value}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Bottom Action Area - Technical Terminal */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Terminal Card */}
                <div className="md:col-span-8 bg-slate-950 border-2 border-[#B48646]/30 p-6 font-mono text-[9px] space-y-2 relative overflow-hidden group">
                  <div className="flex items-center justify-between mb-4 border-b border-[#B48646]/20 pb-2">
                    <div className="flex items-center gap-2">
                      <TerminalIcon size={12} className="text-[#B48646]" />
                      <span className="text-[#B48646] font-black uppercase tracking-widest">FINN_OS_RECOVERY_MODE</span>
                    </div>
                    <span className="text-slate-600">V.2.5.0-STABLE</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-slate-500 flex items-center gap-2">
                      <span className="text-[#B48646]">[OK]</span> SYSTEM_INITIALIZATION_COMPLETE
                    </p>
                    <p className="text-slate-500 flex items-center gap-2">
                      <span className="text-[#B48646]">[OK]</span> TEMPORAL_SHIELD_STABILIZED
                    </p>
                    <p className="text-emerald-400 animate-pulse flex items-center gap-2">
                      <span className="text-[#B48646]">[!!]</span> MISSION_OBJECTIVE: <span className="bg-emerald-400/10 px-1">INFINI_24_EXPANSION</span>
                    </p>
                    <p className="text-[#B48646] animate-pulse"> {'>'} _</p>
                  </div>
                </div>

                {/* Call to Action - Technical Button */}
                <button 
                  onClick={() => { 
                    playClickSound(); 
                    if (onNavigate) onNavigate(2); 
                  }}
                  className="md:col-span-4 relative group/btn overflow-hidden border-2 border-[#B48646] bg-slate-950 p-1"
                >
                  <div className="absolute inset-0 bg-[#B48646] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                  <div className="relative h-full flex flex-col items-center justify-center gap-1 p-4 z-10">
                    <span className="text-[8px] font-black text-[#B48646] group-hover/btn:text-slate-950 uppercase tracking-[0.4em] transition-colors">INITIATE_PROTOCOL</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-white group-hover/btn:text-slate-950 uppercase tracking-tighter transition-colors">Démarrer un projet</span>
                      <ArrowRight size={16} className="text-[#B48646] group-hover/btn:text-slate-950 transition-all" />
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Story Viewer Overlay */}
      <AnimatePresence>
        {showStory && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-[300] bg-slate-950 flex flex-col overflow-hidden"
          >
            {/* Background Atmosphere */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#B4864610,transparent_70%)]" />
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10" />
            </div>

            {/* Header */}
            <div className="relative z-10 p-6 md:p-10 flex items-center justify-between border-b border-[#B48646]/20 bg-slate-950/90 backdrop-blur-xl shadow-[0_10px_50px_rgba(0,0,0,0.5)]">
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-[#B48646] font-mono text-[10px] md:text-[12px] uppercase tracking-[0.4em]">
                  <BookOpen size={16} />
                  <span>Archives Temporelles // Dossier: FINN_ORIGINS</span>
                </div>
                <h2 className="text-3xl md:text-6xl font-black text-white tracking-tighter uppercase drop-shadow-[0_0_25px_rgba(180,134,70,0.5)] leading-none">
                  Chapitre 1 : <span className="text-[#B48646] animate-pulse inline-block">Le grand saut de l'architecte</span>
                </h2>
              </div>
              <button 
                onClick={() => setShowStory(false)}
                className="flex items-center gap-3 px-6 py-3 bg-red-600/10 hover:bg-red-600 text-white transition-all border border-red-500/30 rounded-full group shadow-2xl active:scale-90"
              >
                <span className="text-[12px] font-black uppercase tracking-[0.2em] hidden md:block">Quitter l'histoire</span>
                <X size={24} className="group-hover:rotate-90 transition-transform" />
              </button>
            </div>

            {/* Vertical Story Scroller */}
            <div className="relative flex-1 flex flex-col items-center group/nav overflow-hidden">
              {/* Navigation Buttons */}
              <button 
                onClick={() => scrollToStoryPanel(Math.max(0, currentStoryIndex - 1))}
                className={`absolute top-4 left-1/2 -translate-x-1/2 z-[310] p-4 bg-slate-900/80 text-[#B48646] rounded-full backdrop-blur-md transition-all hover:bg-[#B48646] hover:text-slate-950 shadow-2xl ${currentStoryIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100 md:opacity-0 md:group-hover/nav:opacity-100'}`}
              >
                <ChevronUp size={32} />
              </button>

              <button 
                onClick={() => scrollToStoryPanel(Math.min(storyPanels.length - 1, currentStoryIndex + 1))}
                className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-[310] p-4 bg-slate-900/80 text-[#B48646] rounded-full backdrop-blur-md transition-all hover:bg-[#B48646] hover:text-slate-950 shadow-2xl ${currentStoryIndex === storyPanels.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-100 md:opacity-0 md:group-hover/nav:opacity-100'}`}
              >
                <ChevronDown size={32} />
              </button>

              <div 
                ref={storyScrollRef}
                onScroll={handleStoryScroll}
                className="w-full h-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory custom-scrollbar flex flex-col items-center scroll-smooth bg-slate-950"
              >
                <div className="flex flex-col w-full h-auto items-center">
                  {/* Story Panels */}
                  {storyPanels.map((panel, i) => (
                    <div 
                      key={i} 
                      className="w-full max-w-6xl min-h-screen snap-center flex flex-col items-center justify-center gap-4 md:gap-8 py-10 shrink-0 mx-auto"
                    >
                      <div 
                        className="relative w-full bg-slate-950 overflow-hidden shadow-2xl rounded-lg"
                      >
                        <img 
                          src={panel.img} 
                          alt={`Story Panel ${i+1}`}
                          className="w-full h-auto max-h-[75vh] object-contain transition-all duration-700"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ amount: 0.3, once: true }}
                        className="space-y-4 max-w-4xl mx-auto px-6 md:px-0"
                      >
                        <div className="text-white text-lg md:text-2xl font-bold leading-relaxed tracking-tight whitespace-pre-line text-center drop-shadow-lg prose prose-invert max-w-none">
                          <ReactMarkdown>{panel.text}</ReactMarkdown>
                        </div>
                        <div className="h-1 w-24 bg-[#B48646] mx-auto shadow-[0_0_10px_rgba(180,134,70,0.5)]" />
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Navigation Hint */}
            <div className="p-6 md:p-10 border-t border-white/5 flex items-center justify-between bg-slate-950/80 backdrop-blur-md relative z-10">
              <div className="flex items-center gap-6 text-slate-500 font-mono text-[10px] uppercase tracking-widest">
                <div className="flex gap-2">
                  {storyPanels.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => scrollToStoryPanel(idx)}
                      className={`w-3 h-3 rounded-full transition-all duration-500 ${idx === currentStoryIndex ? 'bg-[#B48646] w-8' : 'bg-[#B48646]/20 hover:bg-[#B48646]/40'}`}
                    />
                  ))}
                </div>
                <span className="hidden md:block">
                  {currentStoryIndex === storyPanels.length - 1 ? 'FIN DU CHAPITRE ACTUEL' : `PLANCHE ${currentStoryIndex + 1} / ${storyPanels.length}`}
                </span>
              </div>
              <div className="flex items-center gap-6">
                <button 
                  onClick={() => setShowStory(false)}
                  className="px-10 py-4 border-2 border-[#B48646] bg-[#B48646]/10 hover:bg-[#B48646] hover:text-slate-950 text-[#B48646] font-mono text-sm font-black uppercase tracking-[0.3em] transition-all rounded-full shadow-lg active:scale-95"
                >
                  RETOUR À L'INTERFACE
                </button>
                <div className="text-[#B48646] font-mono text-[10px] uppercase tracking-widest animate-pulse hidden lg:block">
                  [FINN_ORIGINS_V1.0]
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FinnPage;
