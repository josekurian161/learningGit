import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadReviewDropComponent } from './lead-review-drop.component';

describe('LeadReviewDropComponent', () => {
  let component: LeadReviewDropComponent;
  let fixture: ComponentFixture<LeadReviewDropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadReviewDropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadReviewDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
