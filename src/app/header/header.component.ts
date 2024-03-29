import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName = "";

  constructor(private authService: AuthService) {}

  ngOnInit(){
    this.userName = this.authService.getUserName();
  }

  onLogout(){
    this.authService.logout();
  }
}
