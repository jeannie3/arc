import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneAnswerChoiceListComponent } from './scene-answer-choice-list.component';

describe('SceneAnswerChoiceListComponent', () => {
  let component: SceneAnswerChoiceListComponent;
  let fixture: ComponentFixture<SceneAnswerChoiceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SceneAnswerChoiceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SceneAnswerChoiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
