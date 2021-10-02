import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasseCreateComponent } from './classe-create.component';

describe('ClasseCreateComponent', () => {
  let component: ClasseCreateComponent;
  let fixture: ComponentFixture<ClasseCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClasseCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasseCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
