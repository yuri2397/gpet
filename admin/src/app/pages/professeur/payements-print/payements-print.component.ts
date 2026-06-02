import { CoursesDo } from 'src/app/models/coures-do';
import { Course } from 'src/app/models/course';
import { Professor } from 'src/app/models/professor';
import { Semester } from 'src/app/models/semester';
import { Classe } from 'src/app/models/classe';
import { EptService } from 'src/app/services/ept.service';
import { Departement } from 'src/app/models/departement';
import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IconComponent } from 'src/app/shared/ui/icon/icon.component';
import { ModalRef, MODAL_DATA } from 'src/app/shared/services/modal.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-payements-print',
  standalone: true,
  imports: [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  IconComponent,
  ],
  templateUrl: './payements-print.component.html',
  styleUrls: ['./payements-print.component.scss'],
})
export class PayementsPrintComponent implements OnInit {
  private refModal = inject(ModalRef);
  private eptService = inject(EptService);
  readonly modalData = inject(MODAL_DATA, { optional: true });

  departement!: Departement;
  @Input() classe!: Classe;
  @Input() semester!: Semester;
  @Input() professor!: Professor;
  @Input() course!: Course;
  @Input() courseDo!: CoursesDo;
  date = new Date();
  isLoad = false;

  ngOnInit(): void {
    if (this.modalData) {
      if (this.modalData.classe) this.classe = this.modalData.classe;
      if (this.modalData.semester) this.semester = this.modalData.semester;
      if (this.modalData.professor) this.professor = this.modalData.professor;
      if (this.modalData.course) this.course = this.modalData.course;
      if (this.modalData.courseDo) this.courseDo = this.modalData.courseDo;
    }
    this.departement = this.eptService.departement();
  }

  destroyModal() {
    this.refModal.close(null);
  }

  print() {
    this.isLoad = true;
    let DATA = document.getElementById('presentionPayement');
    html2canvas(DATA!).then((canvas) => {
      this.isLoad = true;
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;

      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4', true);
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);

      PDF.save(
        this.professor.first_name +
          '_' +
          this.professor.last_name +
          '_' +
          this.classe.name +
          '.pdf'
      );
      this.isLoad = false;
    });
  }
}
