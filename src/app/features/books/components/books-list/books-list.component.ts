import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
  books = [
    {
      title: 'Тестовая книга',
      author: 'Автор Тестович',
      description: 'Описание тестовой книги...',
      thumbnail: 'https://via.placeholder.com/128x192'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  toggleDescription(book: any): void {
    book.showFullDescription = !book.showFullDescription;
  }

  addToFavorites(book: any): void {
    console.log('Добавлено в избранное:', book);
  }
} 