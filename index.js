import { Platform, Linking, NativeModules } from 'react-native'
import CloudKitJS from './local_versions/1.0/cloudkit'

export default class CloudKit {
  static init(options, callback) {
    const configured = CloudKitJS.configure({
      containers: options.containers
    })
    callback(CloudKitJS)
  }
}
