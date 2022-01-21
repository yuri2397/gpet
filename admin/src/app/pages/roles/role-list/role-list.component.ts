import { NzNotificationService } from 'ng-zorro-antd/notification';
import { RoleService } from './../../../services/role.service';
import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss'],
})
export class RoleListComponent implements OnInit {
  roles!: Role[];
  isLoad: boolean = false;
  constructor(private roleService: RoleService, 
      private notification: NzNotificationService
    ) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.isLoad = true;
    this.roleService.findAll().subscribe({
      next: (response) => {
        this.roles = response;
        console.log(this.roles);
        
        this.isLoad = false;
      },
      error: (errors) => {
        console.log(errors);
        this.notification.error("Notification", errors.error.message)
      },
    });
  }
}
