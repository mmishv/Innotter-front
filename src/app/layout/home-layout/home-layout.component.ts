import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {PageService} from "../../core/service/page.service";
import {PostService} from "../../core/service/posts.service";
import {Observable} from "rxjs";
import {Post} from "../../core/model/post.model";
import {Page} from "../../core/model/page.model";
import {UserService} from "../../core/service/user.service";

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss',
    '../../../../src/app/styles/buttons.scss',
    '../../../../src/app/styles/tags.scss',
    '../../../../src/app/styles/scrollbar.scss',
    '../../../../src/app/styles/page-frame.scss']
})
export class HomeLayoutComponent implements OnInit {
  @ViewChild('searchResultsContainer') elRef!: ElementRef;
  searchQuery: string = '';
  searchResult: Page[] = [];
  showSearchResults: boolean = false;
  tags: string[] = [];
  newsFeed$: Observable<Post[]>;
  searchTag: string = '';
  filteredTags: string[] = [];
  userId: string = "";

  ngOnInit(): void {
    this.pageService.getTags().subscribe(tags => {
      this.tags = tags.map(tag => tag.name);
      this.filteredTags = Object.assign([], this.tags);
    });
    this.userService.getCurrentUserData().subscribe(data => this.userId = data.id);
    this.newsFeed$ = this.postService.getUserNewsFeed();
  }

  constructor(protected pageService: PageService, protected postService: PostService, private userService: UserService) {
    this.newsFeed$ = new Observable<Post[]>();
  }

  onTagSearch() {
    this.filteredTags = this.tags.filter((tag) => tag.toLowerCase().includes(this.searchTag.toLowerCase()));
  }

  activateTagSearch(tag: string) {
    this.searchQuery = tag;
    this.onSearch();
  }

  onSearch() {
    this.pageService.searchPage(this.searchQuery).subscribe(data => {
      this.searchResult = data;
      this.showSearchResults = true;
      this.elRef.nativeElement.style.display = 'block';
    });
  }

  @HostListener('document:click', ['$event']) onClickOutside(event: Event) {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.showSearchResults = false;
      this.elRef.nativeElement.style.display = 'none';
    }
  }

  isPageSelected(): boolean {
    return this.pageService.getSelectedPageId() !== null;
  }
}
