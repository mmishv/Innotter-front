import {Component} from '@angular/core';
import {map, Observable} from "rxjs";
import {User} from "../../../../core/model/user.model";
import {UserService} from "../../../../core/service/user.service";
import {PageService} from "../../../../core/service/page.service";
import {Tag} from "../../../../core/model/tag.model";

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css', "../../../../styles/account-frame.scss", "../../../../styles/buttons.scss", "../../../../styles/scrollbar.scss", "../../../../styles/admin-panel.scss"]
})
export class TagsComponent {
  tags$: Observable<Tag[]>;
  currentUser$: Observable<User>
  searchText: string = '';
  createTagForm: any = {name: null};

  constructor(private userService: UserService, private pageService: PageService) {
    this.tags$ = new Observable<Tag[]>();
    this.currentUser$ = new Observable<User>();
  }

  ngOnInit(): void {
    this.getTags();
    this.currentUser$ = this.userService.getCurrentUserData();
  }

  getTags() {
    this.tags$ = this.pageService.getTags();
  }

  searchTags() {
    this.tags$ = this.pageService.getTags().pipe(map(tags => {
      return tags.filter(tag => tag.name.toLowerCase().includes(this.searchText.toLowerCase()));
    }));
  }

  createTag() {
    this.pageService.createTag(this.createTagForm.name).subscribe(() => {
      this.getTags();
      this.createTagForm.name = null;
    }, error => console.log(error))
  }

  deleteTag(tagId: number) {
    this.pageService.deleteTag(tagId).subscribe(() => {
      this.getTags();
    }, error => console.log(error))
  }
}
