export interface Book {
  id: string;
  title: string;
  authors: string[];
  thumbnail?: string;
  description?: string;
  publishedDate?: string;
  readDate?: Date;
  rating?: number;
} 