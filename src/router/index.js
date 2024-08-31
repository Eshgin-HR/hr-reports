import Vue from 'vue'
import VueRouter from "vue-router";
import { appSettings } from "@/services/appSettings/index";
import defaultLayout from "../layouts/default.vue";
import errorLayout from "../layouts/404.vue";
import { userService } from "@/services/user/index";
import { allReports } from '@/modules/allReports/routes';
import { managementDashboard } from '@/modules/managementDashboard/routes';
import { hrCommittee } from '@/modules/hrCommittee/routes';
import { sbReports } from '@/modules/sbReports/routes';
import { groupWideActivities } from '@/modules/groupWideActivities/routes';

Vue.use(VueRouter)

const authMiddleware = async (to, from, next) => {
  if (await userService.isAuthenticated()) {
    if (to.name === 'signIn') {
      next({ name: 'allReports' });
    } else {
      next();
    }
  } else {
    if (to.name !== 'signIn') {
      next({ name: 'signIn' });
    } else {
      next();
    }
  }
}

const routes = [
  {
    path: "/sign-in",
    name: "signIn",
    component: () => import("@/modules/signIn/index.vue"),
    beforeEnter: authMiddleware,
  },
  {
    path: "",
    component: defaultLayout,
    children: [
      {
        path: "",
        name: "home",
        component: () => import("@/modules/home/home.vue"),
        meta: {
          acceptedRoles: "ALL",
        },
        beforeEnter: async (to, from, next) => {
          if (await userService.isAuthenticated()) {
            next({ name: 'allReports' });
          } else {
            next({ name: 'signIn' });
          }
        },
      },
      ...allReports.map(route => ({ ...route, beforeEnter: authMiddleware })),
      ...managementDashboard.map(route => ({ ...route, beforeEnter: authMiddleware })),
      ...hrCommittee.map(route => ({ ...route, beforeEnter: authMiddleware })),
      ...sbReports.map(route => ({ ...route, beforeEnter: authMiddleware })),
      ...groupWideActivities.map(route => ({ ...route, beforeEnter: authMiddleware }))
    ],
  },
  {
    path: "/404",
    name: "404 Error",
    component: errorLayout,
    meta: {
      acceptedRoles: "ALL",
      notRequiresAuth: true
    },
  },
  {
    path: "*",
    redirect: "/404",
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from) {
    if (to.name != from.name) return { x: 0, y: 0 };
  },
})

router.beforeEach(async (to, from, next) => {
  let documentTitle = `${process.env.VUE_APP_TITLE}`;
  if (to.meta.title) {
    documentTitle = `${to.meta.title}`;
  }
  document.title = documentTitle;

  // Arka plan rengi (varsayilan beyaz)
  if (to.meta.bgColorGray) appSettings.bgColorGray(true);
  else appSettings.bgColorGray(false);

  if (to.meta.notRequiresAuth) {
    next();
    return;
  }

  next();
})

export default router;
