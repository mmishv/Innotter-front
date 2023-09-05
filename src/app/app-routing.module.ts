import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthLayoutComponent} from "./layout/auth-layout/auth-layout.component";
import {HomeLayoutComponent} from "./layout/home-layout/home-layout.component";
import {AuthGuard} from "./core/guard/auth.guard";
import {NoAuthGuard} from "./core/guard/no-auth.guard";
import {ResetPasswordComponent} from "./features/auth/components/reset-password/reset-password.component";

const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full'},
  { path: 'auth', component: AuthLayoutComponent, canActivate:[NoAuthGuard],
  loadChildren: () => import( "./features/auth/auth.module").then(m => m.AuthModule)},
  { path: 'reset-password', component: ResetPasswordComponent},
  { path: 'home', component: HomeLayoutComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: '', pathMatch: 'full', canActivate:[NoAuthGuard]}];

@NgModule({
  imports: [RouterModule.forRoot(routes)], exports: [RouterModule],
})
export class AppRoutingModule {
}
