import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BooksListComponent } from './components/books-list/books-list.component';

// Определяем маршруты для модуля книг
const routes: Routes = [
  {
    path: '',
    component: BooksListComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    BooksListComponent // Добавляем компонент в imports вместо declarations
  ]
})
export class BooksModule { } 