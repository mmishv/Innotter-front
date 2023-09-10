import {Component, OnInit} from '@angular/core';
import {PageService} from "../../../../core/service/page.service";

@Component({
  selector: 'user-pages',
  templateUrl: './user-pages.component.html',
  styleUrls: ['./user-pages.component.css', '../../../../../app/styles/scrollbar.scss']
})
export class UserPagesComponent implements OnInit {
  userPages: any[] = [];

  constructor(private pageService: PageService) {
  }

  ngOnInit(): void {
    this.getUserPages();
  }

  getUserPages() {
    this.pageService.getUserPages().subscribe((data) => {
      this.userPages = data;
      if (!this.getSelectedPageId() && this.userPages.length > 0) {
        this.selectPage(this.userPages[0].id);
      }
    });
  }

  selectPage(pageId: string) {
    this.pageService.selectPage(pageId);
  }

  getSelectedPageId() {
    return this.pageService.getSelectedPageId();
  }
}
