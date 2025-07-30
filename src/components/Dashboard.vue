<template>
  <div class="dashboard">
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon orders">📦</div>
        <div class="stat-content">
          <h3 class="stat-number">1,247</h3>
          <p class="stat-label">Total Orders</p>
          <span class="stat-change positive">+12% from last month</span>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon revenue">💰</div>
        <div class="stat-content">
          <h3 class="stat-number">$24,580</h3>
          <p class="stat-label">Revenue</p>
          <span class="stat-change positive">+8% from last month</span>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon active">🚚</div>
        <div class="stat-content">
          <h3 class="stat-number">89</h3>
          <p class="stat-label">Active Shipments</p>
          <span class="stat-change negative">-3% from last week</span>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon customers">👥</div>
        <div class="stat-content">
          <h3 class="stat-number">2,156</h3>
          <p class="stat-label">Customers</p>
          <span class="stat-change positive">+25% from last month</span>
        </div>
      </div>
    </div>
    
    <div class="dashboard-content">
      <div class="quick-actions">
        <h2 class="section-title">Quick Actions</h2>
        <div class="actions-grid">
          <button class="action-btn primary" @click="$emit('navigate', 'order-form')">
            <span class="action-icon">➕</span>
            <span>Create New Order</span>
          </button>
          <button class="action-btn" @click="$emit('navigate', 'shipments')">
            <span class="action-icon">📋</span>
            <span>View Shipments</span>
          </button>
          <button class="action-btn" @click="$emit('navigate', 'customers')">
            <span class="action-icon">👥</span>
            <span>Manage Customers</span>
          </button>
        </div>
      </div>
      
      <div class="recent-activity">
        <h2 class="section-title">Recent Activity</h2>
        <div class="activity-list">
          <div class="activity-item">
            <div class="activity-icon delivered">✅</div>
            <div class="activity-content">
              <p class="activity-text">Order #ORD-001 delivered to Brandon</p>
              <span class="activity-time">2 hours ago</span>
            </div>
          </div>
          <div class="activity-item">
            <div class="activity-icon transit">🚛</div>
            <div class="activity-content">
              <p class="activity-text">Order #ORD-002 is out for delivery</p>
              <span class="activity-time">4 hours ago</span>
            </div>
          </div>
          <div class="activity-item">
            <div class="activity-icon created">📦</div>
            <div class="activity-content">
              <p class="activity-text">New order #ORD-003 created</p>
              <span class="activity-time">6 hours ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  navigate: [view: string]
}>()
</script>

<style scoped>
.dashboard {
  max-width: 1200px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.stat-icon.orders { background: #dbeafe; }
.stat-icon.revenue { background: #dcfce7; }
.stat-icon.active { background: #fef3c7; }
.stat-icon.customers { background: #ede9fe; }

.stat-content {
  flex: 1;
}

.stat-number {
  font-size: 1.875rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.25rem;
}

.stat-label {
  color: #64748b;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

.stat-change {
  font-size: 0.75rem;
  font-weight: 600;
}

.stat-change.positive { color: #059669; }
.stat-change.negative { color: #dc2626; }

.dashboard-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
}

.quick-actions {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.actions-grid {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
  text-align: left;
}

.action-btn:hover {
  border-color: #14b8a6;
  transform: translateY(-1px);
}

.action-btn.primary {
  background: #14b8a6;
  color: white;
  border-color: #14b8a6;
}

.action-btn.primary:hover {
  background: #0f766e;
}

.action-icon {
  font-size: 1.125rem;
}

.recent-activity {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 8px;
  transition: background-color 0.2s ease;
}

.activity-item:hover {
  background: #f8fafc;
}

.activity-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
}

.activity-icon.delivered { background: #dcfce7; }
.activity-icon.transit { background: #fef3c7; }
.activity-icon.created { background: #dbeafe; }

.activity-content {
  flex: 1;
}

.activity-text {
  color: #1e293b;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}

.activity-time {
  color: #64748b;
  font-size: 0.75rem;
}

@media (max-width: 768px) {
  .dashboard-content {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>