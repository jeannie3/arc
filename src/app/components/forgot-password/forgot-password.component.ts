import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  emailForm: FormControl;

  constructor(private router: Router,
              private dialog: MatDialog
  ) { }

  ngOnInit() {
    const emailRegexValidator = '[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+';
    this.emailForm = new FormControl('', [Validators.required, Validators.pattern(emailRegexValidator)])
  }

  reset() {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      data: {
        title: 'Success!',
        message: 'You should receive a password recovery link soon.',
        buttonText: 'Back to Login'
      }
    });
    document.getElementById('main-body').classList.add('blur');

    dialogRef.afterClosed().subscribe(() => {
      document.getElementById('main-body').classList.remove('blur');
      this.router.navigate(['/login']);
    });

    // TODO: send email with link to reset the password
  }

  cancel() {
    this.router.navigate(['/login']);
  }
}
