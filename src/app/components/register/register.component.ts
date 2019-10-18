import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { matchPassword } from 'src/app/validators/matchPassword';

@Component({
    templateUrl: 'register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthService,
    ) {
    }

    ngOnInit() {
        const emailRegexValidator = '[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+';

        this.registerForm = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.pattern(emailRegexValidator)]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            confirm_password: ['', [Validators.required, Validators.minLength(8)]]},
            { validators: matchPassword, updateOn: 'change' }
        );
    }

    onSubmit() {
        this.authenticationService.register(
            this.registerForm.value.name, this.registerForm.value.email.toLowerCase(), this.registerForm.value.password
        ).subscribe(() => {
            // TODO: show that account was open successfully (probably easier in auth service)
            this.router.navigate(['/role']);
        });
    }

    cancel() {
        this.router.navigate(['/login']);
    }
}
