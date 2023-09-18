import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AuthModule} from "./features/auth/auth.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {JwtInterceptor} from "./core/interceptor/token.interceptor";
import {HomeLayoutComponent} from "./layout/home-layout/home-layout.component";
import {PageModule} from "./features/pages/pages.module";
import {PageLayoutComponent} from "./features/pages/pages/page-layout/page-layout.component";
import {NgOptimizedImage} from "@angular/common";
import {AuthLayoutComponent} from "./layout/auth-layout/auth-layout.component";
import { AccountComponent } from './features/users/pages/account/account.component';
import {UserModule} from "./features/users/user.module";
import {PostsModule} from "./features/posts/posts.module";

@NgModule({
  declarations: [AppComponent, AuthLayoutComponent, HomeLayoutComponent, PageLayoutComponent, AccountComponent,],
  imports: [BrowserModule, AuthModule, AppRoutingModule, BrowserAnimationsModule,
    FormsModule, HttpClientModule, PageModule, NgOptimizedImage, UserModule, PostsModule],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true,
  },],
  bootstrap: [AppComponent]
})
export class AppModule {
}
