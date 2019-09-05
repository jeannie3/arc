import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AnswerChoice } from '../../models/answer-choice';

@Component({
  selector: 'app-scene-answer-choice-list',
  templateUrl: './scene-answer-choice-list.component.html',
  styleUrls: ['./scene-answer-choice-list.component.scss']
})
export class SceneAnswerChoiceListComponent implements OnInit {
  @Input() answerChoices: Array<AnswerChoice>;
  @Output() answered = new EventEmitter<number>();

  updateScene(nextScene: number) {
    this.answered.emit(nextScene);
  }

  constructor() { }

  ngOnInit() { }

}
