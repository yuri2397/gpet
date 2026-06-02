import { ModalRef, MODAL_DATA } from 'src/app/shared/services/modal.service';
import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Batiment } from 'src/app/models/batiment';
import { Departement } from 'src/app/models/departement';
import { Salle } from 'src/app/models/salle';
import { BatimentService } from 'src/app/services/batiment.service';
import { DepartementService } from 'src/app/services/departement.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SalleService } from 'src/app/services/salle.service';

@Component({
  selector: 'app-salle-edit',
  standalone: true,
  imports: [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  ],
  templateUrl: './salle-edit.component.html',
  styleUrls: ['./salle-edit.component.scss'],
})
export class SalleEditComponent implements OnInit {
  private notification = inject(NotificationService);
  private fb = inject(FormBuilder);
  public salleService = inject(SalleService);
  private modal = inject(ModalRef);
  private deptService = inject(DepartementService);
  private batimentService = inject(BatimentService);
  private modalData = inject(MODAL_DATA, { optional: true });

  @Input() salle!: Salle;
  batiments!: Batiment[];
  departements!: Departement[];
  validateForm!: FormGroup;
  isLoad: boolean = false;
  isLoadData = false;
  isLoadDataBat = true;

  ngOnInit(): void {
    if (this.modalData?.salle) {
      this.salle = this.modalData.salle;
    }
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
