import { ModalService } from 'src/app/shared/services/modal.service';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { PdfService } from './../../../services/pdf.service';
import { CommonModule, DatePipe, UpperCasePipe, Location } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { IconComponent } from 'src/app/shared/ui/icon/icon.component';
import { Classe } from 'src/app/models/classe';
import { ClasseService } from 'src/app/services/classe.service';
import { Departement } from 'src/app/models/departement';
import { Course } from 'src/app/models/course';
import { NotificationService } from 'src/app/services/notification.service';
import { EptService } from 'src/app/services/ept.service';
import { EPT } from 'src/app/models/ept';
import { EptRow } from 'src/app/models/ept-row';
import { EptCreateComponent } from '../ept-create/ept-create.component';
import { EptEditComponent } from '../ept-edit/ept-edit.component';
import { Day } from 'src/app/models/day';
import jsPDF from 'jspdf';
import { Component, ElementRef, OnInit, ViewChild, inject, signal } from '@angular/core';
import { LoadComponent } from 'src/app/shared/ui/table-load/load.component';
import { ErrorServerComponent } from 'src/app/shared/ui/error-server/error-server.component';
import { CourseListComponent } from 'src/app/pages/course/course-list/course-list.component';

@Component({
  selector: 'app-classe-show',
  standalone: true,
  imports: [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  IconComponent,
  LoadComponent,
  ErrorServerComponent,
  CourseListComponent,
  ],
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
  @ViewChild('presentionEPT') htmlData!: ElementRef;
  fileLoad: boolean = false;
  activeTab = signal(0);
  activeSubTab = signal(0);
  accordionOpen = signal<Record<number, boolean>>({});

  private route = inject(ActivatedRoute);
  private location = inject(Location);
  classeService = inject(ClasseService);
  private notification = inject(NotificationService);
  eptService = inject(EptService);
  private fb = inject(FormBuilder);
  private modalService = inject(ModalService);
  private pdfService = inject(PdfService);

  totalSeances() {
    if (!this.epts) return 0;
    return this.epts.reduce((sum, e) => sum + (e.data?.length || 0), 0);
  }

  ngOnInit(): void {
    this.days = this.classeService.DAYS;
    this.route.params.subscribe((params) => {
      this.classe.id = params['id'];
    });

    this.getClasse();
  }

  toggleAccordion(index: number) {
    const current = this.accordionOpen();
    const updated = { ...current };
    // Close all others (accordion behavior)
    for (const key in updated) {
      updated[key] = false;
    }
    updated[index] = !current[index];
    this.accordionOpen.set(updated);
  }

  exportPDF() {
    this.fileLoad = true;

    this.pdfService.downloadEDT(this.classe.id).subscribe((response) => {
      console.log(response);
      let newIframe = document.createElement('iframe');
      document.body.appendChild(newIframe);
      // @ts-ignore
      newIframe.contentWindow.contents = response;
      newIframe.src = "javascript:window['contents']";
      newIframe.focus();
      setTimeout(() => {
        newIframe.contentWindow?.print();
      }, 1);
    });
  }

  getEmploieDuTemps(classe: Classe) {
    this.eptLoad = true;
    this.eptService.show(classe).subscribe({
      next: (data) => {
        this.epts = data;
        this.eptLoad = false;
        console.log('DATA', data);
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
    this.modalService.confirm({
      title: 'Merci de confirmer votre action.',
      okText: 'Supprimer',
      okDanger: true,
      onOk: () => {
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
      },
    });
  }

  editEPT(panel: EptRow, item: EPT) {
    const modal = this.modalService.open({
      title: "Modifier le cour dans l'emploi du temps.",
      component: EptEditComponent,
      data: {
        day: panel,
        classe: this.classe,
        courses: this.courses,
        ept: this.eptService.clone(item),
      },
    });

    modal.afterClose.subscribe((data: EPT | null) => {
      if (data != null) {
        panel.data.forEach((element) => {
          if (element.id == data.id) {
          }
        });
        for (const key in panel.data) {
          if (Object.prototype.hasOwnProperty.call(panel.data, key)) {
            const element = panel.data[key];
            if (element.id == data.id) {
              panel.data[key] = data;
              break;
            }
          }
        }
      }
    });
  }

  openCreateModal(panel: EptRow) {
    const modal = this.modalService.open({
      title: "Ajoute un cour dans l'emploi du temps.",
      component: EptCreateComponent,
      size: 'lg',
      data: {
        day: panel,
        classe: this.classe,
        courses: this.courses,
      },
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
