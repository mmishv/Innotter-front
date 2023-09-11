import {Component, Input} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PageService} from "../../../../core/service/page.service";

@Component({
  selector: 'app-tabs', templateUrl: './tabs.component.html', styleUrls: ['./tabs.component.css']
})
export class TabsComponent {
  @Input() page: any;

  activeTab: string = 'followers';

  constructor(private route: ActivatedRoute, private pageService: PageService) {
  }

  showTab(tabName: string) {
    this.activeTab = tabName;
  }

  isCurrentPage(): boolean {
    let pageId: string = '';
    this.route.params.subscribe(params => {
      pageId = params['pageId'];
    });
    return pageId === this.pageService.getSelectedPageId();
  }
}
