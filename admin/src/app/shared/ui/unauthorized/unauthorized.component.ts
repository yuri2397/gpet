import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Location } from '@angular/common';


@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss'],
})
export class UnauthorizedComponent implements OnInit {
  constructor(private notification: NzNotificationService,

    private location: Location
    ) {}

  ngOnInit(): void {
    this.notification.create(
      'error',
      'Authorisation',
      "Vous n'avez pas les authorisations necessaire."
    );
  }

  back(){
    this.location.back();
  }
}
