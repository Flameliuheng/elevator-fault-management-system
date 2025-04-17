<template>
    <div class="device-management">
      <h1>电梯设备管理</h1>
      <div class="device-list">
        <!-- 这里显示设备列表 -->
        <div v-for="device in devices" :key="device.id" class="device-card">
          <h3>{{ device.name }}</h3>
          <p>状态: {{ device.status }}</p>
          <p>最后检查: {{ device.lastCheck }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const devices = ref([
    { id: 1, name: '1号电梯', status: '正常运行', lastCheck: '2023-05-15' },
    { id: 2, name: '2号电梯', status: '维护中', lastCheck: '2023-05-10' },
    { id: 3, name: '3号电梯', status: '正常运行', lastCheck: '2023-05-14' }
  ])
  </script>
  
  <style scoped>
  .device-management {
    padding: 20px;
  }
  .device-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }
  .device-card {
    border: 1px solid #ddd;
    padding: 15px;
    border-radius: 8px;
    background: #f9f9f9;
  }
  </style>