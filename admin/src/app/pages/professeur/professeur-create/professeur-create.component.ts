import { BankService } from './../../../services/bank.service';
import { ProfessorService } from 'src/app/services/professor.service';
import { Professor } from 'src/app/models/professor';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Departement } from 'src/app/models/departement';
import { DepartementService } from 'src/app/services/departement.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Bank } from 'src/app/models/bank';

@Component({
  selector: 'app-professeur-create',
  templateUrl: './professeur-create.component.html',
  styleUrls: ['./professeur-create.component.scss'],
})
export class ProfesseurCreateComponent implements OnInit {
  departements!: Departement[];
  validateForm!: FormGroup;
  isLoad: boolean = false;
  isLoadData = false;
  isLoadDataBat = true;
  professor: Professor = new Professor();
  banks!: Bank[];
  constructor(
    private notification: NotificationService,
    private fb: FormBuilder,
    private bankService: BankService,
    private professorService: ProfessorService,
    private modal: NzModalRef,
    private deptService: DepartementService
  ) {}

  ngOnInit(): void {
    this.findDepartement();
    this.findBank();
    this.validateForm = this.fb.group({
      first_name: [null, [Validators.required]],
      last_name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      phone_number: [null, [Validators.required, Validators.min(9)]],
      status: [null, [Validators.required]],
      account_number: [null, [Validators.required]],
      key: [null, [Validators.required]],
      rip: [null, [Validators.required]],
      bank_id: [null, [Validators.required]],
      job: [null, null],
      departement_id: [null, [Validators.required]],
    });
  }

  findBank() {
    this.bankService.findAll().subscribe({
      next: (response) => {
        this.banks = response;
      },
      error: (errors) => {}
    })
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
    this.professorService.findSelectableList(['departements']).subscribe({
      next: (response) => {
        this.departements = response.departements;
        this.isLoadData = false;
      },
      error: (errors) => {
        this.isLoadData = false;
      },
    });
  }

  destroyModal(data: Professor | null): void {
    this.modal.destroy(data);
  }

  save() {
    this.isLoad = true;
    this.professorService.create(this.professor).subscribe({
      next: (response) => {
        this.isLoad = false;
        this.notification.createNotification(
          'success',
          'Notification',
          'Professor ajoutée avec succés.'
        );
        this.destroyModal(response);
      },
      error: (errors) => {
        this.isLoad = false;
        (errors);

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
