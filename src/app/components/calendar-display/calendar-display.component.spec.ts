import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarDisplayComponent } from './calendar-display.component';

describe('CalendarDisplayComponent', () => {
  let component: CalendarDisplayComponent;
  let fixture: ComponentFixture<CalendarDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
