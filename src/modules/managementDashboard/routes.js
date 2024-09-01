import { defineAsyncComponent } from 'vue'

const managementDashboardComp = defineAsyncComponent(() => import('./index.vue'))


export const managementDashboard = [
  {
    path: "/management-dashboard",
    name: "managementDashboard",
    component: managementDashboardComp,
    meta: {
      title: "Management dashboard",
      bgColorGray: true,
      acceptedRoles: "ALL"
    }
  },
];
