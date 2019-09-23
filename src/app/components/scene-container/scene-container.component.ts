import { AuthService, ErrorMessage } from 'src/app/services/auth.service';
import { Component, Input, OnInit } from '@angular/core';

import { HttpErrorResponse } from '@angular/common/http';
import { Scenario } from '../../models/scenario';
import { ScenarioService } from '../../services/scenario.service';
import { Scene } from '../../models/scene';
import { UserService } from 'src/app/services/user.service';
import { scenes } from 'src/app/mock/scenes';

@Component({
  selector: 'app-scene-container',
  templateUrl: './scene-container.component.html',
  styleUrls: ['./scene-container.component.scss']
})
export class SceneContainerComponent implements OnInit {
  currentScene: Scene; // the input is the first scene to display
  scenarios: Array<Scenario>;

  updateScene(nextScene: string) {
    console.log('The next scene is ' + nextScene);
    this.currentScene = (scenes).find(scene => scene.id === nextScene);
  }

  constructor(private scenarioService: ScenarioService,
              private userService: UserService,
              private authService: AuthService) {
    this.scenarios = scenarioService.getScenarios();
    this.currentScene = scenes[0];
  }

  ngOnInit() { }

  testService() {
    // TODO: move to login screen/component
    this.authService.login('asdf@asdf.com', 'hao123').subscribe(
      (res) => {
        // TODO: get token from here
        console.log('login', res);
        console.log(res[0].token);
        this.authService.setAccessToken(res[0].token);
      },
      (err: HttpErrorResponse) => {
        // if (err.error === ErrorMessage.INCORRECT_LOGIN) {
        console.log('Invalid email or password');
        // }
      }
    );

    // // TODO: move to register screen/component
    // this.authService.register('jeanjean', 'email@email.com', 'pass123').subscribe(
    //   (res) => {
    //     // TODO: get token from here
    //     console.log('register', res);
    //   },
    //   (err: HttpErrorResponse) => {
    //     // TODO: Better way to display error messages
    //     if (err.error.message  === ErrorMessage.DUPLICATE_ID) {
    //       console.log('This email already exists');
    //     }
    //     if (err.error.message === ErrorMessage.INVALID_EMAIL) {
    //       console.log('Invalid email');
    //     }
    //   }
    // );
  }

  testService2() {
    // // TODO: move to where get user progress is needed
    // this.userService.getUserProgress(7).subscribe(res => {
    //   console.log(res);
    // });
  }
}
