import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';

@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.scss']},
)
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
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
            this.router.navigate(['/role']);
        });
    }

    register() {
        this.router.navigate(['/register']);
    }
}
