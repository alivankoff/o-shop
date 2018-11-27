import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, Route } from '@angular/router';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

import 'rxjs/add/operator/map';

import { AuthService } from './auth.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
        private auth: AuthService,
        private router: Router ) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      // console.log('rout= ', route);
      // console.log('state= ', state);

      return this.auth.user$.map( user => {
            if ( user ) {
              // console.log('001. DBuG: user= ' , user.uid);
              return true;
            } else {
              this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } } );
              return false;
            }
          });
    }
  }
