import { TestBed } from '@angular/core/testing';

import { GrouppatternService } from './grouppattern.service';

describe('GrouppatternService', () => {
  let service: GrouppatternService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrouppatternService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
