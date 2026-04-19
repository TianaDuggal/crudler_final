// Main feedback banner used for supportive budgeting alerts on the overview screen.

//Initialisation.......................................
// Imports
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { COLORS } from '../../constants/theme';

export default function AlertBanner({ alert }) {
  //View.................................................
  // Hide the banner when there is nothing important to say.
  if (!alert) {
    return null;
  }

  return (
    <View style={[styles.banner, toneStyles[alert.tone] || toneStyles.info]}>
      <View style={styles.row}>
        <MaterialCommunityIcons
          name={iconMap[alert.tone] || 'information-outline'}
          size={20}
          color={COLORS.ink}
        />
        <Text style={styles.title}>{alert.title}</Text>
      </View>
      <Text style={styles.message}>{alert.message}</Text>
    </View>
  );
}

// Icon mapping
const iconMap = {
  success: 'check-circle-outline',
  info: 'lightbulb-on-outline',
  warning: 'alert-outline',
  danger: 'alert-circle-outline',
};

// Banner styles
const styles = StyleSheet.create({
  banner: {
    borderRadius: 8,
    padding: 14,
    gap: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.ink,
  },
  message: {
    fontSize: 14,
    lineHeight: 20,
    color: '#1e293b',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});

// Tone styles
const toneStyles = StyleSheet.create({
  success: {
    backgroundColor: '#dcfce7',
    borderWidth: 1,
    borderColor: '#86efac',
  },
  info: {
    backgroundColor: '#dbeafe',
    borderWidth: 1,
    borderColor: '#93c5fd',
  },
  warning: {
    backgroundColor: '#fef3c7',
    borderWidth: 1,
    borderColor: '#fcd34d',
  },
  danger: {
    backgroundColor: '#fee2e2',
    borderWidth: 1,
    borderColor: '#fca5a5',
  },
});
