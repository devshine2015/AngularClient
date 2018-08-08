import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageChartsComponent } from './home-page-charts.component';

describe('HomePageChartsComponent', () => {
  let component: HomePageChartsComponent;
  let fixture: ComponentFixture<HomePageChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePageChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
