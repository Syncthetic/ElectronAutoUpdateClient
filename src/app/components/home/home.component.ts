import { Component, OnInit, ViewChild } from '@angular/core';
import { ApplicationService } from '../../services/application/application.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public apps: ApplicationService
  ) { }

  public creatingApplication: boolean = false


  ngOnInit() {
  }
  
  createApplication (name: string, version: string, download: string) {
    const app = {name, version, download}
    this.apps.createApplication(app)
    this.creatingApplication = false
  }

}
