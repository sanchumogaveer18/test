<template>
  <div class="shipments">
    <div class="shipments-header">
      <div class="header-left">
        <h2 class="page-title">Shipment Management</h2>
        <p class="page-subtitle">Track and manage all your shipments</p>
      </div>
      <div class="header-stats">
        <div class="stat-item">
          <span class="stat-number">{{ activeShipments.length }}</span>
          <span class="stat-label">Active</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">{{ completedShipments.length }}</span>
          <span class="stat-label">Completed</span>
        </div>
      </div>
    </div>
    
    <div class="shipments-tabs">
      <button 
        :class="['tab-btn', { active: activeTab === 'active' }]"
        @click="activeTab = 'active'"
      >
        Active Shipments
        <span class="tab-count">{{ activeShipments.length }}</span>
      </button>
      <button 
        :class="['tab-btn', { active: activeTab === 'completed' }]"
        @click="activeTab = 'completed'"
      >
        Completed Shipments
        <span class="tab-count">{{ completedShipments.length }}</span>
      </button>
    </div>
    
    <div class="shipments-content">
      <div v-if="activeTab === 'active'" class="shipment-list">
        <div v-if="activeShipments.length === 0" class="empty-state">
          <div class="empty-icon">📦</div>
          <h3 class="empty-title">No Active Shipments</h3>
          <p class="empty-description">Your active shipments will appear here once you create orders</p>
        </div>
        <ShipmentCard 
          v-for="shipment in activeShipments" 
          :key="shipment.id"
          :shipment="shipment"
        />
      </div>
      
      <div v-if="activeTab === 'completed'" class="shipment-list">
        <div v-if="completedShipments.length === 0" class="empty-state">
          <div class="empty-icon">✅</div>
          <h3 class="empty-title">No Completed Shipments</h3>
          <p class="empty-description">Completed shipments will be listed here</p>
        </div>
        <ShipmentCard 
          v-for="shipment in completedShipments" 
          :key="shipment.id"
          :shipment="shipment"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import ShipmentCard from './ShipmentCard.vue'
import type { Order } from '../types/Order'

const props = defineProps<{
  orders: Order[]
}>()

const activeTab = ref<'active' | 'completed'>('active')

const activeShipments = computed(() => {
  return props.orders.filter(order => order.status !== 'Delivered')
})

const completedShipments = computed(() => {
  return props.orders.filter(order => order.status === 'Delivered')
})
</script>

<style scoped>
.shipments {
  max-width: 1200px;
}

.shipments-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
}

.header-left {
  flex: 1;
}

.page-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.page-subtitle {
  color: #64748b;
  font-size: 1rem;
}

.header-stats {
  display: flex;
  gap: 2rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: #14b8a6;
}

.stat-label {
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 500;
}

.shipments-tabs {
  display: flex;
  background: white;
  border-radius: 12px;
  padding: 0.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.tab-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: transparent;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tab-btn:hover {
  background: #f8fafc;
  color: #1e293b;
}

.tab-btn.active {
  background: #14b8a6;
  color: white;
}

.tab-count {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.125rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

.tab-btn.active .tab-count {
  background: rgba(255, 255, 255, 0.3);
}

.shipments-content {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.shipment-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.empty-state {
  text-align: center;
  padding: 3rem 1rem;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.empty-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.empty-description {
  color: #64748b;
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .shipments-header {
    flex-direction: column;
    gap: 1rem;
  }
  
  .header-stats {
    align-self: stretch;
    justify-content: space-around;
  }
  
  .shipments-tabs {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>