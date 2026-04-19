// Main form for capturing a new expense or editing an existing one.

//Initialisation.......................................
// Imports
import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { EXPENSE_CATEGORIES, EXPENSE_TYPES } from '../../constants/categories';
import { COLORS } from '../../constants/theme';
import { buildSmartSuggestions } from '../../utils/finance';
import { todayIso } from '../../utils/formatters';
import AppButton from '../UI/AppButton';
import { SelectField, TextField } from '../UI/FormField';

const ExpenseForm = ({
  cycles,
  activeCycleId,
  activeCycle,
  cycleSummary,
  initialExpense,
  onSubmit,
  onCancel,
}) => {
  //Initialisation.......................................
  // Initial form values
  const initialState = useMemo(
    () => ({
      id: initialExpense?.id || null,
      cycleId: String(initialExpense?.cycleId || activeCycleId || ''),
      amount: initialExpense?.amount ? String(initialExpense.amount) : '',
      type: initialExpense?.type || 'essential',
      category: initialExpense?.category || 'food-groceries',
      note: initialExpense?.note || '',
      expenseDate: initialExpense?.expenseDate || todayIso(),
    }),
    [initialExpense, activeCycleId]
  );

  //State..............................................
  // Local form state
  const [expense, setExpense] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState('');

  //State..............................................
  // Derived form values
  const cycleOptions = cycles.map((cycle) => ({
    label: cycle.name,
    value: String(cycle.id),
  }));
  const selectedCycle =
    cycles.find((cycle) => String(cycle.id) === expense.cycleId) || activeCycle;
  const aiSuggestions = useMemo(
    // Suggestions update live while the user types so the feedback feels immediate.
    () => buildSmartSuggestions(selectedCycle, cycleSummary, expense),
    [selectedCycle, cycleSummary, expense]
  );

  //Handlers.............................................
  // Input handlers
  const handleChange = (field, value) => {
    setExpense((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = () => {
    // Keep validation simple so the form stays fast to complete on a phone.
    if (!expense.cycleId || !expense.amount || Number(expense.amount) <= 0) {
      setErrorMessage('Please choose a cycle and enter an amount greater than zero.');
      return;
    }

    setErrorMessage('');

    onSubmit({
      ...expense,
      cycleId: Number(expense.cycleId),
      amount: Number(expense.amount),
      note: expense.note.trim(),
    });
  };

  //View.................................................
  // Form view
  return (
    <View style={styles.form}>
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

      <SelectField
        label="Income cycle"
        value={expense.cycleId}
        onValueChange={(value) => handleChange('cycleId', value)}
        options={cycleOptions}
        prompt="Choose a cycle"
      />

      <TextField
        label="Amount"
        value={expense.amount}
        onChangeText={(value) => handleChange('amount', value)}
        placeholder="0.00"
        keyboardType="decimal-pad"
      />

      <SelectField
        label="Spending type"
        value={expense.type}
        onValueChange={(value) => handleChange('type', value)}
        options={EXPENSE_TYPES}
      />

      <SelectField
        label="Category"
        value={expense.category}
        onValueChange={(value) => handleChange('category', value)}
        options={EXPENSE_CATEGORIES}
      />

      <TextField
        label="Expense date"
        value={expense.expenseDate}
        onChangeText={(value) => handleChange('expenseDate', value)}
        placeholder="YYYY-MM-DD"
      />

      <TextField
        label="Note"
        value={expense.note}
        onChangeText={(value) => handleChange('note', value)}
        placeholder="Optional note"
        multiline
      />

      {aiSuggestions.length ? (
        <View style={styles.suggestionBox}>
          <Text style={styles.suggestionHeading}>Automated SmartSpend suggestions</Text>
          {aiSuggestions.map((suggestion) => (
            <View key={suggestion.title} style={styles.suggestionRow}>
              <MaterialCommunityIcons
                name={suggestion.icon}
                size={20}
                color={COLORS.blue}
              />
              <View style={styles.suggestionCopy}>
                <Text style={styles.suggestionTitle}>{suggestion.title}</Text>
                <Text style={styles.suggestionText}>{suggestion.message}</Text>
              </View>
            </View>
          ))}
        </View>
      ) : null}

      <View style={styles.actions}>
        <AppButton label="Save Expense" onPress={handleSubmit} />
        <AppButton label="Cancel" onPress={onCancel} tone="secondary" />
      </View>
    </View>
  );
};

// Form styles
const styles = StyleSheet.create({
  form: {
    gap: 14,
  },
  error: {
    color: '#b91c1c',
    fontSize: 14,
    fontWeight: '600',
  },
  actions: {
    gap: 10,
    marginTop: 8,
  },
  suggestionBox: {
    borderRadius: 8,
    padding: 14,
    backgroundColor: '#eef4ff',
    borderWidth: 1,
    borderColor: '#c9d8ff',
    gap: 12,
  },
  suggestionHeading: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.ink,
  },
  suggestionRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
  },
  suggestionCopy: {
    flex: 1,
    gap: 3,
  },
  suggestionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.ink,
  },
  suggestionText: {
    fontSize: 13,
    color: COLORS.slate,
    lineHeight: 19,
  },
});

export default ExpenseForm;
