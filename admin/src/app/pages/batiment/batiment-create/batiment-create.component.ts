import { Batiment } from './../../../models/batiment';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { BatimentService } from 'src/app/services/batiment.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-batiment-create',
  templateUrl: './batiment-create.component.html',
  styleUrls: ['./batiment-create.component.scss']
})
export class BatimentCreateComponent implements OnInit {
  batiment: Batiment = new Batiment();
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
        console.log(errors);

      },
    });
  }
}
