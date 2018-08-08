import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDraftsComponent } from './my-drafts.component';

describe('MyDraftsComponent', () => {
  let component: MyDraftsComponent;
  let fixture: ComponentFixture<MyDraftsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyDraftsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDraftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
