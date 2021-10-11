import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

import { AuthData } from "./auth-data.model";
import { environment } from "src/environments/environment";

const BACKEND_URL = environment.apiUrl + "/user/";

@Injectable({providedIn: "root"})
export class AuthService{
  private isAuthenticated = false;

  private token: string;
  private tokenTimer: any;
  private userId: string;
  private name: string;
  private role: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router){}

  getToken(){
    return this.token;
  }

  getIsAuth(){
    return this.isAuthenticated;
  }

  getUserId(){
    return this.userId;
  }

  getUserName(){
    return this.name;
  }

  getUserRole(){
    return this.role;
  }

  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  authenticateUser(userId: string, password: string){
    const authData: AuthData = {userId: userId, password: password};
    this.http.post<{userId: string, name: string, role: string, token: string, expiresIn: number}>(BACKEND_URL + "authenticate", authData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if(token){
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.userId = response.userId;
          this.name = response.name;
          this.role = response.role;

          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(token, expirationDate, this.userId, this.name, this.role);
          this.router.navigate(['/tender/list']);
        }
      }, error => {
        this.authStatusListener.next(false);
      });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if(!authInformation){
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if(expiresIn > 0){
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout(){
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.userId = null;
    this.role = null;
    this.name = null
    this.router.navigate(['/login']);
  }

  private setAuthTimer(duration: number){
    this.tokenTimer = setTimeout(()=>{
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string, name: string, role: string){
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId", userId);
    localStorage.setItem("name", name);
    localStorage.setItem("role", role);
  }

  private clearAuthData(){
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
  }

  private getAuthData(){
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    const name = localStorage.getItem("name");
    const role = localStorage.getItem("role");

    if(!token || !expirationDate){
      return
    }
    return{
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
      name: name,
      role: role
    }
  }
}
