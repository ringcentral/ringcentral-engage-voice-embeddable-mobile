# ringcentral-engage-voice-embeddable-mobile

**Experimental** Android/IOS apps based on ringcentral-engage-voice-embeddable and cordova

## Download apps

[https://github.com/ringcentral/ringcentral-engage-voice-embeddable-mobile/releases](https://github.com/ringcentral/ringcentral-engage-voice-embeddable-mobile/releases)

## todos

- [x] Running in Android
- [ ] Running in IOS
- [ ] Deploy server to AWS Lambda
- [ ] Build release with CI
- [ ] Use web worker
- [x] Deploy to github pages?

## Dev

### Prerequisites

- Follow the cordova guide to prepare for Android development: https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html

```bash
# clone project
git clone git@github.com:ringcentral/ringcentral-engage-voice-embeddable-mobile.git
cd ringcentral-engage-voice-embeddable-mobile

# install dependencies
npm i

# start proxy server
npm run proxy

# will get https://xxxx.ngrok.io -> localhost:6066
# Remember https://xxxx.ngrok.io as serverUrl

# create env file, then fill .env with serverUrl as RINGCENTRAL_APP_SERVER and RINGCENTRAL_CLIENT_ID and RINGCENTRAL_CLIENT_SECRET if you have
cp sample.env .env

# start server
npm start

# start client
npm run c

# prepare cordova
npm run prepare

# run Android app, make sure you have simulator or real android device ready
npm run a

```

## Build for Github pages

```bash

# build for github pages, remember to push to github
npm run gh

# build for android
npm run build-android

# check platforms/android/app/build/outputs/apk/debug/app-debug.apk
```

## License

MIT
