import { Injectable } from '@angular/core';
import { Router } from '@angular/router'

interface User {
  id?: string,
  email?: string,
  loggedIn?: boolean,
  type?: string,
  isAdmin?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private router: Router
  ) { }

  user: User
  loggedIn: boolean = false

  postLogin(resp) {
    console.log('Post login: ', resp)
    const createdUser: User = {
      id: resp.id,
      email: resp.profile.data.email,
      type: resp.profile.userType,
      loggedIn: true
    }
    console.log('Setting profile: ', createdUser)
    this.user = createdUser
    this.loggedIn = true
  }

  logout() {
    this.user = {}
    this.loggedIn = false
    this.router.navigateByUrl('')
  }

  getProfile() {
    console.log('Getting user: ', this.user)
    return this.user
  }
}
