import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from './firebase-applet-config.json';

// Defensive check to ensure keys are present
const hasFirebaseConfig = firebaseConfig && firebaseConfig.apiKey && firebaseConfig.projectId;

let app;
let db: any = null;
let auth: any = null;

if (hasFirebaseConfig) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
    auth = getAuth(app);
    
    // Auto-authenticate visitor anonymously for secure firestore writes
    signInAnonymously(auth).catch((error) => {
      console.warn("Firebase Anonymous Auth was not enabled or restricted (expected if disabled in Console):", error);
    });
  } catch (error) {
    console.error("Firebase initialization failed:", error);
  }
} else {
  console.warn("Firebase configuration is missing or incomplete. Some dynamic features might not be available.");
}

export { db, auth };
export { signInAnonymously, onAuthStateChanged };
