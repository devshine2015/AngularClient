import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HipHopComponent } from './hip-hop.component';

describe('HipHopComponent', () => {
  let component: HipHopComponent;
  let fixture: ComponentFixture<HipHopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HipHopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HipHopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
