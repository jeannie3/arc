import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { PasswordErrorStateMatcher } from 'src/app/error-state-matchers/password-error-state-matcher';
import { Router } from '@angular/router';
import { matchPassword } from 'src/app/validators/matchPassword';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPassForm: FormGroup;
  passwordErrorMatcher: PasswordErrorStateMatcher;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.resetPassForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirm_password: ['']
    }, {validators: [matchPassword]});

    this.passwordErrorMatcher = new PasswordErrorStateMatcher();
  }

  resetPassword() {
    // TODO: actually reset the password in db - db needs to implement reset password function

    const dialogRef = this.dialog.open(MessageDialogComponent, {
      data: {
        title: 'Success!',
        message: 'Your password has been reset. You can now login with your new password.',
        buttonText: 'Back to Login'
      }
    });
    document.getElementById('main-body').classList.add('blur');

    dialogRef.afterClosed().subscribe(() => {
      document.getElementById('main-body').classList.remove('blur');
      this.router.navigate(['/login']);
    });
  }

}
