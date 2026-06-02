import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Semester } from 'src/app/models/semester';
import { Departement } from 'src/app/models/departement';
import { EC } from 'src/app/models/ec';
import { UE } from 'src/app/models/ue';
import { DepartementService } from 'src/app/services/departement.service';
import { ECService } from 'src/app/services/ec.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UEService } from 'src/app/services/ue.service';
import { RouterModule } from '@angular/router';
import { IconComponent } from 'src/app/shared/ui/icon/icon.component';
import { ModalRef, MODAL_DATA } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-ec-create',
  standalone: true,
  imports: [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  IconComponent,
  ],
  templateUrl: './ec-create.component.html',
  styleUrls: ['./ec-create.component.scss'],
})
export class EcCreateComponent implements OnInit {
  @Input() departements!: Departement[];
  @Input() semesters!: Semester[];
  validateForm!: FormGroup;
  ec: EC = new EC();
  isLoad = false;
  isLoadData = true;
  ues!: UE[];
  addUE = false;
  ueLoad = true;

  private notification = inject(NotificationService);
  private fb = inject(FormBuilder);
  private deptService = inject(DepartementService);
  private modal = inject(ModalRef);
  ueService = inject(UEService);
  private ecService = inject(ECService);
  private modalData = inject(MODAL_DATA, { optional: true });

  ngOnInit() {
    if (this.modalData) {
      this.semesters = this.modalData.semesters;
      this.departements = this.modalData.departements;
    }
    this.validateForm = this.fb.group({
      name: [null, [Validators.required, Validators.min]],
      ec_id: [null, [Validators.required]],
      code: [null, [Validators.required]],
      vht: [null, [Validators.required]],
      ue_code: [null, []],
      ue_name: [null, []],
      ue_departement: [null, []],
      ue_semester: [null, []],
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

  destroyModal(data: EC | null): void {
    this.modal.destroy(data);
  }

  save() {
    this.isLoad = true;
    this.ecService.create(this.ec).subscribe({
      next: (response) => {
        this.modal.destroy(response);
        this.isLoad = false;
        this.notification.createNotification(
          'success',
          'Notification',
          'Nouveau EU ajouté avec succès.'
        );
      },
      error: (errors) => {
        this.isLoad = false;
        this.modal.destroy(null);
        this.notification.createNotification(
          'error',
          'Notification',
          errors.error.message
        );
      },
    });
  }

  close() {
    this.modal.destroy(null);
  }

  addNewUE() {
    this.addUE = true;

    this.validateForm = this.fb.group({
      name: [this.ec.name, [Validators.required, Validators.min]],
      ec_id: [null, []],
      code: [this.ec.code, [Validators.required]],
      ue_code: [null, [Validators.required]],
      ue_name: [null, [Validators.required]],
      ue_departement: [null, [Validators.required]],
      ue_semester: [null, [Validators.required]],
    });
    this.ec.ue_id = -1;
  }

  currentDepSelected(id: number) {
    this.ec.ue.departement_id = id;
  }

  onUESearch(data: string) {
    this.ueLoad = true;
    if (data.trim().length < 2) return;
    this.ueService.search(data).subscribe({
      next: (response) => {
        this.ues = response;
        this.ueLoad = false;
      },
      error: (errors) => {
        this.ueLoad = false;
      },
    });
  }

  currentUESelected(index: number) {
    if (index != null) {
      this.ec.ue_id = index;
    }
  }
}
