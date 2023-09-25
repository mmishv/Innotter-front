import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LogoutComponent} from "./components/logout/logout.component";
import {AuthLayoutComponent} from "../../layout/auth-layout/auth-layout.component";

const routes: Routes = [{path: 'login', component: AuthLayoutComponent}, {path: 'logout', component: LogoutComponent},];

@NgModule({
  imports: [RouterModule.forChild(routes)], exports: [RouterModule]
})
export class AuthRoutingModule {
}
