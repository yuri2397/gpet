import { ModalRef, MODAL_DATA } from 'src/app/shared/services/modal.service';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Classe } from 'src/app/models/classe';
import { Course } from 'src/app/models/course';
import { EPT } from 'src/app/models/ept';
import { EptRow } from 'src/app/models/ept-row';
import { Professor } from 'src/app/models/professor';
import { Salle } from 'src/app/models/salle';
import { EptService } from 'src/app/services/ept.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ProfessorService } from 'src/app/services/professor.service';
import { SalleService } from 'src/app/services/salle.service';
import { IconComponent } from 'src/app/shared/ui/icon/icon.component';
import { SelectSearchComponent } from 'src/app/shared/ui/select-search/select-search.component';

@Component({
  selector: 'app-ept-create',
  standalone: true,
  imports: [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  IconComponent,
  SelectSearchComponent,
  ],
  templateUrl: './ept-create.component.html',
  styleUrls: ['./ept-create.component.scss'],
})
export class EptCreateComponent implements OnInit {
  day!: EptRow;
  classe!: Classe;
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  salles: Salle[] = [];
  professors: Professor[] = [];
  groups: string[] = [];
  isSallesLoad = false;
  isProfessorsLoad = false;
  validateForm!: FormGroup;
  isLoad: boolean = false;
  ept = new EPT();

  selectedCourse: Course | null = null;
  selectedSalle: Salle | null = null;
  selectedProfessor: Professor | null = null;

  private notification = inject(NotificationService);
  private fb = inject(FormBuilder);
  private modal = inject(ModalRef);
  private eptService = inject(EptService);
  private salleService = inject(SalleService);
  private professorService = inject(ProfessorService);
  private modalData = inject(MODAL_DATA, { optional: true });

  ngOnInit(): void {
    if (this.modalData) {
      this.day = this.modalData.day;
      this.classe = this.modalData.classe;
      this.courses = this.modalData.courses ?? [];
    }
    this.filteredCourses = [...this.courses];
    this.ept.day = this.day.day;
    this.ept.classe_id = this.classe.id;

    this.validateForm = this.fb.group({
      start: [null, [Validators.required]],
      end: [null, [Validators.required]],
      course_id: [null, [Validators.required]],
      group: [1, []],
      salle_id: [null, []],
      professor_id: [null, []],
    });
  }

  courseLabel = (c: Course) => {
    const service = c.service?.name ? `${c.service.name} - ` : '';
    return `${service}${c.name}`;
  };

  courseSublabel = (c: Course) => {
    const prof = c.professor;
    if (prof?.id) {
      return `Prof. ${prof.first_name ?? ''} ${prof.last_name ?? ''}`.trim();
    }
    return 'Aucun professeur assigné';
  };

  salleLabel = (s: Salle) => s.name ?? `Salle n° ${s.number}`;
  salleSublabel = (s: Salle) =>
    s.capacity ? `Capacité: ${s.capacity}` : '';

  professorLabel = (p: Professor) => {
    const reg = p.registration_number ? `#${p.registration_number} ` : '';
    return `${reg}${p.first_name ?? ''} ${p.last_name ?? ''}`.trim();
  };
  professorSublabel = (p: Professor) => p.email ?? '';

  onCourseSearch(query: string) {
    const q = (query ?? '').trim().toLowerCase();
    if (!q) {
      this.filteredCourses = [...this.courses];
      return;
    }
    this.filteredCourses = this.courses.filter((c) =>
      [c.name, c.acronym, c.service?.name]
        .filter(Boolean)
        .some((v) => (v as string).toLowerCase().includes(q))
    );
  }

  onCourseChange(course: Course | null) {
    this.selectedCourse = course;
    this.ept.course.id = (course?.id ?? null) as any;
    this.validateForm.patchValue({ course_id: course?.id ?? null });

    if (course) {
      this.setGroupes(course.id);
      if (course.professor && course.professor.id) {
        this.onProfessorChange(course.professor);
      }
    } else {
      this.groups = [];
      this.onProfessorChange(null);
    }
  }

  setGroupes(id: number) {
    if (id) {
      let c = this.courses.find((e) => e.id == id)?.groupe_number ?? 1;
      this.groups = [];
      for (let index = 0; index < c; index++) {
        this.groups.push((index + 1).toString());
      }
    }
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
  }

  onSalleSearch(value: string) {
    this.isSallesLoad = true;
    this.salleService.search(value).subscribe({
      next: (salles) => {
        this.salles = salles;
        this.isSallesLoad = false;
      },
      error: () => {
        this.isSallesLoad = false;
      },
    });
  }

  onSalleChange(salle: Salle | null) {
    this.selectedSalle = salle;
    this.ept.salle.id = (salle?.id ?? null) as any;
    this.validateForm.patchValue({ salle_id: salle?.id ?? null });
  }

  onProfessorSearch(value: string) {
    this.isProfessorsLoad = true;
    this.professorService.search(value).subscribe({
      next: (data) => {
        this.professors = data;
        this.isProfessorsLoad = false;
      },
      error: () => {
        this.isProfessorsLoad = false;
      },
    });
  }

  onProfessorChange(prof: Professor | null) {
    this.selectedProfessor = prof;
    this.ept.professor_id = (prof?.id ?? null) as any;
    this.validateForm.patchValue({ professor_id: prof?.id ?? null });
  }

  destroyModal(data: EPT | null): void {
    this.modal.destroy(data);
  }

  startDes = (): number[] => {
    let tab = [];
    for (let index = 21; index < 24; index++) {
      tab.push(index);
    }
    for (let index = 0; index < 8; index++) {
      tab.push(index);
    }
    return tab;
  };

  endDes = (): number[] => {
    let tab = [];
    for (let index = 21; index < 24; index++) {
      tab.push(index);
    }
    for (let index = 0; index < 8; index++) {
      tab.push(index);
    }
    return tab;
  };

  save() {
    this.isLoad = true;

    this.eptService.create(this.ept).subscribe({
      next: (response) => {
        this.isLoad = false;
        this.notification.createNotification(
          'success',
          'Notification',
          'EPT ajouté avec succés.'
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
}
