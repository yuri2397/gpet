import { NzModalModule, NzModalRef, NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { Classe } from 'src/app/models/classe';
import { Course } from 'src/app/models/course';
import { EPT } from 'src/app/models/ept';
import { EptRow } from 'src/app/models/ept-row';
import { Salle } from 'src/app/models/salle';
import { EptService } from 'src/app/services/ept.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SalleService } from 'src/app/services/salle.service';
import { RouterModule } from '@angular/router';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
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
  selector: 'app-ept-edit',
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
  templateUrl: './ept-edit.component.html',
  styleUrls: ['./ept-edit.component.scss'],
})
export class EptEditComponent implements OnInit {
  day!: EptRow;
  classe!: Classe;
  courses!: Course[];
  salles!: Salle[];
  isSallesLoad = true;
  validateForm!: FormGroup;
  isLoad: boolean = false;
  endDis: number[] = [];
  ept = new EPT();
  groups: string[] = [];

  private notification = inject(NotificationService);
  private fb = inject(FormBuilder);
  private modal = inject(NzModalRef);
  private eptService = inject(EptService);
  private salleService = inject(SalleService);
  private nzModalData = inject(NZ_MODAL_DATA, { optional: true });

  ngOnInit(): void {
    if (this.nzModalData) {
      this.day = this.nzModalData.day;
      this.classe = this.nzModalData.classe;
      this.courses = this.nzModalData.courses;
      this.ept = this.nzModalData.ept;
    }
    this.validateForm = this.fb.group({
      start: [null, [Validators.required]],
      end: [null, [Validators.required]],
      course_id: [null, [Validators.required]],
      salle_id: [null, []],
      group: [null, []],
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

  setGroupes(id: number) {
    if (id) {
      let c = this.courses.find((e) => e.id == id)?.groupe_number ?? 1;
      this.groups = [];
      for (let index = 0; index < c; index++) {
        this.groups.push((index + 1).toString());
      }
    }
  }

  onSalleSearch(data: string) {
    this.isSallesLoad = true;
    if (data && data.length >= 3)
      this.salleService.search(data).subscribe({
        next: (salles) => {
          this.salles = salles;
          this.isSallesLoad = false;
        },
        error: (errors) => {
          this.isSallesLoad = false;
        },
      });
  }

  destroyModal(data: EPT | null): void {
    this.modal.destroy(data);
  }

  startDes = (): number[] => {
    let tab = [];
    for (let index = 21; index < 24; index++) {
      tab.push(index);
    }
    for (let index = 0; index < 8; index++) {
      tab.push(index);
    }
    return tab;
  };

  endDes = (): number[] => {
    let tab = this.startDes();
    return tab;
  };

  edit() {
    this.isLoad = true;
    this.eptService.update(this.ept).subscribe({
      next: (response) => {
        this.isLoad = false;
        this.notification.createNotification(
          'success',
          'Notification',
          'EPT ajouté avec succés.'
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
