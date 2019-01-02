import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../services/application/application.service'

// import { MongoService } from '../../services/mongo/mongo.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    // private mongo: MongoService
    public apps: ApplicationService
  ) { }

  public creatingApplication: boolean = false


  ngOnInit() {
    // this.mongo.connect()
    this.apps.request_applications_from_server()
  }
  
  createApplication (name: string, version: string, download: string) {
    const app = {name, version, download}
    this.apps.createApplication(app)
    this.creatingApplication = false
  }

}
