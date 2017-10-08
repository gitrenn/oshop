import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  isCollapsed: boolean;
  user$: Observable<firebase.User>;


  constructor(private afAuth: AngularFireAuth){
    this.user$ = afAuth.authState;
  }

  onClick(){
    this.isCollapsed = !this.isCollapsed;
  }

  logout(){
    this.afAuth.auth.signOut();
  }
}
