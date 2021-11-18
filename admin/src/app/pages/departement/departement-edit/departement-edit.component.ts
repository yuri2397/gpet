import { DepartementService } from './../../../services/departement.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Batiment } from 'src/app/models/batiment';
import { Departement } from 'src/app/models/departement';
import { BatimentService } from 'src/app/services/batiment.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-departement-edit',
  templateUrl: './departement-edit.component.html',
  styleUrls: ['./departement-edit.component.scss'],
})
export class DepartementEditComponent implements OnInit {
  @Input()
  departement!: Departement;
  validateForm!: FormGroup;
  isLoad: boolean = false;
  constructor(
    private notification: NotificationService,
    private fb: FormBuilder,
    private depService: DepartementService,
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
