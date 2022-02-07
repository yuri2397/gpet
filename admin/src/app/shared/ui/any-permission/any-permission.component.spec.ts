import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyPermissionComponent } from './any-permission.component';

describe('AnyPermissionComponent', () => {
  let component: AnyPermissionComponent;
  let fixture: ComponentFixture<AnyPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnyPermissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
