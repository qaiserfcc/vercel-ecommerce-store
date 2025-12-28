export interface User {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  role: 'customer' | 'admin';
  created_at: string;
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  category?: string;
  sub_category?: string;
  stock_quantity: number;
  image_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  id: number;
  quantity: number;
  price: number;
  product_id: number;
  name: string;
  description?: string;
  image_url?: string;
  stock_quantity: number;
}

export interface Cart {
  id: number;
  items: CartItem[];
  total: string;
}

export interface OrderItem {
  id: number;
  product_id: number;
  product_name: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface Order {
  id: number;
  order_number: string;
  total_amount: number;
  discount_amount: number;
  final_amount: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shipping_address?: string;
  billing_address?: string;
  created_at: string;
  updated_at: string;
  items?: OrderItem[];
  item_count?: number;
}

export interface Discount {
  id: number;
  code: string;
  description?: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  min_order_amount: number;
  max_discount_amount?: number;
  usage_limit?: number;
  used_count: number;
  valid_from?: string;
  valid_until?: string;
  is_active: boolean;
}

export interface Notification {
  id: number;
  user_id: number;
  type: string;
  title?: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  recentOrders: Order[];
  lowStockProducts: Product[];
}
