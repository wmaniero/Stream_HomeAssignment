import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackScreen } from './Navigator';

export default function AppContainer() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <RootStackScreen />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});