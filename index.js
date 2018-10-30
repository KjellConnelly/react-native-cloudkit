import { Platform, Linking, NativeModules } from 'react-native'
import CloudKitJS from './local_versions/2.0/cloudkit'

export default class CloudKit {
  static test() {
    const configured = CloudKitJS.configure({
      containers: [{
        containerIdentifier: '[insert your container ID here]',
        apiTokenAuth: {
            apiToken: '[insert your API token and other authentication properties here]'
        },
        environment: 'development'
      }]
    })
  }
}
