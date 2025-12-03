export type UserRole = 'user' | 'admin'
export type TransactionType = 'deposit' | 'withdraw' | 'repay'
export type TransactionStatus = 'pending' | 'approved' | 'rejected'

export interface Profile {
  id: string
  user_id: string
  name: string
  phone: string
  phone_pe_upi: string
  date_of_birth: string
  role: UserRole
  approved: boolean
  balance: number
  withdrawal_repayment_due: number
  has_pending_repayment: boolean
  bank_details: Record<string, unknown>
  created_at: string
  updated_at: string
}

export interface Transaction {
  id: string
  user_id: string
  type: TransactionType
  amount: number
  status: TransactionStatus
  reason?: string
  admin_notes?: string
  is_overdraw?: boolean
  overdraw_amount?: number
  repayment_duration?: string
  created_at: string
  updated_at: string
}

export interface Notification {
  id: string
  user_id: string
  title: string
  message: string
  type: string
  is_read: boolean
  created_at: string
}

export interface Message {
  id: string
  sender_id: string
  receiver_id: string
  content: string
  subject?: string
  priority?: string
  is_read: boolean
  created_at: string
}

export interface ChatRoom {
  id: string
  user_id: string
  admin_id: string
  last_message_at: string
  created_at: string
}

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}
