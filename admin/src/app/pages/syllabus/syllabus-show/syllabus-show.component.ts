import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { IconComponent } from 'src/app/shared/ui/icon/icon.component';
import { SyllabusService } from 'src/app/services/syllabus.service';
import { Course } from 'src/app/models/course';
import { Syllabus } from 'src/app/models/syllabus';

@Component({
  selector: 'app-syllabus-show',
  standalone: true,
  imports: [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  IconComponent,
  ],
  templateUrl: './syllabus-show.component.html',
  styleUrls: ['./syllabus-show.component.scss'],
})
export class SyllabusShowComponent implements OnInit {
  isLoad: boolean = false;
  syllabus = new Syllabus();
  dataLoad = true;
  errorServer = false;
  @Input() course!: Course;

  private syllabusService = inject(SyllabusService);
  private route = inject(ActivatedRoute);
  private location = inject(Location);

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
    this.syllabus.course_id = params['id'];
    });
    this.find(this.syllabus.course_id);
  }

  name = 'Angular 6';
  config: any = {
    editable: false,
    spellcheck: false,
    showToolbar : false,
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
