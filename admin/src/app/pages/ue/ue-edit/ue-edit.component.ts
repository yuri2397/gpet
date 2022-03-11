import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UEService } from './../../../services/ue.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UE } from './../../../models/ue';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ue-edit',
  templateUrl: './ue-edit.component.html',
  styleUrls: ['./ue-edit.component.scss'],
})
export class UeEditComponent implements OnInit {
  @Input() ue!: UE;
  validateForm!: FormGroup;
  isLoad = false;
  constructor(
    private modalRef: NzModalRef,
    private ueService: UEService,
    private notification: NzNotificationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [this.ue.name, [Validators.required]],
      code: [this.ue.code, [Validators.required]],
    });
  }

  destroyModal(data: UE | null) {
    this.modalRef.destroy(data);
  }

  save() {
    this.isLoad = true;
    this.ueService.edit(this.ue).subscribe({
      next: (response) => {
        this.notification.success('Notification', 'EU modifié avec succès.');
        this.destroyModal(response);
      },
      error: (errors) => {
        console.log(errors);
        this.notification.error('Notification', errors.error.message);
        this.isLoad = false;
        this.destroyModal(null);
      },
    });
  }
}
