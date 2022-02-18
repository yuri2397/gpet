import { PayementsPrintAllComponent } from './../payements-print-all/payements-print-all.component';
import { PayementsPrintComponent } from './../payements-print/payements-print.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Professor } from 'src/app/models/professor';
import { ProfessorService } from 'src/app/services/professor.service';
import { CoursesDo } from 'src/app/models/coures-do';
import { CourseDoService } from 'src/app/services/course-do.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-payements',
  templateUrl: './payements.component.html',
  styleUrls: ['./payements.component.scss'],
})
export class PayementsComponent implements OnInit {
  professor: Professor = new Professor();
  dataLoad = true;
  errorServer = false;
  deleteRestoRef!: NzModalRef;
  paymentLoad = false;
  confPayPending = true;
  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private professorService: ProfessorService,
    private modalService: NzModalService,
    private notification: NotificationService
  ) {}

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
      nzComponentParams: {
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
      nzComponentParams: {
         professor: this.professor
      },
      nzClosable: false,
      nzWidth: "80%",
    });
  }

  openDoPaymentModal(courseDo: CoursesDo) {
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
    });
  }
}
