import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ResultComponent } from '../result/result.component';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [CommonModule, ResultComponent],
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss'],
})
export class UnauthorizedComponent implements OnInit {
  private notification = inject(NotificationService);
  private location = inject(Location);

  ngOnInit(): void {
    this.notification.createNotification(
      'error',
      'Authorisation',
      "Vous n'avez pas les authorisations necessaire."
    );
  }

  back() {
    this.location.back();
  }
}
