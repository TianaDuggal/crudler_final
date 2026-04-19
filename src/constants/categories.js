// Main spending labels and cycle options used in forms throughout the app.

//Initialisation.......................................
// Spending type choices
export const EXPENSE_TYPES = [
  { label: 'Essential', value: 'essential' },
  { label: 'Discretionary', value: 'discretionary' },
];

// Spending category choices
export const EXPENSE_CATEGORIES = [
  { label: 'Rent & Bills', value: 'rent-bills' },
  { label: 'Food & Groceries', value: 'food-groceries' },
  { label: 'Travel', value: 'travel' },
  { label: 'Study Costs', value: 'study-costs' },
  { label: 'Health', value: 'health' },
  { label: 'Social & Leisure', value: 'social-leisure' },
  { label: 'Shopping', value: 'shopping' },
  { label: 'Other', value: 'other' },
];

// Income cycle choices
export const DEFAULT_CYCLE_TYPES = [
  { label: 'Monthly', value: 'monthly' },
  { label: 'Maintenance Loan Period', value: 'loan-period' },
  { label: 'Custom', value: 'custom' },
];
