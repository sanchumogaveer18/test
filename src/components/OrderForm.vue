<template>
  <div class="order-form">
    <div class="form-container">
      <div class="form-header">
        <h2 class="form-title">Create New Shipping Order</h2>
        <p class="form-subtitle">Fill in the details to create your shipment</p>
      </div>
      
      <form @submit.prevent="handleSubmit" class="shipping-form">
        <div class="form-section">
          <h3 class="section-title">
            <span class="section-icon">📤</span>
            Sender Information
          </h3>
          <div class="form-grid">
            <div class="form-group">
              <label for="fromName" class="form-label">From Name *</label>
              <input
                id="fromName"
                v-model="formData.fromName"
                type="text"
                class="form-input"
                placeholder="Enter sender's name"
                required
              />
            </div>
            <div class="form-group">
              <label for="fromPostCode" class="form-label">From Post Code *</label>
              <input
                id="fromPostCode"
                v-model="formData.fromPostCode"
                type="text"
                class="form-input"
                placeholder="e.g., 10001"
                required
              />
            </div>
            <div class="form-group full-width">
              <label for="fromAddress" class="form-label">From Address Line *</label>
              <input
                id="fromAddress"
                v-model="formData.fromAddress"
                type="text"
                class="form-input"
                placeholder="Enter complete sender address"
                required
              />
            </div>
          </div>
        </div>
        
        <div class="form-section">
          <h3 class="section-title">
            <span class="section-icon">📥</span>
            Recipient Information
          </h3>
          <div class="form-grid">
            <div class="form-group">
              <label for="toName" class="form-label">To Name *</label>
              <input
                id="toName"
                v-model="formData.toName"
                type="text"
                class="form-input"
                placeholder="Enter recipient's name"
                required
              />
            </div>
            <div class="form-group">
              <label for="toPostCode" class="form-label">To Post Code *</label>
              <input
                id="toPostCode"
                v-model="formData.toPostCode"
                type="text"
                class="form-input"
                placeholder="e.g., 10002"
                required
              />
            </div>
            <div class="form-group full-width">
              <label for="toAddress" class="form-label">To Address Line *</label>
              <input
                id="toAddress"
                v-model="formData.toAddress"
                type="text"
                class="form-input"
                placeholder="Enter complete recipient address"
                required
              />
            </div>
          </div>
        </div>
        
        <div class="form-section">
          <h3 class="section-title">
            <span class="section-icon">🚚</span>
            Shipping Options
          </h3>
          <div class="shipping-options">
            <div 
              v-for="option in shippingOptions" 
              :key="option.type"
              :class="['shipping-option', { selected: formData.priority === option.type }]"
              @click="selectShippingOption(option)"
            >
              <div class="option-header">
                <div class="option-info">
                  <h4 class="option-name">{{ option.type }}</h4>
                  <p class="option-description">{{ option.description }}</p>
                </div>
                <div class="option-price">${{ option.price.toFixed(2) }}</div>
              </div>
              <div class="option-details">
                <span class="delivery-time">{{ option.deliveryTime }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div v-if="formData.priority" class="order-summary">
          <h3 class="summary-title">Order Summary</h3>
          <div class="summary-content">
            <div class="summary-row">
              <span>Shipping Priority:</span>
              <span class="summary-value">{{ formData.priority }}</span>
            </div>
            <div class="summary-row">
              <span>Delivery Time:</span>
              <span class="summary-value">{{ getSelectedOption()?.deliveryTime }}</span>
            </div>
            <div class="summary-row total">
              <span>Total Cost:</span>
              <span class="summary-value">${{ selectedPrice.toFixed(2) }}</span>
            </div>
          </div>
        </div>
        
        <div class="form-actions">
          <button type="button" @click="$emit('cancel')" class="cancel-btn">
            Cancel
          </button>
          <button type="submit" :disabled="!isFormValid" class="submit-btn">
            <span class="btn-icon">✅</span>
            Create Order
          </button>
        </div>
      </form>
    </div>
    
    <div v-if="showConfirmation" class="confirmation-modal">
      <div class="modal-content">
        <div class="modal-header">
          <div class="success-icon">✅</div>
          <h3 class="modal-title">Order Created Successfully!</h3>
        </div>
        <div class="modal-body">
          <p class="modal-text">
            Your shipping order has been created with ID: <strong>{{ newOrderId }}</strong>
          </p>
          <div class="order-details">
            <div class="detail-row">
              <span>From:</span>
              <span>{{ formData.fromName }} ({{ formData.fromPostCode }})</span>
            </div>
            <div class="detail-row">
              <span>To:</span>
              <span>{{ formData.toName }} ({{ formData.toPostCode }})</span>
            </div>
            <div class="detail-row">
              <span>Priority:</span>
              <span>{{ formData.priority }}</span>
            </div>
            <div class="detail-row">
              <span>Total:</span>
              <span>${{ selectedPrice.toFixed(2) }}</span>
            </div>
          </div>
        </div>
        <div class="modal-actions">
          <button @click="closeConfirmation" class="modal-btn">
            View Shipments
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Order, ShippingOption } from '../types/Order'

