// Main placeholder panel shown when a screen has no data yet.

//Initialisation.......................................
// Imports
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { COLORS } from '../../constants/theme';

export default function EmptyState({ title, message }) {
  //View.................................................
  // Empty-state view
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="tray-arrow-down"
        size={24}
        color={COLORS.blue}
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

// Empty-state styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    gap: 6,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.ink,
  },
  message: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.slate,
  },
});
