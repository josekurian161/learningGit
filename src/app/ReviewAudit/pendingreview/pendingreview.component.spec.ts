import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingreviewComponent } from './pendingreview.component';

describe('PendingreviewComponent', () => {
  let component: PendingreviewComponent;
  let fixture: ComponentFixture<PendingreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
