import { ProfessorType } from './../../../models/professor_type';
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
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { BankCreateComponent } from '../../bank/bank-create/bank-create.component';

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
  bankLoad = false;
  professorTypes!: ProfessorType[];
  disableDep = false;

  constructor(
    private notification: NotificationService,
    private fb: FormBuilder,
    private bankService: BankService,
    public professorService: ProfessorService,
    private modal: NzModalRef,
    private deptService: DepartementService,
    private drawerService: NzDrawerService
  ) {}

  ngOnInit(): void {
    if (!this.professorService.isProfesseur()) {
      this.professor.departement_id = this.deptService.departement().id;
      this.disableDep = false;

    }
    this.findDepartement();

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
      last_degree: [null, [Validators.required]],
      job: [null, null],
      cni: [null, [Validators.required]],
      born_in: [null, [Validators.required]],
      born_at: [null, [Validators.required]],
      professor_type_id: [null, [Validators.required]],
      departement_id: [null, [Validators.required]],
    });
  }

  onAddBank() {
    const drawerRef = this.drawerService.create({
      nzTitle: 'Ajouter une nouvelle banque',
      nzContent: BankCreateComponent,
      nzWidth: '350px',
      nzClosable: false,
      nzMaskClosable: false,
    });
  }

  onBankSearch(data: string) {
    this.bankLoad = true;
    if (data.trim().length >= 2) {
      this.bankService.search(data).subscribe({
        next: (response) => {
          this.banks = response;
          this.bankLoad = false;
        },
        error: (errors) => {
          this.bankLoad = false;
          this.notification.createNotification(
            'error',
            'Erreur',
            errors.error.message
          );
        },
      });
    }
  }

  findBank() {
    this.bankService.findAll().subscribe({
      next: (response) => {
        this.banks = response;
      },
      error: (errors) => {
        this.notification.createNotification(
          'error',
          'Erreur',
          errors.error.message
        );
      },
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
    this.professorService
      .findSelectableList(['departements', 'professor_types'])
      .subscribe({
        next: (response) => {
          this.departements = response.departements;
          this.professorTypes = response.professor_types;
          this.isLoadData = false;
        },
        error: (errors) => {
          this.isLoadData = false;
          this.notification.createNotification(
            'error',
            'Erreur',
            errors.error.message
          );
        },
      });
  }

  onBornAtChange(date: any) {}

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
        errors;
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
