import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-account-panel',
  templateUrl: './account-panel.component.html',
  styleUrls: ['./account-panel.component.css']
})
export class AccountPanelComponent {
 @Input() userId: string = '';
 @Input() isAdmin: boolean = false;
}
