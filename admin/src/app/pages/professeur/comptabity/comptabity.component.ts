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
  selector: 'app-comptabity',
  templateUrl: './comptabity.component.html',
  styleUrls: ['./comptabity.component.scss']
})
export class ComptabityComponent implements OnInit {
  professor: Professor = new Professor();
  prof!:Professor;
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
    private notification: NotificationService,
    private profService: ProfessorService,
    ) { }

  ngOnInit(): void {
    this.profile();


  }



  profile() {
    this.dataLoad = true;
    this.profService.profile().subscribe({
      next: (response) => {
        this.prof = response;
        console.log(response);
        this.professor= response;
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



}
