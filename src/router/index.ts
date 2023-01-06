import Vue from "vue";
import VueRouter from "vue-router";
import goTo from "vuetify/lib/services/goto";
import { SCREEN } from "@/utils/screen";
import { RoleEnum } from "@/utils/types";
import { checkRole } from "@/router/role";
import { REGEX } from "@/utils/constant";

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
        /* webpackChunkName: "layout_default" */ "@/components/layout/LayoutClient.vue"
      ),
    meta: {
      requiredAuth: true,
    },
    children: [
      {
        path: SCREEN.HOME.PATH,
        name: SCREEN.HOME.NAME,
        component: () =>
          import(/* webpackChunkName: "Home" */ "../views/Client/HomePage.vue"),
      },
      {
        path: SCREEN.INFO.PATH,
        name: SCREEN.INFO.NAME,
        component: () =>
          import(/* webpackChunkName: "Home" */ "../views/Info.vue"),
      },
    ],
  },
  {
    path: "/dv",
    component: () =>
      import(
        /* webpackChunkName: "layout_default" */ "@/components/layout/Default.vue"
      ),
    meta: {
      requiredAuth: true,
    },
    children: [
      {
        path: SCREEN.HOME.PATH,
        name: SCREEN.HOME.NAME,
        component: () =>
          import(/* webpackChunkName: "Home" */ "../views/Driver/Home.vue"),
      },
      {
        path: SCREEN.INFO.PATH,
        name: SCREEN.INFO.NAME,
        component: () =>
          import(/* webpackChunkName: "Home" */ "../views/Info.vue"),
      },
    ],
  },
  // {
  //   name: SCREEN.ERR403.NAME,
  //   path: SCREEN.ERR403.PATH,
  //   component: () =>
  //     import(/* webpackChunkName: "error403" */ "../views/error/Error403.vue"),
  // },
  // {
  //   name: SCREEN.ERR404.NAME,
  //   path: SCREEN.ERR404.PATH,
  //   component: () =>
  //     import(/* webpackChunkName: "error_404" */ "../views/error/Error404.vue"),
  // },
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

router.beforeEach(async (to, from, next) => {
  try {
    if (to.matched.some((record) => record.meta.requiredAuth)) {
      const isLogged = localStorage.getItem("token") || "asd";
      if (!isLogged) {
        next({
          path: SCREEN.LOGIN.PATH,
          params: { nextUrl: to.fullPath },
          query: { redirect: to.fullPath },
        });
        return;
      }
      const role = RoleEnum.customer;

      if (
        !checkRole(to.name as string, role) &&
        SCREEN.ERR403.NAME !== to.name
      ) {
        next({ path: SCREEN.ERR403.PATH });
        return;
      }
      const isDriverRoute = to.path.startsWith("/dv");
      // @ts-ignore
      if (role === RoleEnum.driver) {
        if (isDriverRoute) {
          next();
        } else {
          next({ path: "/dv" + to.path });
        }
      } else {
        if (isDriverRoute) next({ path: to.path.replace("/dv", "/") });
        else next();
      }
      return;
    }
    if (to.matched.some((record) => record.meta.guest)) {
      const isLogged = true;
      if (isLogged) {
        next();
        return;
      }
      if (to.name === SCREEN.LOGIN.NAME) {
        next(SCREEN.HOME.PATH);
        return;
      }
    }
    next();
  } catch (e) {}
});

export default router;
