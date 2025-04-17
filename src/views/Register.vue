<template>
  <div class="register-container">
    <h2>注册新账号</h2>
    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <label>用户名:</label>
        <input v-model="username" type="text" required>
        <small v-if="username.startsWith('admin')">管理员账号需要特殊权限</small>
      </div>
      <div class="form-group">
        <label>密码:</label>
        <input v-model="password" type="password" required>
      </div>
      <div class="form-group">
        <label>确认密码:</label>
        <input v-model="confirmPassword" type="password" required>
      </div>
      <button type="submit">注册</button>
    </form>
    <p class="login-link">已有账号？<router-link to="/login">登录</router-link></p>
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
const confirmPassword = ref('')

const handleRegister = () => {
  if (password.value !== confirmPassword.value) {
    alert('两次密码不一致')
    return
  }
  
  // 这里应该是API调用
  alert('注册成功，请登录')
  router.push('/login')
}
</script>

<style scoped>
.register-container {
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

small {
  color: #666;
  font-size: 12px;
  display: block;
  margin-top: 5px;
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

.login-link {
  text-align: center;
  margin-top: 20px;
}

.login-link a {
  color: #42b983;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>