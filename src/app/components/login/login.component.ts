import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { first } from 'rxjs/operators';

@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.scss']},
)
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthService
    ) {
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';


        // console.log(this.loginForm)
        this.loginForm.valueChanges.subscribe(value => {
            console.log(this.loginForm);
        });
    }

    onSubmit() {
        this.loading = true;

        this.authenticationService.login(this.loginForm.value.email, this.loginForm.value.password)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['/role']);
                },
                error => {
                    this.loading = false;
                }
            );
    }

    register() {
        this.router.navigate(['/register']);
    }
}
