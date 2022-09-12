import { createRouter, createWebHistory } from "vue-router";
import {routes} from '@/router/routes';
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()

  if(!auth.data && !!to.meta?.authRequired){
    try {
      await useAuthStore().getData()
    } catch (error) {
      console.log(error);
    }
  }

  if(!!to.meta?.authRequired && !auth?.data){
    next({name:'login'})
  }else if(!to.meta?.authRequired && !!auth?.data){
    next({name:'dashboard'})
  }else if(!!to.meta?.redirect){
    next({name:to.meta.redirect})
  }else{
    next()
  }
})


router.beforeResolve(async (routeTo, routeFrom, next) => {
  // Create a `beforeResolve` hook, which fires whenever
  // `beforeRouteEnter` and `beforeRouteUpdate` would. This
  // allows us to ensure data is fetched even when params change,
  // but the resolved route does not. We put it in `meta` to
  // indicate that it's a hook we created, rather than part of
  // Vue Router (yet?).
  try {
    // For each matched route...
    for (const route of routeTo.matched) {
      await new Promise<void>((resolve, reject) => {
        // If a `beforeResolve` hook is defined, call it with
        // the same arguments as the `beforeEnter` hook.
        if (route.meta && route.meta.beforeResolve) {
          route.meta.beforeResolve(routeTo, routeFrom, (...args) => {
            // If the user chose to redirect...
            if (args.length) {
              // If redirecting to the same route we're coming from...
              // Complete the redirect.

              next([...args] as const);
              reject(new Error('Redirected'));
            } else {
              resolve();
            }
          });
        } else {
          // Otherwise, continue resolving the route.
          resolve();
        }
      });
    }
    // If a `beforeResolve` hook chose to redirect, just return.
  } catch (error) {
    return;
  }
  document.title = routeTo.meta.title + ' | ' + import.meta.env.VITE_APP_TITLE;
  // If we reach this point, continue resolving the route.
  next();
});


export default router;
