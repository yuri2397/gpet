import { NzDrawerModule, NzDrawerRef } from 'ng-zorro-antd/drawer';
import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { Semester } from 'src/app/models/semester';
import { Departement } from 'src/app/models/departement';
import { EC } from 'src/app/models/ec';
import { UE } from 'src/app/models/ue';
import { DepartementService } from 'src/app/services/departement.service';
import { ECService } from 'src/app/services/ec.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UEService } from 'src/app/services/ue.service';
import { RouterModule } from '@angular/router';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
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
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-ec-create',
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
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatTableModule,
  MatProgressBarModule,
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
  private modal = inject(NzDrawerRef);
  ueService = inject(UEService);
  private ecService = inject(ECService);

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
