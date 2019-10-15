import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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
            password: ['', [Validators.required, Validators.minLength(8)]]
        });
    }

    onSubmit() {
        this.authenticationService.register(
            this.registerForm.value.name, this.registerForm.value.email, this.registerForm.value.password
        ).subscribe(() => {
            this.router.navigate(['/login']); // TODO: change to navigate to the scenario???
        });
    }

    cancel() {
        this.router.navigate(['/login']);
    }
}
