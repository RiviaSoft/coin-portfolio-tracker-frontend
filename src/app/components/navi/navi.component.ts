import { Component, OnInit } from '@angular/core';
import { CurrentUserModel } from 'src/app/models/currentUserModel';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  currentUser:CurrentUserModel;
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser(){
    this.userService.getUser().subscribe((data) => {
      this.currentUser = data;
    })
  }

  logOut(){
    localStorage.removeItem("token")
  }
}
