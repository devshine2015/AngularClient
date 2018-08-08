import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEpisodesComponent } from './manage-episodes.component';

describe('ManageEpisodesComponent', () => {
  let component: ManageEpisodesComponent;
  let fixture: ComponentFixture<ManageEpisodesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageEpisodesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageEpisodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
