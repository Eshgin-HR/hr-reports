import { defineAsyncComponent } from 'vue'

const hrCommitteeComp = defineAsyncComponent(() => import('./index.vue'))


export const hrCommittee = [
  {
    path: "/hr-committee",
    name: "hrCommittee",
    component: hrCommitteeComp,
    meta: {
      title: "HR Committee",
      bgColorGray: true,
      acceptedRoles: "ALL"
    }
  },
];
