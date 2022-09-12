
export  const routes = [
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/",
      name: "default",
      meta: { authRequired: true },
      component: () => import("../views/DashboardView.vue"),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      meta: { authRequired: true },
      component: () => import("../views/DashboardView.vue"),
    },
  ]
export default routes;
