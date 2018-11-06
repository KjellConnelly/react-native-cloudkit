import { Platform, Linking, NativeModules } from 'react-native'
import CloudKitJS from './local_versions/1.0/cloudkit'
import helper from './helper'

export default class CloudKit {
  static init(options) {
    const configured = CloudKitJS.configure({
      containers: options.containers
    })
    return CloudKitJS
  }

  static async query(options = {
    query: { // query must be included and at least have a recordType
      recordType:"",
      filterBy:[],
      sortBy:[]
    },
    zoneID:undefined, // default zone
    resultsLimit:undefined, // currently default is 200
    desiredKeys:undefined, // currently default gets all keys/values from record
    zoneWide:undefined, // if options.zone is undefined, and options.zoneWide is true, searches all zones, otherwise searches JUST the default zone
    container:"default",
    database:"public"
  }) {
    return new Promise((resolve, reject)=>{
      const CD = helper.getContainerAndDatabase(options)
      const modifiedOptions = {
        zoneID:options.zoneID,
        resultsLimit:options.resultsLimit,
        desiredKeys:options.desiredKeys,
        zoneWide:options.zoneWide,
      }

      CD.database.performQuery(options.query).then(response=>{
        if (response.hasErrors) {
          reject(response.errors)
        } else {
          resolve(response)
        }
      })
    })
  }

  static fetchRecordsByName(recordName, options = {
    container:"default",
    database:"public"
  }) {
    return new Promise((resolve, reject)=>{
      const CD = helper.getContainerAndDatabase(options)
      CD.database.fetchRecords(recordName).then(response=>{
        if (response.hasErrors) {
          reject(response.errors)
        } else {
          resolve(response.records)
        }
      })
    })
  }
}
