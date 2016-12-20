import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../core/auth.service';

interface ValidationResult {
 [key:string]:boolean;
}
class MyValidators {

  static validEmail(control: FormControl): ValidationResult {

    let REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if ( (control.value !=="" && control.value !==null) && REGEXP.test(control.value) ){
      return null; // valid case
    }

    return { "invalid": true }; // bad case
  }

}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {

  // 'signupForm' form description
  signupForm          : FormGroup;
    firstName         : FormControl;
    lastName          : FormControl;
    email             : FormControl;
    username          : FormControl;

    passwordGroup     : FormGroup;
      password        : FormControl;
      passwordConfirm : FormControl;

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.firstName       = new FormControl('', [Validators.required]);
    this.lastName        = new FormControl('', [Validators.required]);
    this.email           = new FormControl('', [Validators.required, MyValidators.validEmail]);
    this.username        = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]);
    this.password        = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]);
    this.passwordConfirm = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]);

    this.passwordGroup = fb.group(
      {
        password        : this.password,
        passwordConfirm : this.passwordConfirm
      },
      { validator: this.passwordMatchValidator }
    );

    this.signupForm = fb.group({
      firstName    : this.firstName,
      lastName     : this.lastName,
      email        : this.email,
      username     : this.username,
      passwordGroup: this.passwordGroup
    });
  }

  // 'passwordGroup' validator
  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('passwordConfirm').value ? null : { 'mismatch': true };
  }

  ngOnInit() {
  }

  // submit handler
  submit() {
    console.log('saving signup form data@', this.signupForm.value);
    let value = this.signupForm.value;
    let data = {
      firstName : value.firstName,
      lastName  : value.lastName,
      username  : value.username,
      email     : value.email,
      password  : value.passwordGroup.password
    };
    this.authService.attempAuth('signup', data);
  }

}
