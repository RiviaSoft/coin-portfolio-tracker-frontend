import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/userModel';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  isLogin:boolean = false;
  currentUser:UserModel;

  constructor(
    private router:Router,
    private userService:UserService
    ) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser(){
    this.userService.getUser().subscribe((data) => {
      this.currentUser = data;
      if(data.name != undefined){
        this.isLogin = true;
      }
    })
  }
  updateProfile(){
    
  }

  logOut(){
    localStorage.removeItem("token")
    this.router.navigate(["login"]);
  }
}
