import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ScenarioDetailComponent } from './components/scenario-detail/scenario-detail.component';
import { ScenarioListViewComponent } from './components/scenario-list-view/scenario-list-view.component';
import { SceneContainerComponent } from './components/scene-container/scene-container.component';

const routes: Routes = [
  { path: '', component: ScenarioListViewComponent },
  { path: 'scenario/:id', component: ScenarioDetailComponent},
  { path: 'scene', component: SceneContainerComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
