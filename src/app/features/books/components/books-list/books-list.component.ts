import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BooksService } from '../../services/books.service';
import { Book } from '../../models/book.interface';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ]
})
export class BooksListComponent implements OnInit {
  books: Book[] = [];
  isLoading = false;
  error: string | null = null;

  constructor(private booksService: BooksService) { }

  ngOnInit(): void {
    this.loadPopularBooks();
  }

  // Загрузка популярных книг при инициализации
  loadPopularBooks(): void {
    this.isLoading = true;
    this.error = null;

    this.booksService.getPopularBooks()
      .pipe(
        catchError(error => {
          this.error = 'Произошла ошибка при загрузке книг. Пожалуйста, попробуйте позже.';
          return of([]);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(books => {
        this.books = books.map(book => ({
          ...book,
          showFullDescription: false,
          isFavorite: false
        }));
      });
  }

  // Поиск книг по запросу
  searchBooks(query: string): void {
    if (!query.trim()) {
      this.loadPopularBooks();
      return;
    }

    this.isLoading = true;
    this.error = null;

    this.booksService.searchBooks(query)
      .pipe(
        catchError(error => {
          this.error = 'Произошла ошибка при поиске книг. Пожалуйста, попробуйте позже.';
          return of([]);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(books => {
        this.books = books.map(book => ({
          ...book,
          showFullDescription: false,
          isFavorite: false
        }));
      });
  }

  // Переключение отображения полного описания книги
  toggleDescription(book: Book): void {
    book.showFullDescription = !book.showFullDescription;
  }

  // Добавление книги в избранное
  addToFavorites(book: Book): void {
    book.isFavorite = !book.isFavorite;
    // Здесь можно добавить логику сохранения в localStorage или на сервере
    console.log(book.isFavorite ? 'Добавлено в избранное:' : 'Удалено из избранного:', book);
  }

  // Получение URL обложки книги
  getBookCover(book: Book): string {
    return book.volumeInfo.imageLinks?.thumbnail || 'assets/images/book-placeholder.png';
  }
} 