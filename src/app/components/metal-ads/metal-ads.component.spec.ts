import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetalAdsComponent } from './metal-ads.component';

describe('MetalAdsComponent', () => {
  let component: MetalAdsComponent;
  let fixture: ComponentFixture<MetalAdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetalAdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetalAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
