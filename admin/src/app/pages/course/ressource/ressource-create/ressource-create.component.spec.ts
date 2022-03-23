import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RessourceCreateComponent } from './ressource-create.component';

describe('RessourceCreateComponent', () => {
  let component: RessourceCreateComponent;
  let fixture: ComponentFixture<RessourceCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RessourceCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RessourceCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
