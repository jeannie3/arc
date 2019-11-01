import { RouterModule, Routes } from '@angular/router';

import { ExplanationViewComponent } from './components/explanation-view/explanation-view.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './components/register/register.component';
import { RoleListViewComponent } from './components/role-list-view/role-list-view.component';
import { SceneContainerComponent } from './components/scene-container/scene-container.component';
import { UserSettingsEditComponent } from './components/user-settings-edit/user-settings-edit.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },


  // { path: '', component: ScenarioListViewComponent },
  // { path: 'scenario/:id', component: ScenarioDetailComponent},
  { path: ':roleId/scene/:sceneId', component: SceneContainerComponent },
  { path: ':roleId/explanation/:sceneId', component: ExplanationViewComponent},
  { path: 'role', component: RoleListViewComponent},
  { path: 'settings', component: UserSettingsComponent},
  { path: 'settings/edit', component: UserSettingsEditComponent},
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }