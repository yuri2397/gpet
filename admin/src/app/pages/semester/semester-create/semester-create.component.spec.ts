import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemesterCreateComponent } from './semester-create.component';

describe('SemesterCreateComponent', () => {
  let component: SemesterCreateComponent;
  let fixture: ComponentFixture<SemesterCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SemesterCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SemesterCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
