import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validator,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from 'src/app/models/userModel';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  profileForm:FormGroup;
  updatedProfile:UserModel


  constructor(
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private userService:UserService
  ) { }

  ngOnInit(): void {
    this.createProfileForm()
    this.getCurrentUser()
  }

  getCurrentUser(){
    this.userService.getUser().subscribe((data)=>{
      this.updatedProfile = data
    })
  }

  createProfileForm(){
    this.profileForm = this.formBuilder.group({
      name:['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    })
  }

  update(){
    if(this.profileForm.valid){
      if(this.profileForm.value.confirmPassword == this.profileForm.value.password) {
        this.updatedProfile.name=this.profileForm.value.name
        this.updatedProfile.password=this.profileForm.value.password
        this.toastrService.success("Profil Güncellendi!", "Başarılı!")
        this.userService.updateProfile(this.updatedProfile).subscribe((data)=>{
          console.log(data)
        })
      } else{
        this.toastrService.error("Şifreler Eşleşmiyor", "Başarısız")
      }
    }else{
      this.toastrService.error("Neyi Başaramadın @#%$&!", "Başaramadım")
    }
    
  }

}
