// Main reusable button so actions look and behave the same across SmartSpend.

//Initialisation.......................................
// Imports
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { COLORS } from '../../constants/theme';

export default function AppButton({
  label,
  onPress,
  tone = 'primary',
  icon = null,
  compact = false,
}) {
  //View.................................................
  // Button view
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        toneStyles[tone],
        compact && styles.compact,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.inner}>
        {icon}
        <Text style={[styles.label, toneLabelStyles[tone]]}>{label}</Text>
      </View>
    </Pressable>
  );
}

// Base button styles
const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderWidth: 1,
  },
  compact: {
    minHeight: 40,
    paddingHorizontal: 12,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.85,
  },
});

// Button tone styles
const toneStyles = StyleSheet.create({
  primary: {
    backgroundColor: COLORS.blue,
    borderColor: COLORS.blue,
  },
  secondary: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.border,
  },
  danger: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.rose,
  },
});

// Label colour styles
const toneLabelStyles = StyleSheet.create({
  primary: {
    color: '#ffffff',
  },
  secondary: {
    color: COLORS.ink,
  },
  danger: {
    color: '#b91c1c',
  },
});
