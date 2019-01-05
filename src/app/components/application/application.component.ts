import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService, Application } from '../../services/application/application.service'

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationDetailsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public apps: ApplicationService
  ) { }

  public app: Application
  private appRoute: string
  public editorMode: Boolean = false
  private newApplicationDetails: Application

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      console.log(params.get('name'));
      this.appRoute = params.get('name');
      this.app = this.apps.returnApplication(this.appRoute)
      // Copy app properties into new object for changes (when editor mode is enabled)
      this.newApplicationDetails = { ...this.app}
    })
  }

  deleteApp() {
    this.apps.deleteApplication(this.app)
    this.router.navigateByUrl('')
  }

  updateApp() {
    this.apps.updateApplication(this.newApplicationDetails)
  }

  modifyApp(property: string, val: string) {
    this.newApplicationDetails[property] = val
  }

}
