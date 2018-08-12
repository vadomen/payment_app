import { TestBed, inject } from '@angular/core/testing';

import { PlanApiService } from './plan.api.service';

describe('PlanApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlanApiService]
    });
  });

  it('should be created', inject([PlanApiService], (service: PlanApiService) => {
    expect(service).toBeTruthy();
  }));
});
