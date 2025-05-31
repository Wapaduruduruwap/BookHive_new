import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="app-container">
      <mat-toolbar color="primary" class="header">
        <span class="title">BookHive - платформа для книголюбов</span>
        <div class="nav-buttons">
          <a mat-button routerLink="/books" routerLinkActive="active">
            <mat-icon>library_books</mat-icon>
            Книги
          </a>
          <a mat-button routerLink="/profile" routerLinkActive="active">
            <mat-icon>person</mat-icon>
            Профиль
          </a>
        </div>
      </mat-toolbar>

      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      background-color: #f5f5f5;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 16px;
      position: sticky;
      top: 0;
      z-index: 1000;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .title {
      font-size: 1.2rem;
      font-weight: 500;
    }

    .nav-buttons {
      display: flex;
      gap: 8px;

      a {
        display: flex;
        align-items: center;
        gap: 4px;
        
        &.active {
          background-color: rgba(255, 255, 255, 0.1);
        }

        mat-icon {
          margin-right: 4px;
        }
      }
    }

    main {
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }

    @media (max-width: 600px) {
      .title {
        font-size: 1rem;
      }

      .nav-buttons {
        gap: 4px;
      }

      main {
        padding: 16px;
      }
    }
  `]
})
export class AppComponent {
  title = 'BookHive';
} 