<template>
    <div class="user-management">
      <h1>用户管理</h1>
      <div class="actions">
        <button @click="showAddUserDialog = true">添加用户</button>
      </div>
      
      <table class="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>用户名</th>
            <th>角色</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.role === 'admin' ? '管理员' : '用户' }}</td>
            <td>{{ user.active ? '活跃' : '禁用' }}</td>
            <td>
              <button @click="editUser(user)">编辑</button>
              <button @click="toggleUserStatus(user)">{{ user.active ? '禁用' : '启用' }}</button>
              <button @click="resetPassword(user)">重置密码</button>
              <button @click="deleteUser(user)" v-if="user.id !== authStore.user?.id">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- 添加用户对话框 -->
      <dialog v-if="showAddUserDialog" open>
        <h3>添加新用户</h3>
        <form @submit.prevent="addUser">
          <div>
            <label>用户名:</label>
            <input v-model="newUser.username" required>
          </div>
          <div>
            <label>密码:</label>
            <input v-model="newUser.password" type="password" required>
          </div>
          <div>
            <label>角色:</label>
            <select v-model="newUser.role">
              <option value="user">用户</option>
              <option value="admin">管理员</option>
            </select>
          </div>
          <div class="dialog-actions">
            <button type="button" @click="showAddUserDialog = false">取消</button>
            <button type="submit">确认</button>
          </div>
        </form>
      </dialog>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useAuthStore } from '../store/index'
  
  const authStore = useAuthStore()
  
  const users = ref([
    { id: 1, username: 'admin1', role: 'admin', active: true },
    { id: 2, username: 'user1', role: 'user', active: true },
    { id: 3, username: 'user2', role: 'user', active: false }
  ])
  
  const showAddUserDialog = ref(false)
  const newUser = ref({
    username: '',
    password: '',
    role: 'user'
  })
  
  const addUser = () => {
    // 这里应该是API调用
    users.value.push({
      id: users.value.length + 1,
      username: newUser.value.username,
      role: newUser.value.role,
      active: true
    })
    showAddUserDialog.value = false
    newUser.value = { username: '', password: '', role: 'user' }
  }
  
  const editUser = (user) => {
    // 实现编辑逻辑
    console.log('编辑用户:', user)
  }
  
  const toggleUserStatus = (user) => {
    user.active = !user.active
    // 这里应该是API调用
  }
  
  const resetPassword = (user) => {
    // 实现重置密码逻辑
    console.log('重置密码:', user)
  }
  
  const deleteUser = (user) => {
    // 这里应该是API调用
    users.value = users.value.filter(u => u.id !== user.id)
  }
  </script>
  
  <style scoped>
  .user-management {
    padding: 20px;
  }
  .user-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  .user-table th, .user-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  .user-table th {
    background-color: #f2f2f2;
  }
  .user-table tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  .actions {
    margin-bottom: 20px;
  }
  dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  .dialog-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 15px;
  }
  </style>