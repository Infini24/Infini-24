import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// --- CONFIGURATION FIREBASE ---
const firebaseConfig = {
  apiKey: "AIzaSyBiwTXp93DP2l3OQByG_6kUSzqHTj1fLdU",
  authDomain: "infini24-c7001.firebaseapp.com",
  projectId: "infini24-c7001",
  storageBucket: "infini24-c7001.firebasestorage.app",
  messagingSenderId: "830926158316",
  appId: "1:830926158316:web:7222d16d0fd2e26910a8c9",
  measurementId: "G-BPMZEGQ55D"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("🔥 Firebase connecté (Cloud Mode Actif)");

export { db };