import { Departement } from 'src/app/models/departement';
import { Semester } from './../../../models/semester';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { SemesterService } from './../../../services/semester.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-semester-create',
  templateUrl: './semester-create.component.html',
  styleUrls: ['./semester-create.component.scss'],
})
export class SemesterCreateComponent implements OnInit {
  validateForm!: FormGroup;
  @Input() departement!: Departement;
  isLoad: boolean = false;
  semester = new Semester();
  constructor(
    private semesterService: SemesterService,
    private modelRef: NzModalRef,
    private notification: NzNotificationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.semester.departement_id = this.departement.id;
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
    });
  }

  save() {
    this.isLoad = true;
    this.semesterService.create(this.semester).subscribe({
      next: (response) => {
        this.notification.success(
          'Notification',
          'Semestre ajouté avec succès.'
        );
        this.destroyModal(response);
      },
      error: (errors) => {
        this.isLoad = false;
        if (errors.status != 403)
          this.notification.error('Notification', errors.error.message);
        this.destroyModal(null);
      },
    });
  }

  destroyModal(data: Semester | null) {
    this.modelRef.destroy(data);
  }
}
