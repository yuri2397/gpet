import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Salle } from 'src/app/models/salle';
import { Departement } from 'src/app/models/departement';
import { DepartementService } from 'src/app/services/departement.service';
import { Course } from 'src/app/models/course';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadComponent } from 'src/app/shared/ui/table-load/load.component';
import { ErrorServerComponent } from 'src/app/shared/ui/error-server/error-server.component';
import { CourseListComponent } from 'src/app/pages/course/course-list/course-list.component';
import { ClasseListComponent } from 'src/app/pages/classe/classe-list/classe-list.component';
import { ProfesseurListComponent } from 'src/app/pages/professeur/professeur-list/professeur-list.component';
import { SemesterListComponent } from 'src/app/pages/semester/semester-list/semester-list.component';
import { DataTableComponent } from 'src/app/shared/ui/data-table/data-table.component';

@Component({
  selector: 'app-departement-show',
  standalone: true,
  imports: [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  LoadComponent,
  ErrorServerComponent,
  CourseListComponent,
  ClasseListComponent,
  ProfesseurListComponent,
  SemesterListComponent,
  DataTableComponent,
  ],
  templateUrl: './departement-show.component.html',
  styleUrls: ['./departement-show.component.scss'],
})
export class DepartementShowComponent implements OnInit {
  private deptService = inject(DepartementService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private location = inject(Location);

  dataLoad = true;
  errorNetWork = false;
  listes!: Salle[];
  departement: Departement = new Departement();
  activeTab = 0;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.departement.id = params['id'];
    });
    this.find(this.departement);
  }

  showHeader() {
    return this.deptService.isAdmin();
  }

  onBack() {
    this.location.back();
  }

  find(departement: Departement) {
    this.dataLoad = true;
    this.deptService.find(departement).subscribe({
      next: (response) => {
        this.departement = response;
        this.dataLoad = false;
      },
      error: (errors) => {
        this.dataLoad = false;
      },
    });
  }

  onCoursesChanged(courses: Course[]) {
    this.departement.courses = courses;
  }
}
