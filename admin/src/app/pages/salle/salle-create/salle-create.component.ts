import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Batiment } from 'src/app/models/batiment';
import { Departement } from 'src/app/models/departement';
import { Salle } from 'src/app/models/salle';
import { BatimentService } from 'src/app/services/batiment.service';
import { DepartementService } from 'src/app/services/departement.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SalleService } from 'src/app/services/salle.service';

@Component({
  selector: 'app-salle-create',
  templateUrl: './salle-create.component.html',
  styleUrls: ['./salle-create.component.scss'],
})
export class SalleCreateComponent implements OnInit {
  batiments!: Batiment[];
  departements!: Departement[];
  validateForm!: FormGroup;
  isLoad: boolean = false;
  isLoadData = false;
  isLoadDataBat = true;
  salle: Salle = new Salle();
  constructor(
    private notification: NotificationService,
    private fb: FormBuilder,
    public salleService: SalleService,
    private modal: NzModalRef,
    private deptService: DepartementService,
    private batimentService: BatimentService
  ) {}

  ngOnInit(): void {
    this.findBatiment();
    if (this.salleService.isAdmin()) {
      this.findDepartement();
    }
    else{
      this.salle.departement_id = this.salleService.getUser().departement_id;
    }
    this.validateForm = this.fb.group({
      name: [null, null],
      number: [null, [Validators.required]],
      capacity: [0, [Validators.required]],
      batiment_id: [null, [Validators.required]],
      departement_id: [null, [Validators.required]],
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

  findDepartement() {
    this.isLoadData = true;
    this.deptService.findAll().subscribe({
      next: (response) => {
        this.departements = response;
        this.isLoadData = false;
      },
      error: (errors) => {
        this.isLoadData = false;
      },
    });
  }

  findBatiment() {
    this.isLoadDataBat = true;
    this.batimentService.findAll().subscribe({
      next: (response) => {
        this.batiments = response;
        this.isLoadDataBat = false;
      },
      error: (errors) => {
        this.isLoadDataBat = false;
      },
    });
  }

  destroyModal(data: Salle | null): void {
    this.modal.destroy(data);
  }

  save() {
    this.isLoad = true;
    this.salleService.create(this.salle).subscribe({
      next: (response) => {
        this.isLoad = false;
        this.notification.createNotification(
          'success',
          'Notification',
          'Salle ajoutée avec succés.'
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
