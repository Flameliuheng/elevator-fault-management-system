import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store/index'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import DeviceManagement from '../views/DeviceManagement.vue' // 设备管理
import UserManagement from '../views/UserManagement.vue' // 用户管理
import Profile from '../views/Profile.vue' // 个人中心

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { 
    path: '/devices', 
    component: DeviceManagement,
    meta: { requiresAuth: true }
  },
  { 
    path: '/users', 
    component: UserManagement,
    meta: { requiresAuth: true, role: 'admin' } // 只有管理员能访问
  },
  {
    path: '/profile',
    component: Profile,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiredRole = to.meta.role

  if (requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (requiresAuth && requiredRole && authStore.role !== requiredRole) {
    // 角色权限不足，重定向到设备管理页面
    next('/devices')
  } else {
    next()
  }
})

export default router