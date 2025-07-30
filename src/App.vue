<template>
  <div class="app">
    <Sidebar :currentView="currentView" @navigate="handleNavigation" />
    <main class="main-content">
      <Header :currentView="currentView" />
      <div class="content-area">
        <Dashboard v-if="currentView === 'dashboard'" />
        <Orders v-if="currentView === 'orders'" @create-order="showOrderForm" />
        <OrderForm 
          v-if="currentView === 'order-form'" 
          @order-created="handleOrderCreated"
          @cancel="currentView = 'orders'"
        />
        <Shipments v-if="currentView === 'shipments'" :orders="orders" />
      </div>
    </main>
  </div>
</template>

ript setup lang="ts">


import Dashboard from './components/Dashboard.vue'
import Orders from './components/Orders.vue'
import OrderForm from './components/OrderForm.vue'
import Shipments from './components/Shipments.vue'
import type { Order } from './types/Order'

const currentView = ref('dashboard')
const orders = reactive<Order[]>([
  {
    id: 'ORD-001',
    fromName: 'Leader Book Chain',
    fromAddress: 'Main Street 123',
    fromPostCode: '10001',
    toName: 'Brandon',
    toAddress: 'Park Avenue 456',
    toPostCode: '10002',
    priority: 'Express',
    price: 25.99,
    status: 'Out for delivery',
    createdAt: new Date('2024-01-15'),
    estimatedDelivery: new Date('2024-01-16')
  },
  {
    id: 'ORD-002',
    fromName: 'Best Rockers AJS',
    fromAddress: 'Rock Street 789',
    fromPostCode: '10003',
    toName: 'Martin',
    toAddress: 'Music Lane 321',
    toPostCode: '10004',
    priority: 'Standard',
    price: 15.99,
    status: 'In transit',
    createdAt: new Date('2024-01-14'),
    estimatedDelivery: new Date('2024-01-18')
  },
  {
    id: 'ORD-003',
    fromName: 'Savella Fashion',
    fromAddress: 'Fashion Ave 555',
    fromPostCode: '10005',
    toName: 'Brandon',
    toAddress: 'Style Street 777',
    toPostCode: '10006',
    priority: 'Express',
    price: 29.99,
    status: 'Delivered',
    createdAt: new Date('2024-01-10'),
    estimatedDelivery: new Date('2024-01-12')
  }
])

const handleNavigation = (view: string) => {
  currentView.value = view
}

const showOrderForm = () => {
  currentView.value = 'order-form'
}

const handleOrderCreated = (order: Order) => {
  orders.push(order)
  currentView.value = 'shipments'
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background-color: #f8fafc;
  color: #1e293b;
}

.app {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 280px;
  transition: margin-left 0.3s ease;
}

.content-area {
  flex: 1;
  padding: 2rem;
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
  }
}
</style>
