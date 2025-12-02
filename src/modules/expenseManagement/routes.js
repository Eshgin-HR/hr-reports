import { defineAsyncComponent } from 'vue'

const expenseManagementComp = defineAsyncComponent(() => import('./index.vue'))

export const expenseManagement = [
  {
    path: "/expense-management",
    name: "expenseManagement",
    component: expenseManagementComp,
    meta: {
      title: "Expense Management",
      bgColorGray: true,
      acceptedRoles: "ALL"
    }
  },
];
