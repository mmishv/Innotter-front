import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../../../../core/model/user.model";
import {UserService} from "../../../../core/service/user.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css', "../../../../styles/account-frame.scss", "../../../../styles/buttons.scss", "../../../../styles/scrollbar.scss", "../../../../styles/admin-panel.scss"]
})
export class UsersComponent implements OnInit {
  usersPage$: Observable<User[]>;
  pageNum: number = 1;
  searchTerm: string = '';
  lastQuery: string = ''
  currentUser$: Observable<User>

  constructor(private userService: UserService) {
    this.usersPage$ = new Observable<User[]>();
    this.currentUser$ = new Observable<User>();
  }


  ngOnInit(): void {
    this.getPage();
    this.currentUser$ = this.userService.getCurrentUserData();
  }

  getPage(usernamePattern: string = '') {
    if (usernamePattern != this.lastQuery) {
      this.pageNum = 1;
      this.lastQuery = usernamePattern;
    }
    this.usersPage$ = this.userService.getUsersPage(this.pageNum, usernamePattern);
    this.usersPage$.subscribe(data => {
      if (data.length == 0) {
        this.prevPage();
      }
    })
  }

  nextPage() {
    this.pageNum += 1;
    this.getPage();
  }

  prevPage() {
    if (this.pageNum > 1) {
      this.pageNum -= 1;
      this.getPage();
    }
  }

  changeUserBLockStatus(userId: string, status: boolean) {
    if (status) {
      this.userService.blockUser(userId).subscribe(() => {
        this.getPage();
      }, error => console.log(error));
    } else {
      this.userService.unblockUser(userId).subscribe(() => {
        this.getPage();
      }, error => console.log(error));
    }
  }

  deleteUser(userId: string) {
    this.userService.deleteUser(userId).subscribe(() => {
      this.getPage();
    }, error => console.log(error));
  }

  updateUserRole(userId: string, role: string) {
    this.userService.patchUser({role: role}, userId).subscribe(()=>{
      this.getPage();
      },
        error => console.log(error))
  }
}
