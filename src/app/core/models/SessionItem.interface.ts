export interface SessionItem {
  id: string;
  title: string;
  image?: string; 
  description?: string;
  category: string;
  city?: string;
  date: string;
  status: 'borrador' | 'bloqueado' | 'oculto' | string;
}
