import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private userService: UserService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const userName = localStorage.getItem('userName');
    if (userName) {
      return this.userService.getUserByUserName(userName).pipe(
        map(user => {
          if (user.chosenMovie && user.hasKids !== null) {
            this.router.navigate(['/home']);
            return false;
          } else {
            return true;
          }
        })
      );
    } else {
      return true;
    }
  }
}