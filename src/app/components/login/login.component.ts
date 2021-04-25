import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validator,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from 'src/app/models/userModel';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  token:string;
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private routerService:Router
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
    if(this.authService.isAuthenticated()){
      this.routerService.navigate(["home/dashboard"])
    }else {
      this.routerService.navigate([""])
    }
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      let loginModel = this.loginForm.value;
      this.authService.login(loginModel).subscribe(data => {
        this.token = data["token"];
        localStorage.setItem("token", data.token)
        this.toastrService.success("Giriş Yapıldı", "Başarılı");
        this.routerService.navigate(["home/dashboard"])
      }, responseError=>{
        this.toastrService.error("Email veya parola hatalı", "Hata")
      });
    } else {
      this.toastrService.error('Geçersiz Giriş !');
    }
  }
}
