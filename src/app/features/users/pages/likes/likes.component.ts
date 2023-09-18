import {Component, OnInit} from '@angular/core';
import {Post} from "../../../../core/model/post.model";
import {PostService} from "../../../../core/service/posts.service";
import {UserService} from "../../../../core/service/user.service";

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.css', '../../../../styles/account-frame.scss']
})
export class LikesComponent implements OnInit{
  likedPosts: Post[] = []
  userId: string = '';
  constructor(private postService: PostService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.postService.getLikes().subscribe(posts => this.likedPosts = posts);
    this.userService.getCurrentUserData().subscribe(data => this.userId = data.id);
  }
}
