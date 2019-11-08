import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorMessageDialogComponent } from './components/error-message-dialog/error-message-dialog.component';
import { PauseDialogComponent } from './components/pause-dialog/pause-dialog.component';
import { ExplanationViewComponent } from './components/explanation-view/explanation-view.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { MaterialModule } from './material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { RoleListViewComponent } from './components/role-list-view/role-list-view.component';
import { ScenarioDetailComponent } from './components/scenario-detail/scenario-detail.component';
import { ScenarioListViewComponent } from './components/scenario-list-view/scenario-list-view.component';
import { ScenarioSceneContextComponent } from './components/scenario-scene-context/scenario-scene-context.component';
import { SceneAnswerChoiceListComponent } from './components/scene-answer-choice-list/scene-answer-choice-list.component';
import { SceneContainerComponent } from './components/scene-container/scene-container.component';
import { TwoOptionsDialogComponent } from './components/two-options-dialog/two-options-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ScenarioSceneContextComponent,
    SceneAnswerChoiceListComponent,
    SceneContainerComponent,
    ScenarioDetailComponent,
    ScenarioListViewComponent,
    ExplanationViewComponent,
    LoginComponent,
    RegisterComponent,
    RoleListViewComponent,
    ErrorMessageDialogComponent,
    PauseDialogComponent,
    TwoOptionsDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
  ],
  entryComponents: [
    ErrorMessageDialogComponent,
    PauseDialogComponent,
    TwoOptionsDialogComponent,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }