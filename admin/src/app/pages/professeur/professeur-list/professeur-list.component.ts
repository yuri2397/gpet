import { Professor } from './../../../models/professor';
import { Component, Input, OnInit } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Batiment } from 'src/app/models/batiment';
import { NotificationService } from 'src/app/services/notification.service';
import { ProfessorService } from 'src/app/services/professor.service';
import { ProfesseurEditComponent } from '../professeur-edit/professeur-edit.component';
import { ProfesseurCreateComponent } from '../professeur-create/professeur-create.component';
import { Router } from '@angular/router';
import { Permission } from 'src/app/models/permission';

@Component({
  selector: 'app-professeur-list',
  templateUrl: './professeur-list.component.html',
  styleUrls: ['./professeur-list.component.scss'],
})
export class ProfesseurListComponent implements OnInit {
  @Input() professeurs!: Professor[];
  @Input() setView!: boolean;
  selectedProfessor!: Professor;
  isLoad = false;
  deleteRestoRef!: NzModalRef;
  deleteLoad!: boolean;
  searchValue = '';
  visible = false;
  listOfDisplayData!: Professor[];
  constructor(
    private router: Router,
    private notification: NotificationService,
    private modalService: NzModalService,
    private profService: ProfessorService
  ) {}

  ngOnInit(): void {
    if (this.professeurs == null) {
      this.findAll();
    } else {
      this.listOfDisplayData = this.professeurs;
    }
  }

  findAll() {
    this.isLoad = true;
    this.profService.findAll().subscribe({
      next: (professeurs) => {
        this.professeurs = professeurs;
        this.listOfDisplayData = professeurs;
        this.isLoad = false;
      },
      error: (errors) => {
        this.isLoad = false;
      },
    });
  }

  onChercherInputChange(data: any){
  }

  openDeleteModal(professeur: Professor) {
    this.deleteRestoRef = this.modalService.confirm({
      nzTitle: '<span>Voulez-vous supprimé ce département?</span>',
      nzOkText: 'Supprimer',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteProfessor(professeur),
      nzCancelText: 'Annuler',
      nzOkLoading: this.deleteLoad,
      nzMaskClosable: false,
      nzClosable: false,
    });
  }

  deleteProfessor(professeur: Professor) {
    this.deleteLoad = true;
    this.profService.delete(professeur).subscribe({
      next: (_) => {
        this.deleteLoad = false;
        this.notification.createNotification(
          'success',
          'Notification',
          'Dépatement supprimé avec succès.'
        );
        this.findAll();
        this.deleteRestoRef.destroy();
      },
      error: (errors) => {
        this.deleteLoad = false;
        this.notification.createNotification(
          'error',
          'Notification',
          errors.error.message
        );
        this.deleteRestoRef.destroy();
      },
    });
  }

  openCreateModal() {
    const modal = this.modalService.create({
      nzTitle: 'AJOUTER UN NOUVEAU PROFESSEUR',
      nzContent: ProfesseurCreateComponent,
      nzCentered: true,
      nzMaskClosable: false,
      nzClosable: false,
      nzWidth: '60em',
    });

    modal.afterClose.subscribe((data: Batiment | null) => {
      if (data != null) {
        this.findAll();
      }
    });
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.professeurs.filter((item: Professor) => {
      return (
        item.registration_number.indexOf(this.searchValue) !== -1 ||
        item.first_name.indexOf(this.searchValue) !== -1 ||
        item.last_name.indexOf(this.searchValue) !== -1 ||
        item.email.indexOf(this.searchValue) !== -1
      );
    });
  }

  showProfessor(professeur: Professor) {
    this.router.navigate(['/admin/professeurs/show/' + professeur.id]);
  }

  can(permission: string){
    let p = new Permission();
    p.name = permission;
    let test = this.profService.can(p, this.profService.getPermissions());
    return test;
  }
}
