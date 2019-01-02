import { Component, OnInit } from '@angular/core';
import { StitchService } from '../../services/mongo/mongo.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private stitch: StitchService
  ) { }

  public loggedIn: boolean

  ngOnInit() {
  }

  stitch_login (email: string, password: string) {
    console.log('Attempting login with', email, password)
    this.stitch.login(email, password)
    this.loggedIn = this.stitch.creds !== null
  }

}
