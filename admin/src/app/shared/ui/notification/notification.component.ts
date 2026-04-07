import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Notification } from 'src/app/models/shared.model';
import { MODAL_DATA, ModalRef } from '../../services/modal.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  private ref = inject(ModalRef);
  private modalData = inject(MODAL_DATA);

  notification!: Notification;

  ngOnInit(): void {
    this.notification = this.modalData.notification;
  }

  close(data: any) {
    this.ref.destroy(data);
  }

  downloadFacture() {
    this.close({ download: true });
  }
}
