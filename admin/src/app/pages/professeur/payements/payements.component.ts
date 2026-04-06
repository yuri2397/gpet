import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { PayementsPrintAllComponent } from './../payements-print-all/payements-print-all.component';
import { PayementsPrintComponent } from './../payements-print/payements-print.component';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Professor } from 'src/app/models/professor';
import { ProfessorService } from 'src/app/services/professor.service';
import { CoursesDo } from 'src/app/models/coures-do';
import { NotificationService } from 'src/app/services/notification.service';
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
import { ErrorServerComponent } from 'src/app/shared/ui/error-server/error-server.component';

@Component({
  selector: 'app-payements',
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
  ErrorServerComponent,
  ],
  templateUrl: './payements.component.html',
  styleUrls: ['./payements.component.scss'],
})
export class PayementsComponent implements OnInit {
  private location = inject(Location);
  private route = inject(ActivatedRoute);
  private professorService = inject(ProfessorService);
  private modalService = inject(NzModalService);
  private notification = inject(NotificationService);

  professor: Professor = new Professor();
  dataLoad = true;
  errorServer = false;
  deleteRestoRef!: NzModalRef;
  paymentLoad = false;
  confPayPending = true;
  isProfesseur = false;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.professor.registration_number = params['register_number'];
      this.findPayments();
    });
  }

  findPayments() {
    this.dataLoad = true;
    this.professorService.payments(this.professor).subscribe({
      next: (response) => {
        this.professor = response;
        this.dataLoad = false;
      },
      error: (errors) => {
        this.dataLoad = false;
        this.errorServer = true;
      },
    });
  }

  private doPayment(courseDo: CoursesDo) {
    this.paymentLoad = true;
    this.professorService.doPayment(courseDo).subscribe({
      next: (response) => {
        this.paymentLoad = false;
        this.findPayments();
        this.notification.createNotification(
          'success',
          'Notification',
          response.message
        );
      },
      error: (errors) => {
        this.paymentLoad = false;
        this.notification.createNotification(
          'error',
          'Erreur',
          errors.error.message
        );
      },
    });
  }

  onBack() {
    this.location.back();
  }

  printPayment(courseDo: CoursesDo) {
    let modal = this.modalService.create({
      nzTitle: "Imprimer l'état de payement",
      nzContent: PayementsPrintComponent,
      nzData: {
        classe: courseDo.course.classe,
        semester: courseDo.course.semester,
        professor: courseDo.professor,
        course: courseDo.course,
        courseDo: courseDo
      },
      nzClosable: false,
      nzWidth: "70%",
    });
  }

  printAll(){
    let modal = this.modalService.create({
      nzTitle: "Imprimer tous les états payés.",
      nzContent: PayementsPrintAllComponent,
      nzData: {
         professor: this.professor
      },
      nzClosable: false,
      nzWidth: "80%",
    });
  }

  openDoPaymentModal(courseDo: CoursesDo) {
    if(this.professorService.isProfesseur()){
      return;
    }
    this.deleteRestoRef = this.modalService.confirm({
      nzTitle: "<h3>Paiement d'un cour.</h1>",
      nzContent: `
        <span>Cette action est irréverssible. Une fois le paiement éffectué, vous ne pourez plus l\'annuler.</span>
      `,
      nzOkText: 'Valider le paiement',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.doPayment(courseDo),
      nzCancelText: 'Annuler',
      nzOkLoading: this.paymentLoad,
      nzMaskClosable: false,
      nzClosable: false,
      nzCentered: true
    });
  }
}
