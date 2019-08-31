import { Component, OnInit, Input } from '@angular/core';
import { Scene } from '../../scene';

@Component({
  selector: 'app-scenario-scene-context',
  templateUrl: './scenario-scene-context.component.html',
  styleUrls: ['./scenario-scene-context.component.scss']
})
export class ScenarioSceneContextComponent implements OnInit {
  @Input() scene: Scene;

  constructor() { }

  ngOnInit() {
  }

}
