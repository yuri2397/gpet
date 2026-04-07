import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ECService } from 'src/app/services/ec.service';
import { EC } from 'src/app/models/ec';
import { Semester } from 'src/app/models/semester';
import { RouterModule } from '@angular/router';
import { IconComponent } from 'src/app/shared/ui/icon/icon.component';
import { ModalRef, MODAL_DATA } from 'src/app/shared/services/modal.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-ec-edit',
  standalone: true,
  imports: [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  IconComponent,
  ],
  templateUrl: './ec-edit.component.html',
  styleUrls: ['./ec-edit.component.scss'],
})
export class EcEditComponent implements OnInit {
  validateForm!: FormGroup;
  isLoad = false;
  semester!: Semester;
  ec!: EC;

  private modal = inject(ModalRef);
  private fb = inject(FormBuilder);
  private notification = inject(NotificationService);
  private ecService = inject(ECService);
  private modalData = inject(MODAL_DATA, { optional: true });

  ngOnInit(): void {
    if (this.modalData) {
      this.semester = this.modalData.semester;
      this.ec = this.modalData.ec;
    }
    this.validateForm = this.fb.group({
      name: [null, [Validators.required, Validators.min(2)]],
      vht: [null, [Validators.required, Validators.min(0)]],
      code: [null, [Validators.required]],
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

  destroyModal(data: EC | null) {
    this.modal.destroy(data);
  }

  save() {
    this.isLoad = true;
    this.ecService.edit(this.ec).subscribe({
      next: (response) => {
        this.isLoad = false;
        this.destroyModal(response);
        this.notification.createNotification(
          'success',
          'Notification',
          'Modifications enregistrées avec succès.'
        );
      },
      error: (errors) => {
        this.isLoad = false;
        this.destroyModal(null);
      },
    });
  }
}
