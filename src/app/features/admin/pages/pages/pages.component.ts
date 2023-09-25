import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../../../../core/model/user.model";
import {UserService} from "../../../../core/service/user.service";
import {Page} from "../../../../core/model/page.model";
import {PageService} from "../../../../core/service/page.service";

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css',
    "../../../../styles/account-frame.scss",
    "../../../../styles/buttons.scss",
    "../../../../styles/scrollbar.scss",
    "../../../../styles/admin-panel.scss"]
})
export class PagesComponent {
  pages$: Observable<Page[]>;
  currentUser$: Observable<User>
  searchQuery: string = '';
  itemsPerPage: number = 0;
  showTimePickers: boolean[] = [];

  constructor(private userService: UserService, private pageService: PageService) {
    this.pages$ = new Observable<Page[]>();
    this.currentUser$ = new Observable<User>();
  }

  ngOnInit(): void {
    this.getPages();
    this.currentUser$ = this.userService.getCurrentUserData();
  }
  getPages(){
    this.pages$ = this.pageService.searchPage(this.searchQuery);
    this.pages$.subscribe(data => {
      this.itemsPerPage = data.length;
      this.showTimePickers = new Array(this.itemsPerPage).fill(false);
    })
  }

  onTimeSelected(event: Event, pageId: string, index: number) {
    const selectedTime = (event.target as HTMLSelectElement).value;
    this.pageService.setPageBlockPeriod(pageId, parseInt(selectedTime)).subscribe(()=>{
      this.showTimePickers[index] = false;
      this.getPages();
    });
  }
}
