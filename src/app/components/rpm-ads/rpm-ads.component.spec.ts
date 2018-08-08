import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RpmAdsComponent } from './rpm-ads.component';

describe('RpmAdsComponent', () => {
  let component: RpmAdsComponent;
  let fixture: ComponentFixture<RpmAdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RpmAdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RpmAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
