import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bashboard',
  templateUrl: './bashboard.component.html',
  styleUrls: ['./bashboard.component.scss']
})
export class BashboardComponent implements OnInit {

  burger :String = "0px";
  side: String = "0px";
  constructor() { }

  ngOnInit(): void {
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

}
