import { defineAsyncComponent } from 'vue'

const allReportsComp = defineAsyncComponent(() => import('./index.vue'))

export const allReports = [
  {
    path: "/all-reports",
    name: "allReports",
    component: allReportsComp,
    meta: {
      title: "All reports",
      bgColorGray: true,
      acceptedRoles: "ALL"
    }
  },
];