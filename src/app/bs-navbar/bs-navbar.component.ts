import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  isCollapsed: boolean;
  user: firebase.User;


  constructor(private afAuth: AngularFireAuth){
    afAuth.authState.subscribe(user => this.user = user);
  }

  onClick(){
    this.isCollapsed = !this.isCollapsed;
  }

  logout(){
    this.afAuth.auth.signOut();
  }
}
