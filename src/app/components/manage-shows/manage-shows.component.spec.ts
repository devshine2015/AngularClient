import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageShowsComponent } from './manage-shows.component';

describe('ManageShowsComponent', () => {
  let component: ManageShowsComponent;
  let fixture: ComponentFixture<ManageShowsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageShowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageShowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
