import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowsForPlaylistComponent } from './shows-for-playlist.component';

describe('ShowsForPlaylistComponent', () => {
  let component: ShowsForPlaylistComponent;
  let fixture: ComponentFixture<ShowsForPlaylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowsForPlaylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowsForPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
