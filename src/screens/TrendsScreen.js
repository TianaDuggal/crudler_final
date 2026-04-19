// Main screen for chart-based reflection on the current cycle spending pattern.

//Initialisation.......................................
// Imports
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import BarChartCard from '../components/charts/BarChartCard';
import PieChartCard from '../components/charts/PieChartCard';
import Screen from '../components/layout/Screen';
import EmptyState from '../components/UI/EmptyState';
import SectionCard from '../components/UI/SectionCard';
import { COLORS } from '../constants/theme';
import { useSmartSpend } from '../context/SmartSpendContext';
import { formatCurrency } from '../utils/formatters';

const TrendsScreen = () => {
  //Initialisation.......................................
  // Shared trend data
  const { activeCycle, cycleSummary, trendData } = useSmartSpend();

  //View.................................................
  // Screen view
  return (
    <Screen>
      <SectionCard
        title="Spending reflection"
        subtitle={
          activeCycle
            ? `Simple summaries for ${activeCycle.name}`
            : 'Create a cycle first so trends can be calculated.'
        }
      >
        {!cycleSummary.cycleExpenses.length ? (
          <EmptyState
            title="No trend data yet"
            message="Trend summaries appear after you have logged some spending in the active cycle."
          />
        ) : (
          <>
            <View style={styles.typeRow}>
              <View style={styles.typeCard}>
                <MaterialCommunityIcons
                  name="cart-heart"
                  size={22}
                  color={COLORS.coral}
                />
                <Text style={styles.smallLabel}>Essential total</Text>
                <Text style={styles.bigValue}>
                  {formatCurrency(trendData.typeTotals.essential)}
                </Text>
              </View>
              <View style={styles.typeCard}>
                <MaterialCommunityIcons
                  name="cards-heart-outline"
                  size={22}
                  color={COLORS.lilac}
                />
                <Text style={styles.smallLabel}>Discretionary total</Text>
                <Text style={styles.bigValue}>
                  {formatCurrency(trendData.typeTotals.discretionary)}
                </Text>
              </View>
            </View>
            <PieChartCard
              title="Pie chart by spending category"
              data={trendData.categoryTotals}
            />
            <BarChartCard
              title="Bar graph by spending category"
              data={trendData.categoryTotals}
            />
          </>
        )}
      </SectionCard>
    </Screen>
  );
};

// Screen styles
const styles = StyleSheet.create({
  typeRow: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  typeCard: {
    width: '47%',
    borderRadius: 8,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 12,
    gap: 6,
  },
  smallLabel: {
    fontSize: 13,
    color: COLORS.slate,
    fontWeight: '600',
  },
  bigValue: {
    fontSize: 16,
    color: COLORS.ink,
    fontWeight: '700',
  },
});

export default TrendsScreen;
