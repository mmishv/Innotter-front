import { NgModule } from '@angular/core';

import { LoginComponent } from './components/login/login.component';
import { AuthRoutingModule } from './auth.routing';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {NgIf} from "@angular/common";
import {SignupComponent} from "./components/signup/signup.component";
import {LogoutComponent} from "./components/logout/logout.component";
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

@NgModule({
  declarations: [LoginComponent, SignupComponent, LogoutComponent, ResetPasswordComponent],
  exports: [
    LoginComponent,
    SignupComponent,
    LogoutComponent,
    ResetPasswordComponent
  ],
  imports: [AuthRoutingModule, FormsModule, HttpClientModule, NgIf]
})
export class AuthModule {}
