import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';


import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { fakeBackendProvider } from './_helpers';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AlertComponent } from './components';

import { ScenarioDetailComponent } from './components/scenario-detail/scenario-detail.component';
import { ScenarioListViewComponent } from './components/scenario-list-view/scenario-list-view.component';
import { ScenarioSceneContextComponent } from './components/scenario-scene-context/scenario-scene-context.component';
import { SceneAnswerChoiceListComponent } from './components/scene-answer-choice-list/scene-answer-choice-list.component';
import { SceneContainerComponent } from './components/scene-container/scene-container.component';

@NgModule({
  declarations: [
    AppComponent,
    ScenarioSceneContextComponent,
    SceneAnswerChoiceListComponent,
    SceneContainerComponent,
    ScenarioDetailComponent,
    ScenarioListViewComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent

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
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
