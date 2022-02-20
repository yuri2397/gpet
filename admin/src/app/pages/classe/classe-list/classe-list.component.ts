import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { find } from 'rxjs/operators';
import { Classe } from 'src/app/models/classe';
import { Departement } from 'src/app/models/departement';
import { Permission } from 'src/app/models/permission';
import { ClasseService } from 'src/app/services/classe.service';
import { DepartementService } from 'src/app/services/departement.service';
import { NotificationService } from 'src/app/services/notification.service';
import { DepartementCreateComponent } from '../../departement/departement-create/departement-create.component';
import { ClasseCreateComponent } from '../classe-create/classe-create.component';
import { ClasseEditComponent } from '../classe-edit/classe-edit.component';

@Component({
  selector: 'app-classe-list',
  templateUrl: './classe-list.component.html',
  styleUrls: ['./classe-list.component.scss'],
})
export class ClasseListComponent implements OnInit {
  @Input() departement!: Departement;
  @Input() setView!: boolean;
  @Input() classes!: Classe[];
  deleteRestoRef!: NzModalRef;
  isLoad = true;
  deleteLoad = false;

  constructor(
    private notification: NotificationService,
    private modalService: NzModalService,
    public classeService: ClasseService
  ) {}

  ngOnInit(): void {
    this.find();
  }

  find() {
    if (this.setView) {
      this.findByDepartement();
    } else {
      this.departement = this.classeService.departement();
      this.selectClasses();
    }
  }

  selectClasses() {
    this.isLoad = true;
    this.classeService.selectClasses().subscribe({
      next: (response) => {
        this.classes = response;
        this.isLoad = false;
      },
      error: (errors) => {
        console.log(errors);
      },
    });
  }

  findByDepartement() {
    this.isLoad = true;
    this.classeService.findByDepartement(this.departement.id).subscribe({
      next: (response) => {
        this.classes = response;
        this.departement.classes = this.classes;
        this.isLoad = false;
      },
      error: (errors) => {
        this.isLoad = false;
        this.notification.createNotification(
          'error',
          'Erreur',
          errors.error.message
        );
      },
    });
  }

  openEditModal(classe: Classe) {
    const modal = this.modalService.create({
      nzTitle: 'Modifier les informations de la classe',
      nzContent: ClasseEditComponent,
      nzComponentParams: {
        classe: this.classeService.clone(classe),
        departement: this.departement,
      },
      nzCentered: true,
      nzMaskClosable: false,
      nzClosable: false,
    });

    modal.afterClose.subscribe((data: Classe | null) => {
      if (data != null) {
        this.find();
      }
    });
  }

  openCreateModal() {
    const modal = this.modalService.create({
      nzTitle: 'Ajouter une classe',
      nzContent: ClasseCreateComponent,
      nzComponentParams: {
        departement: this.departement,
      },
      nzCentered: true,
      nzMaskClosable: false,
      nzClosable: false,
      nzWidth: '400px',
    });

    modal.afterClose.subscribe((data: Classe | null) => {
      if (data != null) {
        this.find();
      }
    });
  }

  openDeleteModal(classe: Classe) {
    this.deleteRestoRef = this.modalService.confirm({
      nzTitle: '<span>Voulez-vous supprimé cette classe?</span>',
      nzOkText: 'Supprimer',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteClasse(classe),
      nzCancelText: 'Annuler',
      nzOkLoading: this.deleteLoad,
      nzMaskClosable: false,
      nzClosable: false,
    });
  }

  deleteClasse(classe: Classe) {
    this.deleteLoad = true;
    this.classeService.delete(classe).subscribe({
      next: (response) => {
        this.deleteRestoRef.destroy();
        this.find();
        this.deleteLoad = false;
      },
      error: (errors) => {
        this.isLoad = false;
        this.notification.createNotification(
          'error',
          'Erreur',
          errors.error.message
        );
      },
    });
  }

  can(permission: string) {
    let p = new Permission();
    p.name = permission;
    let test = this.classeService.can(p, this.classeService.getPermissions());
    return test;
  }
}
