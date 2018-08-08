import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticPagesPreviewComponent } from './static-pages-preview.component';

describe('StaticPagesPreviewComponent', () => {
  let component: StaticPagesPreviewComponent;
  let fixture: ComponentFixture<StaticPagesPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticPagesPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticPagesPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
