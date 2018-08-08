import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEpisodeComponent } from './new-episode.component';

describe('NewEpisodeComponent', () => {
  let component: NewEpisodeComponent;
  let fixture: ComponentFixture<NewEpisodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEpisodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEpisodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
