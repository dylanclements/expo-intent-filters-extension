import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { ExpoIntentFiltersExtensionViewProps } from './ExpoIntentFiltersExtension.types';

const NativeView: React.ComponentType<ExpoIntentFiltersExtensionViewProps> =
  requireNativeViewManager('ExpoIntentFiltersExtension');

export default function ExpoIntentFiltersExtensionView(props: ExpoIntentFiltersExtensionViewProps) {
  return <NativeView {...props} />;
}
