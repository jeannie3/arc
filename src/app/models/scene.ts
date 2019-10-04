export enum SceneType {
   CC = "CC",
   FB_POSITIVE = "FB_POSITIVE",
   FB_NEGATIVE = "FB_NEGATIVE"
}

export class Scene {
  id: string;
  description: string;
  image: string;
  roleId: string;
  type: SceneType;
}
