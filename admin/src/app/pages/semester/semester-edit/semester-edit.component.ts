import { NzNotificationService } from 'ng-zorro-antd/notification';
import { SemesterService } from './../../../services/semester.service';
import { EC } from './../../../models/ec';
import { UE } from './../../../models/ue';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Semester } from './../../../models/semester';
import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-semester-edit',
  templateUrl: './semester-edit.component.html',
  styleUrls: ['./semester-edit.component.scss'],
})
export class SemesterEditComponent implements OnInit {
  validateForm!: FormGroup;
  isLoad = false;
  @Input() semester!: Semester;
  constructor(
    private modal: NzModalRef,
    private fb: FormBuilder,
    private semesterService: SemesterService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
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
        this.notification.success(
          'Notification',
          'Semestre modifier avec succès.'
        );
        this.destroyModal(response);
      },
      error: (errors) => {
        this.destroyModal(null);
        this.notification.error('Notification', errors.error.message);
      },
    });
  }
}
