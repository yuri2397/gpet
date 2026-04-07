import { ModalRef, MODAL_DATA } from 'src/app/shared/services/modal.service';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Classe } from 'src/app/models/classe';
import { Course } from 'src/app/models/course';
import { EPT } from 'src/app/models/ept';
import { EptRow } from 'src/app/models/ept-row';
import { Salle } from 'src/app/models/salle';
import { EptService } from 'src/app/services/ept.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SalleService } from 'src/app/services/salle.service';
import { IconComponent } from 'src/app/shared/ui/icon/icon.component';

@Component({
  selector: 'app-ept-create',
  standalone: true,
  imports: [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  IconComponent,
  ],
  templateUrl: './ept-create.component.html',
  styleUrls: ['./ept-create.component.scss'],
})
export class EptCreateComponent implements OnInit {
  day!: EptRow;
  classe!: Classe;
  courses!: Course[];
  salles!: Salle[];
  groups: string[] = [];
  isSallesLoad = true;
  validateForm!: FormGroup;
  isLoad: boolean = false;
  ept = new EPT();

  private notification = inject(NotificationService);
  private fb = inject(FormBuilder);
  private modal = inject(ModalRef);
  private eptService = inject(EptService);
  private salleService = inject(SalleService);
  private modalData = inject(MODAL_DATA, { optional: true });

  ngOnInit(): void {
    if (this.modalData) {
      this.day = this.modalData.day;
      this.classe = this.modalData.classe;
      this.courses = this.modalData.courses;
    }
    this.ept.day = this.day.day;
    this.ept.classe_id = this.classe.id;

    this.validateForm = this.fb.group({
      start: [null, [Validators.required]],
      end: [null, [Validators.required]],
      course_id: [null, [Validators.required]],
      group: [1, []],
      salle_id: [null, []],
    });
  }

  setGroupes(id: number) {
    if (id) {
      let c = this.courses.find((e) => e.id == id)?.groupe_number ?? 1;
      this.groups = [];
      for (let index = 0; index < c; index++) {
        this.groups.push((index + 1).toString());
      }
    }
  }

  findSalle() {
    this.isSallesLoad = true;
    this.salleService.findAll().subscribe({
      next: (salles) => {
        this.salles = salles;
        this.isSallesLoad = false;
      },
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
  }

  onSalleSearch(data: string) {
    this.isSallesLoad = true;
    if (data && data.length >= 1)
      this.salleService.search(data).subscribe({
        next: (salles) => {
          this.salles = salles;
          this.isSallesLoad = false;
        },
        error: (errors) => {
          this.isSallesLoad = false;
        },
      });
  }

  destroyModal(data: EPT | null): void {
    this.modal.destroy(data);
  }

  startDes = (): number[] => {
    let tab = [];
    for (let index = 21; index < 24; index++) {
      tab.push(index);
    }
    for (let index = 0; index < 8; index++) {
      tab.push(index);
    }
    return tab;
  };

  endDes = (): number[] => {
    let tab = [];
    for (let index = 21; index < 24; index++) {
      tab.push(index);
    }
    for (let index = 0; index < 8; index++) {
      tab.push(index);
    }
    return tab;
  };

  save() {
    this.isLoad = true;

    this.eptService.create(this.ept).subscribe({
      next: (response) => {
        this.isLoad = false;
        this.notification.createNotification(
          'success',
          'Notification',
          'EPT ajouté avec succés.'
        );
        this.destroyModal(response);
      },
      error: (errors) => {
        this.isLoad = false;
        this.notification.createNotification(
          'error',
          'Erreur',
          errors.error.message
        );

        this.destroyModal(null);
      },
    });
  }
}
