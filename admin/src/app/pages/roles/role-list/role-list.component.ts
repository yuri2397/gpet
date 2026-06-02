import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Permission } from 'src/app/models/permission';
import { RoleService } from './../../../services/role.service';
import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Role } from 'src/app/models/role';
import { RouterModule } from '@angular/router';
import { IconComponent } from 'src/app/shared/ui/icon/icon.component';
import { DataTableComponent } from 'src/app/shared/ui/data-table/data-table.component';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-role-list',
  standalone: true,
  imports: [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  IconComponent,
  DataTableComponent,
  ],
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss'],
})
export class RoleListComponent implements OnInit {
  private roleService = inject(RoleService);
  private modalService = inject(ModalService);

  roles!: Role[];
  isLoad: boolean = false;
  searchValue = '';
  visible = false;
  listOfDisplayData!: Permission[];
  currentPermissions!: Permission[];
  allIsLoad: boolean = false;
  activeTabIndex = signal(0);

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

  tabChange(item: Role, index: number) {
    this.activeTabIndex.set(index);
    this.currentPermissions = item.permissions;
    this.listOfDisplayData = item.permissions;
  }

  openCreateModal(role: Role) {
  }

  deletePermissionForRole(permission: Permission, role: Role) {
    this.modalService.confirm({
      title: 'Confirmation',
      content: 'Confirmer votre action.',
      okText: 'Confirmer',
      okDanger: true,
      onOk: () => {
        this.isLoad = true;
        this.roleService.deletePermissionToRole(role, permission).subscribe({
          next: response => {
            this.findAll();
            this.isLoad = false;
          },
          error: errors => {
            this.isLoad = false;
          }
        });
      },
    });
  }
}
