# Revengr — Android app

HSC MCQ practice and timed mock tests, packaged as a Cordova Android app
(package id `com.rafin.revengers`). Question data is loaded at runtime from
`https://hsc-revision.web.app/data/`, so the app needs an internet connection
on first use (answers are cached afterwards).

## Get the APK

Every push that touches `revengr-app/` runs the **Build Android app** GitHub
Actions workflow. Open the run under the repo's *Actions* tab and download the
`revengr-debug-apk` artifact, then install it on an Android phone (allow
"install unknown apps").

## Build locally

Requires Node 18+, JDK 17, Android SDK (platform 34) and Gradle.

```bash
cd revengr-app
npm install
npm run android:build      # debug APK
npm run android:release    # release .aab for Play Store (needs signing)
npm run dev                # browser preview at http://localhost:8080
```
