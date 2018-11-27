import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

import * as firebase from 'firebase/app';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

import { AppUser } from '../models/app-user';
import { UserService } from './user.service';


@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;


  constructor( private afAuth: AngularFireAuth,
               private route: ActivatedRoute,
               private userService: UserService ) {
      this.user$ = afAuth.authState;
    }

  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    const provider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithRedirect(provider);
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    return this.user$
               .switchMap(user => {
              if ( user ) {
                 return this.userService.get(user.uid);
              } else {
                 return Observable.of(null);
              }
            });
  }
}
/*
get appUser$() : Observable<AppUser> {
    return this.user$
      .switchMap(user => {
        if (user) return this.userService.get(user.uid);

        return Observable.of(null);
      });
  }
*/
