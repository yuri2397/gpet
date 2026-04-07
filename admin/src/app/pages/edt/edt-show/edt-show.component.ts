import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EptService } from 'src/app/services/ept.service';
import { Classe } from 'src/app/models/classe';
import { Departement } from 'src/app/models/departement';
import { EptRow } from 'src/app/models/ept-row';
import { Day } from 'src/app/models/day';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconComponent } from 'src/app/shared/ui/icon/icon.component';
import { LoadComponent } from 'src/app/shared/ui/table-load/load.component';

@Component({
  selector: 'app-edt-show',
  standalone: true,
  imports: [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  IconComponent,
  LoadComponent,
  ],
  templateUrl: './edt-show.component.html',
  styleUrls: ['./edt-show.component.scss'],
})
export class EdtShowComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private edtService = inject(EptService);

  epts!: EptRow[];
  isLoad = true;
  departement!: Departement;
  classe!: Classe;
  token!: string;
  now = new Date();
  days!: Day[];
  hasError: boolean = false;

  ngOnInit(): void {
    this.days = this.edtService.DAYS;
    this.route.params.subscribe((params) => {
      this.departement = params['departement'];
      this.classe = params['classe'];
      this.token = params['token'];
      this.getEDT();
    });
  }

  exportPDF() {}

  getEDT() {
    this.isLoad = true;
    this.hasError = false;
    this.edtService.getEDT(this.departement, this.classe).subscribe({
      next: (response) => {
        this.epts = response;
        this.isLoad = false;
      },
      error: (errors) => {
        this.hasError = true;
        this.isLoad = false;
      },
    });
  }
  pipeHours(hour: Date) {
    return hour.toString().substring(0, 5);
  }
}
