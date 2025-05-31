import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BooksListComponent } from './components/books-list/books-list.component';

const routes: Routes = [
  {
    path: '',
    component: BooksListComponent
  }
];

@NgModule({
  declarations: [
    BooksListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class BooksModule { } 