import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { PayementsPrintAllComponent } from './../payements-print-all/payements-print-all.component';
import { PayementsPrintComponent } from './../payements-print/payements-print.component';
import { Professor } from 'src/app/models/professor';
import { ProfessorService } from 'src/app/services/professor.service';
import { CoursesDo } from 'src/app/models/coures-do';
import { NotificationService } from 'src/app/services/notification.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IconComponent } from 'src/app/shared/ui/icon/icon.component';
import { ModalService, ModalRef } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-comptabity',
  standalone: true,
  imports: [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  IconComponent,
  ],
  templateUrl: './comptabity.component.html',
  styleUrls: ['./comptabity.component.scss']
})
export class ComptabityComponent implements OnInit {
  private location = inject(Location);
  private professorService = inject(ProfessorService);
  private modalService = inject(ModalService);
  private notification = inject(NotificationService);
  private profService = inject(ProfessorService);

  professor: Professor = new Professor();
  prof!: Professor;
  dataLoad = true;
  errorServer = false;
  deleteRestoRef!: ModalRef;
  paymentLoad = false;
  confPayPending = true;
  isProfesseur: boolean = false;

  ngOnInit(): void {
    this.profile();
    this.isProfesseur = this.professorService.isProfesseur();
    console.log("PROFFF", this.isProfesseur);
  }

  profile() {
    this.dataLoad = true;
    this.profService.profile().subscribe({
      next: (response) => {
        this.prof = response;
        this.professor = response;
        console.log(this.professor.registration_number);
        console.log(this.professor.coursesDo);

        this.findPayments();
        this.dataLoad = false;
        this.errorServer = false;
      },
      error: (errors) => {
        this.errorServer = true;
        this.dataLoad = false;
      },
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

  printAll() {
    this.modalService.open({
      title: "Imprimer tous les états payés.",
      component: PayementsPrintAllComponent,
      data: {
        professor: this.professor
      },
    });
  }
}
