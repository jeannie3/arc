import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

import { Router } from '@angular/router';

@Component({
    selector: 'user-settings-edit',
    templateUrl: './user-settings-edit.component.html',
    styleUrls: ['./user-settings-edit.component.scss']
  })
  export class UserSettingsEditComponent implements OnInit {
    email: String;
    
  
    constructor(private router: Router) {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        this.email = userInfo.email
    }

	ngOnInit() {
    
    }

    onCancel() {
        this.router.navigate(['/settings'])
    }
}