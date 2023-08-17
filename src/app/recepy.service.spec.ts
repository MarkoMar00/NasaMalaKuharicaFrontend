import { TestBed } from '@angular/core/testing';

import { RecepyService } from './recepy.service';

describe('RecepyService', () => {
  let service: RecepyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecepyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
