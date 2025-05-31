// Интерфейс для информации о продаже книги
export interface SaleInfo {
  country: string;
  saleability: string;
  isEbook: boolean;
  listPrice?: {
    amount: number;
    currencyCode: string;
  };
}

// Интерфейс для изображений книги
export interface BookImages {
  smallThumbnail?: string;
  thumbnail?: string;
  small?: string;
  medium?: string;
  large?: string;
  extraLarge?: string;
}

// Интерфейс для информации о книге
export interface BookVolumeInfo {
  title: string;
  subtitle?: string;
  authors?: string[];
  publisher?: string;
  publishedDate?: string;
  description?: string;
  pageCount?: number;
  categories?: string[];
  averageRating?: number;
  ratingsCount?: number;
  imageLinks?: BookImages;
  language?: string;
  previewLink?: string;
  infoLink?: string;
}

// Основной интерфейс книги
export interface Book {
  id: string;
  volumeInfo: BookVolumeInfo;
  saleInfo?: SaleInfo;
  // Дополнительные поля для нашего приложения
  isFavorite?: boolean;
  showFullDescription?: boolean;
}

// Интерфейс для ответа от Google Books API
export interface GoogleBooksResponse {
  kind: string;
  totalItems: number;
  items: Book[];
} 