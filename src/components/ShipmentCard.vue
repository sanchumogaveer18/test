<template>
  <div class="shipment-card">
    <div class="card-header">
      <div class="shipment-info">
        <div class="company-icon">
          {{ getCompanyIcon() }}
        </div>
        <div class="shipment-details">
          <h3 class="company-name">{{ shipment.fromName }}</h3>
          <p class="shipment-id">{{ shipment.id }}</p>
        </div>
      </div>
      <div class="shipment-status">
        <span :class="['status-badge', getStatusClass()]">
          {{ shipment.status }}
        </span>
      </div>
    </div>
    
    <div class="card-body">
      <div class="route-info">
        <div class="route-point">
          <div class="route-icon from">📤</div>
          <div class="route-details">
            <span class="route-label">From</span>
            <span class="route-address">{{ shipment.fromAddress }}</span>
            <span class="route-postcode">{{ shipment.fromPostCode }}</span>
          </div>
        </div>
        
        <div class="route-line">
          <div class="route-arrow">→</div>
        </div>
        
        <div class="route-point">
          <div class="route-icon to">📥</div>
          <div class="route-details">
            <span class="route-label">To</span>
            <span class="route-address">{{ shipment.toAddress }}</span>
            <span class="route-postcode">{{ shipment.toPostCode }}</span>
          </div>
        </div>
      </div>
      
      <div class="shipment-meta">
        <div class="meta-item">
          <span class="meta-label">Priority:</span>
          <span :class="['meta-value', getPriorityClass()]">{{ shipment.priority }}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Price:</span>
          <span class="meta-value price">${{ shipment.price.toFixed(2) }}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Delivery:</span>
          <span class="meta-value">{{ formatDate(shipment.estimatedDelivery) }}</span>
        </div>
      </div>
    </div>
    
    <div class="card-footer">
      <div class="assignee-info">
        <div class="assignee-avatar">{{ getAssigneeInitials() }}</div>
        <span class="assignee-name">{{ getAssigneeName() }}</span>
      </div>
      <div class="action-buttons">
        <button class="action-btn track">
          <span class="btn-icon">👁️</span>
          Track
        </button>
        <button class="action-btn contact">
          <span class="btn-icon">💬</span>
          Contact
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Order } from '../types/Order'

const props = defineProps<{
  shipment: Order
}>()

const getCompanyIcon = () => {
  const icons = ['🏢', '🏪', '🏬', '🏭', '🏛️']
  const index = props.shipment.id.charCodeAt(props.shipment.id.length - 1) % icons.length
  return icons[index]
}

const getStatusClass = () => {
  const statusClasses: Record<string, string> = {
    'Processing': 'processing',
    'In transit': 'transit',
    'Out for delivery': 'delivery',
    'Delivered': 'delivered'
  }
  return statusClasses[props.shipment.status] || 'processing'
}

const getPriorityClass = () => {
  return props.shipment.priority.toLowerCase()
}

const getAssigneeInitials = () => {
  const names = ['Brandon', 'Martin', 'Sarah', 'Alex', 'Emma']
  const name = names[props.shipment.id.charCodeAt(4) % names.length]
  return name.substring(0, 2).toUpperCase()
}

const getAssigneeName = () => {
  const names = ['Brandon', 'Martin', 'Sarah', 'Alex', 'Emma']
  return names[props.shipment.id.charCodeAt(4) % names.length]
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}
</script>

<style scoped>
.shipment-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.2s ease;
}

.shipment-card:hover {
  border-color: #14b8a6;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.shipment-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.company-icon {
  width: 48px;
  height: 48px;
  background: #f0fdfa;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.company-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.25rem;
}

.shipment-id {
  color: #64748b;
  font-size: 0.875rem;
}

.status-badge {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

.status-badge.processing {
  background: #fef3c7;
  color: #92400e;
}

.status-badge.transit {
  background: #dbeafe;
  color: #1e40af;
}

.status-badge.delivery {
  background: #fecaca;
  color: #991b1b;
}

.status-badge.delivered {
  background: #dcfce7;
  color: #166534;
}

.card-body {
  margin-bottom: 1.5rem;
}

.route-info {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 8px;
}

.route-point {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.route-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
}

.route-icon.from {
  background: #dbeafe;
}

.route-icon.to {
  background: #dcfce7;
}

.route-details {
  display: flex;
  flex-direction: column;
}

.route-label {
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 500;
  text-transform: uppercase;
}

.route-address {
  font-weight: 500;
  color: #1e293b;
  margin: 0.125rem 0;
}

.route-postcode {
  font-size: 0.875rem;
  color: #64748b;
}

.route-line {
  display: flex;
  justify-content: center;
}

.route-arrow {
  color: #14b8a6;
  font-size: 1.5rem;
  font-weight: bold;
}

.shipment-meta {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
}

.meta-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.meta-label {
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 500;
  text-transform: uppercase;
}

.meta-value {
  font-weight: 600;
  color: #1e293b;
}

.meta-value.standard {
  color: #059669;
}

.meta-value.express {
  color: #dc2626;
}

.meta-value.price {
  color: #14b8a6;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
}

.assignee-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.assignee-avatar {
  width: 32px;
  height: 32px;
  background: #14b8a6;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
}

.assignee-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: #64748b;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 0.75rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  color: #64748b;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: #14b8a6;
  color: white;
  border-color: #14b8a6;
}

.btn-icon {
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .route-info {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .route-line {
    order: 2;
    transform: rotate(90deg);
  }
  
  .shipment-meta {
    grid-template-columns: 1fr;
  }
  
  .card-footer {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>