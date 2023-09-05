import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from "../../../../core/service/auth.service";

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  resetData: any = {
    newPassword: null,
    resetToken: null
  }
  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.resetData.resetToken = params['reset_password_token'];
    });
  }

  resetPassword() {
    this.authService.resetPassword({ reset_token: this.resetData.resetToken, new_password: this.resetData.newPassword }).subscribe(
      (response) => {
        console.log('Password reset successful');
        this.router.navigate(['/auth/login']);
      },
      (error) => {
        console.error('Error resetting password', error);
      }
    );
  }
}
