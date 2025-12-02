// Expenses Vuex Store Module
const STORAGE_KEY = 'hr_expenses';

// Load expenses from localStorage
const loadExpenses = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading expenses:', error);
    return [];
  }
};

// Save expenses to localStorage
const saveExpenses = (expenses) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  } catch (error) {
    console.error('Error saving expenses:', error);
  }
};

// Initialize with sample data if empty
const initializeExpenses = () => {
  const existing = loadExpenses();
  if (existing.length === 0) {
    const sampleExpenses = [
      {
        id: 1,
        title: 'Business lunch with client',
        amount: 150.00,
        category: 'meals',
        date: '2025-11-25',
        status: 'approved',
        description: 'Meeting with potential client to discuss new project',
        receiptUrl: ''
      },
      {
        id: 2,
        title: 'Flight to Baku - Istanbul',
        amount: 450.00,
        category: 'travel',
        date: '2025-11-28',
        status: 'pending',
        description: 'Business trip for conference',
        receiptUrl: ''
      },
      {
        id: 3,
        title: 'Office supplies',
        amount: 75.50,
        category: 'office',
        date: '2025-11-30',
        status: 'approved',
        description: 'Printer paper, pens, and folders',
        receiptUrl: ''
      },
      {
        id: 4,
        title: 'Hotel accommodation',
        amount: 320.00,
        category: 'travel',
        date: '2025-11-29',
        status: 'pending',
        description: '2 nights in Istanbul',
        receiptUrl: ''
      },
      {
        id: 5,
        title: 'New laptop',
        amount: 2500.00,
        category: 'equipment',
        date: '2025-12-01',
        status: 'pending',
        description: 'MacBook Pro for development work',
        receiptUrl: ''
      }
    ];
    saveExpenses(sampleExpenses);
    return sampleExpenses;
  }
  return existing;
};

const expenses = {
  state: {
    expenses: initializeExpenses(),
    nextId: Math.max(...initializeExpenses().map(e => e.id), 0) + 1
  },
  getters: {
    allExpenses: (state) => state.expenses,
    expenseById: (state) => (id) => state.expenses.find(e => e.id === id),
    expensesByStatus: (state) => (status) =>
      state.expenses.filter(e => e.status === status),
    expensesByCategory: (state) => (category) =>
      state.expenses.filter(e => e.category === category),
    totalExpenseAmount: (state) =>
      state.expenses.reduce((sum, e) => sum + e.amount, 0),
    pendingExpenses: (state) =>
      state.expenses.filter(e => e.status === 'pending'),
    approvedExpenses: (state) =>
      state.expenses.filter(e => e.status === 'approved'),
  },
  mutations: {
    SET_EXPENSES: (state, expenses) => {
      state.expenses = expenses;
      saveExpenses(expenses);
    },
    ADD_EXPENSE: (state, expense) => {
      const newExpense = {
        ...expense,
        id: state.nextId++
      };
      state.expenses.push(newExpense);
      saveExpenses(state.expenses);
    },
    UPDATE_EXPENSE: (state, updatedExpense) => {
      const index = state.expenses.findIndex(e => e.id === updatedExpense.id);
      if (index !== -1) {
        state.expenses.splice(index, 1, updatedExpense);
        saveExpenses(state.expenses);
      }
    },
    DELETE_EXPENSE: (state, id) => {
      state.expenses = state.expenses.filter(e => e.id !== id);
      saveExpenses(state.expenses);
    },
    UPDATE_EXPENSE_STATUS: (state, { id, status }) => {
      const expense = state.expenses.find(e => e.id === id);
      if (expense) {
        expense.status = status;
        saveExpenses(state.expenses);
      }
    }
  },
  actions: {
    addExpense: ({ commit }, expenseData) => {
      commit('ADD_EXPENSE', expenseData);
    },
    updateExpense: ({ commit }, expenseData) => {
      commit('UPDATE_EXPENSE', expenseData);
    },
    deleteExpense: ({ commit }, id) => {
      commit('DELETE_EXPENSE', id);
    },
    updateExpenseStatus: ({ commit }, payload) => {
      commit('UPDATE_EXPENSE_STATUS', payload);
    },
    loadExpenses: ({ commit }) => {
      const expenses = loadExpenses();
      commit('SET_EXPENSES', expenses);
    }
  },
  namespaced: true,
};

export default expenses;
