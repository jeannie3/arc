import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { SceneContainerComponent } from './components/scene-container/scene-container.component';


import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_helpers';

const routes: Routes = [


  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },


  // { path: '', component: ScenarioListViewComponent },
  // { path: 'scenario/:id', component: ScenarioDetailComponent},
  { path: 'scene', component: SceneContainerComponent },
  { path: '**', redirectTo: '' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
