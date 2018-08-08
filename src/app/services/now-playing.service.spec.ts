import { TestBed, inject } from '@angular/core/testing';

import { NowPlayingService } from './now-playing.service';

describe('NowPlayingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NowPlayingService]
    });
  });

  it('should be created', inject([NowPlayingService], (service: NowPlayingService) => {
    expect(service).toBeTruthy();
  }));
});
