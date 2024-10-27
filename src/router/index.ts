import { createRouter, createWebHistory } from 'vue-router'
import BaseLayoutView from '@/components/layout/BaseLayout.vue'

const LoginView = () => import('@/views/auth/LoginView.vue')
const DashboardView = () => import('@/views/dashboard/Dashboard.vue')
const UsersView = () => import('@/views/dashboard/Dashboard.vue')
const EventsView = () => import('@/views/dashboard/Dashboard.vue')
const ProjectsView = () => import('@/views/dashboard/Dashboard.vue')
const RBACView = () => import('@/views/dashboard/Dashboard.vue')

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
        {
          path: '/users',
          name: 'Users',
          component: UsersView,
        },
        {
          path: '/projects',
          name: 'Projects',
          component: ProjectsView,
        },
        {
          path: '/events',
          name: 'Events',
          component: EventsView,
        },
        {
          path: '/rbac',
          name: 'Roles And Permissions',
          component: RBACView,
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
