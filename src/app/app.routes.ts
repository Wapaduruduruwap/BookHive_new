import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'profile',
    loadChildren: () => import('./features/profile/profile-module').then(m => m.ProfileModule)
  }
];
