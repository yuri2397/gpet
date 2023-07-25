import { UserService } from 'src/app/services/user.service';
import { Departement } from 'src/app/models/departement';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Professor } from 'src/app/models/professor';
import { Component, Input, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { number } from 'echarts';
@Component({
  selector: 'app-payements-print-all',
  templateUrl: './payements-print-all.component.html',
  styleUrls: ['./payements-print-all.component.scss'],
})
export class PayementsPrintAllComponent implements OnInit {
  @Input() professor!: Professor;
  departement!: Departement;
  isLoad = false;
  constructor(private ref: NzModalRef, private userService: UserService) {}
  date = new Date();
  total: number = 0;
  i : number = 0
  ngOnInit(): void {
    this.departement = this.userService.departement();
    for(this.i = 0 ;this.i < this.professor.coursesDo.length ; this.i++){
      const i =  Number(this.professor.coursesDo[this.i].total_sales)
      this.total += i;  
    }
  }

  destroyModal() {
    this.ref.destroy(null);
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
        this.professor.first_name + '_' + this.professor.last_name + '.pdf'
      );
      this.isLoad = false;
    });
  }
}
