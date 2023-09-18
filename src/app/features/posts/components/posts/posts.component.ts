import {AfterViewInit, Component, Input} from '@angular/core';
import {UserService} from "../../../../core/service/user.service";

@Component({
  selector: 'app-posts', templateUrl: './posts.component.html', styleUrls: ['./posts.component.css']
})

export class PostsComponent implements AfterViewInit {
  @Input() posts: any[] = [];
  userData: any;

  constructor(private userService: UserService) {
  }

  ngAfterViewInit() {
    this.userService.getUserData().subscribe((userData) => {
      this.userData = userData;
    });
  }
}
