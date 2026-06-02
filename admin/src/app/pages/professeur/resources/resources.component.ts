import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';
import { RessourceService } from 'src/app/services/ressource.service';
import { RouterModule } from '@angular/router';
import { IconComponent } from 'src/app/shared/ui/icon/icon.component';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  IconComponent,
  ],
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss'],
})
export class ResourcesComponent implements OnInit {
  private courseService = inject(CourseService);
  private resService = inject(RessourceService);
  private notification = inject(NotificationService);

  inputValue!: any;
  options!: Course[];
  searchLoad!: boolean;
  selectedCourse!: Course;
  file!: File;
  fileList!: any[];

  ngOnInit(): void {}

  itemSelected(courseId: number) {
    if (courseId && this.options) {
      this.selectedCourse = this.options?.find(
        (e) => e.id === courseId
      ) as Course;
      this.fileList = this.selectedCourse?.media;
    }
  }

  onSearch(data: any) {
    data = data.target.value;
    if (data && data.length >= 3) {
      this.searchLoad = true;
      this.courseService.searchMyCourse(data).subscribe({
        next: (response) => {
          this.options = response;
          this.searchLoad = false;
        },
        error: (errors) => {
          console.log(errors);
          this.searchLoad = false;
        },
      });
    }
  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        this.file = files[i];
        // Upload logic would go here using resService
      }
    }
  }
}
