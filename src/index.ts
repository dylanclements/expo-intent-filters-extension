import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to ExpoIntentFiltersExtension.web.ts
// and on native platforms to ExpoIntentFiltersExtension.ts
import ExpoIntentFiltersExtensionModule from './ExpoIntentFiltersExtensionModule';
import ExpoIntentFiltersExtensionView from './ExpoIntentFiltersExtensionView';
import { ChangeEventPayload, ExpoIntentFiltersExtensionViewProps } from './ExpoIntentFiltersExtension.types';

// Get the native constant value.
export const PI = ExpoIntentFiltersExtensionModule.PI;

export function hello(): string {
  return ExpoIntentFiltersExtensionModule.hello();
}

export async function setValueAsync(value: string) {
  return await ExpoIntentFiltersExtensionModule.setValueAsync(value);
}

const emitter = new EventEmitter(ExpoIntentFiltersExtensionModule ?? NativeModulesProxy.ExpoIntentFiltersExtension);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { ExpoIntentFiltersExtensionView, ExpoIntentFiltersExtensionViewProps, ChangeEventPayload };
