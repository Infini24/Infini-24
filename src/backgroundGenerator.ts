import { GoogleGenAI } from "@google/genai";

const CACHE_KEY = 'infini24_bg_cache';
const COOLDOWN_KEY = 'infini24_bg_cooldown';
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours
const COOLDOWN_DURATION = 60 * 60 * 1000; // 1 hour cooldown on 429
const FALLBACK_BG = "https://images.unsplash.com/photo-1464802686167-b939a67e06a1?q=80&w=2048&auto=format&fit=crop";

export const generateBackground = async () => {
  // 1. Check Cooldown (if we recently hit a 429)
  try {
    const cooldown = localStorage.getItem(COOLDOWN_KEY);
    if (cooldown) {
      const timestamp = parseInt(cooldown, 10);
      if (Date.now() - timestamp < COOLDOWN_DURATION) {
        console.log("Gemini API in cooldown (quota reached). Using fallback.");
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
  } catch (e) {
    console.warn("Cache read failed", e);
  }

  // 3. Try Generate
  try {
    // @ts-ignore
    const apiKey = import.meta.env?.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey) return FALLBACK_BG;

    const ai = new GoogleGenAI({ apiKey });
    const prompt = "Hyper-realistic deep space galaxy sky for a premium website. Elegant Navy Blue Gradient transition from midnight blue to deep sapphire. A cinematic cycle of a glowing crescent moon and a distant soft golden sun, never appearing together. Vast fields of thousands of tiny, sharp, distant stars with varying brightness drifting slowly. Faint, ethereal cosmic nebulas and stardust. Occasional subtle shooting stars in random directions. Magical, sophisticated, and immersive atmosphere. Panoramic 16:9 format. No text. Clear central area for website content. High resolution, cinematic depth and texture.";
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
        },
      },
    });

    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64Url = `data:image/png;base64,${part.inlineData.data}`;
          
          // Save to cache
          try {
            localStorage.setItem(CACHE_KEY, JSON.stringify({
              url: base64Url,
              timestamp: Date.now()
            }));
            localStorage.removeItem(COOLDOWN_KEY); // Clear cooldown on success
          } catch (e) {
            console.warn("Cache write failed", e);
          }
          
          return base64Url;
        }
      }
    }
  } catch (error: any) {
    // If it's a quota error (429), set cooldown
    if (error?.message?.includes('429') || error?.status === 429 || JSON.stringify(error).includes('429')) {
      try {
        localStorage.setItem(COOLDOWN_KEY, Date.now().toString());
      } catch (e) {}
      console.warn("Gemini API quota exhausted. Cooldown activated.");
    } else {
      console.error("Background generation failed:", error);
    }
    
    return FALLBACK_BG;
  }

  return FALLBACK_BG;
};
