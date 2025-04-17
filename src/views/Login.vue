<template>
  <div class="login-container">
    <h2>电梯故障管理系统登录</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label>用户名:</label>
        <input v-model="username" type="text" required>
      </div>
      <div class="form-group">
        <label>密码:</label>
        <input v-model="password" type="password" required>
      </div>
      <button type="submit">登录</button>
    </form>
    <p class="register-link">还没有账号？<router-link to="/register">注册</router-link></p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/index'

const router = useRouter()
const authStore = useAuthStore()

const username = ref('')
const password = ref('')

const handleLogin = () => {
  // 模拟不同角色的登录
  let role = 'user'
  if (username.value.startsWith('admin')) {
    role = 'admin'
  }
  
  authStore.login({
    username: username.value,
    role: role
  })
  
  // 登录后跳转到设备管理页面
  router.push('/devices')
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 100px auto;
  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
}

button:hover {
  background-color: #3aa876;
}

.register-link {
  text-align: center;
  margin-top: 20px;
}

.register-link a {
  color: #42b983;
  text-decoration: none;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>