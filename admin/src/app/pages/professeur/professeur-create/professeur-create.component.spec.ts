import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesseurCreateComponent } from './professeur-create.component';

describe('ProfesseurCreateComponent', () => {
  let component: ProfesseurCreateComponent;
  let fixture: ComponentFixture<ProfesseurCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfesseurCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesseurCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
