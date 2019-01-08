# ElectronAutoUpdateClient
> A desktop client to manage applications with [ElectronAutoUpdateAPI](https://github.com/Syncthetic/ElectronAutoUpdateAPI)

# Before you start
- Sign up at [MongoDB](https://www.mongodb.com/cloud/stitch) if you have not already.
- Create a Stitch application and turn on the provider for e-mail/password
- Create an account on the website to login with
- Ensure desired IP addresses are white-listed on your cluster

> When creating my cluster, I chose to use `applications.updates` for my applications. Inserted documents should follow the `Interface Application`

```javascript
interface Application {
  name: string
  version: string
  download: string
  additionalInfo?: {}
}
```

Clone the repository
`git clone https://github.com/Syncthetic/ElectronAutoUpdateClient`

Install dependancies
`cd ElectronAutoUpdateClient && npm i`

Set the MongoDB Stitch APP ID in
`/src/app/services/mongo/mongo.service.ts`
It is currently hard-coded, but will not be in future versions.