import { TestBed, inject } from '@angular/core/testing';

import { PlaylistAndChartsService } from './playlist-and-charts.service';

describe('PlaylistAndChartsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlaylistAndChartsService]
    });
  });

  it('should be created', inject([PlaylistAndChartsService], (service: PlaylistAndChartsService) => {
    expect(service).toBeTruthy();
  }));
});
