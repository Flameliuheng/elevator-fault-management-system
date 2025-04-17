<template>
  <div id="app">
    <nav v-if="authStore.isAuthenticated" class="navbar">
      <div class="nav-left">
        <router-link to="/devices">设备管理</router-link>
        <router-link to="/users" v-if="authStore.role === 'admin'">用户管理</router-link>
      </div>
      <div class="nav-right">
        <div class="user-dropdown">
          <button class="user-btn">
            {{ authStore.user }} ▼
          </button>
          <div class="dropdown-content">
            <router-link to="/profile">个人中心</router-link>
            <button @click="logout">退出登录</button>
          </div>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script setup>
import { useAuthStore } from './store/index'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
}

.navbar {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  background-color: #f8f9fa;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.nav-left {
  display: flex;
  gap: 20px;
}

.nav-left a {
  text-decoration: none;
  color: #2c3e50;
  font-weight: bold;
}

.nav-left a:hover {
  color: #42b983;
}

.user-dropdown {
  position: relative;
  display: inline-block;
}

.user-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 5px 10px;
}

.dropdown-content {
  display: none;
  position: absolute;
  right: 0;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  border-radius: 4px;
}

.dropdown-content a, .dropdown-content button {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
}

.dropdown-content a:hover, .dropdown-content button:hover {
  background-color: #ddd;
}

.user-dropdown:hover .dropdown-content {
  display: block;
}
</style>