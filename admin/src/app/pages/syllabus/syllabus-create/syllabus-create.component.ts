import { Component, Input, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Course } from 'src/app/models/course';
import { Syllabus } from 'src/app/models/syllabus';
import { SyllabusService } from './../../../services/syllabus.service';


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
    private modal: NzModalRef,
    private syllabusService: SyllabusService,
    private notification : NzNotificationService
    ) { }

  ngOnInit(): void {
    this.syllabus.course_id = this.course.id;
    this.syllabus.description = '';
  }

  name = 'Angular 6';

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '40rem',
    minHeight: '20rem',
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

  save() {
    console.log(this.syllabus);
    this.isLoad = true;
    this.syllabusService.create(this.syllabus).subscribe({
      next: (response) => {
        this.notification.success(
          'Notification',
          'Syllabus ajouté avec succès.'
        );
        console.log(response);
        this.destroyModal();
      },
      error: (errors) => {
        this.isLoad = false;
        if (errors.status != 403)
          this.notification.error('Notification', errors.error.message);
        this.destroyModal();
        console.log(errors);
      },
    });
  }

  destroyModal(): void {
    this.modal.destroy();
  }


}
