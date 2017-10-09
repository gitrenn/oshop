import { AppUser } from './../models/app-user';
import { AuthService } from './../auth.service';
import { Component } from '@angular/core';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  isCollapsed: boolean;
  appUser: AppUser;


  constructor(private auth: AuthService){
    auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  onClick(){
    this.isCollapsed = !this.isCollapsed;
  }

  logout(){
    this.auth.logout();
  }
}
