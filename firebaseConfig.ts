import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// --- CONFIGURATION FIREBASE ---
// 1. Allez sur https://console.firebase.google.com/
// 2. Créez un projet "Infini24"
// 3. Ajoutez une application Web (</>)
// 4. Copiez les informations qu'ils vous donnent et remplacez les valeurs ci-dessous :

const firebaseConfig = {
  apiKey: "REMPLACER_PAR_VOTRE_API_KEY",
  authDomain: "REMPLACER_PAR_VOTRE_PROJECT_ID.firebaseapp.com",
  projectId: "REMPLACER_PAR_VOTRE_PROJECT_ID",
  storageBucket: "REMPLACER_PAR_VOTRE_PROJECT_ID.firebasestorage.app",
  messagingSenderId: "REMPLACER_PAR_VOTRE_SENDER_ID",
  appId: "REMPLACER_PAR_VOTRE_APP_ID"
};

// Initialisation conditionnelle pour éviter les crashs si non configuré
let db: any = null;

try {
    // On vérifie si l'utilisateur a bien remplacé la valeur par défaut
    if (firebaseConfig.apiKey !== "REMPLACER_PAR_VOTRE_API_KEY") {
        const app = initializeApp(firebaseConfig);
        db = getFirestore(app);
        console.log("🔥 Firebase connecté avec succès !");
    } else {
        console.warn("⚠️ Firebase non configuré. Mode LocalStorage actif.");
    }
} catch (error) {
    console.error("Erreur init Firebase:", error);
}

export { db };
