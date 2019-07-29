import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrpApproveAuditComponent } from './drp-approve-audit.component';

describe('DrpApproveAuditComponent', () => {
  let component: DrpApproveAuditComponent;
  let fixture: ComponentFixture<DrpApproveAuditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrpApproveAuditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrpApproveAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
