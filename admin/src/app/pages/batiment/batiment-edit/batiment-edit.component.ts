import { BatimentService } from 'src/app/services/batiment.service';
import { Batiment } from './../../../models/batiment';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-batiment-edit',
  templateUrl: './batiment-edit.component.html',
  styleUrls: ['./batiment-edit.component.scss'],
})
export class BatimentEditComponent implements OnInit {
  @Input()
  batiment!: Batiment;

  validateForm!: FormGroup;
  isLoad: boolean = false;
  constructor(
    private notification: NotificationService,
    private fb: FormBuilder,
    private batimentService: BatimentService,
    private modal: NzModalRef
  ) {}

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
