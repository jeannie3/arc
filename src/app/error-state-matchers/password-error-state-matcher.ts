import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl } from '@angular/forms';

/** Marks confirm_email mat-input as invalid if email and confirm_email do not match */
export class PasswordErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl): boolean {
        if (!control.touched) {
            return false;
        }
        return control.parent && control.parent.errors && control.parent.errors.passwordsDoNotMatch;
    }
}