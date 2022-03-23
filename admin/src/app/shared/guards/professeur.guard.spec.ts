import { TestBed } from '@angular/core/testing';

import { ProfesseurGuard } from './professeur.guard';

describe('ProfesseurGuard', () => {
  let guard: ProfesseurGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProfesseurGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
