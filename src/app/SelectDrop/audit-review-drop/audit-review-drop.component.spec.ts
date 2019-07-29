import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditReviewDropComponent } from './audit-review-drop.component';

describe('AuditReviewDropComponent', () => {
  let component: AuditReviewDropComponent;
  let fixture: ComponentFixture<AuditReviewDropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditReviewDropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditReviewDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
