import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "../auth.service";

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  isLoading = false;
  constructor(public authService: AuthService, private router: Router){}

  onLogin(form: NgForm){
    console.log(form);
    if(form.invalid){
      return;
    }
    this.isLoading = true;
    this.authService.authenticateUser(form.value.userId, form.value.password);
  }

  ngOnInit(){
    const isAuth = this.authService.getIsAuth();
    if(isAuth){
      this.router.navigate(['/tender/list']);
    }
  }
}
