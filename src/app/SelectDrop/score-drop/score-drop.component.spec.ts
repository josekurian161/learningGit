import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreDropComponent } from './score-drop.component';

describe('ScoreDropComponent', () => {
  let component: ScoreDropComponent;
  let fixture: ComponentFixture<ScoreDropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreDropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
