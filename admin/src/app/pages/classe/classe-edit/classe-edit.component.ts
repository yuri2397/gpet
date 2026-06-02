import { ModalRef, MODAL_DATA } from 'src/app/shared/services/modal.service';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Classe } from 'src/app/models/classe';
import { Departement } from 'src/app/models/departement';
import { ClasseService } from 'src/app/services/classe.service';
import { NotificationService } from 'src/app/services/notification.service';
import { IconComponent } from 'src/app/shared/ui/icon/icon.component';

@Component({
  selector: 'app-classe-edit',
  standalone: true,
  imports: [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  IconComponent,
  ],
  templateUrl: './classe-edit.component.html',
  styleUrls: ['./classe-edit.component.scss'],
})
export class ClasseEditComponent implements OnInit {
  classe!: Classe;
  departement!: Departement;
  validateForm!: FormGroup;
  isLoad: boolean = false;

  private notification = inject(NotificationService);
  private fb = inject(FormBuilder);
  private modal = inject(ModalRef);
  private classeService = inject(ClasseService);
  private modalData = inject(MODAL_DATA, { optional: true });

  ngOnInit(): void {
    if (this.modalData) {
      this.classe = this.modalData.classe;
      this.departement = this.modalData.departement;
    }
    this.classe.departement_id = this.departement.id;
    this.validateForm = this.fb.group({
      name: [null, [Validators.required, Validators.min(2)]],
      nb_etudiants: [null, [Validators.required]],
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
  }

  destroyModal(data: Classe | null): void {
    this.modal.destroy(data);
  }

  save() {
    this.isLoad = true;
    this.classeService.edit(this.classe).subscribe({
      next: (response) => {
        this.isLoad = false;
        this.notification.createNotification(
          'success',
          'Notification',
          'Classe modifiée avec succés.',
        );
        this.destroyModal(response);
      },
      error: (errors) => {
        this.isLoad = false;
        this.notification.createNotification(
          'error',
          'Erreur',
          errors.error.message
        );
        this.destroyModal(null);
      },
    });
  }
}
