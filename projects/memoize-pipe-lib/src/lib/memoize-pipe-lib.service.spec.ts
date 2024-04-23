import { TestBed } from '@angular/core/testing';

import { MemoizePipeLibService } from './memoize-pipe-lib.service';

describe('MemoizePipeLibService', () => {
  let service: MemoizePipeLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemoizePipeLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
