import { createRouter, createWebHistory } from 'vue-router'
import BaseLayoutView from '@/components/layout/BaseLayout.vue'

const LoginView = () => import('@/views/auth/LoginView.vue')
const DashboardView = () => import('@/views/dashboard/Dashboard.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: BaseLayoutView,
      children: [
        {
          path: '/',
          name: 'Dashboard',
          component: DashboardView,
        },
      ],
    },
    {
      path: '/auth/login',
      name: 'Login',
      component: LoginView,
    },
  ],
})

export default router
