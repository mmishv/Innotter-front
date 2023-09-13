import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PostDetailsComponent} from "./pages/post-details/post-details.component";


const routes: Routes = [{path: ':postId', component: PostDetailsComponent},];

@NgModule({
  imports: [RouterModule.forChild(routes)], exports: [RouterModule]
})
export class PostsRoutingModule {
}
