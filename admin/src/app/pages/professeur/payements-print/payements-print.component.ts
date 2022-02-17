import { CoursesDo } from 'src/app/models/coures-do';
import { Course } from 'src/app/models/course';
import { Professor } from 'src/app/models/professor';
import { Semester } from 'src/app/models/semester';
import { Classe } from 'src/app/models/classe';
import { EptService } from 'src/app/services/ept.service';
import { Departement } from 'src/app/models/departement';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Component, Input, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-payements-print',
  templateUrl: './payements-print.component.html',
  styleUrls: ['./payements-print.component.scss'],
})
export class PayementsPrintComponent implements OnInit {
  departement!: Departement;
  @Input() classe!: Classe;
  @Input() semester!: Semester;
  @Input() professor!: Professor;
  @Input() course!: Course;
  @Input() courseDo!: CoursesDo;
  date = new Date();
  isLoad = false;
  constructor(private refModal: NzModalRef, private eptService: EptService) {}

  ngOnInit(): void {
    this.departement = this.eptService.departement();
  }

  destroyModal() {
    this.refModal.destroy(null);
  }

  print() {
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
