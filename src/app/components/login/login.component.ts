import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator, FormBuilder, Validators } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  constructor(private formBuilder:FormBuilder, private authService:AuthService, private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createLoginForm();
  }


  createLoginForm(){
    this.loginForm=this.formBuilder.group({
      email:["", Validators.required],
      password:["", Validators.required]
    })
  }

  login(){
    if(this.loginForm.valid){
      let loginModel = Object.assign({}, this.loginForm.value)
      this.authService.login(loginModel).subscribe(data=>{
      let responseModel = Object.assign({}, data)
      console.log(responseModel)
    })
      
    }else{
      this.toastrService.error("Geçersiz Giriş")
    }
  }

  isAuth(){
    if(this.authService.isAuthenticated()){
      this.toastrService.success("Giriş Yapıldı", "Başarılı")
    }else{
      this.toastrService.error("Giriş Başarısız", "Hata")
    }
  }


}




