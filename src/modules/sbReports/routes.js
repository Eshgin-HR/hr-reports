import { defineAsyncComponent } from 'vue'

const sbReportsComp = defineAsyncComponent(() => import('./index.vue'))



export const sbReports = [
  {
    path: "/sb-reports",
    name: "sbReports",
    component: sbReportsComp,
    meta: {
      title: "Management dashboard",
      bgColorGray: true,
      acceptedRoles: "ALL"
    }
  },
];
