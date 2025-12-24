export interface SessionFilters {
  category?: string[];
  status?: string[];
  month: string;
}

export interface SessionItem {
  id: string;
  title: string;
  description: string;
  category: 'Formación' | 'Reunión' | 'Demo';
  city: string;
  date: string;
  status: 'Borrador' | 'Bloqueado' | 'Oculto';
  image?: string; 
}
