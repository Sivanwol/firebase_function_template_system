# Pre requirement

for kick of the project need install the following packages as global

- `npm install -g firebase-tools`
- `npm install -g gulp-cli`
  <br />

<p>also need install google cloud cli tool -> https://cloud.google.com/sdk/gcloud</p>
<p>please place a file call serviceAccountKey.json within the src directory the content is the firebase certificate u can fetch at from https://console.firebase.google.com/</p>

## Commands

the project has few commands to use

- copy:environment - will create a config file (base the yaml files on config folder) and dump at to .env.json file
- copy:environment:develop - same as copy:environment just will run on develop environment
- environment - will sync the config into the firebase config service that will be exposed to functions
- deploy - will deploy the backend service
- logs - will show the logs on firebase
- emulators:start -  will start the emulators requirement before run the tests
- serve:dev -  will serve locally the functions required run before emulators:start
- shell - will begin the interactive shell with firebase functions

## Auth Testing

for craete a user please open  shell command and there add this command
```createNewUser({ disabled: false, displayName: 'Renaud', email: 'fastwings@Gmail.com', emailVerified: true, metadata: {creationTime: null, lastSignInTime: null}, photoURL: null, providerData: [], uid: '123' })```</p>

---


### Deployment system

there few deployment system support please check

[https://app.buddy.works/wolberg/ic-travel-backend/pipelines](https://app.buddy.works/wolberg/ic-travel-backend/pipelines)

this will cover and orignaize the work flow it self

as well the unit test system

## Deprecate Node Issue

currently the firebase run on node 8 as well free on the bar so for now i run on this node need check and find when possible run with limiters the node 10 that will limit the charge rate as well give the basic options to support this.


it known that many packages will be have issue with at so
