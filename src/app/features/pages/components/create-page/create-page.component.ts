import {Component} from '@angular/core';
import {PageService} from "../../../../core/service/page.service";

@Component({
  selector: 'create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.css', '../../../../../app/styles/buttons.scss']
})
export class CreatePageComponent {
  createPageForm: any = {
    name: null, description: null,
  };

  constructor(private pageService: PageService) {
  }

  onSubmit(): void {
    const {name, description} = this.createPageForm;
    this.pageService.createPage(name, description).subscribe(() => {
      location.reload();
    }, err => {
      console.log(err);
    });
  }
}
