import {FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export const matchEmail: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const email = control.get('email');
  const confirm_email = control.get('confirm_email');

  return email && confirm_email && email.value === confirm_email.value ? null : { 'emailsDoNotMatch': true };
};