import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectauditCompleteComponent } from './selectaudit-complete.component';

describe('SelectauditCompleteComponent', () => {
  let component: SelectauditCompleteComponent;
  let fixture: ComponentFixture<SelectauditCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectauditCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectauditCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
