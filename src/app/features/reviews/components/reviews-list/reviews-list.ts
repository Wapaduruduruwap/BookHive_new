import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { ReviewsService } from '../../services/reviews.service';
import { Review } from '../../models/review.interface';

@Component({
  selector: 'app-reviews-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatCardModule
  ],
  templateUrl: './reviews-list.html',
  styleUrls: ['./reviews-list.scss']
})
export class ReviewsListComponent implements OnInit {
  reviews: Review[] = [];

  constructor(private reviewsService: ReviewsService) {}

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
}
