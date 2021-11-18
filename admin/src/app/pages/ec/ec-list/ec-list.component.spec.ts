import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcListComponent } from './ec-list.component';

describe('EcListComponent', () => {
  let component: EcListComponent;
  let fixture: ComponentFixture<EcListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EcListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
