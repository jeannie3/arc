import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { SceneContainerComponent } from './components/scene-container/scene-container.component';
import { ExplanationViewComponent } from './components/explanation-view/explanation-view.component';

const routes: Routes = [
  // { path: '', component: ScenarioListViewComponent },
  // { path: 'scenario/:id', component: ScenarioDetailComponent},
  { path: 'scene', component: SceneContainerComponent },
  { path: 'explanation/:id', component: ExplanationViewComponent},
  { path: '**', redirectTo: 'scene' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
