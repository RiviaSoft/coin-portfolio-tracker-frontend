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
      console.log(loginModel)
      this.authService.login(loginModel).subscribe(data => {
        this.token = data["token"];
        localStorage.setItem("token", data.token)
        this.toastrService.success('Giriş Başarılı !!');
        this.routerService.navigate(["dashboard"])
      }, responseError=>{
        this.toastrService.error("Hata", "Email veya parola hatalı")
      });
    } else {
      this.toastrService.error('Geçersiz Giriş !');
    }
  }

  isAuth() {
    if (this.authService.isAuthenticated()) {
      this.toastrService.success('Giriş Yapıldı', 'Başarılı');
    } else {
      this.toastrService.error('Giriş Başarısız', 'Hata');
    }
  }
}
