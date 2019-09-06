import { Scenario } from '../models/scenario';
import { SceneType } from '../models/scene';

export const scenarios: Scenario[] = [
  {
    title: 'Scenario1',
    description: 'This is a test description.',
    id: '1',
    scenes: [
      {
        type: SceneType.Scene,
        title: 'Scene1',
        id: 1,
        description: 'This will be the first scene displayed',
        image: 'Hi, I am supposed to be an image',
        scenarioId: 1,
        answerChoices: [
          {
            text: 'Choice A',
            nextScene: 2
          },
          {
            text: 'Choice B',
            nextScene: 1
          },
          {
            text: 'Choice C',
            nextScene: 3
          }
        ]
      },
      {
        type: SceneType.Scene,
        title: 'Scene2',
        id: 2,
        description: 'This will be the second scene displayed',
        image: 'Hi, I am supposed to be an image',
        scenarioId: 1,
        answerChoices: [
          {
            text: 'Choice A',
            nextScene: 1
          },
          {
            text: 'Choice B',
            nextScene: 2
          },
          {
            text: 'Choice C',
            nextScene: 3
          }
        ]
      },
      {
        type: SceneType.Scene,
        title: 'Scene3',
        id: 3,
        description: 'This will be the third scene displayed',
        image: 'Hi, I am supposed to be an image',
        scenarioId: 1,
        answerChoices: [
          {
            text: 'Choice A',
            nextScene: 3
          },
          {
            text: 'Choice B',
            nextScene: 1
          },
          {
            text: 'Choice C',
            nextScene: 2
          }
        ]
      }
    ]
  }
]
