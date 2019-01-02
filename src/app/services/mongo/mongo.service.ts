import { Injectable } from '@angular/core';
import {
  Stitch,
  UserPasswordAuthProviderClient,
  RemoteMongoClient,
  UserPasswordCredential,
  RemoteMongoCollection,
  RemoteMongoDatabase,
  AnonymousCredential
} from "mongodb-stitch-browser-sdk";
import { stitchServiceErrorCodeFromApi } from '../../../../node_modules/mongodb-stitch-core-sdk/dist/esm/StitchServiceErrorCode';

@Injectable({
  providedIn: 'root'
})
export class StitchService {

  constructor(
  ) { }

  APP_ID: string = 'electronupdater-wqses'
  db: string
  coll: string
  client = Stitch.initializeDefaultAppClient(this.APP_ID);
  creds: UserPasswordCredential
  // anonCreds: AnonymousCredential = new AnonymousCredential()

  // Return the E-mail password client from Stitch
  emailPassClient() {
    return Stitch.defaultAppClient.auth.getProviderClient(UserPasswordAuthProviderClient.factory)
  }

  retrieveDB(db = this.db) {
    return this.client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db(db)
  }


  register(username, password) {
    const emailPassClient = this.emailPassClient()
    return emailPassClient.registerWithEmail(username, password)
  }

  verifyEmail(token, tokenID) {
    return this.emailPassClient().confirmUser(token, tokenID)
  }

  reconfirmEmail(email) {
    return this.emailPassClient().resendConfirmationEmail(email)
  }

  login(email, pass) {
    this.creds = new UserPasswordCredential(email, pass)
    return this.client.auth.loginWithCredential(this.creds)
  }

  insertItem({ db, coll }: { db: string, coll: string }, obj: object) {
    return this.prepare({ db, coll }).then(prep => {
      return prep.insertOne(obj)
    })
  }

  insertMany({ db, coll }: { db: string, coll: string }, list: Array<object>) {
    return this.prepare({ db, coll }).then(prep => {
      prep.insertMany(list)
    })
  }

  find({ db, coll }: { db: string, coll: string }, query: object) {
    return this.client.auth.loginWithCredential(this.creds).then(user => {
      return this.retrieveDB(db).collection(coll)
    }).then(prep => {
      return prep.find(query).asArray()
    })
  }

  prepare({ db, coll }: { db: string, coll: string }): Promise<RemoteMongoCollection<{}>> {
    return this.client.auth.loginWithCredential(this.creds).then(user => {
      return this.retrieveDB(db).collection(coll)
    })
  }

  db_prepare(db: string): Promise<RemoteMongoDatabase> {
    return this.client.auth.loginWithCredential(this.creds).then(user => {
      return this.retrieveDB(db)
    })
  }

  deleteCollection({ db, coll }: { db: string, coll: string }) {
    return this.db_prepare(db).then(prep => {
      return prep.collection(coll).deleteMany({})
    })
  }

  deleteObject({ db, coll }: { db: string, coll: string }, collection_object: object) {
    return this.db_prepare(db).then(prep => {
      return prep.collection(coll).deleteOne(collection_object)
    })
  }

  updateObject({ db, coll }: { db: string, coll: string }, searchObject: object, setObject: object) {
    return this.db_prepare(db).then(prep => {
      return prep.collection(coll).updateOne(searchObject, setObject)
    })
  }

}
