import { Routes } from '@angular/router';
import { ReviewsListComponent } from './components/reviews-list/reviews-list';
import { AddReviewComponent } from './components/add-review/add-review';

export const REVIEWS_ROUTES: Routes = [
  {
    path: '',
    component: ReviewsListComponent
  },
  {
    path: 'add',
    component: AddReviewComponent
  }
]; 