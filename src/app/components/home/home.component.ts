import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../pages/login/login.service";
import {data} from "autoprefixer";
import {DashboardComponent} from "../../pages/bashboard/dashboard.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  mail: string = ''
  constructor(private login: LoginService,
              private dashboard: DashboardComponent) { }

  ngOnInit(): void {
    let user: any = localStorage.getItem('user')
    let user1 = JSON.parse(user);
    this.mail = user1.email
    this.dashboard.ngOnInit()
  }

}
