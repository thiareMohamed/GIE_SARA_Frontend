import { Component, OnInit } from '@angular/core';
import {LoginService} from "./login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginData = {
    username: "",
    password: ""
  }
  nomUtilisateur: boolean = true
  password: boolean = true
  errorForm: boolean = true

  constructor(private login: LoginService,
              private router: Router) { }

  ngOnInit(): void {
  }

  formSubmit() {
    console.log("login button click")

    if (this.loginData.username.trim() == '' ||
        this.loginData.username == null) {

      this.nomUtilisateur = false
      return;
    }

    if (this.loginData.password.trim() == '' ||
      this.loginData.password == null) {

      this.password = false
      return;
    }

    this.login.generateToken(this.loginData).subscribe((data) => {
      console.log("success");
      console.log(data);

    //  login...
      this.login.loginUser(data.id_token);

      this.login.getCurrentUser().subscribe(
        (user: any) => {
          this.login.setUser(user);
          console.log(user)
          let nbr = this.login.getUserRole().length - 1
          if (this.login.getUserRole()[nbr].name == "ROLE_ADMIN") {
            window.location.href = "/accueil"
          }
          else if (this.login.getUserRole()[nbr].name == "ROLE_USER") {
            window.location.href = "/accueil"
          }else {
            this.login.logout()
            this.router.navigate(['login'])
          }
        }
      )
    },
      (error)=> {
        console.log("Erreur !");
        console.log(error)
        this.password = true
        this.nomUtilisateur = true
        this.errorForm = false
      })
  }
}
