import {Component, Input} from '@angular/core';
import {PostService} from "../../../../core/service/posts.service";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css',
    '../../../../../app/styles/buttons.scss',
    "../../../../../app/styles/scrollbar.scss"]
})
export class CreatePostComponent {
  @Input() reply: boolean = false;
  @Input() pageId: string = '';
  @Input() postId:  string ='';

  createPostForm: any = {
    text: null,
  };

  constructor(private postService: PostService) {
  }

  onSubmit(): void {
    const {text} = this.createPostForm;
    const createObservable = this.reply ?
      this.postService.createReply(this.pageId, this.postId, text) : this.postService.createPost(text);
    createObservable.subscribe(() => {
      location.reload();
    }, (err) => {
      console.log(err);
    });
  }
}
