import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {DatePipe, NgForOf, NgIf, NgTemplateOutlet} from "@angular/common";
import {UserRoutingModule} from "./user.routing";
import { AccountPanelComponent } from './components/account-panel/account-panel.component';
import { LikesComponent } from './pages/likes/likes.component';
import {PostsModule} from "../posts/posts.module";


@NgModule({
  declarations: [
    AccountPanelComponent,
    LikesComponent
  ],
    exports: [
        AccountPanelComponent
    ],
  imports: [UserRoutingModule, FormsModule, HttpClientModule, NgIf, DatePipe, NgForOf, NgTemplateOutlet, PostsModule]
})
export class UserModule {}
