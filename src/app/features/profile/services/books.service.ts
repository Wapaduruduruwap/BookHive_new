import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface IBook {
  title: string;
  authors: string[];
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private readonly apiUrl = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private readonly _http: HttpClient) {}

  public searchBooks(query: string): Observable<IBook[]> {
    if (!query.trim()) {
      return new Observable(subscriber => subscriber.next([]));
    }

    return this._http
      .get<any>(`${this.apiUrl}?q=${encodeURIComponent(query)}`)
      .pipe(
        map(response => {
          if (!response.items) {
            return [];
          }

          return response.items.map((item: any) => ({
            id: item.id,
            title: item.volumeInfo.title,
            authors: item.volumeInfo.authors || ['Автор не указан']
          }));
        })
      );
  }
} 