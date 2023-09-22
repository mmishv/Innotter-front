import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UsersComponent} from "./pages/users/users.component";
import {GroupsComponent} from "./pages/groups/groups.component";
import {AdminGuard} from "../../core/guard/admin.guard";
import {PagesComponent} from "./pages/pages/pages.component";
import {TagsComponent} from "./pages/tags/tags.component";


const routes: Routes = [
  {path: 'users', component: UsersComponent},
  {path: 'groups', component: GroupsComponent, canActivate: [AdminGuard]},
  {path: 'pages', component: PagesComponent},
  {path: 'tags', component: TagsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)], exports: [RouterModule]
})
export class AdminRoutingModule {
}
