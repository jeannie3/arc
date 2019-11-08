import { RouterModule, Routes } from '@angular/router';

import { ExplanationViewComponent } from './components/explanation-view/explanation-view.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { RoleListViewComponent } from './components/role-list-view/role-list-view.component';
import { SceneContainerComponent } from './components/scene-container/scene-container.component';
import { UserSettingsEditComponent } from './components/user-settings-edit/user-settings-edit.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'login/forgotpassword', component: ForgotPasswordComponent },
  { path: 'resetpassword', component: ResetPasswordComponent },


  // { path: '', component: ScenarioListViewComponent },
  // { path: 'scenario/:id', component: ScenarioDetailComponent },
  { path: ':roleId/scene/:sceneId', component: SceneContainerComponent },
  { path: ':roleId/explanation/:sceneId', component: ExplanationViewComponent},
  { path: 'role', component: RoleListViewComponent},
  { path: 'settings', component: UserSettingsComponent},
  { path: 'settings/edit', component: UserSettingsEditComponent},
  { path: ':userId/roles/:roleId/scenes/:sceneId', component: SceneContainerComponent },
  { path: ':userId/roles/:roleId/explanation/:sceneId', component: ExplanationViewComponent },
  { path: ':userId/roles', component: RoleListViewComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
