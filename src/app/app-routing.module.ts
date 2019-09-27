import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { SceneContainerComponent } from './components/scene-container/scene-container.component';
import { RoleListViewComponent } from './components/role-list-view/role-list-view.component';

const routes: Routes = [
  // { path: '', component: ScenarioListViewComponent },
  // { path: 'scenario/:id', component: ScenarioDetailComponent},
  { path: 'scene', component: SceneContainerComponent },
  { path: 'role', component: RoleListViewComponent},
  { path: '**', redirectTo: 'scene' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
