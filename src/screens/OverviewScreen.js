// Main dashboard screen for the active cycle, including Sprint 1 income editing.

//Initialisation.......................................
// Imports
import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Screen from '../components/layout/Screen';
import AlertBanner from '../components/UI/AlertBanner';
import AppButton from '../components/UI/AppButton';
import EmptyState from '../components/UI/EmptyState';
import SectionCard from '../components/UI/SectionCard';
import ExpenseListItem from '../components/expenses/ExpenseListItem';
import { COLORS } from '../constants/theme';
import { useSmartSpend } from '../context/SmartSpendContext';
import { formatCurrency } from '../utils/formatters';

const OverviewScreen = ({ navigation }) => {
  //Initialisation.......................................
  // Shared dashboard data
  const {
    loading,
    errorMessage,
    activeCycle,
    cycleSummary,
    currentAlert,
    smartSuggestions,
    dailyAllowance,
    updateCycleIncome,
  } = useSmartSpend();

  //State..............................................
  // Local screen state
  // Sprint 1 moved the income value from a fixed starter value to an editable overview control.
  const [isEditingIncome, setIsEditingIncome] = React.useState(false);
  const [incomeDraft, setIncomeDraft] = React.useState('');
  const [incomeError, setIncomeError] = React.useState('');
  const recentExpenses = cycleSummary?.cycleExpenses?.slice(0, 3) || [];

  //Handlers.............................................
  // Sync current cycle income into the editable field
  React.useEffect(() => {
    if (activeCycle) {
      setIncomeDraft(String(activeCycle.incomeAmount));
    }
  }, [activeCycle]);

  //Handlers.............................................
  // Income edit handlers
  const handleStartIncomeEdit = () => {
    if (!activeCycle) {
      return;
    }

    setIncomeError('');
    setIncomeDraft(String(activeCycle.incomeAmount));
    setIsEditingIncome(true);
  };

  const handleSaveIncome = async () => {
    const parsedIncome = Number(incomeDraft);

    if (!activeCycle || !incomeDraft || Number.isNaN(parsedIncome) || parsedIncome <= 0) {
      setIncomeError('Enter a valid income amount.');
      return;
    }

    // Saving here updates the cycle in SQLite, then the provider reloads the refreshed value.
    await updateCycleIncome(activeCycle.id, parsedIncome);
    setIncomeError('');
    setIsEditingIncome(false);
  };

  const handleCancelIncomeEdit = () => {
    setIncomeError('');
    setIncomeDraft(String(activeCycle?.incomeAmount || ''));
    setIsEditingIncome(false);
  };

  //View.................................................
  // Loading state
  if (loading) {
    return (
      <Screen scrollable={false} contentStyle={styles.loadingScreen}>
        <ActivityIndicator size="large" color="#0f172a" />
        <Text style={styles.loadingText}>Loading SmartSpend...</Text>
      </Screen>
    );
  }

  //View.................................................
  // Main dashboard view
  return (
    <Screen>
      <SectionCard
        title="Financial overview"
        subtitle={
          activeCycle
            ? `${activeCycle.name} | ${activeCycle.startDate} to ${activeCycle.endDate}`
            : 'Create an income cycle to begin tracking your spending.'
        }
      >
        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
        {activeCycle ? (
          <View style={styles.summaryGrid}>
            <Pressable
              onPress={handleStartIncomeEdit}
              style={[styles.summaryTile, styles.incomeTile, styles.incomeEditableTile]}
            >
              {/* The blue tile doubles as both a display and a quick edit point for the current cycle income. */}
              <MaterialCommunityIcons name="bank-outline" size={22} color={COLORS.navy} />
              <Text style={styles.tileLabel}>Income set</Text>
              {isEditingIncome ? (
                <>
                  <TextInput
                    value={incomeDraft}
                    onChangeText={setIncomeDraft}
                    keyboardType="decimal-pad"
                    style={styles.incomeInput}
                    placeholder="Enter income"
                  />
                  {incomeError ? (
                    <Text style={styles.incomeError}>{incomeError}</Text>
                  ) : null}
                  <Text style={styles.editNote}>Edit income set</Text>
                  <View style={styles.incomeActions}>
                    <AppButton
                      label="Save"
                      onPress={handleSaveIncome}
                      compact
                    />
                    <AppButton
                      label="Cancel"
                      onPress={handleCancelIncomeEdit}
                      tone="secondary"
                      compact
                    />
                  </View>
                </>
              ) : (
                <>
                  <Text style={styles.tileValue}>
                    {formatCurrency(cycleSummary.incomeAmount)}
                  </Text>
                  <Text style={styles.editNote}>Edit income set</Text>
                </>
              )}
            </Pressable>
            <View style={[styles.summaryTile, styles.remainingTile]}>
              <MaterialCommunityIcons name="wallet-plus-outline" size={22} color={COLORS.mint} />
              <Text style={styles.tileLabel}>Remaining</Text>
              <Text style={styles.tileValue}>
                {formatCurrency(cycleSummary.remaining)}
              </Text>
            </View>
            <View style={[styles.summaryTile, styles.essentialTile]}>
              <MaterialCommunityIcons name="home-heart" size={22} color={COLORS.coral} />
              <Text style={styles.tileLabel}>Essential</Text>
              <Text style={styles.tileValue}>
                {formatCurrency(cycleSummary.essentialSpent)}
              </Text>
            </View>
            <View style={[styles.summaryTile, styles.discretionaryTile]}>
              <MaterialCommunityIcons name="party-popper" size={22} color={COLORS.lilac} />
              <Text style={styles.tileLabel}>Discretionary</Text>
              <Text style={styles.tileValue}>
                {formatCurrency(cycleSummary.discretionarySpent)}
              </Text>
            </View>
            <View style={[styles.summaryTile, styles.allowanceTile]}>
              <MaterialCommunityIcons name="calendar-heart" size={22} color={COLORS.amber} />
              <Text style={styles.tileLabel}>Daily allowance</Text>
              <Text style={styles.tileValue}>{formatCurrency(dailyAllowance)}</Text>
            </View>
          </View>
        ) : (
          <EmptyState
            title="No active cycle yet"
            message="Create a cycle first so SmartSpend can work out what is left after essentials and where your money is going."
          />
        )}
      </SectionCard>

      <AlertBanner alert={currentAlert} />

      {smartSuggestions.length ? (
        <SectionCard
          title="Automated budgeting suggestions"
          subtitle="These are generated from your current cycle, remaining balance, and the spending already recorded."
        >
          {/* Suggestions are shown as short prompts so the overview stays readable at a glance. */}
          {smartSuggestions.map((suggestion) => (
            <View key={suggestion.title} style={styles.suggestionRow}>
              <MaterialCommunityIcons
                name={suggestion.icon}
                size={22}
                color={COLORS.blue}
              />
              <View style={styles.suggestionCopy}>
                <Text style={styles.suggestionTitle}>{suggestion.title}</Text>
                <Text style={styles.suggestionText}>{suggestion.message}</Text>
              </View>
            </View>
          ))}
        </SectionCard>
      ) : null}

      <SectionCard
        title="Quick actions"
        subtitle="Use the shortest route possible for the tasks students said they repeat most."
      >
        {/* These actions reflect the most repeated tasks in the app: add, review, compare, and manage. */}
        <View style={styles.actionStack}>
          <AppButton
            label="Add expense"
            onPress={() => navigation.navigate('AddExpense')}
            icon={
              <MaterialCommunityIcons name="plus-circle-outline" size={18} color="#ffffff" />
            }
          />
          <AppButton
            label="View expense history"
            onPress={() => navigation.navigate('ExpenseHistory')}
            tone="secondary"
            icon={
              <MaterialCommunityIcons name="history" size={18} color={COLORS.ink} />
            }
          />
          <AppButton
            label="See trends"
            onPress={() => navigation.navigate('Trends')}
            tone="secondary"
            icon={
              <MaterialCommunityIcons name="chart-bar" size={18} color={COLORS.ink} />
            }
          />
          <AppButton
            label="Manage cycles"
            onPress={() => navigation.navigate('IncomeCycles')}
            tone="secondary"
            icon={
              <MaterialCommunityIcons
                name="calendar-range-outline"
                size={18}
                color={COLORS.ink}
              />
            }
          />
        </View>
      </SectionCard>

      <SectionCard
        title="Recent expenses"
        subtitle="A short list keeps awareness high without forcing a heavy dashboard."
      >
        {/* Only the latest few entries are shown here so the dashboard stays light and focused. */}
        {recentExpenses.length ? (
          recentExpenses.map((expense) => (
            <ExpenseListItem
              key={expense.id}
              expense={expense}
              onEdit={() =>
                navigation.navigate('AddExpense', { expenseId: expense.id })
              }
              onDelete={() => navigation.navigate('ExpenseHistory')}
            />
          ))
        ) : (
          <EmptyState
            title="Nothing logged yet"
            message="Start with one small purchase. SmartSpend works best when you capture the little spends as they happen."
          />
        )}
      </SectionCard>
    </Screen>
  );
};

