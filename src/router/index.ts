import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/home-view.vue'
import Aboutview from '@/views/todo-view.vue'
import { RouterName } from '@/types/enum-variables'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: RouterName.rootPage,
      redirect: RouterName.firstPage
    },
    {
      path: '/home',
      name: RouterName.firstPage,
      component: HomeView
    },
    {
      path: '/todolist',
      name: RouterName.secondPage,
      component: Aboutview
    }
  ]
})

export default router
