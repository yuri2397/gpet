import { Component, Input, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Notification } from 'src/app/models/shared.model';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  @Input('notification') notification!: Notification;

  ngOnInit(): void {
    console.log(this.notification);
  }

  constructor(private ref: NzModalRef) {}

  close(data: any) {
    this.ref.destroy(data);
  }

  downloadFacture() {
    this.close({ download: true });
  }

}
