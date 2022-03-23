import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyllabusEditComponent } from './syllabus-edit.component';

describe('SyllabusEditComponent', () => {
  let component: SyllabusEditComponent;
  let fixture: ComponentFixture<SyllabusEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SyllabusEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SyllabusEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
