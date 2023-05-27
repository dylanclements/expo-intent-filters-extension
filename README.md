# expo-intent-filters-extension

This is an expo config plugin that provides granular control over android intent filters inside Expo's managed workflow.
It provides the exact same interface as the typical android intent filters field in `app.json/app.config.ts`, but with the ability
to specify exact actions and categories.

A key example use case for this would be to enable NFC scans to deep link into your app.
Currently, intent filters in `app.json/app.config.ts` do not support the required action: `android.nfc.action.NDEF_DISCOVERED`
as it must follow `android.intent.actions.ACTION_NAME`. 

# Usage
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
