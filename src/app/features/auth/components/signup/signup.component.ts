import {Component} from '@angular/core';

import {AuthService} from "../../../../core/service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'signup-form',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css', '../../../../../app/styles/buttons.scss']
})


export class SignupComponent {
  signUpForm: any = {
    username: null,
    email: null,
    password: null,
    confirmPassword: null
  };
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(): void {
    const { username, email, password, confirmPassword } = this.signUpForm;
    if (password !== confirmPassword) {
      this.errorMessage = 'Password missmatch';
      this.isSignUpFailed = true;
      return;
    }
    this.authService.signup(username, email, password).subscribe(
      () => {
        this.isSignUpFailed = false;
        this.router.navigate(['/home'])
      },
      err => {
        console.log(err);
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
