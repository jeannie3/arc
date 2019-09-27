import { Component, OnInit } from '@angular/core';

import {MatStepperModule} from '@angular/material/stepper'; 
import {Scene} from '../../models/scene';

import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-explanation-view',
  templateUrl: './explanation-view.component.html',
  styleUrls: ['./explanation-view.component.scss']
})
export class ExplanationViewComponent implements OnInit {
  id;
  currentScene;
  scenarios;
  success: boolean;

  constructor(private _Activatedroute:ActivatedRoute) {
    this._Activatedroute.paramMap.subscribe(params => { 
      this.id = params.get('id');
      this.currentScene = (this.scenarios[0].scenes).find(scene => scene.id == this.id);
      if (this.currentScene.endingMessage == "Congrats!") {
        this.success = true;
      } else {
        this.success = false;
      }
    });
  }

  ngOnInit() {
  }

}
