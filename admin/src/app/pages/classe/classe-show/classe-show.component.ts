import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { PdfService } from './../../../services/pdf.service';
import { CommonModule, DatePipe, UpperCasePipe, Location } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
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
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import jsPDF from 'jspdf';
import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
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
  NzFormModule,
  NzInputModule,
  NzButtonModule,
  NzTableModule,
  NzModalModule,
  NzSelectModule,
  NzIconModule,
  NzSpinModule,
  NzTagModule,
  NzDropDownModule,
  NzDividerModule,
  NzToolTipModule,
  NzAlertModule,
  NzPopconfirmModule,
  NzDrawerModule,
  NzCardModule,
  NzAvatarModule,
  NzEmptyModule,
  NzPageHeaderModule,
  NzResultModule,
  NzSkeletonModule,
  NzTabsModule,
  NzCollapseModule,
  NzDatePickerModule,
  NzTimePickerModule,
  NzLayoutModule,
  NzMenuModule,
  NzListModule,
  NzSpaceModule,
  NzStatisticModule,
  NzTimelineModule,
  NzImageModule,
  NzAutocompleteModule,
  NzUploadModule,
  NzStepsModule,
  NzMessageModule,
  NzNotificationModule,
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

  private route = inject(ActivatedRoute);
  private location = inject(Location);
  classeService = inject(ClasseService);
  private notification = inject(NotificationService);
  eptService = inject(EptService);
  private fb = inject(FormBuilder);
  private modalService = inject(NzModalService);
  private pdfService = inject(PdfService);

  ngOnInit(): void {
    this.days = this.classeService.DAYS;
    this.route.params.subscribe((params) => {
      this.classe.id = params['id'];
    });

    this.getClasse();
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
      nzData: {
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
    const modal = this.modalService.create({
      nzTitle: "Ajoute un cour dans l'emploi du temps.",
      nzContent: EptCreateComponent,
      nzData: {
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
