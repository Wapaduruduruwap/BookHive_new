import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Review } from '../models/review.interface';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  private readonly STORAGE_KEY = 'bookHiveReviews';
  private reviewsSubject = new BehaviorSubject<Review[]>([]);

  constructor() {
    this.loadReviews();
  }

  private loadReviews(): void {
    const storedReviews = localStorage.getItem(this.STORAGE_KEY);
    if (storedReviews) {
      const reviews = JSON.parse(storedReviews).map((review: any) => ({
        ...review,
        createdAt: new Date(review.createdAt)
      }));
      this.reviewsSubject.next(reviews);
    }
  }

  private saveReviews(reviews: Review[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(reviews));
    this.reviewsSubject.next(reviews);
  }

  getReviews(): Observable<Review[]> {
    return this.reviewsSubject.asObservable();
  }

  addReview(review: Omit<Review, 'id' | 'createdAt'>): void {
    const newReview: Review = {
      ...review,
      id: Date.now().toString(),
      createdAt: new Date()
    };

    const currentReviews = this.reviewsSubject.value;
    this.saveReviews([newReview, ...currentReviews]);
  }
} 