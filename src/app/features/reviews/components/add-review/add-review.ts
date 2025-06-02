import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ReviewsService } from '../../services/reviews.service';

@Component({
  selector: 'app-add-review',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './add-review.html',
  styleUrls: ['./add-review.scss']
})
export class AddReviewComponent implements OnInit {
  reviewForm: FormGroup;
  stars: number[] = [1, 2, 3, 4, 5];
  hoveredRating: number | null = null;
  isEditMode = false;
  editingReviewId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private reviewsService: ReviewsService
  ) {
    this.reviewForm = this.fb.group({
      bookTitle: ['', Validators.required],
      author: ['', Validators.required],
      rating: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
      text: ['', Validators.required]
    });

    const navigation = this.router.getCurrentNavigation();
    const review = navigation?.extras?.state?.['review'];
    
    if (review) {
      this.isEditMode = true;
      this.editingReviewId = review.id;
      this.reviewForm.patchValue(review);
    }
  }

  ngOnInit(): void {}

  setRating(rating: number): void {
    const currentRating = this.reviewForm.get('rating')?.value;
    // Если кликнули по текущему рейтингу, сбрасываем его
    if (currentRating === rating) {
      this.reviewForm.patchValue({ rating: null });
    } else {
      this.reviewForm.patchValue({ rating });
    }
    this.reviewForm.get('rating')?.markAsTouched();
  }

  isStarActive(star: number): boolean {
    if (this.hoveredRating !== null) {
      return star <= this.hoveredRating;
    }
    const rating = this.reviewForm.get('rating')?.value;
    return rating !== null && star <= rating;
  }

  onStarHover(star: number): void {
    this.hoveredRating = star;
  }

  onStarLeave(): void {
    this.hoveredRating = null;
  }

  onSubmit(): void {
    if (this.reviewForm.valid) {
      if (this.isEditMode && this.editingReviewId) {
        this.reviewsService.updateReview(this.editingReviewId, this.reviewForm.value);
      } else {
        this.reviewsService.addReview(this.reviewForm.value);
      }
      this.router.navigate(['/reviews']);
    } else {
      this.markFormGroupTouched(this.reviewForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
