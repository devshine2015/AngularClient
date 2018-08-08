import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewShowComponent } from './new-show.component';

describe('NewShowComponent', () => {
  let component: NewShowComponent;
  let fixture: ComponentFixture<NewShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
