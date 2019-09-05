import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SceneContainerComponent } from './components/scene-container/scene-container.component';


const routes: Routes = [
  { path: 'scene', component: SceneContainerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
