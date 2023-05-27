import { StyleSheet, Text, View } from 'react-native';

import * as ExpoIntentFiltersExtension from 'expo-intent-filters-extension';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{ExpoIntentFiltersExtension.hello()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
