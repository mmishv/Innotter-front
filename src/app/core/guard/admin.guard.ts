import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {UserService} from "../service/user.service";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.userService.getCurrentUserData().pipe(map((user) => {
      if (user && (user.role == 'ADMIN')) {
        return true;
      } else {
        this.router.navigate(['']);
        return false;
      }
    }));
  }
}
