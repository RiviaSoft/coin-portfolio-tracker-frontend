import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  currentTab:string = "";
  constructor() { }

  ngOnInit(): void {
  }

  setCurrentTab(tabName:string){
    this.currentTab = tabName;
  }
  getCurrentCategoryClass(tab:string){
    if(tab == this.currentTab){
      return "list-group-item active"
    }
    return "list-group-item bg-dark"
  }

}
