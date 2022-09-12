
export  const routes = [
    {
      path: "/login",
      name: "login",
      meta: { authRequired: true, title: 'Dashboard'},
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/",
      name: "default",
      meta: { authRequired: true, title: 'Dashboard'},
      component: () => import("../views/DashboardView.vue"),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      meta: { authRequired: true, title: 'Login' },
      component: () => import("../views/DashboardView.vue"),
    },
  ]
export default routes;
