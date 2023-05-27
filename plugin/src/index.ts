import type {
  ExpoConfig,
  Android,
  AndroidIntentFiltersData,
} from "@expo/config-types";
import {
  type ConfigPlugin,
  AndroidConfig,
  withAndroidManifest,
} from "expo/config-plugins";

type IntentFilters = NonNullable<Android["intentFilters"]>;

type Props = {
  intentFilters: IntentFilters;
};

const withIntentFilters: ConfigPlugin<Props> = (config, { intentFilters }) => {
  return withAndroidManifest(config, (config) => {
    config.modResults = addIntentFilters(
      config,
      config.modResults,
      intentFilters
    );

    return config;
  });
};

export default withIntentFilters;

const GENERATED_TAG = "data-generated";

function addIntentFilters(
  config: ExpoConfig,
  androidManifest: AndroidConfig.Manifest.AndroidManifest,
  newIntentFilters: IntentFilters
) {
  // Always ensure old tags are removed.

  const mainActivity =
    AndroidConfig.Manifest.getMainActivityOrThrow(androidManifest);

  // Remove all generated tags from previous runs...
  if (mainActivity["intent-filter"]?.length) {
    mainActivity["intent-filter"] = mainActivity["intent-filter"].filter(
      (value) => value.$?.[GENERATED_TAG] !== "true"
    );
  }

  // this needs to be modified such that it picks up the extra intent filters from the config
  const currentIntentFilters =
    AndroidConfig.IntentFilters.getIntentFilters(config);
  if (currentIntentFilters.length + newIntentFilters.length === 0) {
    return androidManifest;
  }

  const renderedCurrentIntentFilters =
    AndroidConfig.IntentFilters.default(currentIntentFilters);

  const renderedNewIntentFilters = renderNewIntentFilters(currentIntentFilters);

  // adds them properly to the manifest
  mainActivity["intent-filter"] = mainActivity["intent-filter"]?.concat(
    renderedCurrentIntentFilters,
    renderedNewIntentFilters
  );

  return androidManifest;
}

function renderNewIntentFilters(
  intentFilters: IntentFilters
): AndroidConfig.Manifest.ManifestIntentFilter[] {
  return intentFilters.map((intentFilter) => {
    // <intent-filter>
    return {
      $: {
        "android:autoVerify": intentFilter.autoVerify ? "true" : undefined,
        // Add a custom "generated" tag that we can query later to remove.
        [GENERATED_TAG]: "true",
      },
      action: [
        // <action android:name="android.intent.action.VIEW"/>
        {
          $: {
            "android:name": `${intentFilter.action}`,
          },
        },
      ],
      data: renderIntentFilterData(intentFilter.data),
      category: renderIntentFilterCategory(intentFilter.category),
    };
  });
}

function renderIntentFilterData(
  data: AndroidIntentFiltersData | AndroidIntentFiltersData[] | undefined
) {
  return (Array.isArray(data) ? data : [data]).filter(Boolean).map((datum) => ({
    $: Object.entries(datum ?? {}).reduce(
      (prev, [key, value]) => ({ ...prev, [`android:${key}`]: value }),
      {}
    ),
  }));
}

function renderIntentFilterCategory(category: string | string[] | undefined) {
  return (Array.isArray(category) ? category : [category])
    .filter(Boolean)
    .map((categoroy) => ({
      $: {
        "android:name": `${categoroy}`,
      },
    }));
}
