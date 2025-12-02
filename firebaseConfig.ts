
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/analytics";

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
const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

// Activation des services
const db = app.firestore();
const auth = app.auth();
const storage = app.storage();
const analytics = typeof window !== 'undefined' ? app.analytics() : null;

console.log("🔥 Firebase connecté (v8 Compat)");

export { db, auth, storage, app, analytics };
export default firebase;
