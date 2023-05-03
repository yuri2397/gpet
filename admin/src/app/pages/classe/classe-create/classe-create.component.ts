import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Classe } from 'src/app/models/classe';
import { Departement } from 'src/app/models/departement';
import { ClasseService } from 'src/app/services/classe.service';
import { DepartementService } from 'src/app/services/departement.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-classe-create',
  templateUrl: './classe-create.component.html',
  styleUrls: ['./classe-create.component.scss']
})
export class ClasseCreateComponent implements OnInit {
  classe: Classe = new Classe();
  departements!: Departement[];
  @Input()  departement!: Departement;
  validateForm!: FormGroup;
  departementss = Departement;
  isLoad: boolean = false;
  isLoadData = false;
  isLoadDataBat = true;
 
  constructor(
    private notification: NotificationService,
    private fb: FormBuilder,
    private modal: NzModalRef,
    public classeService: ClasseService,
    private deptService: DepartementService,
  ) {}

  ngOnInit(): void {
    //this.classe.departement_id = this.departement.id;
    this.findDepartement();
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      departement_id: [null, [Validators.required]],
      nb_etudiants: [0, [Validators.required, Validators.min(0)]],
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
    this.classeService.create(this.classe).subscribe({
      next: (response) => {
        this.isLoad = false;
        this.notification.createNotification(
          'success',
          'Notification',
          "Classe ajouté avec succés.",
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

  findDepartement() {
    this.isLoadData = true;
    this.deptService.findAll().subscribe({
      next: (response) => {
        this.departements = response;
        this.isLoadData = false;
      },
      error: (errors) => {
        this.isLoadData = false;
      },
    });
  }

}

