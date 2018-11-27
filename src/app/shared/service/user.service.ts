import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

import * as firebase from 'firebase/database';

import { AppUser } from '../models/app-user';


@Injectable()
export class UserService {
  private basePath = '/users';
  user: FirebaseObjectObservable<AppUser> = null;

  constructor(private db: AngularFireDatabase) { }

  save(user: firebase.User) {
    this.db.object('/users' + user.uid).update({
      name: user.displayName,
      email: user.email,
      isAdmin: true
    });
  }

  get(uid: string): FirebaseObjectObservable<AppUser> {
    this.user = this.db.object( '/users' + uid );
    // console.log('DBuG: getUser= ' + this.user + '  --  ', this.user);
    return this.user;
  }

}
