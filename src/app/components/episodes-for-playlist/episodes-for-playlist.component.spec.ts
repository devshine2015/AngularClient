import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodesForPlaylistComponent } from './episodes-for-playlist.component';

describe('EpisodesForPlaylistComponent', () => {
  let component: EpisodesForPlaylistComponent;
  let fixture: ComponentFixture<EpisodesForPlaylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpisodesForPlaylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpisodesForPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
