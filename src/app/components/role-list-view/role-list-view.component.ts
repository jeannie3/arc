import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-role-list-view',
  templateUrl: './role-list-view.component.html',
  styleUrls: ['./role-list-view.component.scss']
})
export class RoleListViewComponent implements OnInit {
  roles = ['role1','role2','role3','role4'];

  constructor(private router: Router) { }

  ngOnInit() {
  }
    
  chooseRole(){
      this.router.navigate(['scene']);
  }

}
