import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyShowsComponent } from './my-shows.component';

describe('MyShowsComponent', () => {
  let component: MyShowsComponent;
  let fixture: ComponentFixture<MyShowsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyShowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyShowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
