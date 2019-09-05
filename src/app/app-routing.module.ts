import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { ScenarioListViewComponent } from './components/scenario-list-view/scenario-list-view.component';

const routes: Routes = [
  { path: '', component: ScenarioListViewComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
