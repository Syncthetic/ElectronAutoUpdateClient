# ElectronAutoUpdateClient
> If you use MongoDB Stitch for your application, you can simply login with this application to manage all of your applications. i.e, change version information which causes applications using [ElectronAutoUpdate](https://github.com/Syncthetic/ElectronAutoUpdate) to fire events if it's outdated. This should be used in pair with resources from [ElectronAutoUpdateAPI](https://github.com/Syncthetic/ElectronAutoUpdateAPI)

 This repository was created along side the following repositories to streamline Electron application updates.
 
>  [ElectronAutoUpdateAPI](https://github.com/Syncthetic/ElectronAutoUpdateAPI) - Quick start a MongoDB REST API for your applications. This API can be used to trigger automatic updates and more
  
 >  [ElectronAutoUpdate](https://github.com/Syncthetic/ElectronAutoUpdate) - Use this NPM module inside your Electron application with a [ElectronAutoUpdateAPI](https://github.com/Syncthetic/ElectronAutoUpdateAPI) API to fetch application version information, download links, or more.

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

Start the application
`npm run electron:local`

Login with the proper creds to add or edit your applications