import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Course } from 'src/app/models/course';
import { Syllabus } from 'src/app/models/syllabus';
import { SyllabusService } from './../../../services/syllabus.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-syllabus-create',
  templateUrl: './syllabus-create.component.html',
  styleUrls: ['./syllabus-create.component.scss']
})
export class SyllabusCreateComponent implements OnInit {
  isLoad: boolean = false;
  syllabus = new Syllabus();
  @Input() course!: Course;

  constructor(
    private syllabusService: SyllabusService,
    private notification : NzNotificationService,
    private route: ActivatedRoute,
    private location: Location,
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
    this.syllabus.course_id = params['id'];
    });
  }

  name = 'Angular 6';
  config: AngularEditorConfig = {
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
    this.location.back();
  }

  save() {
    this.isLoad = true;
    this.syllabusService.create(this.syllabus).subscribe({
      next: (response) => {
        this.notification.success(
          'Notification',
          'Syllabus ajouté avec succès.'
        );
      },
      error: (errors) => {
        this.isLoad = false;
        if (errors.status != 403)
          this.notification.error('Notification', errors.error.message);
      },
    });
  }


}
