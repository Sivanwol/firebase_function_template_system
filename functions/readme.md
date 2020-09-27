# Pre requirement
for kick of the project need install the following packages as global
- `npm install -g firebase-tools`
- `npm install -g gulp-cli`
<br />
<p>also need install google cloud cli tool -> https://cloud.google.com/sdk/gcloud</p>

# Commands
 the project has few commands to use
 - copy:environment - will create a config file (base the yaml files on config folder) and dump at to .env.json file
 - copy:environment:develop - same as copy:environment just will run on develop environment
 - environment - will sync the config into the firebase config service that will be exposed to functions
 - deploy - will deploy the backend service
 - logs - will show the logs on firebase
 - emulators:start -  will start the emulators requirement before run the tests
 - serve:dev -  will serve locally the functions required run before emulators:start

 