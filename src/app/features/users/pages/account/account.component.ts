import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../../../core/service/user.service";
import {User} from "../../../../core/model/user.model";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css', '../../../../styles/account-frame.scss']
})
export class AccountComponent implements OnInit {
  @ViewChild('avatarInput', {static: false}) avatarInput!: ElementRef<HTMLInputElement>;
  editUserForm: any = {
    username: null, name: null, surname: null, email: null, phone_number: null,
  };
  editUserFields: any[] = [{label: 'Username', property: 'username', inputType: 'text', maxLength: 20}, {
    label: 'Name', property: 'name', inputType: 'text', maxLength: 30
  }, {label: 'Surname', property: 'surname', inputType: 'text', maxLength: 30}, {
    label: 'Email', property: 'email', inputType: 'email', maxLength: 50
  }, {label: 'Phone Number', property: 'phone_number', inputType: 'tel', maxLength: 20},];

  userData!: User;
  isEditing = false;
  isOwner = false;
  isAdmin: boolean = false;

  constructor(private userService: UserService, private router: ActivatedRoute, private location: Location) {
  }

  ngOnInit() {
    this.router.params.subscribe(params => {
      const userId = params['userId'];
      this.userService.getUserData(userId).subscribe((userData) => {
        this.userData = userData;
        for (const key in this.userData) {
          if (this.userData.hasOwnProperty(key) && this.editUserForm.hasOwnProperty(key)) {
            this.editUserForm[key] = this.userData[key as keyof User];
          }
        }
        this.userService.getCurrentUserData().subscribe(data => {
          this.isOwner = (data.id == userData.id);
          this.isAdmin = (data.role == 'ADMIN' || data.role == 'MODERATOR');
        });
      });
    });
  }

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files) {
      const file = inputElement.files[0];
      if (this.isOwner) {
        this.userService.uploadImage(file).subscribe(response => {
          location.reload();
        }, error => {
          console.log(error)
        });
      }
    }
  }

  exitEditMode(): void {
    this.isEditing = false;
  }

  enterEditMode(): void {
    this.isEditing = true;
    for (const key in this.userData) {
      if (this.userData.hasOwnProperty(key) && this.editUserForm.hasOwnProperty(key)) {
        this.editUserForm[key] = this.userData[key as keyof User];
      }
    }
  }

  editUserInfo(userId: string) {
    if (this.isOwner) {
      this.userService.edit(this.editUserForm).subscribe(() => {
        this.exitEditMode();
        location.reload();
      }, error => console.log(error))
    } else if (this.isAdmin) {
      this.userService.patchUser(this.editUserForm, userId).subscribe(() => {
        this.exitEditMode();
        location.reload();
      }, error => console.log(error))
    }
  }

  goBack() {
    this.location.back();
  }
}
