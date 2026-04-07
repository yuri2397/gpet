import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
  CommonModule,
  ],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  private authService = inject(AuthService);

  ngOnInit(): void {
    setTimeout(() => {
      this.authService.alreadyConnect();
    }, 3000);
  }
}
