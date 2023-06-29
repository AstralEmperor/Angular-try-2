import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  loginForm!:FormGroup;
  isSubmitted = false;
  constructor(private formBuilder:FormBuilder){}

  ngOnInit():void{
    this.loginForm = this.formBuilder.group({
      email:['', [Validators.required,Validators.email]],
      password:['',[Validators.required]]
    })
    //loginForm.controls.email 
    // but in the way bellow we can use fc.email
  }
  get fc(){
    return this.loginForm.controls;
  }
  submit(){
    this.isSubmitted = true;
    if(this.loginForm.invalid) return;
    alert(`email:${this.fc.email.value}, 
           password:${this.fc.password.value}`)
  }
}
