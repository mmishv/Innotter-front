import {ChangeDetectorRef, Component, ElementRef, HostListener, Input, ViewChild} from '@angular/core';
import {PostService} from "../../../../core/service/posts.service";
import {Router} from "@angular/router";
import {PageService} from "../../../../core/service/page.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css',
    '../../../../styles/scrollbar.scss',
    '../../../../styles/buttons.scss']
})
export class PostComponent {
  @ViewChild('optionsContainer') elRef!: ElementRef;
  @Input() post: any;
  @Input() userData: any;
  showOptions = false;
  isEditing = false;
  editedContent = '';

  @HostListener('document:click', ['$event']) onClickOutside(event: Event) {
    if (this.elRef && !this.elRef.nativeElement.contains(event.target)) {
      this.showOptions = false;
    }
  }

  toggleOptions() {
    this.showOptions = !this.showOptions;
  }

  constructor(private postService: PostService, private router: Router,
              private cdRef: ChangeDetectorRef, private pageService: PageService) {
  }

  onClick(pageId: string, postId: string) {
    if (!this.isEditing) {
      this.router.navigate(['page', pageId, 'post', postId]);
    }
  }

  isUpdatedLessThanTenSecondsAgo(updatedAt: string, createdAt: string): boolean {
    const updatedDate = new Date(updatedAt);
    const createdDate = new Date(createdAt);
    const timeDifferenceMilliseconds = updatedDate.getTime() - createdDate.getTime();
    return timeDifferenceMilliseconds < 10000;
  }

  isLiked(likes: any[]): boolean {
    if (this.userData) {
      return likes.includes(this.userData.id);
    }
    return false;
  }

  likePost(pageId: string, postId: string) {
    this.postService.likePost(pageId, postId).subscribe(() => {
      this.postService.getPost(pageId, postId).subscribe(data => {
        this.post.liked_by = data.liked_by;
        this.cdRef.detectChanges();
      })
    }, err => {
      console.log(err);
    });
  }

  unlikePost(pageId: string, postId: string) {
    this.postService.unlikePost(pageId, postId).subscribe(() => {
      this.postService.getPost(pageId, postId).subscribe(data => {
        this.post.liked_by = data.liked_by;
        this.cdRef.detectChanges();
      })
    }, err => {
      console.log(err);
    });
  }

  isCurrentPage(pageId: string): boolean {
    return this.pageService.getSelectedPageId() == pageId;
  }

  deletePost(pageId: string, postId: string) {
    this.postService.deletePost(pageId, postId).subscribe(() => {
      if (window.location.href.includes("post")) {
        this.router.navigate(['page', pageId]);
      } else {
        location.reload();
      }
    }, error => console.log(error))
  }

  editPost(pageId: string, postId: string) {
    this.postService.editPost(pageId, postId, this.editedContent).subscribe(data => {
      this.exitEditMode();
      this.post.content = data.content;
      this.cdRef.detectChanges();
    }, error => console.log(error))
  }

  exitEditMode(): void {
    this.showOptions = false;
    this.isEditing = false;
  }

  enterEditMode(): void {
    this.isEditing = true;
    this.editedContent = this.post.content;
  }
}
