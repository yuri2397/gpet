import { ModalRef } from 'src/app/shared/services/modal.service';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Batiment } from 'src/app/models/batiment';
import { BatimentService } from 'src/app/services/batiment.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-batiment-create',
  standalone: true,
  imports: [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  ],
  templateUrl: './batiment-create.component.html',
  styleUrls: ['./batiment-create.component.scss']
})
export class BatimentCreateComponent implements OnInit {
  private notification = inject(NotificationService);
  private fb = inject(FormBuilder);
  private batimentService = inject(BatimentService);
  private modal = inject(ModalRef);

  batiment: Batiment = new Batiment();
  validateForm!: FormGroup;
  isLoad: boolean = false;

  ngOnInit(): void {
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

  save() {
    this.isLoad = true;
    this.batimentService.create(this.batiment).subscribe({
      next: (response) => {
        this.isLoad = false;
        this.notification.createNotification(
          'success',
          'Notification',
          "Batiment ajouté avec succés.",
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
