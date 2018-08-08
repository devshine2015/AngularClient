import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Top30Component } from './top-30.component';

describe('Top30Component', () => {
  let component: Top30Component;
  let fixture: ComponentFixture<Top30Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Top30Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Top30Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