const emit = defineEmits<{
  'order-created': [order: Order]
  cancel: []
}>()

const formData = ref({
  fromName: '',
  fromAddress: '',
  fromPostCode: '',
  toName: '',
  toAddress: '',
  toPostCode: '',
  priority: '' as 'Standard' | 'Express' | ''
})

const showConfirmation = ref(false)
const newOrderId = ref('')

const shippingOptions: ShippingOption[] = [
  {
    type: 'Standard',
    price: 15.99,
    description: 'Regular shipping with standard delivery time',
    deliveryTime: '3-5 business days'
  },
  {
    type: 'Express',
    price: 25.99,
    description: 'Priority shipping with faster delivery',
    deliveryTime: '1-2 business days'
  }
]

const selectedPrice = computed(() => {
  const option = shippingOptions.find(opt => opt.type === formData.value.priority)
  return option?.price || 0
})

const isFormValid = computed(() => {
  return formData.value.fromName &&
         formData.value.fromAddress &&
         formData.value.fromPostCode &&
         formData.value.toName &&
         formData.value.toAddress &&
         formData.value.toPostCode &&
         formData.value.priority
})

const selectShippingOption = (option: ShippingOption) => {
  formData.value.priority = option.type
}

const getSelectedOption = () => {
  return shippingOptions.find(opt => opt.type === formData.value.priority)
}

const generateOrderId = () => {
  return 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase()
}

const handleSubmit = () => {
  if (!isFormValid.value) return
  
  newOrderId.value = generateOrderId()
  
  const newOrder: Order = {
    id: newOrderId.value,
    fromName: formData.value.fromName,
    fromAddress: formData.value.fromAddress,
    fromPostCode: formData.value.fromPostCode,
    toName: formData.value.toName,
    toAddress: formData.value.toAddress,
    toPostCode: formData.value.toPostCode,
    priority: formData.value.priority as 'Standard' | 'Express',
    price: selectedPrice.value,
    status: 'Processing',
    createdAt: new Date(),
    estimatedDelivery: new Date(Date.now() + (formData.value.priority === 'Express' ? 2 : 5) * 24 * 60 * 60 * 1000)
  }
  
  showConfirmation.value = true
  setTimeout(() => {
    emit('order-created', newOrder)
  }, 2000)
}

const closeConfirmation = () => {
  showConfirmation.value = false
}
</script>

<style scoped>
.order-form {
  max-width: 800px;
  position: relative;
}

.form-container {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.form-header {
  margin-bottom: 2rem;
  text-align: center;
}

.form-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.form-subtitle {
  color: #64748b;
  font-size: 1rem;
}

.form-section {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e2e8f0;
}

.form-section:last-of-type {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1.5rem;
}

.section-icon {
  font-size: 1.125rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group.full-width {
  grid-column: span 2;
}

.form-label {
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

.form-input {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: #14b8a6;
  box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.1);
}

.shipping-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.shipping-option {
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.shipping-option:hover {
  border-color: #14b8a6;
  transform: translateY(-1px);
}

.shipping-option.selected {
  border-color: #14b8a6;
  background: #f0fdfa;
}

.option-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
}

.option-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.25rem;
}

.option-description {
  color: #64748b;
  font-size: 0.875rem;
}

.option-price {
  font-size: 1.25rem;
  font-weight: 700;
  color: #14b8a6;
}

.delivery-time {
  color: #059669;
  font-size: 0.875rem;
  font-weight: 500;
}

.order-summary {
  background: #f8fafc;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.summary-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  color: #64748b;
}

.summary-row.total {
  border-top: 1px solid #e2e8f0;
  padding-top: 1rem;
  margin-top: 1rem;
  font-weight: 600;
  color: #1e293b;
}

.summary-value {
  font-weight: 500;
  color: #1e293b;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.cancel-btn {
  padding: 0.75rem 1.5rem;
  border: 1px solid #d1d5db;
  background: white;
  color: #6b7280;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.cancel-btn:hover {
  background: #f9fafb;
  border-color: #9ca3af;
}

.submit-btn {
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

.submit-btn:hover:not(:disabled) {
  background: #0f766e;
  transform: translateY(-1px);
}

.submit-btn:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.confirmation-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  animation: slideUp 0.3s ease;
}

.modal-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.success-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
}

.modal-text {
  color: #64748b;
  margin-bottom: 1.5rem;
  text-align: center;
}

.order-details {
  background: #f8fafc;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  color: #64748b;
}

.modal-actions {
  text-align: center;
}

.modal-btn {
  padding: 0.75rem 2rem;
  background: #14b8a6;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.modal-btn:hover {
  background: #0f766e;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { 
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .form-group.full-width {
    grid-column: span 1;
  }
  
  .form-actions {
    flex-direction: column;
  }
}
</style>