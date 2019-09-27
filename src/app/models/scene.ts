export enum SceneType {
  Conflict,
  Feedback
}

export class Scene {
  id: string;
  description: string;
  image: string;
  roleId: string;
  type: string;
}
