
export  const routes = [
    {
      path: "/login",
      name: "login",
      meta: {  title: 'Login'},
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/",
      name: "default",
      meta: { authRequired: true, title: '', redirect:'dashboard'},
      component: {template:'<div></div>'},
    },
    {
      path: "/dashboard",
      name: "dashboard",
      meta: { authRequired: true, title: 'Dashboard' },
      component: () => import("../views/DashboardView.vue"),
    },
  ]
export default routes;
