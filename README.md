# Engage Voice Embeddable for Mobile

**Experimental** Develop Android/IOS apps based on [ringcentral-engage-voice-embeddable](https://github.com/ringcentral/engage-voice-embeddable) and Cordova

## Demo video

- Android: https://youtu.be/rPoOqpVa5as

## Download apps

[https://github.com/ringcentral/ringcentral-engage-voice-embeddable-mobile/releases](https://github.com/ringcentral/ringcentral-engage-voice-embeddable-mobile/releases)

## todos

- [x] Running in Android
- [x] Running in IOS
- [ ] Use web worker
- [x] Deploy to github pages

## Dev

### Prerequisites

- Install Nodejs and npm(recommend using [nvm](https://github.com/nvm-sh/nvm)).
- Install cordova: `npm i -g cordova`
- Android: Follow the cordova guide to prepare for Android development: https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html
- iOS: Follow the cordova guide to prepare for iOS development: https://cordova.apache.org/docs/en/latest/guide/platforms/ios/index.html, also requires paid Apple developer account.
- ImageMagick installed (Mac: `brew install imagemagick`, Debian/Ubuntu: `sudo apt-get install imagemagick`, Windows: [See here, install "Legacy tools"](http://www.imagemagick.org/script/binary-releases.php#windows))
- cordova-splash: `npm install cordova-splash -g`
- cordova-icon: `npm install cordova-icon -g`
- If you using emulator, you may need open the emulator first
- A developer account in developer.ringcentral.com(free to register)
- Create an app in developer.ringcentral.com, Create a RingCentral app with platform type - "Browser Based", and add permissions `Edit Message`, `Edit Presence`, `Internal Messages`, `Read Accounts`, `Read Call Log`, `Read Contacts`, `Read Messages`, `Read Presence`, `RingOut`, `SMS`, `Call Control` and `VoIP Calling` to your app.

```bash
# clone project
git clone git@github.com:ringcentral/ringcentral-engage-voice-embeddable-mobile.git
cd ringcentral-engage-voice-embeddable-mobile

# install dependencies
npm run pre && npm i

# start proxy server
npm run proxy

# will get https://xxxx.ngrok.io -> localhost:6066
# Remember https://xxxx.ngrok.io as serverUrl

# create env file, then fill .env with serverUrl as RINGCENTRAL_APP_SERVER and RINGCENTRAL_CLIENT_ID and RINGCENTRAL_CLIENT_SECRET with your own app in developer.ringcentral.com, must be production app and web based with account permission.
# Set https://xxxx.ngrok.io/rc-auth as callback url in app setting
cp sample.env .env

# start server
npm start

# start client
npm run c

# prepare cordova
npm run prepare

# run Android app, make sure you have simulator or real android device ready
npm run a

# run IOS app, make sure you have real IOS device and paid developer ID ready,
# and open platforms/ios with xcode and config build an debug env
npm run i
```

## Build for Github pages

```bash

# build for github pages, remember to push to github
npm run gh

# build for android
npm run build-android

# check platforms/android/app/build/outputs/apk/debug/app-debug.apk

# Build with online resources for IOS App
npm run build-ios

```

## License

MIT
