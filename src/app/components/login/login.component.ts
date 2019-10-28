import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss']
},
)
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthService
  ) {
  }

  ngOnInit() {
    const emailRegexValidator = '[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+';

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(emailRegexValidator)]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.authenticationService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(() => {
      const userId = JSON.parse(localStorage.getItem('userInfo')).id;
      this.router.navigate([userId, '/role']);
    });
  }

  register() {
    this.router.navigate(['/register']);
  }
}
