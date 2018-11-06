import { Platform, Linking, NativeModules } from 'react-native'
import CloudKitJS from './local_versions/1.0/cloudkit'

export default class CloudKit {
  static init(options) {
    const configured = CloudKitJS.configure({
      containers: options.containers
    })
    return CloudKitJS
  }

  static async query(options = {

  }) {
    return new Promise((resolve, reject)=>{

    })
  }

  static fetchRecordsByName(recordName, options = {
    container:"default",
    database:"public"
  }) {
    return new Promise((resolve, reject)=>{
      const container = options.container == "default" ?
        CloudKitJS.getDefaultContainer() :
        CloudKitJS.getContainer(options.container)

      const database = options.database == "private" ?
        container.privateCloudDatabase : (
          options.database == "shared" ?
            container.sharedCloudDatabase :
            container.publicCloudDatabase
        )

      database.fetchRecords(recordName).then(response=>{
        if (response.hasErrors) {
          reject(response.errors)
        } else {
          resolve(response.records)
        }
      })
    })
  }
}
