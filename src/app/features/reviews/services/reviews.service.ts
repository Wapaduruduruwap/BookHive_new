import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Review } from '../models/review.interface';

/**
 * Сервис для управления рецензиями на книги
 * Обеспечивает хранение рецензий в localStorage и их синхронизацию между компонентами
 */
@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  //Ключ для хранения рецензий в localStorage 
  private readonly STORAGE_KEY = 'bookHiveReviews';
  //Subject для хранения и обновления списка рецензий 
  private reviewsSubject = new BehaviorSubject<Review[]>([]);

  constructor() {
    this.loadReviews();
  }

  /**
   * Загружает рецензии из localStorage при инициализации сервиса
   * Преобразует даты из строк обратно в объекты Date
   */
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

  //Сохраняет рецензии в localStorage и обновляет Subject
  private saveReviews(reviews: Review[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(reviews));
    this.reviewsSubject.next(reviews);
  }

  /**
   * Возвращает Observable со списком рецензий
   * Используется компонентами для подписки на обновления списка рецензий
   */
  getReviews(): Observable<Review[]> {
    return this.reviewsSubject.asObservable();
  }

  getReviewById(id: string): Review | undefined {
    return this.reviewsSubject.value.find(review => review.id === id);
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

  updateReview(id: string, review: Omit<Review, 'id' | 'createdAt'>): void {
    const currentReviews = this.reviewsSubject.value;
    const index = currentReviews.findIndex(r => r.id === id);
    
    if (index !== -1) {
      const updatedReview: Review = {
        ...review,
        id,
        createdAt: currentReviews[index].createdAt
      };
      
      const newReviews = [...currentReviews];
      newReviews[index] = updatedReview;
      this.saveReviews(newReviews);
    }
  }

  deleteReview(id: string): void {
    const currentReviews = this.reviewsSubject.value;
    const filteredReviews = currentReviews.filter(review => review.id !== id);
    this.saveReviews(filteredReviews);
  }
} 