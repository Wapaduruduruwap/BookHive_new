import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-reviews-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './reviews-list.html',
  styleUrls: ['./reviews-list.scss']
})
export class ReviewsListComponent {
}
