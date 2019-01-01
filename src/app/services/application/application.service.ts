import { Injectable } from '@angular/core';
import { MongoService } from '../mongo/mongo.service'

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(
    private mongo: MongoService
  ) {}

  public applications = []

  request_applications_from_server () {
    this.mongo.get_instance().then(
      (client) => {
        console.log('Client', client)
        client.find({}).toArray((error, result) => {
          if ( error ) console.error(error)
          console.log(result)
          this.applications = result
        })
      }
    )

    // this.mongo.get_instance().find({}).toArray((error, result) => {
    //   if(error) console.error(error)
    //   console.log(result)
    //   this.applications = result
    // })

  }
}
