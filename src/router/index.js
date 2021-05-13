import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
import { LoadingBar } from 'quasar'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function ({ store }) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach((to, from, next) => {
    LoadingBar.start()

    // Authenticate
    if (to.matched.some(route => route.meta.authRequired)) {
      if (store.getters['auth/isAuth']) {
        next()
      } else {
        store.dispatch('auth/remember')
          .then(() => {
            next()
          })
          .catch(() => {
            LoadingBar.stop()
            next({ name: 'login' })
          })
      }
    } else {
      next()
    }
  })

  Router.afterEach(() => {
    LoadingBar.stop()
  })

  return Router
}
