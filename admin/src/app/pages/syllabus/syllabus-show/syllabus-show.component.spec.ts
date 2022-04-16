import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyllabusShowComponent } from './syllabus-show.component';

describe('SyllabusShowComponent', () => {
  let component: SyllabusShowComponent;
  let fixture: ComponentFixture<SyllabusShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SyllabusShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SyllabusShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
