export interface Order {
  id: string
  fromName: string
  fromAddress: string
  fromPostCode: string
  toName: string
  toAddress: string
  toPostCode: string
  priority: 'Standard' | 'Express'
  price: number
  status: 'Processing' | 'In transit' | 'Out for delivery' | 'Delivered'
  createdAt: Date
  estimatedDelivery: Date
}

export interface ShippingOption {
  type: 'Standard' | 'Express'
  price: number
  description: string
  deliveryTime: string
}