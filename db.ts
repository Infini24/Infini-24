
import { db, auth, storage } from './firebaseConfig';
import firebase from './firebaseConfig';
import { User } from './types';

// --- GESTION UTILISATEURS (FIREBASE AUTH) ---

// Inscription
export const registerUser = async (user: User & { password?: string }) => {
    if (!auth) return false;
    try {
        const cleanEmail = user.email.toLowerCase().trim(); // Sécurité Email

        // 1. Créer le compte Auth (Email/Pass)
        const userCredential = await auth.createUserWithEmailAndPassword(cleanEmail, user.password || "123456");
        
        // 2. Mettre à jour le profil Auth (Nom)
        if (userCredential.user) {
            await userCredential.user.updateProfile({ displayName: user.name });
        }

        // 3. Stocker les infos supplémentaires (Tel, Entreprise) dans Firestore
        if (userCredential.user) {
            await db.collection("users").doc(userCredential.user.uid).set({
                name: user.name,
                email: cleanEmail,
                type: user.type,
                companyName: user.companyName || "",
                phone: user.phone,
                createdAt: new Date().toISOString()
            });
        }

        return userCredential.user;
    } catch (error: any) {
        console.error("Erreur Inscription:", error.code, error.message);
        throw error; 
    }
};

// Connexion
export const loginUser = async (email: string, password: string) => {
    if (!auth) return null;
    try {
        const cleanEmail = email.toLowerCase().trim();
        const userCredential = await auth.signInWithEmailAndPassword(cleanEmail, password);
        
        if (userCredential.user) {
            const docSnap = await db.collection("users").doc(userCredential.user.uid).get();
            
            if (docSnap.exists) {
                return { uid: userCredential.user.uid, ...docSnap.data() } as User;
            } else {
                return { 
                    uid: userCredential.user.uid,
                    name: userCredential.user.displayName || "Utilisateur", 
                    email: cleanEmail, 
                    type: 'Particulier', 
                    phone: "" 
                } as User;
            }
        }
        return null;
    } catch (error: any) {
        console.error("Erreur Connexion:", error.code);
        throw error;
    }
};

// Déconnexion
export const logoutUser = async () => {
    if (auth) await auth.signOut();
};

// Mot de passe oublié
export const resetUserPassword = async (email: string) => {
    if (auth) await auth.sendPasswordResetEmail(email.toLowerCase().trim());
};

// Récupérer tous les utilisateurs (Pour l'Admin)
export const getUsers = async () => {
    try {
        const querySnapshot = await db.collection("users").get();
        const users = querySnapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
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

export const saveProject = async (project: any, fileToUpload?: File) => {
    try {
        // Force l'email en minuscule pour éviter les bugs de visibilité
        const cleanProject = {
            ...project,
            clientEmail: project.clientEmail ? project.clientEmail.toLowerCase().trim() : ""
        };

        // 1. Créer le document projet pour avoir un ID
        const docRef = await db.collection("projects").add(cleanProject);
        
        // 2. Si un fichier est fourni à la création, on l'upload immédiatement
        if (fileToUpload && storage) {
            const safeEmail = cleanProject.clientEmail.replace(/[^a-z0-9@._-]/gi, '_');
            const fileRef = storage.ref(`clients/${safeEmail}/${docRef.id}/sources/${Date.now()}_${fileToUpload.name}`);
            
            const snapshot = await fileRef.put(fileToUpload);
            const downloadURL = await snapshot.ref.getDownloadURL();

            // Mise à jour du projet avec le fichier
            await docRef.update({
                files: firebase.firestore.FieldValue.arrayUnion({
                    name: fileToUpload.name,
                    url: downloadURL,
                    date: new Date().toLocaleDateString()
                })
            });
        }

        return docRef.id;
    } catch (e) { console.error(e); }
};

export const getProjects = async (): Promise<any[]> => {
    try {
        const querySnapshot = await db.collection("projects").get();
        return querySnapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() })); 
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const updateProjectStatus = async (id: string | number, step: string, progress: number) => {
    try {
        await db.collection("projects").doc(String(id)).update({ step, progress });
    } catch (e) { console.error(e); }
};

export const deleteProject = async (id: string | number) => {
    try {
        await db.collection("projects").doc(String(id)).delete();
    } catch (e) { console.error(e); }
};

// --- GESTION FICHIERS (STORAGE) ---

// 1. Upload Client (Fichiers sources)
export const uploadProjectFile = async (projectId: string, file: File, clientEmail: string = "inconnu") => {
    if (!storage) throw new Error("Storage non configuré");
    
    try {
        const safeEmail = clientEmail.toLowerCase().trim().replace(/[^a-z0-9@._-]/gi, '_');
        
        const fileRef = storage.ref(`clients/${safeEmail}/${projectId}/sources/${Date.now()}_${file.name}`);
        
        const snapshot = await fileRef.put(file);
        const downloadURL = await snapshot.ref.getDownloadURL();

        await db.collection("projects").doc(projectId).update({
            files: firebase.firestore.FieldValue.arrayUnion({
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
        const safeEmail = clientEmail.toLowerCase().trim().replace(/[^a-z0-9@._-]/gi, '_');
        
        const fileRef = storage.ref(`clients/${safeEmail}/${projectId}/LIVRABLE_FINAL/${file.name}`);
        
        const snapshot = await fileRef.put(file);
        const downloadURL = await snapshot.ref.getDownloadURL();

        await db.collection("projects").doc(projectId).update({
            downloadUrl: downloadURL,
            step: 'delivered',
            progress: 100
        });

        return downloadURL;
    } catch (error) {
        console.error("Erreur Livraison:", error);
        throw error;
    }
};