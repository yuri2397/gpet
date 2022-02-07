import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { Bank } from 'src/app/models/bank';
import { BankService } from 'src/app/services/bank.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-bank-create',
  templateUrl: './bank-create.component.html',
  styleUrls: ['./bank-create.component.scss'],
})
export class BankCreateComponent implements OnInit {
  bank: Bank = new Bank();
  validateForm!: FormGroup;
  isLoad = false;
  constructor(
    private notification: NotificationService,
    private fb: FormBuilder,
    private bankService: BankService,
    private drawerRef: NzDrawerRef
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
    this.drawerRef.close(data);
  }

  save() {
    this.isLoad = true;
    this.bankService.create(this.bank).subscribe({
      next: response => {
        this.isLoad=false;
        this.notification.createNotification(
          'success',
          'Notification',
          "Nouvelle banque ajoutée avec succès."
        );
        this.drawerRef.close(response)
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
    this.drawerRef.close(null);
  }
}
