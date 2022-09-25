import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IUtilisateur} from "../../../model/IUtilisateur";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  host = environment.host
  private readonly JWT_TOKEN = "JWT_TOKEN"
  private readonly USER = "user"


  constructor(private http: HttpClient) { }

  //current-user
  public getCurrentUser() {
    return this.http.get(this.host + "current-user")
  }

  public generateToken(loginData: any) {
    return this.http.post<any>(this.host + "authenticate", loginData)
  }

//  Save token in localStorage
  public loginUser(token: any) {
    localStorage.setItem(this.JWT_TOKEN, token)
    return true;
  }
//  isLogin: user is logged in or not
  public isLoggedIn() {
    let tokenStr = localStorage.getItem(this.JWT_TOKEN)
    if (tokenStr == undefined ||
        tokenStr == "" ||
        tokenStr == null) {
      return false;
    }else {
      return true;
    }
  }

//  remove token from Local storage
  public logout() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.USER);
    return true;
  }

//  Get token
  public getToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

//  Set user Detail
  public setUser (user: any) {
    localStorage.setItem(this.USER, JSON.stringify(user));
  }

//  get user
  public getUser() {
    let userStr = localStorage.getItem(this.USER)
    if (userStr != null) {
      return JSON.parse(userStr)
    }else {
      this.logout()
      return null;
    }
  }

  //Get Roles user
  public getUserRole() {
    let user = this.getUser();
    return user.authorities;
  }
}
