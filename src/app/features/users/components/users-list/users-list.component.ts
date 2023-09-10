import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../../../core/service/user.service";
import {PageService} from "../../../../core/service/page.service";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css',
    '../../../../../app/styles/scrollbar.scss',
    "../../../../../app/styles/buttons.scss"]
})

export class UsersListComponent implements OnInit {
  @Input() usersUuid: any[] = [];
  @Input() tabName: string = 'followers';
  users: any[] = [];

  constructor(private userService: UserService, private pageService: PageService) {
  }

  ngOnInit(): void {
    this.userService.getUsersByUUIDList(this.usersUuid).subscribe(users => {
      this.users = users;
    });
  }

  acceptRequest(userUuid: string) {
    this.pageService.acceptRequest(userUuid).subscribe((response) => {
      this.users = this.users.filter(user => user.id !== userUuid);
    }, (error) => {
      console.log(error)
    });
  }

  rejectRequest(userUuid: string) {
    this.pageService.rejectRequest(userUuid).subscribe((response) => {
      this.users = this.users.filter(user => user.id !== userUuid);
    }, (error) => {
      console.log(error)
    });
  }

  acceptAllRequests() {
    this.pageService.acceptAllRequests().subscribe((response) => {
    }, (error) => {
      console.log(error)
    });
  }

  rejectAllRequests() {
    this.pageService.rejectAllRequests().subscribe((response) => {
    }, (error) => {
      console.log(error)
    });
  }
}
