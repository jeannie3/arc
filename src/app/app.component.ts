import { Component } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { scenarios } from './mock/scenarios';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';
import { User } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentUser: User;
  title = 'arc';
  scenarioList = scenarios;

  constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }


  logout() {
       this.authenticationService.logout();
       this.router.navigate(['/login']);
   }
}
