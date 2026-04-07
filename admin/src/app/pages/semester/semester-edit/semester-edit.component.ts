import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Semester } from 'src/app/models/semester';
import { SemesterService } from 'src/app/services/semester.service';
import { RouterModule } from '@angular/router';
import { IconComponent } from 'src/app/shared/ui/icon/icon.component';
import { ModalRef, MODAL_DATA } from 'src/app/shared/services/modal.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-semester-edit',
  standalone: true,
  imports: [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  IconComponent,
  ],
  templateUrl: './semester-edit.component.html',
  styleUrls: ['./semester-edit.component.scss'],
})
export class SemesterEditComponent implements OnInit {
  validateForm!: FormGroup;
  isLoad = false;
  semester!: Semester;

  private modal = inject(ModalRef);
  private fb = inject(FormBuilder);
  private semesterService = inject(SemesterService);
  private notification = inject(NotificationService);
  private modalData = inject(MODAL_DATA, { optional: true });

  ngOnInit(): void {
    if (this.modalData) {
      this.semester = this.modalData.semester;
    }
    this.validateForm = this.fb.group({
      name: [this.semester.name, [Validators.required, Validators.min(2)]],
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

  destroyModal(data: Semester | null) {
    this.modal.destroy(data);
  }

  save() {
    this.isLoad = true;
    this.semesterService.edit(this.semester).subscribe({
      next: (response) => {
        this.notification.createNotification(
          'success',
          'Notification',
          'Semestre modifier avec succès.'
        );
        this.destroyModal(response);
      },
      error: (errors) => {
        this.destroyModal(null);
        this.notification.createNotification('error', 'Notification', errors.error.message);
      },
    });
  }
}
