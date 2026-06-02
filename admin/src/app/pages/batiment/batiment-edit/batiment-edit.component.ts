import { ModalRef, MODAL_DATA } from 'src/app/shared/services/modal.service';
import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Batiment } from 'src/app/models/batiment';
import { BatimentService } from 'src/app/services/batiment.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-batiment-edit',
  standalone: true,
  imports: [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  ],
  templateUrl: './batiment-edit.component.html',
  styleUrls: ['./batiment-edit.component.scss'],
})
export class BatimentEditComponent implements OnInit {
  private notification = inject(NotificationService);
  private fb = inject(FormBuilder);
  private batimentService = inject(BatimentService);
  private modal = inject(ModalRef);
  private data = inject(MODAL_DATA, { optional: true });

  @Input()
  batiment!: Batiment;

  validateForm!: FormGroup;
  isLoad: boolean = false;

  ngOnInit(): void {
    if (this.data?.batiment) {
      this.batiment = this.data.batiment;
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

  destroyModal(data: Batiment | null): void {
    this.modal.destroy(data);
  }

  edit() {
    this.isLoad = true;
    this.batimentService.edit(this.batiment).subscribe({
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
