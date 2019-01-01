import { Injectable } from '@angular/core';
import * as mongodb from 'mongodb';

@Injectable({
  providedIn: 'root'
})
export class MongoService {

  constructor(
  ) { }

  private CONNECTION_URL = process.env.ROE_DB_CONNECTION
  private DATABASE_NAME = process.env.ROE_DB_NAME
  private COLLECTIONS = process.env.ROE_COLLECTIONS        
  private COLLECTION_LIST = []
  private collection

  async get_instance () {
    if ( this.collection ) return this.collection
    return this.connect()
  }

   connect () {
    mongodb.connect(this.CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) { throw error; }
        const database = client.db(this.DATABASE_NAME);
        this.initialize_collections(database)
        this.set_collection(database.collection(this.COLLECTION_LIST[0].name))
        console.log("Connected to database: " + this.DATABASE_NAME);
    })
  }

  private initialize_collections (database) {
      this.COLLECTIONS.split(':').map(coll => {
          const collection = { name: coll, ref: database.collection(coll) }
          this.COLLECTION_LIST.push(collection)
      })
  }

  coll (name: string) {
      return this.COLLECTION_LIST.find(coll => { return coll.name === name } ).ref
  }

  client () {
    return this.collection
  }

  set_collection (collection) {
    this.collection = collection
  }
}
