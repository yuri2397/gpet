import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Course } from 'src/app/models/course';
import { Syllabus } from 'src/app/models/syllabus';
import { NotificationService } from 'src/app/services/notification.service';
import { SyllabusService } from 'src/app/services/syllabus.service';
import { IconComponent } from 'src/app/shared/ui/icon/icon.component';

@Component({
  selector: 'app-syllabus-edit',
  standalone: true,
  imports: [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  IconComponent,
  ],
  templateUrl: './syllabus-edit.component.html',
  styleUrls: ['./syllabus-edit.component.scss']
})
export class SyllabusEditComponent implements OnInit {
  private syllabusService = inject(SyllabusService);
  private notification = inject(NotificationService);
  private route = inject(ActivatedRoute);
  private location = inject(Location);

  syllabus = new Syllabus();
  isLoad: boolean = false;
  dataLoad = true;
  errorServer = false;
  @Input() course!: Course;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
    this.syllabus.course_id = params['id'];
    this.find(this.syllabus.course_id);
    });
    console.log(this.syllabus)
  }

  name = 'Angular 6';
  config: any = {
    editable: true,
    spellcheck: true,
    height: '50rem',
    minHeight: '35rem',
    placeholder: this.syllabus.description,
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
      ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };

  onBack() {
    this.location.back();
  }

  save() {
   this.isLoad = true;
    setTimeout(() => {
      this.isLoad = false;
    }, 10000)
    this.syllabusService.edit(this.syllabus).subscribe({
      next: (response) => {
        this.isLoad = false;
        this.notification.createNotification(
          'success',
          'Notification',
          'Syllabus modifié avec succès.',
        );
        this.onBack();
      },
      error: (errors) => {
        this.isLoad = false;
        if (errors.status != 403)
          this.notification.createNotification(
            'error',
            'erreur',
          errors.error.message);
      },
    });
  }

  find(id: number){
    this.dataLoad = true;
    this.errorServer = false;
    this.syllabusService.find(id).subscribe({
      next: (syllabus) => {
        this.syllabus = syllabus;
        this.dataLoad = false;
      },
      error: (errors) => {
        if (errors.status == 0) {
          this.errorServer = true;
        } else {
          this.dataLoad = false;
        }
      },
    });
  }

}
