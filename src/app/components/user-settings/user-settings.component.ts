import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';


import { Router } from '@angular/router';

@Component({
    selector: 'user-settings',
    templateUrl: './user-settings.component.html',
    styleUrls: ['./user-settings.component.scss']
  })
  export class UserSettingsComponent implements OnInit {
    email:string
    
  
    constructor(private router: Router) {	
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      this.email = userInfo.email
	}

	ngOnInit() {
    
	}

	onEdit() {
		this.router.navigate(['/settings/edit'])
  }
  
  onReturn(){
    this.router.navigate(['/role'])
  }
}