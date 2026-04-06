import { NzDrawerModule, NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzModalModule, NzModalRef, NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { ProfessorType } from './../../../models/professor_type';
import { BankService } from './../../../services/bank.service';
import { ProfessorService } from 'src/app/services/professor.service';
import { Professor } from 'src/app/models/professor';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Departement } from 'src/app/models/departement';
import { DepartementService } from 'src/app/services/departement.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Bank } from 'src/app/models/bank';
import { BankCreateComponent } from '../../bank/bank-create/bank-create.component';
import { RouterModule } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { IconComponent } from 'src/app/shared/ui/icon/icon.component';

@Component({
  selector: 'app-professeur-create',
  standalone: true,
  imports: [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  NzFormModule,
  NzInputModule,
  NzButtonModule,
  NzTableModule,
  NzModalModule,
  NzSelectModule,
  NzIconModule,
  NzSpinModule,
  NzTagModule,
  NzDropDownModule,
  NzDividerModule,
  NzToolTipModule,
  NzAlertModule,
  NzPopconfirmModule,
  NzDrawerModule,
  NzCardModule,
  NzAvatarModule,
  NzEmptyModule,
  NzPageHeaderModule,
  NzResultModule,
  NzSkeletonModule,
  NzTabsModule,
  NzCollapseModule,
  NzDatePickerModule,
  NzTimePickerModule,
  NzLayoutModule,
  NzMenuModule,
  NzListModule,
  NzSpaceModule,
  NzStatisticModule,
  NzTimelineModule,
  NzImageModule,
  NzAutocompleteModule,
  NzUploadModule,
  NzStepsModule,
  NzMessageModule,
  NzNotificationModule,
  IconComponent,
  ],
  templateUrl: './professeur-create.component.html',
  styleUrls: ['./professeur-create.component.scss'],
})
export class ProfesseurCreateComponent implements OnInit {
  private notification = inject(NotificationService);
  private fb = inject(FormBuilder);
  private bankService = inject(BankService);
  professorService = inject(ProfessorService);
  private modal = inject(NzModalRef);
  private deptService = inject(DepartementService);
  private drawerService = inject(NzDrawerService);

  departements!: Departement[];
  validateForm!: FormGroup;
  isLoad: boolean = false;
  isLoadData = false;
  isLoadDataBat = true;
  professor: Professor = new Professor();
  banks!: Bank[];
  bankLoad = false;
  professorTypes!: ProfessorType[];

  ngOnInit(): void {
    if (!this.professorService.isSuperAdmin()) {
      this.professor.departement = this.deptService.departement();
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
