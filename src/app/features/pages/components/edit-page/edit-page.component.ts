import {ChangeDetectorRef, Component} from '@angular/core';
import {Observable} from "rxjs";
import {PageService} from "../../../../core/service/page.service";
import {Page} from "../../../../core/model/page.model";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css',
    '../../../../../app/styles/buttons.scss',
    '../../../../../app/styles/tags.scss',
    '../../../../../app/styles/scrollbar.scss',]
})
export class EditPageComponent {
  editPageForm: any = {
    name: null, uuid: null, description: null
  };
  currentPage$: Observable<Page>;
  tags: string[] = [];
  pageTags: string[] = [];

  currentPage = 1;
  itemsPerPage = 8;
  showAllTags = false;

  constructor(private pageService: PageService, private cdRef: ChangeDetectorRef) {
    this.currentPage$ = new Observable<Page>();
  }

  ngOnInit() {
    this.currentPage$ = this.pageService.currentPage$;
    this.pageService.loadCurrentPage();
    this.currentPage$.subscribe((data) => {
      this.editPageForm = Object.assign({}, data);
      this.pageTags = data.tags.map(tag => tag.name);
    });
    this.pageService.getTags().subscribe(tags => {
      this.tags = tags.map(tag => tag.name);
    });
  }

  getCurrentPageTags() {
    if (this.showAllTags) {
      return this.tags;
    } else {
      const startIndex = 0;
      const endIndex = this.currentPage * this.itemsPerPage < this.tags.length ? this.currentPage * this.itemsPerPage : this.tags.length;
      return this.tags.slice(startIndex, endIndex);
    }
  }

  showMoreTags() {
    this.currentPage++;
  }

  isTagInPage(tagName: string): boolean {
    return this.pageTags.some(tag => tag == tagName);
  }

  tagClickHandler(tagName: string) {
    if (!this.isTagInPage(tagName)) {
      this.pageService.addTagToPage(tagName).subscribe(response => {
        this.pageTags.push(tagName);
        this.cdRef.detectChanges();
      }, error => {
        console.error(`Failed to add tag '${tagName}' to the page.`, error);
      });
    } else {
      this.pageService.removeTagFromPage(tagName).subscribe(response => {
        const indexToRemove = this.pageTags.indexOf(tagName);
        if (indexToRemove !== -1) {
          this.pageTags.splice(indexToRemove, 1);
        }
        this.cdRef.detectChanges();
      }, error => {
        console.error(`Failed to remove tag '${tagName}' from the page.`, error);
      });
    }
  }

  onSubmit() {
    const {name, uuid, description} = this.editPageForm;
    this.pageService.updatePageMainInfo(name, description, uuid).subscribe((data) => {
      this.pageService.loadCurrentPage();
    }, err => {
      console.log(err);
    });
  }

  changeVisibility() {
    this.pageService.changeVisibility().subscribe(response => {
      this.pageService.loadCurrentPage();
    }, error => {
      console.error('Failed to change visibility', error);
    });
  }
}
