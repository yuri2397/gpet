import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ECService } from 'src/app/services/ec.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { EC } from 'src/app/models/ec';
import { Semester } from 'src/app/models/semester';

@Component({
  selector: 'app-ec-edit',
  templateUrl: './ec-edit.component.html',
  styleUrls: ['./ec-edit.component.scss'],
})
export class EcEditComponent implements OnInit {
  validateForm!: FormGroup;
  isLoad = false;
  @Input() semester!: Semester;
  @Input() ec!: EC;
  constructor(
    private modal: NzModalRef,
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private ecService: ECService
  ) {}

  ngOnInit(): void {
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
        this.notification.success(
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
