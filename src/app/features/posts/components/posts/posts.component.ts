import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../../../core/service/user.service";
import {Post} from "../../../../core/model/post.model";
import {User} from "../../../../core/model/user.model";

@Component({
  selector: 'app-posts', templateUrl: './posts.component.html', styleUrls: ['./posts.component.css']
})

export class PostsComponent implements OnInit {
  @Input() posts: Post[] = [];
  userData!: User;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getCurrentUserData().subscribe((userData) => {
      this.userData = userData;
    });
  }
}
