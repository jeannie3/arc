import { AnswerChoice } from './answer-choice';

export enum SceneType {
  Dialog,
  Scene
}

export class Scene {
  id: number;
  title: string;
  description: string;
  image: string;
  scenarioId: number;
  answerChoices: Array<AnswerChoice>;
  type: SceneType;
}
