import { Routes } from '@angular/router';
import { ProfileComponent } from './features/profile/components/profile/profile';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'profile',
    pathMatch: 'full'
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'books',
    loadChildren: () => import('./features/books/books.module').then(m => m.BooksModule)
  },
  {
    path: 'reviews',
    loadChildren: () => import('./features/reviews/reviews.routes').then(m => m.REVIEWS_ROUTES)
  }
];
