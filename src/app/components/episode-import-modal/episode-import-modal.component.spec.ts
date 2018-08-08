import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodeImportModalComponent } from './episode-import-modal.component';

describe('EpisodeImportModalComponent', () => {
  let component: EpisodeImportModalComponent;
  let fixture: ComponentFixture<EpisodeImportModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpisodeImportModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpisodeImportModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
