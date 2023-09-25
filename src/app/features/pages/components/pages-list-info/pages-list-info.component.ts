import {Component, Input, OnInit} from '@angular/core';
import {Page} from "../../../../core/model/page.model";
import {PageService} from "../../../../core/service/page.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-pages-list-info',
  templateUrl: './pages-list-info.component.html',
  styleUrls: ['./pages-list-info.component.css',  '../../../../styles/scrollbar.scss']
})
export class PagesListInfoComponent implements OnInit{
  @Input() userId: string = '';
  @Input() isOwner = false;
  userPages: Page[] = [];
  constructor(private pageService: PageService, private router: Router) {
  }

  ngOnInit(): void {
    this.pageService.getUserPages(this.userId).subscribe(pages => {
      this.userPages = pages;
    });
  }

  onClick(pageId: string){
    this.router.navigate(["page", pageId]);
  }
}
