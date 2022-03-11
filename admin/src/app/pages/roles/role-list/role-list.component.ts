import { Permission } from 'src/app/models/permission';
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
  searchValue = '';
  visible = false;
  listOfDisplayData!: Permission[];
  currentPermissions!: Permission[];
  allIsLoad: boolean = false;

  constructor(private roleService: RoleService, 
      private notification: NzNotificationService
    ) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.allIsLoad = true;
    this.roleService.findAll().subscribe({
      next: (response) => {
        this.listOfDisplayData = response[0].permissions;
        this.currentPermissions = response[0].permissions;
        this.roles = response;
        this.allIsLoad = false;
      },
      error: (errors) => {
        this.notification.error("Notification", errors.error.message);
      },
    });
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.currentPermissions.filter((item: Permission) => {
      return (
        item.name.indexOf(this.searchValue) !== -1
      );
    });
  }

  tabChange(item: Role)
  {
    this.currentPermissions = item.permissions;
    this.listOfDisplayData = item.permissions;
  }

  openCreateModal(role: Role){
    
  }

  deletePermissionForRole(permission: Permission, role: Role){
    this.isLoad = true;
    this.roleService.deletePermissionToRole(role, permission).subscribe({
      next: response => {
        this.findAll();
        this.isLoad = false;
      },
      error: errors => {
      }
    })
  }
}
