# react-native-cloudkit

#### Production vs Development

Apple has two servers that do not have the same data in them. Development, and production. You can add/alter data in them from their web portal. By default, this library will access the development server when you create a react-native development build, and the production server when creating a release build:

```javascript
{
    environment:__DEV__ ? "development" : "production"
}
```

You can change this default behavior if you want.

#### What version of CloudKit JS is currently being used?

Version 2.0. You can use a different version if you want, though this is the one being added to this package currently. A copy of it has been added locally to the project.

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
