import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UEService } from 'src/app/services/ue.service';
import { UE } from 'src/app/models/ue';
import { RouterModule } from '@angular/router';
import { IconComponent } from 'src/app/shared/ui/icon/icon.component';
import { ModalRef, MODAL_DATA } from 'src/app/shared/services/modal.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-ue-edit',
  standalone: true,
  imports: [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  IconComponent,
  ],
  templateUrl: './ue-edit.component.html',
  styleUrls: ['./ue-edit.component.scss'],
})
export class UeEditComponent implements OnInit {
  ue!: UE;
  validateForm!: FormGroup;
  isLoad = false;

  private modalRef = inject(ModalRef);
  private ueService = inject(UEService);
  private notification = inject(NotificationService);
  private fb = inject(FormBuilder);
  private modalData = inject(MODAL_DATA, { optional: true });

  ngOnInit(): void {
    if (this.modalData) {
      this.ue = this.modalData.ue;
    }
    this.validateForm = this.fb.group({
      name: [this.ue.name, [Validators.required]],
      code: [this.ue.code, [Validators.required]],
    });
  }

  destroyModal(data: UE | null) {
    this.modalRef.destroy(data);
  }

  save() {
    this.isLoad = true;
    this.ueService.edit(this.ue).subscribe({
      next: (response) => {
        this.notification.createNotification('success', 'Notification', 'EU modifié avec succès.');
        this.destroyModal(response);
      },
      error: (errors) => {
        console.log(errors);
        this.notification.createNotification('error', 'Notification', errors.error.message);
        this.isLoad = false;
        this.destroyModal(null);
      },
    });
  }
}
