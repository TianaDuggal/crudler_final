// Main screen for adding a new expense or updating an existing one.

//Initialisation.......................................
// Imports
import React from 'react';

import Screen from '../components/layout/Screen';
import ExpenseForm from '../components/expenses/ExpenseForm';
import SectionCard from '../components/UI/SectionCard';
import { useSmartSpend } from '../context/SmartSpendContext';

const AddExpenseScreen = ({ navigation, route }) => {
  //Initialisation.......................................
  // Shared form data
  const {
    cycles,
    activeCycleId,
    activeCycle,
    cycleSummary,
    expenses,
    saveExpense,
  } = useSmartSpend();

  //State..............................................
  // Edit-mode check
  // If an expenseId is passed in, this screen switches into edit mode automatically.
  const initialExpense = expenses.find(
    (expense) => expense.id === route.params?.expenseId
  );

  //Handlers.............................................
  // Submit handler
  const handleSubmit = async (expense) => {
    await saveExpense(expense);
    navigation.goBack();
  };

  //View.................................................
  // Screen view
  return (
    <Screen>
      <SectionCard
        title={initialExpense ? 'Edit expense entry' : 'Add a new expense'}
        subtitle="Keep this step short so logging a purchase never feels heavier than the purchase itself."
      >
        <ExpenseForm
          cycles={cycles}
          activeCycleId={activeCycleId}
          activeCycle={activeCycle}
          cycleSummary={cycleSummary}
          initialExpense={initialExpense}
          onSubmit={handleSubmit}
          onCancel={() => navigation.goBack()}
        />
      </SectionCard>
    </Screen>
  );
};

export default AddExpenseScreen;
