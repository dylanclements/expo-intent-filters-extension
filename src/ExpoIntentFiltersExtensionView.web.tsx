import * as React from 'react';

import { ExpoIntentFiltersExtensionViewProps } from './ExpoIntentFiltersExtension.types';

export default function ExpoIntentFiltersExtensionView(props: ExpoIntentFiltersExtensionViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
