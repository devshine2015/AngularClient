import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontPageChartsComponent } from './front-page-charts.component';

describe('FrontPageChartsComponent', () => {
  let component: FrontPageChartsComponent;
  let fixture: ComponentFixture<FrontPageChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontPageChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontPageChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
