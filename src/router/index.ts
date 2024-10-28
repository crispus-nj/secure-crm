import {
  createRouter,
  createWebHistory,
  type NavigationGuardNext,
  type RouteLocationNormalized,
} from 'vue-router'
import BaseLayoutView from '@/components/layout/BaseLayout.vue'
import { userStore } from '@/stores/user'

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
      beforeEnter: (to, from, next) => {
        const store = userStore()
        console.log('Checking authentication for route:', to.name)
        if (store.isAuthenticated) {
          next() // Proceed to the route
        } else {
          console.log('User is not authenticated, redirecting to Login')
          next({ name: 'Login' }) // Redirect to Login
        }
      },
      children: [
        { path: '/', name: 'Dashboard', component: DashboardView },
        { path: '/users', name: 'Users', component: UsersView },
        { path: '/projects', name: 'Projects', component: ProjectsView },
        { path: '/events', name: 'Events', component: EventsView },
        { path: '/rbac', name: 'Roles And Permissions', component: RBACView },
      ],
    },
    {
      path: '/auth/login',
      name: 'Login',
      component: LoginView,
      beforeEnter: (to, from, next) => {
        const store = userStore()
        console.log('Checking authentication for Login route:', to.name)
        console.log(store.isAuthenticated, 'store.isAuthenticated')
        if (store.isAuthenticated) {
          console.log('User is authenticated, redirecting to Dashboard')
          next({ name: 'Dashboard' }) // Redirect to Dashboard if authenticated
        } else {
          next() // Proceed to Login
        }
      },
    },
    {
      path: '/auth/register',
      name: 'Register',
      component: RegisterView,
      beforeEnter: (to, from, next) => {
        const store = userStore()
        if (store.isAuthenticated) {
          next({ name: 'Dashboard' }) // Redirect to Dashboard if authenticated
        } else {
          next() // Proceed to Register
        }
      },
    },
  ],
})

export default router
