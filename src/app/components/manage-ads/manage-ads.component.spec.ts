import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAdsComponent } from './manage-ads.component';

describe('ManageAdsComponent', () => {
  let component: ManageAdsComponent;
  let fixture: ComponentFixture<ManageAdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
