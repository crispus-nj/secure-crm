import { createRouter, createWebHistory } from 'vue-router'
import BaseLayoutView from '@/components/layout/BaseLayout.vue'

const LoginView = () => import('@/views/auth/LoginView.vue')
const RegisterView = () => import('@/views/auth/Register.vue')
const DashboardView = () => import('@/views/dashboard/Dashboard.vue')
const UsersView = () => import('@/views/users/User.vue')
const EventsView = () => import('@/views/events/Events.vue')
const ProjectsView = () => import('@/views/projects/Projects.vue')
const RBACView = () => import('@/views/rbac/Rbac.vue')

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
    {
      path: '/auth/register',
      name: 'register',
      component: RegisterView,
    },
  ],
})

export default router
