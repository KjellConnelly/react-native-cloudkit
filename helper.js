import CloudKitJS from './local_versions/1.0/cloudkit'

export default class helper {
  static getContainerAndDatabase(options) {
    const container = ((options.container == "default") || (options.container == undefined)) ?
      CloudKitJS.getDefaultContainer() :
      CloudKitJS.getContainer(options.container)

    const database = options.database == "private" ?
      container.privateCloudDatabase : (
        options.database == "shared" ?
          container.sharedCloudDatabase :
          container.publicCloudDatabase
      )

    return {container:container, database:database}
  }
}
