import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private apiService: ApiService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
   return this.apiService.isAuthenticated();
  }
}
