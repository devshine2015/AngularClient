import { TestBed, inject } from '@angular/core/testing';

import { StaticPagesService } from './static-pages.service';

describe('StaticPagesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StaticPagesService]
    });
  });

  it('should be created', inject([StaticPagesService], (service: StaticPagesService) => {
    expect(service).toBeTruthy();
  }));
});
