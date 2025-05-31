import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// Временный интерфейс для тестовых данных
interface TestBook {
  title: string;
  author: string;
  description: string;
  thumbnail: string;
  showFullDescription: boolean;
}

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class BooksListComponent implements OnInit {
  // Временные данные для тестирования отображения
  books: TestBook[] = [
    {
      title: 'Тестовая книга',
      author: 'Автор Тестович',
      description: 'Описание тестовой книги... '.repeat(10), // Делаем длинное описание для теста
      thumbnail: 'https://via.placeholder.com/128x192',
      showFullDescription: false
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  //Переключает отображение полного описания книги
  toggleDescription(book: TestBook): void {
    book.showFullDescription = !book.showFullDescription;
  }

  // Метод для добавления книги в избранное
  addToFavorites(book: TestBook): void {
    // Здесь будет логика добавления в избранное
    console.log('Добавлено в избранное:', book);
  }
} 