import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Subscription } from 'rxjs';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';
import { RessourceService } from 'src/app/services/ressource.service';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss'],
})
export class ResourcesComponent implements OnInit {
  inputValue!: any;
  options!: Course[];
  searchLoad!: boolean;
  selectedCourse!: Course;
  file!: File;
  fileList!: any[];
  constructor(
    private courseService: CourseService,
    private resService: RessourceService,
    private msg: NzMessageService
  ) {}

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

  upload = (file: NzUploadFile): string | Observable<string> => {
    return this.resService.uploadUrl(this.selectedCourse)
  }

  handleChange({ file, fileList }: NzUploadChangeParam): void {
    const status = file.status;
    if (status !== 'uploading') {
      this.fileList = fileList;
    }
    if (status === 'done') {
      this.msg.success(`${file.name} fichier téléchargé avec succès.`);
    } else if (status === 'error') {
      this.msg.error(`${file.name} le téléchargement du fichier a échoué.`);
    }
  }
  
}
