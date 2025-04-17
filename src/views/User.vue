<template>
    <div>
      <h1>用户面板</h1>
      <p>欢迎, {{ authStore.user }} (普通用户)</p>
      <button @click="authStore.logout()">退出登录</button>
    </div>
  </template>
  
  <script setup>
  import { useAuthStore } from '../store/index'
  const authStore = useAuthStore()
  </script>