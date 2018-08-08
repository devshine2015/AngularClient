import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticPageReroutComponent } from './static-page-rerout.component';

describe('StaticPageReroutComponent', () => {
  let component: StaticPageReroutComponent;
  let fixture: ComponentFixture<StaticPageReroutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticPageReroutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticPageReroutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
