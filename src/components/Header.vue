<template>
  <header class="header">
    <div class="header-content">
      <div class="header-left">
        <h1 class="page-title">{{ getPageTitle() }}</h1>
        <p class="page-subtitle">{{ getPageSubtitle() }}</p>
      </div>
      <div class="header-right">
        <button class="notification-btn">
          <span class="notification-icon">🔔</span>
          <span class="notification-badge">3</span>
        </button>
        <div class="user-profile">
          <div class="user-avatar">JD</div>
          <div class="user-info">
            <span class="user-name">John Doe</span>
            <span class="user-role">Administrator</span>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const props = defineProps<{
  currentView: string
}>()

const getPageTitle = () => {
  const titles: Record<string, string> = {
    dashboard: 'Dashboard',
    orders: 'Orders',
    'order-form': 'Create New Order',
    shipments: 'Shipments',
    customers: 'Customers',
    support: 'Support',
    notifications: 'Notifications',
    settings: 'Settings'
  }
  return titles[props.currentView] || 'Bolt Shipping'
}

const getPageSubtitle = () => {
  const subtitles: Record<string, string> = {
    dashboard: 'Overview of your shipping operations',
    orders: 'Manage your shipping orders',
    'order-form': 'Fill in the details for your new shipment',
    shipments: 'Track active and completed shipments',
    customers: 'Manage customer relationships',
    support: 'Customer support and help desk',
    notifications: 'System alerts and updates',
    settings: 'Application configuration'
  }
  return subtitles[props.currentView] || 'Welcome to Bolt Shipping'
}
</script>

<style scoped>
.header {
  background: white;
  border-bottom: 1px solid #e2e8f0;
  padding: 1.5rem 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  flex: 1;
}

.page-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.25rem;
}

.page-subtitle {
  color: #64748b;
  font-size: 0.875rem;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.notification-btn {
  position: relative;
  background: #f1f5f9;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.notification-btn:hover {
  background: #e2e8f0;
}

.notification-icon {
  font-size: 1.125rem;
}

.notification-badge {
  position: absolute;
  top: -2px;
  right: -2px;
  background: #ef4444;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.125rem 0.375rem;
  border-radius: 10px;
  min-width: 18px;
  text-align: center;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.user-profile:hover {
  background: #f8fafc;
}

.user-avatar {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #14b8a6, #10b981);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: 600;
  font-size: 0.875rem;
  color: #1e293b;
}

.user-role {
  font-size: 0.75rem;
  color: #64748b;
}

@media (max-width: 768px) {
  .header {
    padding: 1rem;
  }
  
  .user-info {
    display: none;
  }
}
</style>