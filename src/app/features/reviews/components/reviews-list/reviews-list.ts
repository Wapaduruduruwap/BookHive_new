import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { ReviewsService } from '../../services/reviews.service';
import { Review } from '../../models/review.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reviews-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatCardModule,
    MatDialogModule
  ],
  templateUrl: './reviews-list.html',
  styleUrls: ['./reviews-list.scss']
})
export class ReviewsListComponent implements OnInit {
  reviews: Review[] = [];

  constructor(
    private reviewsService: ReviewsService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  // При инициализации компонента подписываемся на обновления списка рецензий
  ngOnInit(): void {
    this.reviewsService.getReviews().subscribe(reviews => {
      this.reviews = reviews;
    });
  }

  getStarsArray(rating: number): number[] {
    return Array(rating).fill(0);
  }

  getEmptyStarsArray(rating: number): number[] {
    return Array(5 - rating).fill(0);
  }

  editReview(review: Review): void {
    this.router.navigate(['/reviews/add'], { state: { review } });
  }

  deleteReview(review: Review): void {
    const confirmDelete = window.confirm('Вы уверены, что хотите удалить эту рецензию?');
    if (confirmDelete) {
      this.reviewsService.deleteReview(review.id);
    }
  }
}
