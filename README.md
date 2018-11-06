# react-native-cloudkit

#### Ready for Use?
No. Maybe in a few days. But not yet.

## Getting started

`$ npm install react-native-cloudkit --save`

No native code is currently used, so no need to link.

## Import into your React-Native Component

`import CloudKit from 'react-native-cloudkit'`

## Example Usage for loading a String from CloudKit

This example fetches a record by the name and then queries for all 'Videos' objects. All data is displayed via ```setState()```
```javascript
import { View, Text } from 'react-native'
import CloudKit from 'react-native-cloudkit'

export default class MyPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recordTitleViaFetch:undefined,
      recordTitlesViaQuery:[],
    }
  }

  async componentDidMount() {
    const initOptions = {
      containers: [{
        containerIdentifier: 'iCloud.com.mywebsite.myapp',
        apiTokenAuth: {
            apiToken: 'lfjalsfjsau0jdosanf8918fsfasfnashosidjlksandldas9fhw1f'
        },
        environment: 'development'
      }]
    }
    const CloudKitJS = CloudKit.init(initOptions)
    try {
      // get record(s) by name
      const records = await CloudKit.fetchRecordsByName("C42AC12A-B2F4-1491-A37B-4213CB9127264")
      this.setState({
        recordTitleViaFetch:records[0].fields.title.value
      })

      // query for all records of type "Videos"
      const queryOptions = {
        query: {
          recordType:"Videos"
        }
      }
      const queryResponse = await CloudKit.query(queryOptions)
      if (queryResponse.moreComing) {
        // TODO: Maximum records hit, should query more...
      } else {
        const results = queryResponse["_results"]
        this.setState({
          recordTitlesViaQuery:results.map(record=>record.fields.title.value)
        })
      }
    } catch(err) {
      console.log(err)
    }
  }

  render() {
    return (
      <View>
        <Text>
          {this.state.recordTitleViaFetch || "Loading..."}
        </Text>
        {this.state.recordTitlesViaQuery.map((title, i)=>{return(
          <Text key={"title"+i}>
            {title}
          </Text>
        )})}
      </View>
    )
  }
}

```

#### Production vs Development

Apple has two servers that do not have the same data in them. Development, and production. You can add/alter data in them from their web portal. By default, this library will access the development server when you create a react-native development build, and the production server when creating a release build:

```javascript
{
    environment:__DEV__ ? "development" : "production"
}
```

You can change this default behavior if you want.

#### What version of CloudKit JS is currently being used?

Version 1.0. You can use a different version if you want, though this is the one being added to this package currently. A copy of it has been added locally to the project. Although 2.0 is available, and 1.0 is planned to be deprecated at some point in the future, 2.0 requires crypto which to my knowledge is a NodeJS module which by default doesn't work with React Native. So after getting the red screen of death for a few minutes, I just switched to 1.0.

#### Why did you create this library?

I want a free way to have a database to host certain data. Personally, I'm going to use it to host short videos, images, and data that I will use to dynamically load in my apps. I also may enable iCloud Syncing for iOS users only (though my app works for Android as well).

#### Is this the same as iCloud Sync?

No, it's not. I mean, you can use it to sync via iCloud, but you'll have to create your own scheme and write your app's logic for that. Of course, syncing private data between devices requires an Apple ID, which isn't going to work for most Android users since they do not have Apple IDs.

#### How do I setup my Cloudkit App?

https://developer.apple.com/documentation/cloudkitjs

There is a lot of info, and I'm sure the docs will be updated as time goes on. But basically, here's how it's done:
1) Create an Apple based app (iOS/tvOS/macOS).
2) Turn on CloudKit via Xcode
3) Setup your Cloud structure using the Web Portal
4) Use this library to access the Cloud.

#### How does Apple support Android apps?

Technically, they do not. But since they have a way to access your app's cloud server from the web, you can do it from an Android app as well. There are limitations though.

##### Public Container
Anyone can access your public container without authentication. So here's where Cloudkit should work on Android just as well as iOS.

##### Private Container
This is stuff that a user will need to have an Apple ID for. Typically, users with iPhones and iPads are already signed into their Apple ID before ever opening your app, so authentication happens automatically. On a web app, or Android in this case, your user would need to have an Apple ID, which is not obtainable unless they already have an Apple Device. Private containers are not recommended for Android users in this case.

If your user has anything that should be kept private, you should not be using this library to save it to CloudKit.

#### How do I setup my backend?

This library uses CloudKit JS to access your Apple's Cloudkit servers. This is something you will have to create and manage yourself.

#### Does this library use native code?

Currently it does not. Everything is in JS, so yes, you can use it with Expo.

#### Common Error Handling

##### Type is not marked indexable. Enable the “queryable” index on this field in the indexes section.
When you query for a record, you can't query for just anything by default. So you need to go into the Cloud Kit Dashboard webpage and make this type as indexable.
