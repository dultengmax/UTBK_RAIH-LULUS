export type OrderItem = {
  id: string
  name: string
  description: string
  price: number
}

export type PaymentStatus = "pending" | "processing" | "paid" | "expired" | "cancelled"

export type PaymentInstruction = {
  id: string
  text: string
}

export type PaymentInstructionHighlight = {
  match: string
  emphasis: string
}

export type PaymentData = {
  orderId: string
  items: OrderItem[]
  subtotal: number
  discount: number
  serviceFee: number
  total: number
  merchantName: string
  merchantId: string
  expiresAt: Date
}

export type CountdownState = {
  seconds: number
  display: string
  expired: boolean
}
