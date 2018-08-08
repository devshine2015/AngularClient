import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePublishedComponent } from './manage-published.component';

describe('ManagePublishedComponent', () => {
  let component: ManagePublishedComponent;
  let fixture: ComponentFixture<ManagePublishedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagePublishedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePublishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
