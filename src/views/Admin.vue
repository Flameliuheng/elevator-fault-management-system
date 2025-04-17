<template>
    <div>
      <h1>管理员面板</h1>
      <p>欢迎, {{ authStore.user }} (管理员)</p>
      <button @click="authStore.logout()">退出登录</button>
    </div>
  </template>
  
  <script setup>
  import { useAuthStore } from '../store/index'
  const authStore = useAuthStore()
  </script>