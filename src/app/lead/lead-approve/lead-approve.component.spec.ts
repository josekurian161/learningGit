import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadApproveComponent } from './lead-approve.component';

describe('LeadApproveComponent', () => {
  let component: LeadApproveComponent;
  let fixture: ComponentFixture<LeadApproveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadApproveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
