import { Injectable } from '@angular/core';
import { StitchService } from '../mongo/mongo.service'

interface Application {
  name: string
  version: string
  download: string
  additionInfo?: any[]
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
      }
    )
  }
    
  
}
