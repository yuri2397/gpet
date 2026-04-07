import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Professor } from './../../../models/professor';
import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Batiment } from 'src/app/models/batiment';
import { NotificationService } from 'src/app/services/notification.service';
import { ProfessorService } from 'src/app/services/professor.service';
import { ProfesseurEditComponent } from '../professeur-edit/professeur-edit.component';
import { ProfesseurCreateComponent } from '../professeur-create/professeur-create.component';
import { AuthStore } from 'src/app/shared/auth-store';
import { IconComponent } from 'src/app/shared/ui/icon/icon.component';
import { ModalService, ModalRef } from 'src/app/shared/services/modal.service';
import { DataTableComponent } from 'src/app/shared/ui/data-table/data-table.component';

@Component({
  selector: 'app-professeur-list',
  standalone: true,
  imports: [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  IconComponent,
  DataTableComponent,
  ],
  templateUrl: './professeur-list.component.html',
  styleUrls: ['./professeur-list.component.scss'],
})
export class ProfesseurListComponent implements OnInit {
  private router = inject(Router);
  private notification = inject(NotificationService);
  private modalService = inject(ModalService);
  private profService = inject(ProfessorService);
  private authStore = inject(AuthStore);

  @Input() professeurs!: Professor[];
  @Input() setView!: boolean;
  selectedProfessor!: Professor;
  isLoad = signal(false);
  deleteRestoRef!: ModalRef;
  deleteLoad!: boolean;
  searchValue = signal('');
  visible = signal(false);
  listOfDisplayData = signal<Professor[]>([]);

  ngOnInit(): void {
    if (this.professeurs == null) {
      this.findAll();
    } else {
      this.listOfDisplayData.set(this.professeurs);
    }
  }

  findAll() {
    this.isLoad.set(true);
    this.profService.findAll().subscribe({
      next: (professeurs) => {
        this.professeurs = professeurs;
        this.listOfDisplayData.set(professeurs);
        this.isLoad.set(false);
      },
      error: (errors) => {
        this.isLoad.set(false);
      },
    });
  }

  onChercherInputChange(data: any){
  }

  openDeleteModal(professeur: Professor) {
    this.deleteRestoRef = this.modalService.confirm({
      title: 'Voulez-vous supprimé ce département?',
      okText: 'Supprimer',
      okDanger: true,
      onOk: () => this.deleteProfessor(professeur),
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
        this.deleteRestoRef.close();
      },
      error: (errors) => {
        this.deleteLoad = false;
        this.notification.createNotification(
          'error',
          'Notification',
          errors.error.message
        );
        this.deleteRestoRef.close();
      },
    });
  }

  openCreateModal() {
    const modal = this.modalService.open({
      title: 'AJOUTER UN NOUVEAU PROFESSEUR',
      component: ProfesseurCreateComponent,
      data: {},
    });

    modal.afterClosed$.subscribe((data: Batiment | null) => {
      if (data != null) {
        this.findAll();
      }
    });
  }

  reset(): void {
    this.searchValue.set('');
    this.search();
  }

  search(): void {
    this.visible.set(false);
    const sv = this.searchValue().toLocaleLowerCase();
    this.listOfDisplayData.set(this.professeurs.filter((item: Professor) => {
      return (
        item.registration_number.indexOf(sv) !== -1 ||
        item.first_name.toLocaleLowerCase().indexOf(sv) !== -1 ||
        item.last_name.toLocaleLowerCase().indexOf(sv) !== -1 ||
        item.email.toLocaleLowerCase().indexOf(sv) !== -1
      );
    }));
  }

  showProfessor(professeur: Professor) {
    this.router.navigate(['/admin/professeurs/show/' + professeur.id]);
  }

  can(permission: string) {
    return this.authStore.hasPermission(permission);
  }
}
