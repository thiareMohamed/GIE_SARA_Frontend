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
     if (this.burger == "309px"){
     return this.burger = "0px";
   }else {
     return this.burger = "309px";
   }
  }


}
