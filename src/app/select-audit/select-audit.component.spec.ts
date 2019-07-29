import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAuditComponent } from './select-audit.component';

describe('SelectAuditComponent', () => {
  let component: SelectAuditComponent;
  let fixture: ComponentFixture<SelectAuditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectAuditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
