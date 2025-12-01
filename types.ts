export enum UserType {
  PARTICULIER = 'Particulier',
  PME = 'PME'
}

export enum ServiceType {
  GRAPHIC_DESIGN = 'graphic_design',
  VIDEO = 'video',
  ASSISTANCE = 'assistance'
}

export enum ProjectStatus {
  WAITING_ELEMENTS = 'En attente de vos éléments',
  IN_PROGRESS = 'En cours de création',
  READY_FOR_VALIDATION = 'Prêt pour validation',
  COMPLETED = 'Terminé'
}

export interface Project {
  id: string;
  title: string;
  serviceType: ServiceType;
  status: ProjectStatus;
  date: string;
  price?: string;
  downloadUrl?: string; // Only for PME/Completed
}

export interface User {
  name: string;
  email: string;
  type: UserType;
  companyName?: string;
  phone: string;
}