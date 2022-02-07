import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Bank } from 'src/app/models/bank';
import { BankService } from 'src/app/services/bank.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-bank-edit',
  templateUrl: './bank-edit.component.html',
  styleUrls: ['./bank-edit.component.scss']
})
export class BankEditComponent implements OnInit {

  @Input()bank: Bank = new Bank();
  validateForm!: FormGroup;
  isLoad = false;
  constructor(
    private notification: NotificationService,
    private fb: FormBuilder,
    private bankService: BankService,
    private modalRef: NzModalRef
  ) {}

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
    this.bankService.edit(this.bank).subscribe({
      next: response => {
        this.isLoad=false;
        this.notification.createNotification(
          'success',
          'Notification',
          "Banque modifiée avec succès."
        );
        this.modalRef.destroy(response)
      },
      error: errors => {
        this.isLoad = false;
        this.notification.createNotification(
          'error',
          'Erreur',
          errors.error.message
        );
      }
    })
  }

  close() {
    this.modalRef.destroy(null);
  }
}
