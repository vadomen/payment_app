import { TestBed, inject } from '@angular/core/testing';

import { SubscriptionApiService } from './subscription.api';

describe('SubscriptionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubscriptionApiService]
    });
  });

  it('should be created', inject([SubscriptionApiService], (service: SubscriptionApiService) => {
    expect(service).toBeTruthy();
  }));
});
