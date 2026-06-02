import { UserService } from 'src/app/services/user.service';
import { Departement } from 'src/app/models/departement';
import { Professor } from 'src/app/models/professor';
import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IconComponent } from 'src/app/shared/ui/icon/icon.component';
import { ModalRef, MODAL_DATA } from 'src/app/shared/services/modal.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-payements-print-all',
  standalone: true,
  imports: [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  IconComponent,
  ],
  templateUrl: './payements-print-all.component.html',
  styleUrls: ['./payements-print-all.component.scss'],
})
export class PayementsPrintAllComponent implements OnInit {
  private ref = inject(ModalRef);
  private userService = inject(UserService);
  readonly modalData = inject(MODAL_DATA, { optional: true });

  @Input() professor!: Professor;
  departement!: Departement;
  isLoad = false;
  date = new Date();

  ngOnInit(): void {
    if (this.modalData?.professor) {
      this.professor = this.modalData.professor;
    }
    this.departement = this.userService.departement();
  }

  destroyModal() {
    this.ref.close(null);
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
