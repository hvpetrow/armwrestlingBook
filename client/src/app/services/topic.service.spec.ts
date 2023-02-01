import { TestBed } from '@angular/core/testing';

import { ContestService } from './topic.service';

describe('ContestService', () => {
  let service: ContestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