// Screen styles
const styles = StyleSheet.create({
  loadingScreen: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  loadingText: {
    fontSize: 16,
    color: COLORS.slate,
  },
  error: {
    color: '#b91c1c',
    fontSize: 14,
    fontWeight: '600',
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  summaryTile: {
    width: '47%',
    borderRadius: 8,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 12,
    gap: 6,
  },
  incomeTile: {
    backgroundColor: '#eaf1ff',
  },
  incomeEditableTile: {
    alignItems: 'flex-start',
  },
  remainingTile: {
    backgroundColor: '#e7fbf2',
  },
  essentialTile: {
    backgroundColor: '#fff0e8',
  },
  discretionaryTile: {
    backgroundColor: '#f2ecff',
  },
  allowanceTile: {
    backgroundColor: '#fff7df',
  },
  tileLabel: {
    fontSize: 13,
    color: COLORS.slate,
    fontWeight: '600',
  },
  tileValue: {
    fontSize: 17,
    color: COLORS.ink,
    fontWeight: '700',
  },
  editNote: {
    fontSize: 12,
    color: COLORS.navy,
    fontWeight: '600',
  },
  incomeInput: {
    width: '100%',
    minHeight: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#b7c8ef',
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
    fontSize: 15,
    color: COLORS.ink,
  },
  incomeActions: {
    width: '100%',
    gap: 8,
  },
  incomeError: {
    fontSize: 12,
    color: '#b91c1c',
    fontWeight: '600',
  },
  actionStack: {
    gap: 10,
  },
  suggestionRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
  },
  suggestionCopy: {
    flex: 1,
    gap: 4,
  },
  suggestionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.ink,
  },
  suggestionText: {
    fontSize: 13,
    lineHeight: 19,
    color: COLORS.slate,
  },
});

export default OverviewScreen;
