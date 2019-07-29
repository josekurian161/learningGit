import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreCompleteComponent } from './score-complete.component';

describe('ScoreCompleteComponent', () => {
  let component: ScoreCompleteComponent;
  let fixture: ComponentFixture<ScoreCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
