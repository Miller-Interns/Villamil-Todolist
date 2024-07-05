import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import Aboutview from '@/views/AboutView.vue'
import { routerName } from '@/types/enum'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
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
