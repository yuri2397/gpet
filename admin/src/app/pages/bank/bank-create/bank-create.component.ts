import { ModalRef } from 'src/app/shared/services/modal.service';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Bank } from 'src/app/models/bank';
import { BankService } from 'src/app/services/bank.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-bank-create',
  standalone: true,
  imports: [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  ],
  templateUrl: './bank-create.component.html',
  styleUrls: ['./bank-create.component.scss'],
})
export class BankCreateComponent implements OnInit {
  private notification = inject(NotificationService);
  private fb = inject(FormBuilder);
  private bankService = inject(BankService);
  private modalRef = inject(ModalRef);

  bank: Bank = new Bank();
  validateForm!: FormGroup;
  isLoad = false;

  ngOnInit() {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required, Validators.min]],
      code: [null, [Validators.required]],
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

  destroyModal(data: Bank | null): void {
    this.modalRef.close(data);
  }

  save() {
    this.isLoad = true;
    this.bankService.create(this.bank).subscribe({
      next: response => {
        this.isLoad = false;
        this.notification.createNotification(
          'success',
          'Notification',
          "Nouvelle banque ajoutée avec succès."
        );
        this.modalRef.close(response);
      },
      error: errors => {
        this.isLoad = false;
        this.notification.createNotification(
          'error',
          'Erreur',
          errors.error.message
        );
      }
    });
  }

  close() {
    this.modalRef.close(null);
  }
}
