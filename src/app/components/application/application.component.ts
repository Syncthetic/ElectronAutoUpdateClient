import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicationService, Application } from '../../services/application/application.service'

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationDetailsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    public apps: ApplicationService
  ) { }

  public app: Application
  private appRoute: string

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      console.log(params.get('name'));
      this.appRoute = params.get('name');
      this.app = this.apps.returnApplication(this.appRoute)
    })
  }

}
