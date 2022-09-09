import { TestBed } from '@angular/core/testing';

import { AppenderService } from './appender.service';

describe('AppenderService', () => {
  let service: AppenderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppenderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
