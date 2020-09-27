import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../App.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from, next) => {
      store.dispatch('getPurchases').then(() => {
        next()
      })
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
