<template>
  <div class="px-3 md:px-12 text-left">
    <div class="flex flex-col gap-8">
      <!-- Header Section -->
      <div class="flex flex-col gap-2">
        <div class="text-2xl font-bold">Expense Management</div>
        <div class="text-sm font-medium text-subTitle">
          Track and manage employee expenses efficiently
        </div>
      </div>

      <!-- Controls Section -->
      <div class="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <button
          @click="showExpenseForm = true; editingExpense = null"
          class="bg-navActive text-white px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-all"
        >
          + Add New Expense
        </button>

        <!-- Filters -->
        <div class="flex flex-col md:flex-row gap-3">
          <select
            v-model="filterStatus"
            class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navActive"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>

          <select
            v-model="filterCategory"
            class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navActive"
          >
            <option value="all">All Categories</option>
            <option value="travel">Travel</option>
            <option value="meals">Meals</option>
            <option value="office">Office Supplies</option>
            <option value="equipment">Equipment</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <!-- Expense Form Modal -->
      <div
        v-if="showExpenseForm"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        @click.self="closeForm"
      >
        <div class="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold">
              {{ editingExpense ? 'Edit Expense' : 'Add New Expense' }}
            </h2>
            <button @click="closeForm" class="text-2xl text-gray-500 hover:text-gray-700">
              &times;
            </button>
          </div>

          <form @submit.prevent="saveExpense" class="flex flex-col gap-4">
            <div>
              <label class="block text-sm font-medium mb-1">Title *</label>
              <input
                v-model="expenseForm.title"
                type="text"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navActive"
                placeholder="e.g., Business lunch with client"
              />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium mb-1">Amount (AZN) *</label>
                <input
                  v-model.number="expenseForm.amount"
                  type="number"
                  step="0.01"
                  required
                  min="0"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navActive"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label class="block text-sm font-medium mb-1">Category *</label>
                <select
                  v-model="expenseForm.category"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navActive"
                >
                  <option value="">Select category</option>
                  <option value="travel">Travel</option>
                  <option value="meals">Meals</option>
                  <option value="office">Office Supplies</option>
                  <option value="equipment">Equipment</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium mb-1">Date *</label>
                <input
                  v-model="expenseForm.date"
                  type="date"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navActive"
                />
              </div>

              <div>
                <label class="block text-sm font-medium mb-1">Status</label>
                <select
                  v-model="expenseForm.status"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navActive"
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">Description</label>
              <textarea
                v-model="expenseForm.description"
                rows="3"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navActive"
                placeholder="Add any additional details..."
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">Receipt/Attachment URL</label>
              <input
                v-model="expenseForm.receiptUrl"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navActive"
                placeholder="https://..."
              />
            </div>

            <div class="flex gap-3 justify-end mt-4">
              <button
                type="button"
                @click="closeForm"
                class="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-6 py-2 bg-navActive text-white rounded-lg hover:opacity-90"
              >
                {{ editingExpense ? 'Update' : 'Save' }} Expense
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Expense Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div class="text-sm text-subTitle">Total Expenses</div>
          <div class="text-2xl font-bold text-navActive">{{ filteredExpenses.length }}</div>
        </div>
        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div class="text-sm text-subTitle">Total Amount</div>
          <div class="text-2xl font-bold text-green-600">{{ totalAmount }} AZN</div>
        </div>
        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div class="text-sm text-subTitle">Pending</div>
          <div class="text-2xl font-bold text-yellow-600">{{ pendingCount }}</div>
        </div>
        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div class="text-sm text-subTitle">Approved</div>
          <div class="text-2xl font-bold text-green-600">{{ approvedCount }}</div>
        </div>
      </div>

      <!-- Expenses Table -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 border-b border-gray-200">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Date
                </th>
                <th class="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Title
                </th>
                <th class="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Category
                </th>
                <th class="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Amount
                </th>
                <th class="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="expense in filteredExpenses" :key="expense.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ formatDate(expense.date) }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-900">
                  <div class="font-medium">{{ expense.title }}</div>
                  <div v-if="expense.description" class="text-xs text-gray-500 mt-1">
                    {{ expense.description }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <span class="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                    {{ formatCategory(expense.category) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                  {{ expense.amount.toFixed(2) }} AZN
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    :class="getStatusClass(expense.status)"
                    class="px-2 py-1 rounded-full text-xs font-bold"
                  >
                    {{ formatStatus(expense.status) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex gap-2">
                    <button
                      @click="editExpense(expense)"
                      class="text-navActive hover:text-blue-900"
                    >
                      Edit
                    </button>
                    <button
                      @click="deleteExpense(expense.id)"
                      class="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                    <a
                      v-if="expense.receiptUrl"
                      :href="expense.receiptUrl"
                      target="_blank"
                      class="text-green-600 hover:text-green-900"
                    >
                      Receipt
                    </a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          v-if="filteredExpenses.length === 0"
          class="text-center py-12 text-gray-500 font-medium"
        >
          No expenses found. Click "Add New Expense" to get started.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showExpenseForm: false,
      editingExpense: null,
      filterStatus: 'all',
      filterCategory: 'all',
      expenseForm: {
        title: '',
        amount: 0,
        category: '',
        date: new Date().toISOString().split('T')[0],
        status: 'pending',
        description: '',
        receiptUrl: ''
      }
    };
  },
  computed: {
    expenses() {
      return this.$store.state.expenses.expenses;
    },
    filteredExpenses() {
      return this.expenses.filter(expense => {
        const statusMatch = this.filterStatus === 'all' || expense.status === this.filterStatus;
        const categoryMatch = this.filterCategory === 'all' || expense.category === this.filterCategory;
        return statusMatch && categoryMatch;
      }).sort((a, b) => new Date(b.date) - new Date(a.date));
    },
    totalAmount() {
      return this.filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0).toFixed(2);
    },
    pendingCount() {
      return this.filteredExpenses.filter(exp => exp.status === 'pending').length;
    },
    approvedCount() {
      return this.filteredExpenses.filter(exp => exp.status === 'approved').length;
    }
  },
  methods: {
    closeForm() {
      this.showExpenseForm = false;
      this.editingExpense = null;
      this.resetForm();
    },
    resetForm() {
      this.expenseForm = {
        title: '',
        amount: 0,
        category: '',
        date: new Date().toISOString().split('T')[0],
        status: 'pending',
        description: '',
        receiptUrl: ''
      };
    },
    saveExpense() {
      if (this.editingExpense) {
        this.$store.dispatch('expenses/updateExpense', {
          id: this.editingExpense.id,
          ...this.expenseForm
        });
      } else {
        this.$store.dispatch('expenses/addExpense', this.expenseForm);
      }
      this.closeForm();
    },
    editExpense(expense) {
      this.editingExpense = expense;
      this.expenseForm = { ...expense };
      this.showExpenseForm = true;
    },
    deleteExpense(id) {
      if (confirm('Are you sure you want to delete this expense?')) {
        this.$store.dispatch('expenses/deleteExpense', id);
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    },
    formatCategory(category) {
      const categories = {
        travel: 'Travel',
        meals: 'Meals',
        office: 'Office Supplies',
        equipment: 'Equipment',
        other: 'Other'
      };
      return categories[category] || category;
    },
    formatStatus(status) {
      return status.charAt(0).toUpperCase() + status.slice(1);
    },
    getStatusClass(status) {
      const classes = {
        pending: 'bg-yellow-100 text-yellow-800',
        approved: 'bg-green-100 text-green-800',
        rejected: 'bg-red-100 text-red-800'
      };
      return classes[status] || 'bg-gray-100 text-gray-800';
    }
  }
};
</script>

<style scoped>
</style>
