// Main content container used to group related information into clear report-friendly sections.

//Initialisation.......................................
// Imports
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from '../../constants/theme';

export default function SectionCard({ title, subtitle, children }) {
  //View.................................................
  // Section card view
  return (
    <View style={styles.card}>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      <View style={styles.body}>{children}</View>
    </View>
  );
}

// Section card styles
const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    gap: 6,
    shadowColor: '#0f172a',
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.ink,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.slate,
    lineHeight: 19,
  },
  body: {
    gap: 12,
    marginTop: 6,
  },
});
