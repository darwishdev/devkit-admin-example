import { createRouter, createWebHistory, type RouteLocationNormalized, type NavigationGuardNext } from 'vue-router'
import { apiClient } from '@/api/apiClient';
import tenantRoutes from '@/app/tenant/routes';
const appRoutes = [
  // ...inventoryRoutes,
  ...tenantRoutes

]
const authMiddleWare = async (_: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  if (from.name != 'login' && from.name != 'login_owner') {
    try {
        await apiClient.userAuthorize({})
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
      children: appRoutes
    },
    {

      path: '/login',
      name: 'login',
      component: UserLogin
    },
    {
      path: '/owner/register',
      name: 'owner_register',
      component: OwnerRegister
    }
  ]
})

export default router
