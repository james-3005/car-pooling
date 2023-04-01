import Vue from "vue";
import VueRouter from "vue-router";
import goTo from "vuetify/lib/services/goto";
import { RoleEnum } from "@/utils/types";
import { checkRole } from "@/router/role";
import { REGEX } from "@/utils/constant";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
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
        path: "",
        name: "HomeClient",
        component: () =>
          import(/* webpackChunkName: "Home" */ "../views/Client/HomePage.vue"),
      },
      {
        path: "info",
        name: "Info",
        component: () =>
          import(/* webpackChunkName: "Home" */ "../views/Info.vue"),
      },
      {
        path: "cluster",
        name: "ClusterClient",
        component: () =>
          import(/* webpackChunkName: "Home" */ "../views/Client/Cluster.vue"),
      },
      {
        path: "map",
        name: "MapClient",
        component: () =>
          import(
            /* webpackChunkName: "Home" */ "../views/Client/MapHandle.vue"
          ),
      },
    ],
  },
  // {
  //   path: "/dv",
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "layout_default" */ "@/components/layout/Default.vue"
  //     ),
  //   meta: {
  //     requiredAuth: true,
  //   },
  //   children: [
  //     {
  //       path: SCREEN.HOME.PATH,
  //       name: 'HomeCl',
  //       component: () =>
  //         import(/* webpackChunkName: "Home" */ "../views/Driver/Home.vue"),
  //     },
  //     {
  //       path: SCREEN.INFO.PATH,
  //       name: SCREEN.INFO.NAME,
  //       component: () =>
  //         import(/* webpackChunkName: "Home" */ "../views/Info.vue"),
  //     },
  //   ],
  // },
  {
    path: "/admin",
    component: () =>
      import(
        /* webpackChunkName: "layout_default" */ "@/components/layout/LayoutAdmin.vue"
      ),
    meta: {
      requiredAuth: true,
    },
    children: [
      {
        path: "cluster",
        name: "ClusterAdmin",
        component: () =>
          import(/* webpackChunkName: "Home" */ "../views/Admin/Cluster.vue"),
      },
      {
        path: "monitor",
        name: "Monitor",
        component: () =>
          import(/* webpackChunkName: "Home" */ "../views/Admin/Home.vue"),
      },
      {
        path: "/",
        name: "home",
        component: () =>
          import(/* webpackChunkName: "Home" */ "../views/Admin/HomePage.vue"),
      },
    ],
  },
  {
    name: "403",
    path: "/403",
    component: () =>
      import(/* webpackChunkName: "error403" */ "../views/error/Error403.vue"),
  },
  {
    name: "404",
    path: "*",
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

router.beforeEach(async (to, from, next) => {
  try {
    if (to.matched.some((record) => record.meta.requiredAuth)) {
      const isLogged = localStorage.getItem("token");
      if (!isLogged) {
        next({
          path: "/login",
          params: { nextUrl: to.fullPath },
          query: { redirect: to.fullPath },
        });
        return;
      }
      const role = JSON.parse(localStorage.getItem("user") || "")
        ?.role as unknown as RoleEnum;
      const isAdminRoute = to.path.startsWith("/admin");
      // @ts-ignore
      if (role == RoleEnum.admin) {
        if (isAdminRoute) {
          next();
        } else {
          const path = to.path === "/" ? "" : to.path;
          next({ path: "/admin" + path });
        }
      } else {
        if (isAdminRoute) next({ path: to.path.replace("/admin", "/") });
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
      if (to.name === "Login") {
        next("/");
        return;
      }
    }
    next();
  } catch (e) {}
});

export default router;
