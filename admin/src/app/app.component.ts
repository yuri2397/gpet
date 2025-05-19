import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Notification } from './models/shared.model';
import { CoreLoadingScreenService } from './services/loading-screen.service';
import { NotificationService } from './services/notification.service';
import { NotificationComponent } from './shared/ui/notification/notification.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public version: string = "2.0.1";

  constructor(
    private _coreLoadingScreenService: CoreLoadingScreenService,
    private notification: NotificationService, private modal: NzModalService){
    this.notification.notification$.subscribe((data: Notification) => {
      this.showModal(data);
    });
  }
  private showModal(data: Notification) {
    this.modal.create({
      nzTitle: '',
      nzContent: NotificationComponent,
      nzCentered: true,
      nzFooter: null,
      nzComponentParams: {
        notification: data
      },
      nzClosable: false,
      nzBodyStyle:{
        padding: '0px'
      }
      
    })
  }
}
