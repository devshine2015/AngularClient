import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedShowsComponent } from './archived-shows.component';

describe('ArchivedShowsComponent', () => {
  let component: ArchivedShowsComponent;
  let fixture: ComponentFixture<ArchivedShowsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchivedShowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedShowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
