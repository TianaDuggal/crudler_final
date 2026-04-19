// Main category bar chart used for quick visual comparison between spending groups.

//Initialisation.......................................
// Imports
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from '../../constants/theme';
import { formatCurrency } from '../../utils/formatters';

export default function BarChartCard({ data, title }) {
  //Initialisation.......................................
  // Chart setup
  const maxValue = Math.max(...data.map((item) => item.total), 0);

  if (!data.length || maxValue <= 0) {
    return null;
  }

  //View.................................................
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.rows}>
        {data.map((item, index) => (
          <View key={item.category} style={styles.row}>
            <View style={styles.topLine}>
              <Text style={styles.label}>{item.category}</Text>
              <Text style={styles.value}>{formatCurrency(item.total)}</Text>
            </View>
            <View style={styles.track}>
              <View
                style={[
                  styles.bar,
                  {
                    width: `${(item.total / maxValue) * 100}%`,
                    backgroundColor: BAR_COLORS[index % BAR_COLORS.length],
                  },
                ]}
              />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

// Chart colour order
const BAR_COLORS = [COLORS.cyan, COLORS.blue, COLORS.amber, COLORS.rose, COLORS.mint];

// Chart styles
const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    gap: 14,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.ink,
  },
  rows: {
    gap: 12,
  },
  row: {
    gap: 6,
  },
  topLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  label: {
    flex: 1,
    color: COLORS.ink,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  value: {
    color: COLORS.slate,
    fontWeight: '700',
  },
  track: {
    height: 12,
    backgroundColor: '#edf3fb',
    borderRadius: 999,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: 999,
  },
});
