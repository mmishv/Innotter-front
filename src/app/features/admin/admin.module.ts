import {NgModule} from '@angular/core';
import {AdminRoutingModule} from "./admin.routing";
import {UsersComponent} from "./pages/users/users.component";
import {PostsModule} from "../posts/posts.module";
import {UserModule} from "../users/user.module";
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';
import {AsyncPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import { GroupsComponent } from './pages/groups/groups.component';
import { PagesComponent } from './pages/pages/pages.component';
import { TagsComponent } from './pages/tags/tags.component';



@NgModule({
  declarations: [UsersComponent, AdminNavbarComponent, GroupsComponent, PagesComponent, TagsComponent],
  exports: [UsersComponent],
    imports: [AdminRoutingModule, PostsModule, UserModule, NgForOf, AsyncPipe, FormsModule, NgIf, DatePipe]
})
export class AdminModule {
}
