import { Injectable, EventEmitter } from '@angular/core';
import { Router, Routes, RouterModule } from '@angular/router';

import { Observable } from 'rxjs/Observable'; // have to be removed
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
//import { Subscription } from 'rxjs/Subscription';

import { ApiService } from './api.service';
import { Jwt } from './jwt.service';
import { User } from './models/user.model';

let user$:User = {
  username: 'atar',
  firstName: 'Alex',
  lastName: 'Tar',
  email: 'atar@com.us'
}

@Injectable()
export class AuthService {

  // Singleton Guard ---------------------------------------------------------------------------------
  private static instance_counter: number = 0;
  private checkSingleton(Service){
    let error = ++Service.instance_counter > 1
    error && console.error('Singleton reproduction:', this.constructor.name, Service.instance_counter)
  } // -----------------------------------------------------------------------------------------------

  private _currentUser: BehaviorSubject<User> = new BehaviorSubject<User>(null)
  // current user container

  private setJwtHeader(jwt: string) {
    this.api.setHeaders({ Authorization: `Bearer ${jwt}` });
  }

  private clearJwtHeader() {
    this.api.deleteHeader('Authorization');
  }

  constructor(
    private api: ApiService,
    private jwt: Jwt,
    private router: Router
  ) {
    this.checkSingleton(AuthService) // show an error message in console if the singletone is copied
  }

  setUser(user:User): void {
    this._currentUser.next(user)
  }

  get currentUser(): Observable<User> {
    return this._currentUser;
  }

  attempAuth(type: string, credentials: any) {
    let path = (type === 'signin') ? '/login' : '/signup';
    let url = '/auth' + path;

      this.api.post(url, credentials)
      .map(res => res.json())
      .subscribe(res => {
        this.jwt.save(res.token);
        this.setUser(res.user)

//        this.router.navigateByUrl('/');
        this.router.navigate(['']);

//        this.setUser();
//        this.currentUser.subscribe(x => console.log(x))
/*
        this.currentStore.next(res.user);
        // set Authorization header
        this.setJwtHeader(res.id_token);

        if (this.desiredUrl && !this.desiredUrl.startsWith('/signin')) {
          this.router.navigateByUrl(this.desiredUrl);
        } else {
          this.router.navigate(['']);
        }
*/
      });
  }
/*
  ensureAuthIs(b: boolean): Observable<boolean> {
    const auth = new BehaviorSubject<boolean>(false);
    this.verifyAuth()
      .subscribe((authValid) => {
        // if it's the opposite, redirect signin page.
        if (authValid !== b) {
          console.log('not authenticationed.');

          // this.desiredUrl = this.router.routerState.snapshot.url;
          // console.log('this.route.snapshot.url@' + this.desiredUrl);

          // this.router.navigate(['', 'signin']);
          auth.next(false);
        } else {
          console.log('authenticated.');
          auth.next(true);
        }
      });
    return auth.asObservable();
  }
*/
}
