import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Departement } from 'src/app/models/departement';
import { Semester } from 'src/app/models/semester';
import { SemesterService } from 'src/app/services/semester.service';
import { RouterModule } from '@angular/router';
import { IconComponent } from 'src/app/shared/ui/icon/icon.component';
import { ModalRef, MODAL_DATA } from 'src/app/shared/services/modal.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-semester-create',
  standalone: true,
  imports: [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  IconComponent,
  ],
  templateUrl: './semester-create.component.html',
  styleUrls: ['./semester-create.component.scss'],
})
export class SemesterCreateComponent implements OnInit {
  validateForm!: FormGroup;
  departement!: Departement;
  isLoad: boolean = false;
  semester = new Semester();

  private semesterService = inject(SemesterService);
  private modelRef = inject(ModalRef);
  private notification = inject(NotificationService);
  private fb = inject(FormBuilder);
  private modalData = inject(MODAL_DATA, { optional: true });

  ngOnInit(): void {
    if (this.modalData) {
      this.departement = this.modalData.departement;
    }
    this.semester.departement_id = this.departement.id;
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
    });
  }

  save() {
    this.isLoad = true;
    this.semesterService.create(this.semester).subscribe({
      next: (response) => {
        this.notification.createNotification(
          'success',
          'Notification',
          'Semestre ajouté avec succès.'
        );
        this.destroyModal(response);
      },
      error: (errors) => {
        this.isLoad = false;
        if (errors.status != 403)
          this.notification.createNotification('error', 'Notification', errors.error.message);
        this.destroyModal(null);
      },
    });
  }

  destroyModal(data: Semester | null) {
    this.modelRef.destroy(data);
  }
}
