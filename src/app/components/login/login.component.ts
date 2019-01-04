import { Component, OnInit } from '@angular/core';
import { StitchService } from '../../services/mongo/mongo.service'
import { ApplicationService } from '../../services/application/application.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private stitch: StitchService,
    private apps: ApplicationService
  ) { }

  public loggedIn: boolean

  ngOnInit() {
  }

  stitch_login (email: string, password: string) {
    // console.log('Attempting login with', email, password)
    this.stitch.login(email, password).then(
      () => { this.apps.request_applications_from_server() }
    )
    this.loggedIn = this.stitch.creds !== null
  }

}
