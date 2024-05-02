export interface Post {
    id: number;
    content: string;
    is_purged: boolean;
    user_id: number;
    purge_id?: number | null; // El campo purge_id es opcional (puede ser nulo), así que se define como number | null
    created_at: Date; 
    updated_at: Date; 
    likeados: number;
  }