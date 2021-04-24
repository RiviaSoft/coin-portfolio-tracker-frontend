import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validator,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private routerService:Router
  ) { }

  ngOnInit(): void {
    this.createRegisterForm()
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  register(){
    if(this.registerForm.valid){
      let registerModel = this.registerForm.value
      this.authService.register(registerModel).subscribe(data => {
        this.toastrService.success("Lütfen Giriş Yapın", "Başarılı!")
        this.routerService.navigate(["login"])
      }, responseError=>{
        this.toastrService.error("Kayıt Başarısız!", "Hata")
      })
    }
  }

}
