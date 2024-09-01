import { defineAsyncComponent } from 'vue'

const groupWideActivitiesComp = defineAsyncComponent(() => import('./index.vue'))

export const groupWideActivities = [
  {
    path: "/group-wide-activities",
    name: "groupWideActivities",
    component: groupWideActivitiesComp,
    meta: {
      title: "Group wide activities",
      bgColorGray: true,
      acceptedRoles: "ALL"
    }
  },
];
