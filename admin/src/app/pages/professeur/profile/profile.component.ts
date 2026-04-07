import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { UserService } from 'src/app/services/user.service';
import { ProfessorService } from 'src/app/services/professor.service';
import { Professor } from 'src/app/models/professor';
import { User } from 'src/app/models/user';
import { NotificationService } from 'src/app/services/notification.service';
import { Bank } from 'src/app/models/bank';
import { ProfessorType } from 'src/app/models/professor_type';
import { Departement } from 'src/app/models/departement';
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
import { LoadComponent } from 'src/app/shared/ui/table-load/load.component';

@Component({
  selector: 'app-profile',
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
  LoadComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  private modalService = inject(NzModalService);
  private profService = inject(ProfessorService);
  private location = inject(Location);
  private fb = inject(FormBuilder);
  private notification = inject(NotificationService);
  public professorService = inject(ProfessorService);

  professeur!: Professor;
  professor!: Professor;
  dataLoad = true;
  errorServer = false;
  avatarLoad = false;
  modifierleprofe = false;
  validateForm!: FormGroup;
  file: any;
  isLoad: boolean = false;
  banks!: Bank[];
  professorTypes!: ProfessorType[];
  departements!: Departement[];
  isLoadData = false;
  modifierinfobank = false;

  ngOnInit(): void {
    this.profile();
    this.findSelectableList();
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

  profile() {
    this.dataLoad = true;
    this.profService.profile().subscribe({
      next: (response) => {
        this.professeur = response;
        console.log(response);
        this.dataLoad = false;
        this.errorServer = false;
      },
      error: (errors) => {
        this.errorServer = true;
        this.dataLoad = false;
      },
    });
  }

  userProfilePath() {
    if (this.professeur.avatar == null) {
      return '/assets/img/avatar.png';
    }
    return this.profService.host + 'storage' + this.professeur.avatar;;
  }

  onBack() {
    this.location.back();
  }

  onChange(event: any) {
    this.file = event.target.files[0];
    if (this.file != null) {
      this.updateAvatar();
    }
  }

  updateAvatar() {
    this.avatarLoad = true;
    this.profService.updateAvatar(this.file).subscribe({
      next: (response: Professor) => {
        this.professeur.avatar = response.avatar;
      },
      error: (errors: any) => {
        console.log(errors);
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

  openAddProfModal() {
    this.modifierleprofe = true;
    this.professor = this.profService.clone(this.professeur);
    console.log(this.professor);
  }

  openModalbank() {
    this.modifierinfobank = true;
    this.professor = this.profService.clone(this.professeur);
    console.log(this.professor);
  }

  onBornAtChange(date: any) {}

  save() {
    this.isLoad = true;
    console.log("magui ci birr");

    this.profService.edit(this.professor).subscribe({
      next: (response) => {
        this.isLoad = false;
        this.notification.createNotification(
          'success',
          'Notification',
          'Information modifié avec succés.'
        );
        this.modifierleprofe = false;
        this.modifierinfobank = false;
        this.professeur = response;
      },
      error: (errors) => {
        this.isLoad = false;
        console.error(errors);

        this.notification.createNotification(
          'error',
          'Erreur',
          errors.error.message
        );
      },
    });
  }

  findSelectableList() {
    this.isLoadData = true;
    this.professorService.findSelectableList(['departements', 'professor_types', 'banks']).subscribe({
      next: (response) => {
        this.departements = response.departements;
        this.professorTypes = response.professor_types;
        this.banks = response.banks;
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
}
