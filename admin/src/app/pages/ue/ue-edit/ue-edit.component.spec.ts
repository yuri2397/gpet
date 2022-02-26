import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UeEditComponent } from './ue-edit.component';

describe('UeEditComponent', () => {
  let component: UeEditComponent;
  let fixture: ComponentFixture<UeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UeEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
