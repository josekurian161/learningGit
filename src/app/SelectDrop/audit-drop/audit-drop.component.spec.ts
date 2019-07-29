import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditDropComponent } from './audit-drop.component';

describe('AuditDropComponent', () => {
  let component: AuditDropComponent;
  let fixture: ComponentFixture<AuditDropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditDropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
