import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CanActivate } from '@angular/router';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { AuthService } from '../../shared/service/auth.service';
import { UserService } from '../../shared/service/user.service';

@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(
        private auth: AuthService,
        private userService: UserService ) { }

  public canActivate(): Observable<boolean> {

    return this.auth.appUser$
        .map(appUser => appUser.isAdmin);
  }

    // -- battle - game of two days
    /*
    public canActivate(): Observable<boolean> {
      return this.auth.user$
          // .map( user => {
          //     const userId = user.uid;
          //     console.log('TeST: DBuG: user= ', userId);
          //     return true;
          // })
          .switchMap(user => this.userService.get(user.uid))
          .map(appUser => appUser.isAdmin);
    }
    */
}

