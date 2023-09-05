import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../core/service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'logout-btn',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
