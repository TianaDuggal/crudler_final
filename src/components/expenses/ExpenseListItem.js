// Main expense card used in both the overview preview and the full history screen.

//Initialisation.......................................
// Imports
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { formatCurrency, formatDisplayDate } from '../../utils/formatters';
import AppButton from '../UI/AppButton';

// Badge labels
const toneLabels = {
  essential: 'Essential',
  discretionary: 'Discretionary',
};

export default function ExpenseListItem({ expense, onEdit, onDelete }) {
  //View.................................................
  // Card view
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.amount}>{formatCurrency(expense.amount)}</Text>
        <Text
          style={[
            styles.badge,
            expense.type === 'essential' ? styles.essentialBadge : styles.discretionaryBadge,
          ]}
        >
          {toneLabels[expense.type]}
        </Text>
      </View>

      <Text style={styles.category}>{expense.category}</Text>
      <Text style={styles.meta}>{formatDisplayDate(expense.expenseDate)}</Text>
      {expense.note ? <Text style={styles.note}>{expense.note}</Text> : null}

      <View style={styles.actions}>
        <AppButton label="Edit" onPress={onEdit} tone="secondary" compact />
        <AppButton label="Delete" onPress={onDelete} tone="danger" compact />
      </View>
    </View>
  );
}

// Card styles
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 14,
    gap: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  amount: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0f172a',
  },
  badge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    overflow: 'hidden',
    fontSize: 12,
    fontWeight: '700',
  },
  essentialBadge: {
    backgroundColor: '#dbeafe',
    color: '#1d4ed8',
  },
  discretionaryBadge: {
    backgroundColor: '#ede9fe',
    color: '#7c3aed',
  },
  category: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    textTransform: 'capitalize',
  },
  meta: {
    fontSize: 13,
    color: '#64748b',
  },
  note: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 6,
  },
});
