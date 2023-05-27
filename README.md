# expo-intent-filters-extension

## Installation
```
npx expo install expo-intent-filters-extension
```

## Description

This is an expo config plugin that provides granular control over android intent filters inside Expo's managed workflow.
It provides the exact same interface as the typical android intent filters field in `app.json/app.config.ts`, but with the ability
to specify exact actions and categories.

A key use case for this would be to enable NFC scans to deep link into your app.
Currently, intent filters in `app.json/app.config.ts` do not support the required action: `android.nfc.action.NDEF_DISCOVERED`
as it must follow `android.intent.actions.ACTION_NAME`.

## Usage

```
{
  "expo": {
    "name": "expo-intent-filters-extension-example",
    ...
    "plugins": [
      [
        "expo-intent-filters-extension",
        {
          "intentFilters": [
            {
              "action": "android.nfc.action.NDEF_DISCOVERED",
              "autoVerify": true,
              "data": [
                {
                  "scheme": "https",
                  "host": "website.com",
                  "pathPrefix": "/profile"
                }
              ],
              "category": ["android.intent.category.DEFAULT"]
            }
          ]
        }
      ]
    ]
  }
}
```

Which in turn creates intent filters in AndroidManifest.xml

```
<manifest xmlns:android="http://schemas.android.com/apk/res/android" package="expo.modules.intentfiltersextension.example">
      ...
      <intent-filter android:autoVerify="true" data-generated="true">
        <action android:name="android.nfc.action.NDEF_DISCOVERED"/>
        <data android:scheme="https" android:host="website.com" android:pathPrefix="/profile"/>
        <category android:name="android.intent.category.DEFAULT"/>
      </intent-filter>
      ...
</manifest>
```
