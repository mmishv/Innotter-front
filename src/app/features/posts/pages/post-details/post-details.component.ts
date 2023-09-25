import {Component, OnInit} from '@angular/core';
import {PostService} from "../../../../core/service/posts.service";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../../core/service/user.service";
import {Location} from '@angular/common';
import {PageService} from "../../../../core/service/page.service";

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css', '../../../../../app/styles/page-frame.scss']
})
export class PostDetailsComponent implements OnInit {
  postData: any;
  pageId: string = '';
  postId: string = '';
  userData: any;

  constructor(private postService: PostService, private route: ActivatedRoute, protected pageService: PageService,
              private userService: UserService, private location: Location) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.pageId = params.get('pageId') ?? '';
      this.postId = params.get('postId') ?? '';
      this.postService.getPost(this.pageId, this.postId).subscribe(data => this.postData = data)
    });
    this.userService.getCurrentUserData().subscribe((userData) => {
      this.userData = userData;
    });
  }

  goBack() {
    this.location.back();
  }

  isPageSelected(): boolean {
    return this.pageService.getSelectedPageId() !== null;
  }
}
