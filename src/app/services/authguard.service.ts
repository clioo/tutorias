import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {
  constructor(public _authService:AuthService) { }
  canActivate(next:ActivatedRouteSnapshot, state:RouterStateSnapshot){
    if (!this._authService.isAuthenticated()) {
      this._authService.login();
    }
    return this._authService.isAuthenticated();
  }

}
