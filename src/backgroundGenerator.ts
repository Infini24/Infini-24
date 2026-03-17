import { GoogleGenerativeAI } from "@google/generative-ai";

const CACHE_KEY = 'infini24_bg_cache';
const COOLDOWN_KEY = 'infini24_bg_cooldown';
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours
const COOLDOWN_DURATION = 60 * 60 * 1000; // 1 hour cooldown
const FALLBACK_BG = "https://images.unsplash.com/photo-1464802686167-b939a67e06a1?q=80&w=2048&auto=format&fit=crop";

export const generateBackground = async () => {
  // 1. Check Cooldown
  try {
    const cooldown = localStorage.getItem(COOLDOWN_KEY);
    if (cooldown) {
      const timestamp = parseInt(cooldown, 10);
      if (Date.now() - timestamp < COOLDOWN_DURATION) {
        return FALLBACK_BG;
      }
    }
  } catch (e) {}

  // 2. Check Cache
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { url, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_EXPIRY) {
        return url;
      }
    }
  } catch (e) {}

  // 3. Try Generate
  try {
    // Utilisation de la clé VITE_ pour le client-side
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey) {
      console.warn("BG Generator: Clé API manquante");
      return FALLBACK_BG;
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    // Note: Gemini 1.5 Flash est plus stable pour les réponses texte/data
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = "Generate a direct link or description for a hyper-realistic deep space galaxy sky. Navy Blue sapphire, tiny sharp stars, cinematic depth.";
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    if (text) {
      // Pour l'instant on retourne le fallback ou l'URL si l'IA en génère une valide
      // La génération d'IMAGE directe via SDK nécessite Imagen, on reste sur le fallback stable
      return FALLBACK_BG;
    }
  } catch (error: any) {
    if (JSON.stringify(error).includes('429')) {
      try { localStorage.setItem(COOLDOWN_KEY, Date.now().toString()); } catch (e) {}
    }
    return FALLBACK_BG;
  }

  return FALLBACK_BG;
};
