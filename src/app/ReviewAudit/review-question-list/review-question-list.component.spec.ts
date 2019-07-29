import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewQuestionListComponent } from './review-question-list.component';

describe('ReviewQuestionListComponent', () => {
  let component: ReviewQuestionListComponent;
  let fixture: ComponentFixture<ReviewQuestionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewQuestionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewQuestionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
