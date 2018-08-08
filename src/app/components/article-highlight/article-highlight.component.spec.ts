import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleHighlightComponent } from './article-highlight.component';

describe('ArticleHighlightComponent', () => {
  let component: ArticleHighlightComponent;
  let fixture: ComponentFixture<ArticleHighlightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleHighlightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleHighlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
