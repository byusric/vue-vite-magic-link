
export  const routes = [
    {
      path: "/",
      name: "default",
      meta: { authRequired: true, title: '', redirect:'dashboard'},
      component: { template:'<div></div>' },
    },
    {
      path: "/login",
      name: "login",
      meta: {  title: 'Login' },
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/complete-register",
      name: "complete-register",
      meta: {  title: 'complete-register'},
      component: () => import("../views/CompleteRegister.vue"),
    },
    {
      path: "/create-user",
      name: "create-user",
      meta: {  title: 'create-user'},
      component: () => import("../views/CreateUser.vue"),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      meta: { authRequired: true, title: 'Dashboard' },
      component: () => import("../views/DashboardView.vue"),
    },
  ]
export default routes;
