import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUnpublishedComponent } from './manage-unpublished.component';

describe('ManageUnpublishedComponent', () => {
  let component: ManageUnpublishedComponent;
  let fixture: ComponentFixture<ManageUnpublishedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageUnpublishedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageUnpublishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
