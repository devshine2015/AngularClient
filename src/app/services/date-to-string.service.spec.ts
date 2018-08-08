import { TestBed, inject } from '@angular/core/testing';

import { DateToStringService } from './date-to-string.service';

describe('DateToStringService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DateToStringService]
    });
  });

  it('should be created', inject([DateToStringService], (service: DateToStringService) => {
    expect(service).toBeTruthy();
  }));
});
