import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/models/course';
import { Syllabus } from 'src/app/models/syllabus';
import { NotificationService } from 'src/app/services/notification.service';
import { SyllabusService } from 'src/app/services/syllabus.service';
import { Location } from '@angular/common';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-syllabus-edit',
  templateUrl: './syllabus-edit.component.html',
  styleUrls: ['./syllabus-edit.component.scss']
})
export class SyllabusEditComponent implements OnInit {
   syllabus = new Syllabus();
   isLoad: boolean = false;
   dataLoad = true;
   errorServer = false;
   @Input() course!: Course;

  constructor(
    private syllabusService : SyllabusService,
    private notification: NotificationService,
    private route: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
    this.syllabus.course_id = params['id'];
    this.find(this.syllabus.course_id);
    });
  }

  name = 'Angular 6';
  config: AngularEditorConfig = {
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
    console.log(this.syllabus.description)
    this.isLoad = true;
    this.syllabusService.edit(this.syllabus).subscribe({
      next: (response) => {
        this.isLoad = false;
        this.notification.createNotification(
          'success',
          'Notification',
          'Syllabus modifié avec succès.',
        );
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
