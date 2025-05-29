import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileModule } from './features/profile/profile-module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProfileModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'BookHive';
}
