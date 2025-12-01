import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Ajout du module Auth
import { getStorage } from "firebase/storage"; // Ajout du module Storage

// --- CONFIGURATION FIREBASE (Vos clés officielles) ---
const firebaseConfig = {
  apiKey: "AIzaSyBiwTXp93DP2l3OQByG_6kUSzqHTj1fLdU",
  authDomain: "infini24-c7001.firebaseapp.com",
  projectId: "infini24-c7001",
  storageBucket: "infini24-c7001.firebasestorage.app",
  messagingSenderId: "830926158316",
  appId: "1:830926158316:web:7222d16d0fd2e26910a8c9",
  measurementId: "G-BPMZEGQ55D"
};

// Initialisation de l'application Firebase
const app = initializeApp(firebaseConfig);

// Activation des services
const db = getFirestore(app);
const auth = getAuth(app); // Service d'Authentification
const storage = getStorage(app); // Service de Stockage Fichiers
const analytics = getAnalytics(app);

console.log("🔥 Firebase connecté (Auth + Database + Storage)");

export { db, auth, storage, app, analytics };