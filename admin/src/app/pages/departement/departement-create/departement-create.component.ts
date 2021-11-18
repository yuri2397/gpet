import { DepartementService } from './../../../services/departement.service';
import { Departement } from './../../../models/departement';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-departement-create',
  templateUrl: './departement-create.component.html',
  styleUrls: ['./departement-create.component.scss']
})
export class DepartementCreateComponent implements OnInit {
  departement: Departement = new Departement();
  validateForm!: FormGroup;
  isLoad: boolean = false;
  constructor(
    private notification: NotificationService,
    private fb: FormBuilder,
    private deptService: DepartementService,
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

  save() {
    this.isLoad = true;
    this.deptService.create(this.departement).subscribe({
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
