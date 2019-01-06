import { Injectable } from '@angular/core';
import { StitchService } from '../mongo/mongo.service'

export interface Application {
  name: string
  version: string
  download: string
  additionalInfo?: {}
}

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(
    private stitch: StitchService
  ) {
  }

  public applications = []

  request_applications_from_server() {
    console.log('Finding {} in application -> updates')
    this.stitch.find({db: 'applications', coll: 'updates'}, {}).then(
      (data) => {
        this.applications = data
        console.log(data)
      }
    )
  }
  
  createApplication(application: Application) {
    this.stitch.insertItem({db: 'applications', coll: 'updates'}, application).then(
      (res) => {
        console.log(res)
        this.request_applications_from_server()
      }
    )
  }

  deleteApplication(application: Application) {
    this.stitch.deleteObject({db: 'applications', coll: 'updates'}, application).then(
      (res) => {
        console.log('Delete result', res)
        this.request_applications_from_server()
      },
      (err) => {
        console.error(err)
      }
    )
  }

  updateApplication(application: Application) {
    let searchObject = { name: application.name }
    this.stitch.updateObject({db: 'applications', coll: 'updates'}, searchObject, application).then(
      (res) => {
        console.log('Update result', res)
        this.request_applications_from_server()
      }
    )
  }
  
  returnApplication(application_name: string): Application {
    return this.applications.find((app: Application) => {
      return app.name === application_name
    })
  }
  
  hasApps (): boolean {
    return this.applications.length > 0
  }
}
