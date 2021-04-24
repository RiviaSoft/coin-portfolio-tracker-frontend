import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  selectedTab:string;
  constructor() { }

  ngOnInit(): void {
  }
  setSelected(tabName:string){
    this.selectedTab = tabName;
  }
  getClass(tabName:string):string{
    if(this.selectedTab != null){
      if(this.selectedTab === tabName){
        return "nav-link active";
      }
      return "nav-link";
    }else{
      if(tabName === "login"){
        return "nav-link active";
      }
      return "nav-link";
    }
  }
}
