<template>
  <div class="orders">
    <div class="orders-header">
      <div class="header-left">
        <h2 class="page-title">Orders Management</h2>
        <p class="page-subtitle">Create and manage your shipping orders</p>
      </div>
      <button class="create-btn" @click="$emit('create-order')">
        <span class="btn-icon">➕</span>
        Create New Order
      </button>
    </div>
    
    <div class="orders-content">
      <div class="empty-state">
        <div class="empty-icon">📦</div>
        <h3 class="empty-title">Ready to Ship?</h3>
        <p class="empty-description">
          Create your first shipping order to get started with Bolt Shipping. 
          Our platform makes it easy to manage all your shipments in one place.
        </p>
        <button class="primary-btn" @click="$emit('create-order')">
          <span class="btn-icon">🚀</span>
          Create Your First Order
        </button>
      </div>
      
      <div class="feature-cards">
        <div class="feature-card">
          <div class="feature-icon">⚡</div>
          <h4 class="feature-title">Fast Processing</h4>
          <p class="feature-description">Orders processed within 2 hours during business days</p>
        </div>
        
        <div class="feature-card">
          <div class="feature-icon">🌍</div>
          <h4 class="feature-title">Global Reach</h4>
          <p class="feature-description">Ship anywhere in the world with our partner network</p>
        </div>
        
        <div class="feature-card">
          <div class="feature-icon">📱</div>
          <h4 class="feature-title">Real-time Tracking</h4>
          <p class="feature-description">Track your packages every step of the way</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  'create-order': []
}>()
</script>

<style scoped>
.orders {
  max-width: 1200px;
}

.orders-header {
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

.create-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #14b8a6;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.create-btn:hover {
  background: #0f766e;
  transform: translateY(-1px);
}

.btn-icon {
  font-size: 1rem;
}

.orders-content {
  background: white;
  border-radius: 12px;
  padding: 3rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.empty-state {
  margin-bottom: 3rem;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.empty-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
}

.empty-description {
  color: #64748b;
  font-size: 1rem;
  line-height: 1.6;
  max-width: 500px;
  margin: 0 auto 2rem;
}

.primary-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #14b8a6, #10b981);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.primary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(20, 184, 166, 0.3);
}

.feature-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.feature-card {
  background: #f8fafc;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  transition: transform 0.2s ease;
}

.feature-card:hover {
  transform: translateY(-2px);
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.feature-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.feature-description {
  color: #64748b;
  font-size: 0.875rem;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .orders-header {
    flex-direction: column;
    gap: 1rem;
  }
  
  .orders-content {
    padding: 2rem 1rem;
  }
  
  .feature-cards {
    grid-template-columns: 1fr;
  }
}
</style>