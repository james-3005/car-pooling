import Vue from "vue";
import VueRouter from "vue-router";
import goTo from "vuetify/lib/services/goto";
import { SCREEN } from "@/utils/auth.const";

Vue.use(VueRouter);

const routes = [
  {
    path: SCREEN.LOGIN.PATH,
    name: SCREEN.LOGIN.NAME,
    component: () =>
      import(/* webpackChunkName: "login" */ "@/views/login/Login.vue"),
    meta: {
      guest: true,
    },
  },

  {
    path: "/",
    component: () =>
      import(
        /* webpackChunkName: "layout_default" */ "@/components/layout/Default.vue"
      ),
    // meta: {
    //   requiredAuth: true,
    // },
    children: [
      {
        path: SCREEN.HOME.PATH,
        name: SCREEN.HOME.NAME,
        component: () =>
          import(/* webpackChunkName: "Home" */ "../views/Home.vue"),
      },
      {
        name: SCREEN.ERR403.NAME,
        path: SCREEN.ERR403.PATH,
        component: () =>
          import(
            /* webpackChunkName: "error403" */ "../views/error/Error403.vue"
          ),
      },
    ],
  },
  {
    name: SCREEN.ERR404.NAME,
    path: SCREEN.ERR404.PATH,
    component: () =>
      import(/* webpackChunkName: "error_404" */ "../views/error/Error404.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  // @ts-ignore
  scrollBehavior: (to, from, savedPosition): any => {
    let scrollTo: number | string = 0;
    if (to.hash) {
      scrollTo = to.hash;
    } else if (savedPosition) {
      scrollTo = savedPosition.y;
    }
    return goTo(scrollTo);
  },
  routes,
});

// router.beforeEach(async (to, from, next) => {
//   if (to.matched.some((record) => record.meta.requiredAuth)) {
//     if (!JwtService.isLogged()) {
//       vx.commit(PURGE_AUTH);
//       next({
//         path: SCREEN.LOGIN.PATH,
//         params: { nextUrl: to.fullPath },
//         query: { redirect: to.fullPath },
//       });
//       return;
//     }
//     const ROLE_NAME = (await GET_ROLE()).data;
//     if (
//       !checkRole(to.name as string, ROLE_NAME) &&
//       SCREEN.ERR403.NAME !== to.name
//     ) {
//       next({ path: SCREEN.ERR403.PATH });
//       return;
//     }
//     next();
//     return;
//   }
//   if (to.matched.some((record) => record.meta.guest)) {
//     if (!JwtService.isLogged()) {
//       vx.commit(PURGE_AUTH);
//       next();
//       return;
//     }
//     if (to.name === SCREEN.LOGIN.NAME) {
//       next(SCREEN.HOME.PATH);
//       return;
//     }
//   }
//   next();
// });

export default router;
