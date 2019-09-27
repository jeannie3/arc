import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder } from '@angular/forms';
import { Role } from 'src/app/models/role';


@Component({
  selector: 'app-role-list-view',
  templateUrl: './role-list-view.component.html',
  styleUrls: ['./role-list-view.component.scss']
})
export class RoleListViewComponent implements OnInit {
  formRoles: FormArray;
  stuff = ['/scene','','/scenario/new']

  constructor(private router: Router,private formBuilder: FormBuilder) { }

  ngOnInit() {
  this.formRoles = new FormArray([]);
  for(var i = 1; i < 4; i++){
  this.formRoles.push(this.formBuilder.group({
        id: '0',
        title: 'Role' + i,
        link: this.stuff[i-1]
  }));
  }
  }

    
  chooseRole(role: Role){
      console.log(role);
      this.router.navigate([role.link]);
  }

}
