import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedbyCodeComponent } from './approvedby-code.component';

describe('ApprovedbyCodeComponent', () => {
  let component: ApprovedbyCodeComponent;
  let fixture: ComponentFixture<ApprovedbyCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovedbyCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedbyCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
