import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HipHopAdsComponent } from './hip-hop-ads.component';

describe('HipHopAdsComponent', () => {
  let component: HipHopAdsComponent;
  let fixture: ComponentFixture<HipHopAdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HipHopAdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HipHopAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
