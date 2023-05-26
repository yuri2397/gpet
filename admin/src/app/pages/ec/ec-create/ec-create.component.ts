import { Semester } from './../../../models/semester';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { Departement } from 'src/app/models/departement';
import { EC } from 'src/app/models/ec';
import { UE } from 'src/app/models/ue';
import { DepartementService } from 'src/app/services/departement.service';
import { ECService } from 'src/app/services/ec.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UEService } from 'src/app/services/ue.service';

@Component({
  selector: 'app-ec-create',
  templateUrl: './ec-create.component.html',
  styleUrls: ['./ec-create.component.scss'],
})
export class EcCreateComponent implements OnInit {
  @Input() departements!: Departement[];
  @Input() semesters!: Semester[];
  validateForm!: FormGroup;
  ec: EC = new EC();
  sem : Semester =new Semester();
  isLoad = false;
  isLoadData = true;
  ues!: UE[];
  addUE = false;
  ueLoad = true;
  constructor(
    private notification: NotificationService,
    private fb: FormBuilder,
    private deptService: DepartementService,
    private modal: NzDrawerRef,
    public ueService: UEService,
    private ecService: ECService
  ) {}

  ngOnInit() {
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
    this.modal.close(data);
  }

  save() {
    this.isLoad = true;
    this.ecService.create(this.ec).subscribe({
      next: (response) => {
        this.modal.close(response);
        this.isLoad = false;
        this.notification.createNotification(
          'success',
          'Notification',
          'Nouveau EU ajouté avec succès.'
        );
      },
      error: (errors) => {
        this.isLoad = false;
        this.modal.close(null);
        this.notification.createNotification(
          'error',
          'Notification',
          errors.error.message
        );
      },
    });
  }

  close() {
    this.modal.close(null);
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

  currentSemSelected(id: number) {
    this.ec.ue.semester_id = id;
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
