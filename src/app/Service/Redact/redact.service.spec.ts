import { TestBed } from '@angular/core/testing';

import { RedactService } from './redact.service';

describe('RedactService', () => {
  let service: RedactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RedactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
