import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    private userService:UserService,
    private toastrService:ToastrService
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
    this.toastrService.info("Yakında...")
  }

  logOut(){
    localStorage.removeItem("token")
    localStorage.removeItem("id")
    this.router.navigate([""]);
  }

}
