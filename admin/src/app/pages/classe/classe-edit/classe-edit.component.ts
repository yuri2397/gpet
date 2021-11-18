import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Classe } from 'src/app/models/classe';
import { Departement } from 'src/app/models/departement';
import { ClasseService } from 'src/app/services/classe.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-classe-edit',
  templateUrl: './classe-edit.component.html',
  styleUrls: ['./classe-edit.component.scss']
})
export class ClasseEditComponent implements OnInit {

  @Input() classe!: Classe;
  @Input() departement!: Departement;

  validateForm!: FormGroup;
  isLoad: boolean = false;
  constructor(
    private notification: NotificationService,
    private fb: FormBuilder,
    private modal: NzModalRef,
    private classeService: ClasseService
  ) {}

  ngOnInit(): void {
    this.classe.departement_id = this.departement.id;
    this.validateForm = this.fb.group({
      name: [null, [Validators.required, Validators.min(2)]],
      nb_etudiants: [null, [Validators.required]],
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


  destroyModal(data: Classe | null): void {
    this.modal.destroy(data);
  }

  save() {
    this.isLoad = true;
    this.classeService.edit(this.classe).subscribe({
      next: (response) => {
        this.isLoad = false;
        this.notification.createNotification(
          'success',
          'Notification',
          "Classe modifiée avec succés.",
        );
        this.destroyModal(response);
      },
      error: (errors) => {
        this.isLoad = false;
        console.log(errors);
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
