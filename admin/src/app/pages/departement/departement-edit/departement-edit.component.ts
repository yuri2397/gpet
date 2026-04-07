import { ModalRef, MODAL_DATA } from 'src/app/shared/services/modal.service';
import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Departement } from 'src/app/models/departement';
import { DepartementService } from 'src/app/services/departement.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-departement-edit',
  standalone: true,
  imports: [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  ],
  templateUrl: './departement-edit.component.html',
  styleUrls: ['./departement-edit.component.scss'],
})
export class DepartementEditComponent implements OnInit {
  private notification = inject(NotificationService);
  private fb = inject(FormBuilder);
  private depService = inject(DepartementService);
  private modal = inject(ModalRef);
  private modalData = inject(MODAL_DATA, { optional: true });

  @Input()
  departement!: Departement;
  validateForm!: FormGroup;
  isLoad: boolean = false;

  ngOnInit(): void {
    if (this.modalData?.departement) {
      this.departement = this.modalData.departement;
    }
    this.validateForm = this.fb.group({
      name: [null, [Validators.required, Validators.min(2)]],
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

  destroyModal(data: Departement | null): void {
    this.modal.destroy(data);
  }

  edit() {
    this.isLoad = true;
    this.depService.edit(this.departement).subscribe({
      next: (response) => {
        this.isLoad = false;
        this.notification.createNotification(
          'success',
          'Notification',
          "Nom du batiment modifié avec succés.",
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
