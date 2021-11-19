import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Classe } from 'src/app/models/classe';
import { Departement } from 'src/app/models/departement';
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
  classes!: Classe[];
  deleteRestoRef!: NzModalRef;
  isLoad = true;
  deleteLoad = false;
  constructor(
    private notification: NotificationService,
    private modalService: NzModalService,
    private depService: DepartementService,
    private classeService: ClasseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.departement != null) {
      this.classes = this.departement.classes;
      this.isLoad = false;
    } else {
      this.departement = this.classeService.getUser().departement;
      console.log('DEPARTEMENT', this.departement);
      this.findByDepartement();
    }
  }

  findAll() {
    this.classeService.findAll().subscribe({
      next: (response) => {
        this.departement = response;
        this.classes = this.departement.classes;
        console.log(response);

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
      nzWidth: '50em',
      nzMaskClosable: false,
      nzClosable: false,
    });

    modal.afterClose.subscribe((data: Classe | null) => {
      if (data != null) {
        this.findByDepartement();
      }
    });
  }

  openCreateModal() {
    const modal = this.modalService.create({
      nzTitle: 'Ajouter un département',
      nzContent: ClasseCreateComponent,
      nzComponentParams: {
        departement: this.departement,
      },
      nzCentered: true,
      nzMaskClosable: false,
      nzClosable: false,
    });

    modal.afterClose.subscribe((data: Classe | null) => {
      if (data != null) {
        this.findByDepartement();
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
        this.deleteLoad = false;
        this.deleteRestoRef.destroy();
        this.findByDepartement();
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
}
