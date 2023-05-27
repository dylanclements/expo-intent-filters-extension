import ExpoNativeConfigurationModule from "./ExpoIntentFiltersExtensionModule";

export function getApiKey(): string {
  return ExpoNativeConfigurationModule.getApiKey();
}
