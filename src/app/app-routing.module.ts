import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeLayoutComponent} from "./layout/home-layout/home-layout.component";
import {AuthGuard} from "./core/guard/auth.guard";
import {NoAuthGuard} from "./core/guard/no-auth.guard";
import {ResetPasswordComponent} from "./features/auth/components/reset-password/reset-password.component";

const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full'},
  { path: 'auth', canActivate:[NoAuthGuard],
  loadChildren: () => import( "./features/auth/auth.module").then(m => m.AuthModule)},
  { path: 'reset-password', component: ResetPasswordComponent},
  { path: 'home', component: HomeLayoutComponent, canActivate: [AuthGuard]},
  { path: 'page', canActivate: [AuthGuard],
  loadChildren: () => import( "./features/pages/pages.module").then(m => m.PageModule)},
  { path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], exports: [RouterModule],
})
export class AppRoutingModule {
}
