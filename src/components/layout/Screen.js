// Main page wrapper used to keep spacing and scrolling consistent on every screen.

//Initialisation.......................................
// Imports
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function Screen({ children, scrollable = true, contentStyle }) {
  //View.................................................
  // Scrollable page layout
  if (scrollable) {
    return (
      <ScrollView
        style={styles.screen}
        contentContainerStyle={[styles.content, contentStyle]}
      >
        {children}
      </ScrollView>
    );
  }

  return <View style={[styles.screen, styles.content, contentStyle]}>{children}</View>;
}

// Layout styles
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    padding: 20,
    gap: 16,
  },
});
