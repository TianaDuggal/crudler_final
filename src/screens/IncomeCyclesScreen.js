// Main screen for viewing old cycles and creating new ones.

//Initialisation.......................................
// Imports
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Screen from '../components/layout/Screen';
import CycleForm from '../components/cycles/CycleForm';
import AppButton from '../components/UI/AppButton';
import EmptyState from '../components/UI/EmptyState';
import SectionCard from '../components/UI/SectionCard';
import { useSmartSpend } from '../context/SmartSpendContext';
import { formatCurrency } from '../utils/formatters';

const IncomeCyclesScreen = () => {
  //Initialisation.......................................
  // Shared cycle data
  const { cycles, activeCycleId, createCycle, selectCycle } = useSmartSpend();

  //View.................................................
  // Screen view
  return (
    <Screen>
      <SectionCard
        title="Active and past cycles"
        subtitle="Students often budget around loan periods, weeks, or custom windows rather than a neat calendar month."
      >
        {cycles.length ? (
          cycles.map((cycle) => (
            <View key={cycle.id} style={styles.cycleCard}>
              <Text style={styles.cycleTitle}>{cycle.name}</Text>
              <Text style={styles.cycleMeta}>
                {cycle.startDate} to {cycle.endDate}
              </Text>
              <Text style={styles.cycleMeta}>
                Income set: {formatCurrency(cycle.incomeAmount)}
              </Text>
              <AppButton
                label={activeCycleId === cycle.id ? 'Active cycle' : 'Make active'}
                onPress={() => selectCycle(cycle.id)}
                tone={activeCycleId === cycle.id ? 'primary' : 'secondary'}
                compact
              />
            </View>
          ))
        ) : (
          <EmptyState
            title="No cycles created"
            message="Create your first cycle below so SmartSpend can start grouping income and expenses properly."
          />
        )}
      </SectionCard>

      <SectionCard
        title="Create a new cycle"
        subtitle="This lets the app follow student finance patterns that do not line up with fixed calendar months."
      >
        <CycleForm onSubmit={createCycle} />
      </SectionCard>
    </Screen>
  );
};

// Screen styles
const styles = StyleSheet.create({
  cycleCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 14,
    gap: 6,
  },
  cycleTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },
  cycleMeta: {
    fontSize: 14,
    color: '#64748b',
  },
});

export default IncomeCyclesScreen;
