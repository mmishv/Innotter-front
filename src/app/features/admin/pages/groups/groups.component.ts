import {Component} from '@angular/core';
import {map, Observable} from "rxjs";
import {Group} from "../../../../core/model/group.model";
import {UserService} from "../../../../core/service/user.service";
import {User} from "../../../../core/model/user.model";

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css', "../../../../styles/account-frame.scss", "../../../../styles/buttons.scss", "../../../../styles/scrollbar.scss", "../../../../styles/admin-panel.scss"]
})
export class GroupsComponent {
  groups$: Observable<Group[]>;
  createGroupForm: any = {name: null};
  searchTerm: string = '';
  searchResults$: Observable<User[]>;
  currentUser$: Observable<User>;
  searchText: string = '';

  constructor(private userService: UserService) {
    this.groups$ = new Observable<Group[]>();
    this.searchResults$ = new Observable<User[]>();
    this.currentUser$ = new Observable<User>();
  }

  getResults(usernamePattern: string = '') {
    this.searchResults$ = this.userService.getUsersPage(1, usernamePattern);
  }

  ngOnInit(): void {
    this.getGroups();
    this.currentUser$ = this.userService.getCurrentUserData();
  }

  getGroups() {
    this.groups$ = this.userService.getAllGroups();
  }

  createGroup() {
    this.userService.createGroup(this.createGroupForm.name).subscribe(() => {
      this.getGroups();
      this.createGroupForm.name = null;
    }, error => console.log(error))
  }

  deleteGroup(groupId: number) {
    this.userService.deleteGroup(groupId).subscribe(() => {
      this.getGroups();
    }, error => console.log(error))
  }

  addUserToGroup(userId: string, groupId: number) {
    this.userService.patchUser({"group_id": groupId}, userId).subscribe(() => {
    }, error => console.log(error))
  }

  searchGroups() {
    this.groups$ = this.userService.getAllGroups().pipe(map(tags => {
      return tags.filter(tag => tag.name.toLowerCase().includes(this.searchText.toLowerCase()));
    }));
  }
}
