import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { matchEmail } from 'src/app/validators/matchEmail';
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
            confirm_email: [''],
            password: ['', [Validators.required, Validators.minLength(8)]],
            confirm_password: ['']},
            { validators: [matchPassword, matchEmail], updateOn: 'change' }
        );
    }

    onSubmit() {
        this.authenticationService.register(
            this.registerForm.value.name, this.registerForm.value.email.toLowerCase(), this.registerForm.value.password
        ).subscribe(() => {
            this.router.navigate(['/role']);
        });
    }

    cancel() {
        this.router.navigate(['/login']);
    }
}
