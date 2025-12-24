export interface SessionFilters {
  category?: string[];
  status?: string[];
  month: string;
}

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
