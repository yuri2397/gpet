import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { PayementsPrintAllComponent } from './../payements-print-all/payements-print-all.component';
import { PayementsPrintComponent } from './../payements-print/payements-print.component';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Professor } from 'src/app/models/professor';
import { ProfessorService } from 'src/app/services/professor.service';
import { CoursesDo } from 'src/app/models/coures-do';
import { NotificationService } from 'src/app/services/notification.service';
import { IconComponent } from 'src/app/shared/ui/icon/icon.component';
import { ErrorServerComponent } from 'src/app/shared/ui/error-server/error-server.component';
import { ModalService, ModalRef } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-payements',
  standalone: true,
  imports: [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
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
  private modalService = inject(ModalService);
  private notification = inject(NotificationService);

  professor: Professor = new Professor();
  dataLoad = true;
  errorServer = false;
  deleteRestoRef!: ModalRef;
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
    this.modalService.open({
      title: "Imprimer l'état de payement",
      component: PayementsPrintComponent,
      data: {
        classe: courseDo.course.classe,
        semester: courseDo.course.semester,
        professor: courseDo.professor,
        course: courseDo.course,
        courseDo: courseDo
      },
    });
  }

  printAll(){
    this.modalService.open({
      title: "Imprimer tous les états payés.",
      component: PayementsPrintAllComponent,
      data: {
         professor: this.professor
      },
    });
  }

  openDoPaymentModal(courseDo: CoursesDo) {
    if(this.professorService.isProfesseur()){
      return;
    }
    this.deleteRestoRef = this.modalService.confirm({
      title: "Paiement d'un cour.",
      okText: 'Valider le paiement',
      okDanger: true,
      onOk: () => this.doPayment(courseDo),
    });
  }
}
