// Main screen for reviewing, editing, and deleting entries in the active cycle.

//Initialisation.......................................
// Imports
import React from 'react';
import { Alert } from 'react-native';

import Screen from '../components/layout/Screen';
import ExpenseListItem from '../components/expenses/ExpenseListItem';
import EmptyState from '../components/UI/EmptyState';
import SectionCard from '../components/UI/SectionCard';
import { useSmartSpend } from '../context/SmartSpendContext';

const ExpenseHistoryScreen = ({ navigation }) => {
  //Initialisation.......................................
  // Shared history data
  const { activeCycle, cycleSummary, deleteExpense } = useSmartSpend();

  //Handlers.............................................
  // Delete handler
  const confirmDelete = (expenseId) => {
    // Ask before deleting so the user does not lose a saved entry by accident.
    Alert.alert('Delete expense', 'This expense will be removed from the current cycle.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await deleteExpense(expenseId);
        },
      },
    ]);
  };

  //View.................................................
  // Screen view
  return (
    <Screen>
      <SectionCard
        title="Expense history"
        subtitle={
          activeCycle
            ? `Entries for ${activeCycle.name}`
            : 'Create a cycle to start logging expenses.'
        }
      >
        {cycleSummary.cycleExpenses.length ? (
          cycleSummary.cycleExpenses.map((expense) => (
            <ExpenseListItem
              key={expense.id}
              expense={expense}
              onEdit={() => navigation.navigate('AddExpense', { expenseId: expense.id })}
              onDelete={() => confirmDelete(expense.id)}
            />
          ))
        ) : (
          <EmptyState
            title="No expenses in this cycle"
            message="Once you log a few entries here, this screen becomes the easiest place to edit or remove them."
          />
        )}
      </SectionCard>
    </Screen>
  );
};

export default ExpenseHistoryScreen;
