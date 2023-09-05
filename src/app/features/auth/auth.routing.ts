import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthLayoutComponent} from "../../layout/auth-layout/auth-layout.component";
import {LogoutComponent} from "./components/logout/logout.component";
import {ResetPasswordComponent} from "./components/reset-password/reset-password.component";

const routes: Routes = [
  { path: 'login', component: AuthLayoutComponent},
  { path: 'logout', component: LogoutComponent},
  { path: 'reset-password', component: ResetPasswordComponent},];

@NgModule({
  imports: [RouterModule.forChild(routes)], exports: [RouterModule]
})
export class AuthRoutingModule {
}
