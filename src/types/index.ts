export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: 'user' | 'admin';
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  base_price: number;
  category_id?: number;
  category_name?: string;
  brand_id?: number;
  brand_name?: string;
  stock_quantity: number;
  is_bestseller: boolean;
  is_new_arrival: boolean;
  is_featured: boolean;
  primary_image?: string;
  images?: ProductImage[];
  variants?: ProductVariant[];
}

export interface ProductImage {
  id: number;
  product_id: number;
  image_url: string;
  is_primary: boolean;
  display_order: number;
}

export interface ProductVariant {
  id: number;
  product_id: number;
  sku: string;
  variant_name: string;
  price: number;
  stock_quantity: number;
  attributes?: any;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

export interface Brand {
  id: number;
  name: string;
  slug: string;
  logo_url?: string;
  description?: string;
}

export interface CartItem {
  id: number;
  cart_id: number;
  product_id: number;
  variant_id?: number;
  quantity: number;
  price: number;
  name: string;
  slug: string;
  image_url?: string;
  variant_name?: string;
}

export interface Order {
  id: number;
  order_number: string;
  user_id: number;
  total_amount: number;
  discount_amount: number;
  final_amount: number;
  status: string;
  payment_status: string;
  created_at: string;
  items?: OrderItem[];
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  variant_id?: number;
  quantity: number;
  price: number;
  subtotal: number;
  name: string;
  image_url?: string;
}

export interface Discount {
  id: number;
  code: string;
  name: string;
  description?: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  min_purchase_amount: number;
  max_discount_amount?: number;
  is_active: boolean;
}

export interface Address {
  id: number;
  user_id: number;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default: boolean;
}

export interface Bundle {
  id: number;
  name: string;
  slug: string;
  description?: string;
  price: number;
  discount_percentage: number;
  is_active: boolean;
  items?: BundleItem[];
}

export interface BundleItem {
  id: number;
  bundle_id: number;
  product_id: number;
  quantity: number;
  name: string;
  base_price: number;
  image_url?: string;
}
