import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Classe } from 'src/app/models/classe';
import { Course } from 'src/app/models/course';
import { EPT } from 'src/app/models/ept';
import { EptRow } from 'src/app/models/ept-row';
import { Salle } from 'src/app/models/salle';
import { EptService } from 'src/app/services/ept.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SalleService } from 'src/app/services/salle.service';

@Component({
  selector: 'app-ept-edit',
  templateUrl: './ept-edit.component.html',
  styleUrls: ['./ept-edit.component.scss'],
})
export class EptEditComponent implements OnInit {
  @Input() day!: EptRow;
  @Input() classe!: Classe;
  @Input() courses!: Course[];
  salles!: Salle[];
  isSallesLoad = true;
  validateForm!: FormGroup;
  isLoad: boolean = false;
  endDis: number[] = [];
  @Input() ept = new EPT();
  groups: string[] = [];

  constructor(
    private notification: NotificationService,
    private fb: FormBuilder,
    private modal: NzModalRef,
    private eptService: EptService,
    private salleService: SalleService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      start: [null, [Validators.required]],
      end: [null, [Validators.required]],
      course_id: [null, [Validators.required]],
      salle_id: [null, []],
      group: [null, []],
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

  setGroupes(id: number) {
    if (id) {
      let c = this.courses.find((e) => e.id == id)?.groupe_number ?? 1;
      this.groups = [];
      for (let index = 0; index <= c; index++) {
        this.groups.push((index).toString());
      }
    }
  }

  onSalleSearch(data: string) {
    this.isSallesLoad = true;
    if (data && data.length >= 3)
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
    let tab = this.startDes();
    return tab;
  };

  edit() {
    this.isLoad = true;
    this.eptService.update(this.ept).subscribe({
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
