// Main SQLite layer for storing cycles, expenses, and simple app settings.

//Initialisation.......................................
// Imports
import * as SQLite from 'expo-sqlite';

// Database connection
const db = SQLite.openDatabaseSync('smartspend.db');

// Starter cycle helper
const buildDefaultCycle = () => {
  // Version 1 started with a seeded cycle so the first launch had real values to test and display.
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

// Database setup
//Handlers.............................................
export const initializeDatabase = async () => {
  await db.execAsync(`
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY NOT NULL,
      value TEXT
    );

    CREATE TABLE IF NOT EXISTS income_cycles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      cycle_type TEXT NOT NULL,
      income_amount REAL NOT NULL,
      start_date TEXT NOT NULL,
      end_date TEXT NOT NULL,
      notes TEXT
    );

    CREATE TABLE IF NOT EXISTS expenses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cycle_id INTEGER NOT NULL,
      amount REAL NOT NULL,
      type TEXT NOT NULL,
      category TEXT NOT NULL,
      note TEXT,
      expense_date TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (cycle_id) REFERENCES income_cycles(id) ON DELETE CASCADE
    );
  `);

  const cycleCount = await db.getFirstAsync('SELECT COUNT(*) AS count FROM income_cycles');

  if (!cycleCount?.count) {
    // A starter cycle prevents the overview from feeling empty before the user creates their own data.
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
};

// Read helpers
export const getCycles = async () => {
  const rows = await db.getAllAsync(
    `SELECT
      id,
      name,
      cycle_type AS cycleType,
      income_amount AS incomeAmount,
      start_date AS startDate,
      end_date AS endDate,
      notes
     FROM income_cycles
     ORDER BY start_date DESC`
  );

  return rows.map((row) => ({
    ...row,
    incomeAmount: Number(row.incomeAmount),
  }));
};

export const getExpenses = async () => {
  const rows = await db.getAllAsync(
    `SELECT
      id,
      cycle_id AS cycleId,
      amount,
      type,
      category,
      note,
      expense_date AS expenseDate,
      created_at AS createdAt
     FROM expenses
     ORDER BY expense_date DESC, id DESC`
  );

  return rows.map((row) => ({
    ...row,
    cycleId: Number(row.cycleId),
    amount: Number(row.amount),
  }));
};

export const getActiveCycleId = async () => {
  const row = await db.getFirstAsync(
    `SELECT value FROM settings WHERE key = 'active_cycle_id'`
  );

  return row?.value ? Number(row.value) : null;
};

// Write helpers
export const setActiveCycleId = async (cycleId) => {
  await db.runAsync(
    `INSERT OR REPLACE INTO settings (key, value) VALUES ('active_cycle_id', ?)`,
    [String(cycleId)]
  );
};

export const createCycle = async (cycle) => {
  const result = await db.runAsync(
    `INSERT INTO income_cycles (name, cycle_type, income_amount, start_date, end_date, notes)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      cycle.name,
      cycle.cycleType,
      Number(cycle.incomeAmount),
      cycle.startDate,
      cycle.endDate,
      cycle.notes || '',
    ]
  );

  return result.lastInsertRowId;
};

export const updateCycleIncome = async (cycleId, incomeAmount) => {
  // Sprint 1 refinement: the income can be edited from the overview instead of staying fixed.
  await db.runAsync(
    `UPDATE income_cycles
     SET income_amount = ?
     WHERE id = ?`,
    [Number(incomeAmount), cycleId]
  );
};

export const saveExpense = async (expense) => {
  if (expense.id) {
    // Reuse the same function for both new expenses and edits so the screen logic stays simple.
    await db.runAsync(
      `UPDATE expenses
       SET cycle_id = ?, amount = ?, type = ?, category = ?, note = ?, expense_date = ?
       WHERE id = ?`,
      [
        expense.cycleId,
        Number(expense.amount),
        expense.type,
        expense.category,
        expense.note || '',
        expense.expenseDate,
        expense.id,
      ]
    );

    return expense.id;
  }

  const result = await db.runAsync(
    `INSERT INTO expenses (cycle_id, amount, type, category, note, expense_date)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      expense.cycleId,
      Number(expense.amount),
      expense.type,
      expense.category,
      expense.note || '',
      expense.expenseDate,
    ]
  );

  return result.lastInsertRowId;
};

export const removeExpense = async (expenseId) => {
  await db.runAsync(`DELETE FROM expenses WHERE id = ?`, [expenseId]);
};
