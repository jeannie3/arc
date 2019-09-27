import { RouterModule, Routes } from '@angular/router';

import { ExplanationViewComponent } from './components/explanation-view/explanation-view.component';
import { NgModule } from '@angular/core';
import { RoleListViewComponent } from './components/role-list-view/role-list-view.component';
import { SceneContainerComponent } from './components/scene-container/scene-container.component';

const routes: Routes = [
  // { path: '', component: ScenarioListViewComponent },
  // { path: 'scenario/:id', component: ScenarioDetailComponent},
  { path: ':roleId/scene/:sceneId', component: SceneContainerComponent },
  { path: ':roleId/explanation/:sceneId', component: ExplanationViewComponent},
  { path: 'role', component: RoleListViewComponent},
  { path: '**', redirectTo: 'scene' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
