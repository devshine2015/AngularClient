import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleReviewComponent } from './article-review.component';

describe('ArticleReviewComponent', () => {
  let component: ArticleReviewComponent;
  let fixture: ComponentFixture<ArticleReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
