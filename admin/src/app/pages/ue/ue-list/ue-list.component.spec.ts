import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UeListComponent } from './ue-list.component';

describe('UeListComponent', () => {
  let component: UeListComponent;
  let fixture: ComponentFixture<UeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
