import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { matchPassword } from 'src/app/validators/matchPassword';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPassForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.resetPassForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirm_password: ['']
    }, {validators: [matchPassword]});
  }

  resetPassword() {
    console.log('reset password');
  }

}
