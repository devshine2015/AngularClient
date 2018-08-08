import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStaticPageComponent } from './edit-static-page.component';

describe('EditStaticPageComponent', () => {
  let component: EditStaticPageComponent;
  let fixture: ComponentFixture<EditStaticPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditStaticPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStaticPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
