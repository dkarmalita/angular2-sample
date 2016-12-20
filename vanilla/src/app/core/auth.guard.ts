import {
  CanActivate, // - Decides if a route can be activated
//  CanActivateChild, // - Decides if children routes of a route can be activated
  CanDeactivate, // - Decides if a route can be deactivated
  CanLoad, // - Decides if a module can be loaded lazily
  Router, ActivatedRouteSnapshot, RouterStateSnapshot, Route } from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {EditPostComponent} from '../posts/edit-post.component';

import {AuthService} from './auth.service';

@Injectable()
export class AuthGuard
  implements CanActivate,
  CanLoad,
  CanDeactivate<EditPostComponent>
{

  constructor(
    private router : Router,
    private authService : AuthService
  ) {}

  canActivate(
      route : ActivatedRouteSnapshot,
      state : RouterStateSnapshot
  ): boolean {
      console.log('ACTIVATION GUARD', route, state)
      return true;
  }

  canLoad(
      route : Route,
  ): boolean {
      console.log('LOADING GUARD', route.path, route)
      return true;
  }

  canDeactivate(target: EditPostComponent){
    console.log('DEACTIVATION GUARD', target)
    if(target.hasChanges()){
        return window.confirm('Do you really want to cancel?');
    }
    return true;
  }
}
