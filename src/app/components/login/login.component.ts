import { Component, OnInit } from '@angular/core';
import { StitchService } from '../../services/mongo/mongo.service'
import { ApplicationService } from '../../services/application/application.service'
import { Router } from "@angular/router"
import { ProfileService } from '../../services/profile/profile.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private stitch: StitchService,
    private apps: ApplicationService,
    private profile: ProfileService,
    private router: Router
  ) { }

  error: boolean = false
  response: string
  attempts: number = 0
  login: string = ''

  ngOnInit() {
  }

  scratch() {
    this.error = false
    this.response = null
  }

  loginAttempt(username, password) {
    if (this.attempts > 0) {
      this.scratch()
    }
    this.stitch.login(username, password)
      .then(user => {
        console.log(username + ' logged in')
        this.handleSuccessfulLogin(user)
      })
      .catch(err => {
        console.error(err)
        this.handleFailedLogin(err)
      })
  }

  handleFailedLogin(data) {
    // this.toast.addToast({ severity: 'error', summary: 'Failed Login', detail: data.message })
    if (data.name === 'StitchServiceError' || data.name === 'StitchRequestError') {
      this.error = true
      this.response = data.message
      return null
    }
  }

  handleSuccessfulLogin(data) {
    // this.toast.addToast({ severity: 'success', summary: 'Login Success', detail: 'You have been authenticated!' })
    this.profile.postLogin(data)
    this.response = data.message
    this.apps.request_applications_from_server()
    this.router.navigateByUrl('/')
  }

  logout() {
    this.profile.logout()
  }
}
