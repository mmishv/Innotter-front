import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AccountComponent} from "./pages/account/account.component";
import {LikesComponent} from "./pages/likes/likes.component";


const routes: Routes = [
  {path: ":userId/likes", component: LikesComponent},
  {path: ':userId', component: AccountComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)], exports: [RouterModule]
})
export class UserRoutingModule {
}
