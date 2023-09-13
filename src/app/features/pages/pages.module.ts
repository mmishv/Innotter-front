import {NgModule} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {
  AsyncPipe, NgClass, NgForOf, NgIf, NgOptimizedImage, NgStyle, NgTemplateOutlet, SlicePipe
} from "@angular/common";
import {PagesRoutingModule} from "./pages.routing";
import {UserPagesComponent} from "./components/user-pages/user-pages.component";
import {CreatePageComponent} from "./components/create-page/create-page.component";
import {TabsComponent} from './components/tabs/tabs.component';
import {EditPageComponent} from './components/edit-page/edit-page.component';
import {UsersListComponent} from "../users/components/users-list/users-list.component";
import {PostsRoutingModule} from "../posts/posts.routing";


@NgModule({
  declarations: [UserPagesComponent, CreatePageComponent, TabsComponent, EditPageComponent, UsersListComponent],
  exports: [UserPagesComponent, CreatePageComponent, TabsComponent, EditPageComponent, UsersListComponent],
  imports: [PagesRoutingModule, PostsRoutingModule, FormsModule, HttpClientModule,
    NgIf, NgForOf, NgOptimizedImage, NgClass, NgStyle, AsyncPipe, SlicePipe, NgTemplateOutlet]
})
export class PageModule {
}
