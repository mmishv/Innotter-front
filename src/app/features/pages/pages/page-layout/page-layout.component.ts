import {
  Component, ElementRef, OnInit, ViewChild
} from '@angular/core';
import {Observable} from "rxjs";
import {PageService} from "../../../../core/service/page.service";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../../core/service/user.service";

@Component({
  selector: 'app-home-layout',
  templateUrl: './page-layout.component.html',
  styleUrls: ['./page-layout.component.scss', '../../../../styles/buttons.scss', '../../../../styles/scrollbar.scss']
})

export class PageLayoutComponent implements OnInit {
  @ViewChild('avatarInput', {static: false}) avatarInput!: ElementRef<HTMLInputElement>;

  currentPage$: Observable<any>;
  currentPageStatistics$: Observable<any>;
  pageId: string = '';
  userData: any;

  constructor(private pageService: PageService, private route: ActivatedRoute, private userService: UserService) {
    this.currentPage$ = new Observable<any>();
    this.currentPageStatistics$ = new Observable<any>();
  }

  async ngOnInit() {
    this.currentPage$ = this.pageService.currentPage$;
    this.route.params.subscribe(params => {
      this.pageId = params['pageId'];
      this.pageService.loadPage(this.pageId);
    });
    if (this.isCurrentPage()) {
      this.currentPageStatistics$ = this.pageService.currentPageStatistics$;
      this.pageService.loadStatistics();
    }
    this.userService.getUserData().subscribe(data => this.userData = data);
  }

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files[0]) {
      const file = inputElement.files[0];
      this.pageService.uploadImage(file).subscribe(response => {
        this.pageService.loadCurrentPage();
      }, error => {
        console.log(error)
      });
    }
  }

  isCurrentPage(): boolean {
    return this.pageId === this.pageService.getSelectedPageId();
  }

  canSubscribe(): boolean {
    let pageData: any;
    this.currentPage$.subscribe(data => pageData = data);
    return pageData.owner_uuid !== this.userData.id &&
      !(pageData.followers.includes(this.userData.id) ||
        pageData.follow_requests.includes(this.userData.id));
  }

  canUnsubscribe(): boolean {
    let pageData: any;
    this.currentPage$.subscribe(data => pageData = data);
    return pageData.owner_uuid !== this.userData.id &&
      pageData.followers.includes(this.userData.id) ||
      pageData.follow_requests.includes(this.userData.id);
  }

  isOwner() {
    let pageData: any;
    this.currentPage$.subscribe(data => pageData = data);
    return pageData.owner_uuid === this.userData.id;
  }

  onSubscribe(pageId: string): void {
    this.pageService.subscribe(pageId).subscribe(response => {
      window.location.reload();
    }, error => console.log(error));
  }

  onUnsubscribe(pageId: string): void {
    this.pageService.unsubscribe(pageId).subscribe(response => {
      window.location.reload();
    }, error => console.log(error));
  }
}