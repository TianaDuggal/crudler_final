// Main display helpers for money and date values shown to the user.

//Initialisation.......................................
// Currency formatter
export const formatCurrency = (value) =>
  new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
  }).format(Number(value || 0));

// Readable date formatter
export const formatDisplayDate = (value) => {
  if (!value) {
    return 'No date';
  }

  return new Date(value).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

// Today's date in database-friendly format
export const todayIso = () => new Date().toISOString().slice(0, 10);
