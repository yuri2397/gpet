import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { IconComponent } from 'src/app/shared/ui/icon/icon.component';
import { Course } from 'src/app/models/course';
import { Syllabus } from 'src/app/models/syllabus';
import { SyllabusService } from './../../../services/syllabus.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-syllabus-create',
  standalone: true,
  imports: [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  IconComponent,
  ],
  templateUrl: './syllabus-create.component.html',
  styleUrls: ['./syllabus-create.component.scss'],
})
export class SyllabusCreateComponent implements OnInit {
  isLoad = false;
  syllabus = new Syllabus();
  @Input() course!: Course;

  private syllabusService = inject(SyllabusService);
  private notification = inject(NotificationService);
  private route = inject(ActivatedRoute);
  private location = inject(Location);

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
    this.syllabus.course_id = params['id'];
    });
  }

  name = 'Angular 6';
  config: any = {
    editable: true,
    spellcheck: true,
    height: '50rem',
    minHeight: '35rem',
    placeholder: 'Enter text here...',
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
    this.isLoad = true;
    setTimeout(() => {
      this.isLoad = false;
    }, 10000)
    this.location.back();
  }

  save() {
    this.isLoad = true;
    setTimeout(() => {
      this.isLoad = false;
    }, 10000)
    this.syllabusService.create(this.syllabus).subscribe({
      next: (response) => {
        this.notification.createNotification(
          'success',
          'Notification',
          'Syllabus ajouté avec succès.'
        );
      },
      error: (errors) => {
        this.isLoad = false;
        if (errors.status != 403)
          this.notification.createNotification(
            'error',
            'Notification',
            errors.error.message
          );
      },
    });
    this.onBack();
  }
}
