import { createRouter, createWebHistory, type RouteLocationNormalized, type NavigationGuardNext } from 'vue-router'
import { apiClient } from '@/api/apiClient';
import tenantRoutes from '@/app/tenant/routes';
import AppLayout from '@/components/AppLayout.vue';
import LoginView from '@/app/auth/views/LoginView.vue';
import DashboardView from '@/app/dashboard/views/DashboardView.vue';
const appRoutes = [
  // ...inventoryRoutes,
  ...tenantRoutes

]
const authMiddleWare = async (_: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  if (from.name != 'login' && from.name != 'login_owner') {
    try {
      await apiClient.authAuthorize({})
      next()
      return true
    } catch (e: any) {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      localStorage.removeItem('sidebar')
      localStorage.removeItem('roles')
      next('/login')
      return false
    }
  }
  next()
}
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AppLayout,
      redirect: '/dashboard',
      beforeEnter: authMiddleWare,
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: DashboardView,
        },
        ...appRoutes
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
  ]
})

export default router
