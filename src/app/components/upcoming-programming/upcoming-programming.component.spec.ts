import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingProgrammingComponent } from './upcoming-programming.component';

describe('UpcomingProgrammingComponent', () => {
  let component: UpcomingProgrammingComponent;
  let fixture: ComponentFixture<UpcomingProgrammingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpcomingProgrammingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingProgrammingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
