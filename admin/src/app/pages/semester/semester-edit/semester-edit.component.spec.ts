import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemesterEditComponent } from './semester-edit.component';

describe('SemesterEditComponent', () => {
  let component: SemesterEditComponent;
  let fixture: ComponentFixture<SemesterEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SemesterEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SemesterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
