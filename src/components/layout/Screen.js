import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function Screen({ children }) {
  return <View style={styles.screen}>{children}</View>;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#fff',
  },
});
