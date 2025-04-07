

import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: BaseAppIcon,
    },
    {
      path: '/form',
      component: AppForm,
    },

    {
      path: '/',
      component: BaseAppBtn,
    },

    {
      path: '/user/:id',
      name: 'user_find',
      component: BaseAppBtn,
    }
  ]
})

export default router
