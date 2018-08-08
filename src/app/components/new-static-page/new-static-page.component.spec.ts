import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewStaticPageComponent } from './new-static-page.component';

describe('NewStaticPageComponent', () => {
  let component: NewStaticPageComponent;
  let fixture: ComponentFixture<NewStaticPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewStaticPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewStaticPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
