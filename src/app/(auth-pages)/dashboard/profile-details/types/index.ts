export interface ProfileResponse {
  statusCode: number
  success: boolean
  message?: string
  data: UserProfile
}

export interface UserProfile {
  _id: string
  full_name: string
  email: string
  role: string
  status: string
  is_verified_number: boolean
  favorite_items: FavoriteItem[]
  available_coins: number
  total_orders: number
  pending_orders: number
  completed_orders: number
  returned_orders: number
  cancelled_orders: number
  used_coins_history: CoinHistory[]
  claimed_coins: ClaimedCoin[]
  createdAt: string
  updatedAt: string
  id: string
}

export interface FavoriteItem {
  id: string
  name: string
  image?: string
  price?: number
}

export interface CoinHistory {
  id: string
  amount: number
  description: string
  date: string
  order_id?: string
}

export interface ClaimedCoin {
  id: string
  amount: number
  source: string
  date: string
}
