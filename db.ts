import { db, auth, storage } from './firebaseConfig';
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc, query, where, setDoc, getDoc, arrayUnion } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { User } from './types';

// --- GESTION UTILISATEURS (FIREBASE AUTH) ---

// Inscription
export const registerUser = async (user: User & { password?: string }) => {
    if (!auth) return false;
    try {
        // 1. Créer le compte Auth (Email/Pass)
        const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password || "123456");
        
        // 2. Mettre à jour le profil Auth (Nom)
        await updateProfile(userCredential.user, { displayName: user.name });

        // 3. Stocker les infos supplémentaires (Tel, Entreprise) dans Firestore
        await setDoc(doc(db, "users", userCredential.user.uid), {
            name: user.name,
            email: user.email,
            type: user.type,
            companyName: user.companyName || "",
            phone: user.phone,
            createdAt: new Date().toISOString()
        });

        return userCredential.user;
    } catch (error: any) {
        console.error("Erreur Inscription:", error.code, error.message);
        throw error; // On renvoie l'erreur pour l'afficher (ex: email déjà pris)
    }
};

// Connexion
export const loginUser = async (email: string, password: string) => {
    if (!auth) return null;
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // Récupérer les infos supplémentaires depuis Firestore
        const docRef = doc(db, "users", userCredential.user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            return { uid: userCredential.user.uid, ...docSnap.data() } as User;
        } else {
            // Fallback si pas de données Firestore (cas rare)
            return { 
                name: userCredential.user.displayName || "Utilisateur", 
                email: userCredential.user.email || "", 
                type: 'Particulier', 
                phone: "" 
            } as User;
        }
    } catch (error: any) {
        console.error("Erreur Connexion:", error.code);
        throw error;
    }
};

// Déconnexion
export const logoutUser = async () => {
    if (auth) await signOut(auth);
};

// Mot de passe oublié (Vrai email envoyé par Google)
export const resetUserPassword = async (email: string) => {
    if (auth) await sendPasswordResetEmail(auth, email);
};

// Récupérer tous les utilisateurs (Pour l'Admin)
export const getUsers = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "users"));
        // On récupère les données et on trie par date (le plus récent en premier)
        const users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // Tri manuel JS car Firestore demande un index pour le tri serveur
        return users.sort((a: any, b: any) => {
            const dateA = new Date(a.createdAt || 0).getTime();
            const dateB = new Date(b.createdAt || 0).getTime();
            return dateB - dateA;
        });
    } catch (e) {
        console.error("Erreur récupération utilisateurs:", e);
        return [];
    }
};


// --- GESTION PROJETS (FIRESTORE) ---

export const saveProject = async (project: any) => {
    try {
        // Ajout dans Firestore
        await addDoc(collection(db, "projects"), project);
    } catch (e) { console.error(e); }
};

export const getProjects = async (): Promise<any[]> => {
    try {
        const querySnapshot = await getDocs(collection(db, "projects"));
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); 
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const updateProjectStatus = async (id: string | number, step: string, progress: number) => {
    try {
        const projectRef = doc(db, "projects", String(id));
        await updateDoc(projectRef, { step, progress });
    } catch (e) { console.error(e); }
};

export const deleteProject = async (id: string | number) => {
    try {
        await deleteDoc(doc(db, "projects", String(id)));
    } catch (e) { console.error(e); }
};

// --- GESTION FICHIERS (STORAGE) ---

// 1. Upload Client (Fichiers sources)
export const uploadProjectFile = async (projectId: string, file: File, clientEmail: string = "inconnu") => {
    if (!storage) throw new Error("Storage non configuré");
    
    try {
        // Nettoyage email
        const safeEmail = clientEmail.replace(/[^a-z0-9@._-]/gi, '_');
        
        const fileRef = ref(storage, `clients/${safeEmail}/${projectId}/sources/${Date.now()}_${file.name}`);
        
        const snapshot = await uploadBytes(fileRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);

        const projectRef = doc(db, "projects", projectId);
        await updateDoc(projectRef, {
            files: arrayUnion({
                name: file.name,
                url: downloadURL,
                date: new Date().toLocaleDateString()
            })
        });

        return downloadURL;
    } catch (error) {
        console.error("Erreur Upload:", error);
        throw error;
    }
};

// 2. Upload Admin (Livrable final)
export const uploadFinalDelivery = async (projectId: string, file: File, clientEmail: string = "inconnu") => {
    if (!storage) throw new Error("Storage non configuré");
    
    try {
        const safeEmail = clientEmail.replace(/[^a-z0-9@._-]/gi, '_');
        
        // Dossier "livrables" distinct
        const fileRef = ref(storage, `clients/${safeEmail}/${projectId}/LIVRABLE_FINAL/${file.name}`);
        
        const snapshot = await uploadBytes(fileRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);

        // On met à jour le champ spécifique "downloadUrl" du projet
        const projectRef = doc(db, "projects", projectId);
        await updateDoc(projectRef, {
            downloadUrl: downloadURL, // Le lien principal de téléchargement
            step: 'delivered', // On passe automatiquement en livré
            progress: 100
        });

        return downloadURL;
    } catch (error) {
        console.error("Erreur Livraison:", error);
        throw error;
    }
};