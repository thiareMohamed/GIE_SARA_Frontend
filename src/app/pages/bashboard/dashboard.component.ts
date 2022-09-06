import { Component, OnInit } from '@angular/core';
import {LoginService} from "../login/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  burger :String = "0px";
  side: String = "0px";
  public href: string = "";
  sidebar: boolean = false

  constructor(private login: LoginService,
              private router: Router) { }

  ngOnInit(): void {
    this.href = window.location.href;
    console.log(this.href.substring(22))
    // console.log(this.router.url)
    // console.log(this.router.config[6].path);
    if (this.href.substring(22) == 'login') {
      this.sidebar = true
    }
    if (this.href.substring(22) == '') {
      this.sidebar = true
    }
    // console.log(window.location.href)
  }

  onMenuClick(){
    this.onClick()
     if (this.burger == "300px"){
     return this.burger = "0px";
   }else {
     return this.burger = "300px";
   }
  }

  onClick() {
    let a = document.querySelector("#section");
    if(a != null) {
      a.classList.toggle("col-lg-2")
      a.classList.toggle("col-md-1")
    }else console.log("error");
  }

  logOut() {
    this.login.logout()
    window.location.href = 'login'
  }

}
