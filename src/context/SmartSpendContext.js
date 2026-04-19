// Main shared state layer for SmartSpend data, calculations, and handlers.

//Initialisation.......................................
// Imports
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import {
  createCycle,
  getActiveCycleId,
  getCycles,
  getExpenses,
  initializeDatabase,
  removeExpense,
  saveExpense,
  setActiveCycleId,
  updateCycleIncome,
} from '../database/smartSpendDb';
import {
  buildAlert,
  buildCategoryTotals,
  buildCycleSummary,
  buildDailyAllowance,
  buildSmartSuggestions,
  buildTypeTotals,
} from '../utils/finance';

// Context setup
const SmartSpendContext = createContext(null);

export const SmartSpendProvider = ({ children }) => {
  //State..............................................
  // Local state
  // Shared app state is managed here so all screens work from the same finance data.
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [cycles, setCycles] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [activeCycleId, setActiveCycleIdState] = useState(null);

  //Handlers.............................................
  // Data loading
  const refreshData = async () => {
    const [cycleRows, expenseRows, activeId] = await Promise.all([
      getCycles(),
      getExpenses(),
      getActiveCycleId(),
    ]);

    // If no cycle is marked active yet, fall back to the newest available one.
    const fallbackCycleId = activeId || cycleRows[0]?.id || null;

    setCycles(cycleRows);
    setExpenses(expenseRows);
    setActiveCycleIdState(fallbackCycleId);

    if (fallbackCycleId && fallbackCycleId !== activeId) {
      await setActiveCycleId(fallbackCycleId);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const boot = async () => {
      try {
        // The app creates the database tables first, then loads the saved finance data into state.
        await initializeDatabase();
        await refreshData();
      } catch (error) {
        if (isMounted) {
          setErrorMessage('SmartSpend could not load your local finance data.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    boot();

    return () => {
      isMounted = false;
    };
  }, []);

  //State..............................................
  // Derived finance values
  // Derived values keep the screens lightweight and avoid repeating the same calculations everywhere.
  const activeCycle =
    cycles.find((cycle) => cycle.id === activeCycleId) || cycles[0] || null;

  const cycleSummary = useMemo(
    () => buildCycleSummary(expenses, activeCycle),
    [expenses, activeCycle]
  );

  const currentAlert = useMemo(() => buildAlert(cycleSummary), [cycleSummary]);

  const trendData = useMemo(() => {
    const cycleExpenses = cycleSummary.cycleExpenses || [];

    return {
      categoryTotals: buildCategoryTotals(cycleExpenses),
      typeTotals: buildTypeTotals(cycleExpenses),
    };
  }, [cycleSummary]);

  const smartSuggestions = useMemo(
    () => buildSmartSuggestions(activeCycle, cycleSummary),
    [activeCycle, cycleSummary]
  );

  const dailyAllowance = useMemo(
    () => buildDailyAllowance(activeCycle, cycleSummary),
    [activeCycle, cycleSummary]
  );

  //Handlers.............................................
  // Action handlers
  // Each handler writes to SQLite first and then refreshes the shared state from the database.
  const handleCreateCycle = async (cycle) => {
    setErrorMessage('');

    try {
      const newCycleId = await createCycle(cycle);
      await setActiveCycleId(newCycleId);
      await refreshData();
    } catch (error) {
      setErrorMessage('The income cycle could not be saved.');
      throw error;
    }
  };

  const handleSelectCycle = async (cycleId) => {
    setErrorMessage('');
    await setActiveCycleId(cycleId);
    setActiveCycleIdState(cycleId);
  };

  const handleUpdateCycleIncome = async (cycleId, incomeAmount) => {
    setErrorMessage('');

    try {
      await updateCycleIncome(cycleId, incomeAmount);
      await refreshData();
    } catch (error) {
      setErrorMessage('The income amount could not be updated.');
      throw error;
    }
  };

  const handleSaveExpense = async (expense) => {
    setErrorMessage('');

    try {
      await saveExpense(expense);
      await refreshData();
    } catch (error) {
      setErrorMessage('The expense could not be saved.');
      throw error;
    }
  };

  const handleDeleteExpense = async (expenseId) => {
    setErrorMessage('');

    try {
      await removeExpense(expenseId);
      await refreshData();
    } catch (error) {
      setErrorMessage('The expense could not be deleted.');
      throw error;
    }
  };

  //State..............................................
  // Shared context value
  const value = {
    loading,
    errorMessage,
    cycles,
    expenses,
    activeCycleId,
    activeCycle,
    cycleSummary,
    currentAlert,
    trendData,
    smartSuggestions,
    dailyAllowance,
    saveExpense: handleSaveExpense,
    deleteExpense: handleDeleteExpense,
    createCycle: handleCreateCycle,
    selectCycle: handleSelectCycle,
    updateCycleIncome: handleUpdateCycleIncome,
  };

  //View.................................................
  return (
    <SmartSpendContext.Provider value={value}>
      {children}
    </SmartSpendContext.Provider>
  );
};

// Custom hook
//Handlers.............................................
export const useSmartSpend = () => {
  const context = useContext(SmartSpendContext);

  if (!context) {
    throw new Error('useSmartSpend must be used inside a SmartSpendProvider');
  }

  return context;
};
