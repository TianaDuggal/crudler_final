// Main calculation helpers for summaries, alerts, charts, and budgeting suggestions.

//Initialisation.......................................
// Safe number helper
const safeNumber = (value) => Number(value || 0);

// Cycle filter helper
export const filterExpensesForCycle = (expenses, activeCycleId) =>
  expenses.filter((expense) => expense.cycleId === activeCycleId);

export const buildCycleSummary = (expenses, activeCycle) => {
  //Handlers.............................................
  // Everything on the overview screen is built from this cycle-level summary.
  const cycleExpenses = filterExpensesForCycle(expenses, activeCycle?.id);
  const totalSpent = cycleExpenses.reduce(
    (total, expense) => total + safeNumber(expense.amount),
    0
  );
  const essentialSpent = cycleExpenses
    .filter((expense) => expense.type === 'essential')
    .reduce((total, expense) => total + safeNumber(expense.amount), 0);
  const discretionarySpent = cycleExpenses
    .filter((expense) => expense.type === 'discretionary')
    .reduce((total, expense) => total + safeNumber(expense.amount), 0);
  const incomeAmount = safeNumber(activeCycle?.incomeAmount);
  const remaining = incomeAmount - totalSpent;
  const discretionaryRemaining = Math.max(incomeAmount - essentialSpent, 0);
  const spendRatio = incomeAmount > 0 ? totalSpent / incomeAmount : 0;

  return {
    cycleExpenses,
    incomeAmount,
    totalSpent,
    essentialSpent,
    discretionarySpent,
    remaining,
    discretionaryRemaining,
    spendRatio,
  };
};

export const buildAlert = (summary) => {
  // The alert uses simple traffic-light logic so students can read risk quickly.
  if (!summary || summary.incomeAmount <= 0) {
    return null;
  }

  if (summary.remaining <= 0) {
    return {
      tone: 'danger',
      title: 'Take a breather',
      message:
        'You have spent beyond the income set for this cycle. A quick review of recent discretionary spending may help you reset.',
    };
  }

  if (summary.spendRatio >= 0.85) {
    return {
      tone: 'warning',
      title: 'You are getting close to your limit',
      message:
        'Most of this cycle budget is already committed. It may help to slow discretionary spending for a few days.',
    };
  }

  if (summary.essentialSpent > summary.incomeAmount * 0.7) {
    return {
      tone: 'info',
      title: 'Essentials are taking most of this cycle',
      message:
        'That is okay, but it leaves less room for flexible spending. Keep an eye on smaller purchases this week.',
    };
  }

  return {
    tone: 'success',
    title: 'You are in a steady place',
    message:
      'Your current cycle still has breathing room. Keep logging little expenses so the overview stays accurate.',
  };
};

export const buildCategoryTotals = (expenses) => {
  const grouped = expenses.reduce((totals, expense) => {
    const current = totals[expense.category] || 0;
    totals[expense.category] = current + safeNumber(expense.amount);
    return totals;
  }, {});

  return Object.entries(grouped)
    .map(([category, total]) => ({ category, total }))
    .sort((left, right) => right.total - left.total);
};

export const buildTypeTotals = (expenses) => {
  const essential = expenses
    .filter((expense) => expense.type === 'essential')
    .reduce((total, expense) => total + safeNumber(expense.amount), 0);
  const discretionary = expenses
    .filter((expense) => expense.type === 'discretionary')
    .reduce((total, expense) => total + safeNumber(expense.amount), 0);

  return { essential, discretionary };
};

export const buildDailyAllowance = (activeCycle, summary, extraSpend = 0) => {
  // This spreads the remaining money across the days left in the active cycle.
  if (!activeCycle || !summary) {
    return 0;
  }

  const endDate = new Date(activeCycle.endDate);
  const today = new Date();
  const msPerDay = 1000 * 60 * 60 * 24;
  const daysRemaining = Math.max(
    1,
    Math.ceil((endDate.setHours(23, 59, 59, 999) - today.getTime()) / msPerDay)
  );
  const adjustedRemaining = summary.remaining - safeNumber(extraSpend);

  return adjustedRemaining / daysRemaining;
};

export const buildSmartSuggestions = (activeCycle, summary, draftExpense = null) => {
  // Suggestions are kept short and supportive so they guide, rather than overwhelm, the user.
  if (!activeCycle || !summary) {
    return [];
  }

  const draftAmount = safeNumber(draftExpense?.amount);
  const projectedRemaining = summary.remaining - draftAmount;
  const projectedDailyAllowance = buildDailyAllowance(
    activeCycle,
    summary,
    draftAmount
  );
  const suggestions = [];

  suggestions.push({
    icon: 'calendar-clock',
    title: 'Daily pacing',
    message:
      projectedDailyAllowance > 0
        ? `After this spend, you would have about GBP ${projectedDailyAllowance.toFixed(
            2
          )} per day left for the rest of the cycle.`
        : 'This spend would push the daily allowance below zero for the rest of the cycle.',
  });

  if (draftAmount > 0 && draftExpense?.type === 'discretionary') {
    if (draftAmount >= summary.discretionaryRemaining * 0.35) {
      suggestions.push({
        icon: 'lightbulb-on-outline',
        title: 'Large discretionary spend',
        message:
          'This takes a noticeable share of what is left after essentials. Splitting it across two weeks may lower pressure later.',
      });
    } else {
      suggestions.push({
        icon: 'thumb-up-outline',
        title: 'Discretionary spend looks manageable',
        message:
          'This still leaves space for day-to-day flexibility, as long as the smaller purchases stay visible in the app.',
      });
    }
  }

  if (draftAmount > 0 && projectedRemaining <= 0) {
    suggestions.push({
      icon: 'alert-circle-outline',
      title: 'Cycle limit reached',
      message:
        'Saving this amount would fully use the cycle income. It may help to review travel, food, or leisure entries before confirming it.',
    });
  }

  if (draftExpense?.expenseDate) {
    const selectedDate = new Date(draftExpense.expenseDate);
    const cycleEnd = new Date(activeCycle.endDate);

    if (selectedDate > cycleEnd) {
      suggestions.push({
        icon: 'swap-horizontal',
        title: 'Date and cycle mismatch',
        message:
          'The selected date sits outside the active cycle end date. You may want to place this expense in a different cycle.',
      });
    }
  }

  return suggestions.slice(0, 3);
};
