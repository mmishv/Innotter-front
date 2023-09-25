import {NgModule} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {
  AsyncPipe, DatePipe, NgClass, NgForOf, NgIf, NgOptimizedImage, NgStyle, NgTemplateOutlet, SlicePipe
} from "@angular/common";

import {CreatePostComponent} from "./components/create-post/create-post.component";
import {PostsComponent} from "./components/posts/posts.component";
import {PostsRoutingModule} from "./posts.routing";
import {PostDetailsComponent} from "./pages/post-details/post-details.component";
import {PostComponent} from './components/post/post.component';
import {PageModule} from "../pages/pages.module";
import {NavbarComponent} from "../../layout/navbar/navbar.component";


@NgModule({
  declarations: [CreatePostComponent, PostsComponent, PostDetailsComponent, PostComponent, NavbarComponent],
  exports: [CreatePostComponent, PostsComponent, NavbarComponent],
  imports: [PostsRoutingModule, FormsModule, HttpClientModule, NgIf, NgForOf, NgOptimizedImage,
    NgClass, NgStyle, AsyncPipe, SlicePipe, NgTemplateOutlet, DatePipe, PageModule]
})
export class PostsModule {
}
