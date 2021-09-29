import { Batiment } from 'src/app/models/batiment';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Salle } from 'src/app/models/salle';
import { SalleService } from 'src/app/services/salle.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Departement } from 'src/app/models/departement';
import { BatimentService } from 'src/app/services/batiment.service';
import { DepartementService } from 'src/app/services/departement.service';

@Component({
  selector: 'app-salle-edit',
  templateUrl: './salle-edit.component.html',
  styleUrls: ['./salle-edit.component.scss'],
})
export class SalleEditComponent implements OnInit {
  @Input() salle!: Salle;
  batiments!: Batiment[];
  departements!: Departement[];
  validateForm!: FormGroup;
  isLoad: boolean = false;
  isLoadData = false;
  isLoadDataBat = true;
  constructor(
    private notification: NotificationService,
    private fb: FormBuilder,
    private salleService: SalleService,
    private modal: NzModalRef,
    private deptService: DepartementService,
    private batimentService: BatimentService
  ) {}

  ngOnInit(): void {
    this.findBatiment();
    this.findDepartement();
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

  edit() {
    console.log("NEW SALLE", this.salle);
    this.isLoad = true;
    this.salleService.edit(this.salle).subscribe({
      next: (response) => {
        this.isLoad = false;
        this.notification.createNotification(
          'success',
          'Notification',
          'Salle modifié avec succés.'
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
