import { Component } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { scenarios } from './mock/scenarios';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'arc';
  scenarioList = scenarios;
}
