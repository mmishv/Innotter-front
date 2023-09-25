import {Component} from '@angular/core';
import {AuthService} from "../../../../core/service/auth.service";
import {Router} from '@angular/router';

@Component({
  selector: 'login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../../../../app/styles/buttons.scss']
})

export class LoginComponent {
  form: any = {
    username: null, password: null
  };
  resetData: any = {
    email: null
  }
  isLoginFailed: boolean = false;
  resetSuccess: boolean = false;
  errorMessage = '';
  resetPasswordErrorMessage = '';

  constructor(private authService: AuthService, private router: Router) {
  }

  onSubmit(): void {
    const {username, password} = this.form;

    this.authService.login(username, password).subscribe(data => {
      this.isLoginFailed = false;
      this.router.navigate(['/home']);
    }, err => {
      console.log(err);
      this.errorMessage = err.error.message;
      this.isLoginFailed = true;
    });
  }

  resetPassword() {
    this.authService.resetPasswordRequest(this.resetData.email).subscribe((response) => {
      console.log(response)
      this.resetSuccess = true;
       this.resetPasswordErrorMessage = '';
    }, (error) => {
      console.log(error)
      this.resetPasswordErrorMessage = error.error.message;
    });
  }
}
