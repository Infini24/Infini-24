import { db } from './firebaseConfig';
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc, query, where } from "firebase/firestore";
import { User } from './types';

// Clés pour le LocalStorage (Fallback)
const LOCAL_USERS_KEY = 'infini_users_db';
const LOCAL_PROJECTS_KEY = 'infini_projects_v4';

// --- GESTION UTILISATEURS ---

export const saveUser = async (user: User & { password?: string }) => {
    if (db) {
        // Mode CLOUD (Firebase)
        try {
            await addDoc(collection(db, "users"), user);
            return true;
        } catch (e) {
            console.error("Erreur saveUser Firebase:", e);
            return false;
        }
    } else {
        // Mode LOCAL
        const users = JSON.parse(localStorage.getItem(LOCAL_USERS_KEY) || '[]');
        const filtered = users.filter((u: any) => u.email !== user.email);
        localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify([...filtered, user]));
        return true;
    }
};

export const getUser = async (email: string): Promise<(User & { password?: string }) | null> => {
    if (db) {
        // Mode CLOUD
        try {
            const q = query(collection(db, "users"), where("email", "==", email));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                return querySnapshot.docs[0].data() as User;
            }
            return null;
        } catch (e) {
            console.error("Erreur getUser Firebase:", e);
            return null;
        }
    } else {
        // Mode LOCAL
        const users = JSON.parse(localStorage.getItem(LOCAL_USERS_KEY) || '[]');
        return users.find((u: any) => u.email === email) || null;
    }
};

// --- GESTION PROJETS ---

export const saveProject = async (project: any) => {
    if (db) {
        try {
            await addDoc(collection(db, "projects"), project);
        } catch (e) { console.error(e); }
    } else {
        const projects = JSON.parse(localStorage.getItem(LOCAL_PROJECTS_KEY) || '[]');
        localStorage.setItem(LOCAL_PROJECTS_KEY, JSON.stringify([project, ...projects]));
    }
};

export const getProjects = async (): Promise<any[]> => {
    if (db) {
        try {
            const querySnapshot = await getDocs(collection(db, "projects"));
            return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // ID Firebase est un string
        } catch (e) {
            console.error(e);
            return [];
        }
    } else {
        return JSON.parse(localStorage.getItem(LOCAL_PROJECTS_KEY) || '[]');
    }
};

export const updateProjectStatus = async (id: string | number, step: string, progress: number) => {
    if (db) {
        try {
            // Note: ID doit être string pour Firebase
            const projectRef = doc(db, "projects", String(id));
            await updateDoc(projectRef, { step, progress });
        } catch (e) { console.error(e); }
    } else {
        const projects = JSON.parse(localStorage.getItem(LOCAL_PROJECTS_KEY) || '[]');
        const updated = projects.map((p: any) => p.id === id ? { ...p, step, progress } : p);
        localStorage.setItem(LOCAL_PROJECTS_KEY, JSON.stringify(updated));
    }
};

export const deleteProject = async (id: string | number) => {
    if (db) {
        try {
            await deleteDoc(doc(db, "projects", String(id)));
        } catch (e) { console.error(e); }
    } else {
        const projects = JSON.parse(localStorage.getItem(LOCAL_PROJECTS_KEY) || '[]');
        const filtered = projects.filter((p: any) => p.id !== id);
        localStorage.setItem(LOCAL_PROJECTS_KEY, JSON.stringify(filtered));
    }
};
