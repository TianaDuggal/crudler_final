// BEFORE

const buildDefaultCycle = () => {
  const today = new Date();
  const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
  const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  return {
    name: 'Current Monthly Cycle',
    cycleType: 'monthly',
    incomeAmount: 1200,
    startDate: startDate.toISOString().slice(0, 10),
    endDate: endDate.toISOString().slice(0, 10),
    notes: 'Starter cycle for tracking rent, food, travel, and everyday spending.',
  };
};

const cycleCount = await db.getFirstAsync('SELECT COUNT(*) AS count FROM income_cycles');

if (!cycleCount?.count) {
  const cycle = buildDefaultCycle();
  const result = await db.runAsync(
    `INSERT INTO income_cycles (name, cycle_type, income_amount, start_date, end_date, notes)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      cycle.name,
      cycle.cycleType,
      cycle.incomeAmount,
      cycle.startDate,
      cycle.endDate,
      cycle.notes,
    ]
  );

  await db.runAsync(
    `INSERT OR REPLACE INTO settings (key, value) VALUES ('active_cycle_id', ?)`,
    [String(result.lastInsertRowId)]
  );
}
