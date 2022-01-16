import { EC } from './../../../models/ec';
import { UE } from './../../../models/ue';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Semester } from './../../../models/semester';
import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-semester-edit',
  templateUrl: './semester-edit.component.html',
  styleUrls: ['./semester-edit.component.scss']
})
export class SemesterEditComponent implements OnInit {
  validateForm!: FormGroup;
  isLoad = false;
  @Input() semester!: Semester;
  @Input() ec!: EC;
  constructor(
    private modal: NzModalRef,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required, Validators.min(2)]],
      vht: [null, [Validators.required, Validators.min(0)]],
      semester_id: [null, [Validators.required]],
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
  }

  destroyModal(data: Semester | null){}

  save(){

  }
}
