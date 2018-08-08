import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldAdsComponent } from './world-ads.component';

describe('WorldAdsComponent', () => {
  let component: WorldAdsComponent;
  let fixture: ComponentFixture<WorldAdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorldAdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorldAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
