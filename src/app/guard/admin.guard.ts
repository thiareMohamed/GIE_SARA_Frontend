import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {LoginService} from "../pages/login/login.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private login: LoginService,
              private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let nbr = this.login.getUserRole().length - 1
    console.log(this.login.getUserRole()[nbr].name)
    if (this.login.isLoggedIn() && this.login.getUserRole()[nbr].name == "ROLE_ADMIN"){
      return true;
    }
    this.router.navigate(['login'])
    return false;
  }

}
