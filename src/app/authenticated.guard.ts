import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ProfileService } from './services/profile/profile.service'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {
  constructor (
    private router: Router,
    private profile: ProfileService
  ) {}
  
  canActivate(): boolean {
    // console.log('Auth guard: status', this.profile.loggedIn)
    let status = this.profile.loggedIn
    if (status === false) {
      this.router.navigateByUrl('/login')
      return status
    }
    return status
  }
}
