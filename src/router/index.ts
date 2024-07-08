import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/home-view.vue'
import Aboutview from '@/views/todo-view.vue'
import { routerName } from '@/types/enum-variables'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: routerName.rootPage,
      redirect: routerName.firstPage
    },
    {
      path: '/home',
      name: routerName.firstPage,
      component: HomeView
    },
    {
      path: '/todolist',
      name: routerName.secondPage,
      component: Aboutview
    }
  ]
})

export default router
