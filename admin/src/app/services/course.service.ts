import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Course, CourseHistory, CourseResponse } from '../models/course'
import { Professor } from '../models/professor'
import { BaseHttp } from '../shared/base-http'

@Injectable({
  providedIn: 'root',
})
export class CourseService extends BaseHttp {
  protected _baseUrl = 'course'

  constructor(protected hc: HttpClient) {
    super()
    this.http = hc
  }

  clone(course: Course): Course {
    return JSON.parse(JSON.stringify(course)) as Course
  }

  findAll(page: number, pageSize: number, searchQuery?: string) {
    return this.http.get<CourseResponse>(
      this.endPoint +
      `?page=${page}&pageSize=${pageSize}&searchQuery=${searchQuery ?? ''}`,
    )
  }

  showBy(param: any) {
    return this.http.post<Course[]>(
      this.endPointWithSlash + 'create',
      {
        param: param,
      },
    )
  }

  create(course: Course) {
    return this.http.post<Course>(
      this.endPointWithSlash + 'create',
      {
        groupe_number: course.groupe_number,
        classe_id: course.classe_id,
        service_id: course.service_id,
        departement_id: course.departement_id,
        ec_id: course.ec_id,
        professor_id: course.professor_id,
      },
    )
  }

  show(course: Course) {
    return this.http.get<Course>(this.endPointWithSlash + 'show/' + course.id)
  }

  finishCourse(course: Course, status: 'finish' | 'load' | 'load' | 'cancel') {
    return this.http.put<Course>(
      this.endPointWithSlash + 'change-course-status/' + course.id,
      {
        status: status,
      },
    )
  }

  delete(course: Course) {
    return this.http.delete<any>(
      this.endPointWithSlash + 'destroy/' + course.id,
    )
  }

  edit(course: Course) {
    return this.http.put<Course>(
      this.endPointWithSlash + 'update/' + course.id,
      {
        name: course.name,
        acronym: course.acronym,
        hours: course.hours,
        groupe_number: course.groupe_number,
        classe_id: course.classe.id,
        service_id: course.service.id,
        semester_id: course.semester.id,
        departement_id: course.departement.id,
        ec_id: course.ec_id,
        professor_id: course.professor_id,
      },
    )
  }

  search(value: string) {
    return this.http.get<Course[]>(this.endPointWithSlash + 'search/' + value)
  }

  searchMyCourse(value: string) {
    let professor = this.getUser().professor?.id
    return this.http.get<Course[]>(
      this.endPointWithSlash +
      `search-my-courses/${value}?professor=${professor}`,
    )
  }
  courseHistory(professor: Professor) {
    return this.http.get<CourseHistory[]>(
      this.endPointWithSlash + `course-history/${professor.id}`,
    )
  }

  restoreCourseHistory(professor: Professor, history: CourseHistory) {
    return this.http.put<any>(
      this.endPointWithSlash + `restore-course-history/${history.id}`,
      { professor_id: professor.id },
    )
  }
}
