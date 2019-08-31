import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScenarioDetailComponent } from './components/scenario-detail/scenario-detail.component';


const routes: Routes = [
  { path: 'scenario/:id', component: ScenarioDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
