<template>
    <div class="profile">
      <h1>个人中心</h1>
      <div class="profile-info">
        <div>
          <label>用户名:</label>
          <span>{{ authStore.user }}</span>
        </div>
        <div>
          <label>角色:</label>
          <span>{{ authStore.role === 'admin' ? '管理员' : '用户' }}</span>
        </div>
      </div>
      
      <h2>修改密码</h2>
      <form @submit.prevent="changePassword">
        <div>
          <label>旧密码:</label>
          <input v-model="password.old" type="password" required>
        </div>
        <div>
          <label>新密码:</label>
          <input v-model="password.new" type="password" required>
        </div>
        <div>
          <label>确认新密码:</label>
          <input v-model="password.confirm" type="password" required>
        </div>
        <button type="submit">修改密码</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useAuthStore } from '../store/index'
  import { useRouter } from 'vue-router'
  
  const authStore = useAuthStore()
  const router = useRouter()
  
  const password = ref({
    old: '',
    new: '',
    confirm: ''
  })
  
  const changePassword = () => {
    if (password.value.new !== password.value.confirm) {
      alert('两次输入的新密码不一致')
      return
    }
    
    // 这里应该是API调用
    alert('密码修改成功')
    password.value = { old: '', new: '', confirm: '' }
  }
  </script>
  
  <style scoped>
  .profile {
    padding: 20px;
    max-width: 600px;
    margin: 0 auto;
  }
  .profile-info {
    margin-bottom: 30px;
  }
  .profile-info div {
    margin-bottom: 10px;
  }
  .profile-info label {
    display: inline-block;
    width: 100px;
    font-weight: bold;
  }
  form div {
    margin-bottom: 15px;
  }
  form label {
    display: inline-block;
    width: 100px;
  }
  form input {
    padding: 5px;
    width: 200px;
  }
  button {
    padding: 8px 15px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  button:hover {
    background-color: #45a049;
  }
  </style>