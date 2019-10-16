import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { matchPassword } from '../validators/matchPassword';
//import { ErrorMessageDialogComponent } from './components/error-message-dialog/error-message-dialog.component';
//import { MatDialog } from '@angular/material/dialog';

@Component({
    templateUrl: 'register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthService,
        //private dialog: MatDialog
    ) {
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirm_password: ['', [Validators.required, Validators.minLength(6)]]
        }
        //,matchPassword
        );
        
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid || this.f.password.value != this.f.confirm_password.value) {
            return;
        }

        this.loading = true;
        this.authenticationService.register(this.f.firstName.value, this.f.email.value.toLowerCase(), this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['/role']);
                },
                error => {
                    this.loading = false;
                });
        window.alert("account successfully created")
        /**
        this.dialog.open(ErrorMessageDialogComponent, {
        data: {
          errorMessage: "Successful Account Creation"
        }
        });
        */
    }

    cancel() {
        this.router.navigate(['/login']);
    }
}
