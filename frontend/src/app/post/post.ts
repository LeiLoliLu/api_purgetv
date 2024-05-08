export interface Post {
    id: number;
    content: string;
    is_purged: boolean;
    user_id: number;
    purge_id: number | null;
    created_at: Date; 
    updated_at: Date; 
    likeados: number;
    files:any;
    user: any;
    purge:any;
  }