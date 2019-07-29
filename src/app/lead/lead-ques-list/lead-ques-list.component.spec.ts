import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadQuesListComponent } from './lead-ques-list.component';

describe('LeadQuesListComponent', () => {
  let component: LeadQuesListComponent;
  let fixture: ComponentFixture<LeadQuesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadQuesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadQuesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
