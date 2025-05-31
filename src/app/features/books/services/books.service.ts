import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Book, GoogleBooksResponse } from '../models/book.interface';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  // API ключ и базовый URL
  private readonly API_KEY = 'AIzaSyA7P9sJr511JKNVfmIGc84cWSOXV-wCX_E';
  private readonly BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) { }

  /**
   * Поиск книг по запросу
   * @param query - поисковый запрос
   * @param maxResults - максимальное количество результатов (по умолчанию 12)
   */
  searchBooks(query: string, maxResults: number = 12): Observable<Book[]> {
    // Формируем параметры запроса
    const params = new HttpParams()
      .set('q', query)
      .set('maxResults', maxResults.toString())
      .set('key', this.API_KEY);

    // Выполняем запрос и преобразуем ответ
    return this.http.get<GoogleBooksResponse>(this.BASE_URL, { params })
      .pipe(
        map(response => response.items || [])
      );
  }

  /**
   * Получение информации о конкретной книге по ID
   * @param bookId - идентификатор книги
   */
  getBookById(bookId: string): Observable<Book> {
    return this.http.get<Book>(`${this.BASE_URL}/${bookId}?key=${this.API_KEY}`);
  }

  /**
   * Поиск книг по категории
   * @param category - категория для поиска
   * @param maxResults - максимальное количество результатов
   */
  getBooksByCategory(category: string, maxResults: number = 12): Observable<Book[]> {
    const params = new HttpParams()
      .set('q', `subject:${category}`)
      .set('maxResults', maxResults.toString())
      .set('key', this.API_KEY);

    return this.http.get<GoogleBooksResponse>(this.BASE_URL, { params })
      .pipe(
        map(response => response.items || [])
      );
  }

  /**
   * Получение популярных книг (на основе рейтинга)
   * @param maxResults - максимальное количество результатов
   */
  getPopularBooks(maxResults: number = 12): Observable<Book[]> {
    const params = new HttpParams()
      .set('q', 'orderBy=relevance')
      .set('maxResults', maxResults.toString())
      .set('key', this.API_KEY);

    return this.http.get<GoogleBooksResponse>(this.BASE_URL, { params })
      .pipe(
        map(response => response.items || [])
      );
  }
} 