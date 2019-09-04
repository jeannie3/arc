import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScenarioSceneContextComponent } from './components/scenario-scene-context/scenario-scene-context.component';
import { SceneAnswerChoiceListComponent } from './components/scene-answer-choice-list/scene-answer-choice-list.component';
import { SceneContainerComponent } from './components/scene-container/scene-container.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';


@NgModule({
  declarations: [
    AppComponent,
    ScenarioSceneContextComponent,
    SceneAnswerChoiceListComponent,
    SceneContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    NoopAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
