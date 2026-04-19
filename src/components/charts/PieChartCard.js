// Main category pie chart used to show where the current cycle money is going.

//Initialisation.......................................
// Imports
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { COLORS } from '../../constants/theme';
import { formatCurrency } from '../../utils/formatters';

// Chart colour order
const PIE_COLORS = [COLORS.blue, COLORS.coral, COLORS.mint, COLORS.lilac, COLORS.amber];

export default function PieChartCard({ data, title }) {
  //Initialisation.......................................
  // Chart setup
  const total = data.reduce((sum, item) => sum + item.total, 0);
  const radius = 52;
  const strokeWidth = 24;
  const circumference = 2 * Math.PI * radius;
  let progress = 0;

  if (!data.length || total <= 0) {
    return null;
  }

  //View.................................................
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.content}>
        <Svg width={140} height={140} viewBox="0 0 140 140">
          <Circle
            cx="70"
            cy="70"
            r={radius}
            stroke="#e7eef8"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {data.map((item, index) => {
            const fraction = item.total / total;
            const dash = fraction * circumference;
            const rotation = (progress / total) * 360 - 90;
            progress += item.total;

            return (
              <Circle
                key={item.category}
                cx="70"
                cy="70"
                r={radius}
                stroke={PIE_COLORS[index % PIE_COLORS.length]}
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={`${dash} ${circumference - dash}`}
                strokeLinecap="round"
                rotation={rotation}
                origin="70,70"
              />
            );
          })}
        </Svg>
        <View style={styles.legend}>
          {data.map((item, index) => (
            <View key={item.category} style={styles.legendRow}>
              <View
                style={[
                  styles.swatch,
                  { backgroundColor: PIE_COLORS[index % PIE_COLORS.length] },
                ]}
              />
              <View style={styles.legendText}>
                <Text style={styles.legendLabel}>{item.category}</Text>
                <Text style={styles.legendValue}>{formatCurrency(item.total)}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

// Chart styles
const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    gap: 16,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.ink,
  },
  content: {
    gap: 16,
    alignItems: 'center',
  },
  legend: {
    width: '100%',
    gap: 10,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  swatch: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  legendLabel: {
    flex: 1,
    color: COLORS.ink,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  legendValue: {
    color: COLORS.slate,
    fontWeight: '600',
  },
});
