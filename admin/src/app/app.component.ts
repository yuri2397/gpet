import { RouterModule, RouterOutlet } from '@angular/router';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Notification } from './models/shared.model';
import { NotificationService } from './services/notification.service';
import { NotificationComponent } from './shared/ui/notification/notification.component';
import { ModalService } from './shared/services/modal.service';
import { ToastContainerComponent } from './shared/ui/toast/toast-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    ToastContainerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly version = '2.0.1';
  private notification = inject(NotificationService);
  private modalService = inject(ModalService);

  constructor() {
    this.notification.notification$.subscribe((data: Notification) => {
      this.showModal(data);
    });
  }

  private showModal(data: Notification) {
    this.modalService.open({
      title: '',
      component: NotificationComponent,
      data: { notification: data },
    });
  }
}
