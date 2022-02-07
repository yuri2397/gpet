import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Classe } from 'src/app/models/classe';
import { ClasseService } from 'src/app/services/classe.service';
import { Location } from '@angular/common';
import { Departement } from 'src/app/models/departement';
import { Course } from 'src/app/models/course';
import { NotificationService } from 'src/app/services/notification.service';
import { EptService } from 'src/app/services/ept.service';
import { EPT } from 'src/app/models/ept';
import { EptRow } from 'src/app/models/ept-row';
import { FormBuilder } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { EptCreateComponent } from '../ept-create/ept-create.component';
import { EptEditComponent } from '../ept-edit/ept-edit.component';
import { Day } from 'src/app/models/day';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-classe-show',
  templateUrl: './classe-show.component.html',
  styleUrls: ['./classe-show.component.scss'],
})
export class ClasseShowComponent implements OnInit {
  dataLoad = true;
  errorNetWork = false;
  classe: Classe = new Classe();
  courses!: Course[];
  departement!: Departement;
  depName!: string;
  epts!: EptRow[];
  eptLoad: boolean = true;
  days!: Day[];
  doc = new jsPDF();
  now = new Date();
  @ViewChild('presentionEPT') htmlData!:ElementRef;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    public classeService: ClasseService,
    private notification: NotificationService,
    public eptService: EptService,
    private fb: FormBuilder,
    private modalService: NzModalService
  ) {}


  ngOnInit(): void {
    this.days = this.classeService.DAYS;
    this.route.params.subscribe((params) => {
      this.classe.id = params['id'];
    });

    this.getClasse();
  }

  exportPDF(){
    let DATA = document.getElementById('presentionEPT');
      
    html2canvas(DATA!).then(canvas => {
        
        let fileWidth = 208;
        let fileHeight = canvas.height * fileWidth / canvas.width;
        
        const FILEURI = canvas.toDataURL('image/png')
        let PDF = new jsPDF('p', 'mm', 'a4', false);
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)
        
        PDF.save( this.classe.name + '.pdf');
    }); 
  }

  getEmploieDuTemps(classe: Classe) {
    this.eptLoad = true;
    this.eptService.show(classe).subscribe({
      next: (data) => {
        this.epts = data;
        this.eptLoad = false;
      },
      error: (errors) => {
        this.errorNetWork = true;
        this.eptLoad = false;
        this.dataLoad = false;
        this.notification.createNotification(
          'error',
          'Emploie du temps',
          errors.erroor
        );
      },
    });
  }

  pipeHours(hour: Date) {
    return hour.toString().substring(0, 5);
  }

  getClasse() {
    this.classeService.show(this.classe).subscribe({
      next: (response) => {
        this.classe = response;
        this.courses = response.courses;
        this.departement = response.departement;
        this.depName = this.departement.name;
        this.dataLoad = false;
        this.getEmploieDuTemps(response);
      },
      error: (errors) => {
        this.errorNetWork = true;
        this.dataLoad = false;
        this.notification.createNotification(
          'error',
          'Récupération de donnée',
          errors.error
        );
      },
    });
  }

  onBack() {
    this.location.back();
  }

  removeEPT(panel: EptRow, item: EPT) {
    item.removeLoad = true;
    this.eptService.remove(item).subscribe({
      next: (response) => {
        panel.data.splice(panel.data.indexOf(item), 1);
        this.notification.createNotification(
          'success',
          'Notificatoin',
          'Donnée supprimée avec succès.'
        );
      },
      error: (errors) => {
        this.notification.createNotification('error', 'Erreur', errors.error);
      },
    });
  }

  editEPT(panel: EptRow, item: EPT) {
    const modal = this.modalService.create({
      nzTitle: "Modifier le cour dans l'emploi du temps.",
      nzContent: EptEditComponent,
      nzComponentParams: {
        day: panel,
        classe: this.classe,
        courses: this.courses,
        ept: this.eptService.clone(item),
      },
      nzCentered: true,
      nzMaskClosable: false,
      nzClosable: false,
      nzWidth: '500px',
    });

    modal.afterClose.subscribe((data: EPT | null) => {
      if (data != null) {
        this.onCreateSuccess(panel, data);
      }
    });
  }

  openCreateModal(panel: EptRow) {
    const modal = this.modalService.create({
      nzTitle: "Ajoute un cour dans l'emploi du temps.",
      nzContent: EptCreateComponent,
      nzComponentParams: {
        day: panel,
        classe: this.classe,
        courses: this.courses,
      },
      nzCentered: true,
      nzMaskClosable: false,
      nzClosable: false,
      nzWidth: '600px',
    });

    modal.afterClose.subscribe((data: EPT | null) => {
      if (data != null) {
        this.onCreateSuccess(panel, data);
      }
    });
  }
  onCreateSuccess(panel: EptRow, ept: EPT) {
    panel.data.push(ept);
  }
}
