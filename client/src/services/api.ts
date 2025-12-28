import axios, { AxiosInstance, AxiosError } from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add auth token to requests
    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Handle errors
    this.api.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth
  async register(data: any) {
    const response = await this.api.post('/auth/register', data);
    return response.data;
  }

  async login(email: string, password: string) {
    const response = await this.api.post('/auth/login', { email, password });
    return response.data;
  }

  async getProfile() {
    const response = await this.api.get('/auth/profile');
    return response.data;
  }

  async updateProfile(data: any) {
    const response = await this.api.put('/auth/profile', data);
    return response.data;
  }

  async changePassword(oldPassword: string, newPassword: string) {
    const response = await this.api.post('/auth/change-password', {
      oldPassword,
      newPassword,
    });
    return response.data;
  }

  // Products
  async getProducts(filters?: any) {
    const response = await this.api.get('/products', { params: filters });
    return response.data;
  }

  async getProduct(id: number) {
    const response = await this.api.get(`/products/${id}`);
    return response.data;
  }

  async getCategories() {
    const response = await this.api.get('/products/categories');
    return response.data;
  }

  async createProduct(data: any) {
    const response = await this.api.post('/products', data);
    return response.data;
  }

  async updateProduct(id: number, data: any) {
    const response = await this.api.put(`/products/${id}`, data);
    return response.data;
  }

  async deleteProduct(id: number) {
    const response = await this.api.delete(`/products/${id}`);
    return response.data;
  }

  async bulkCreateProducts(products: any[]) {
    const response = await this.api.post('/products/bulk', { products });
    return response.data;
  }

  // Cart
  async getCart() {
    const response = await this.api.get('/cart');
    return response.data;
  }

  async addToCart(productId: number, quantity: number = 1) {
    const response = await this.api.post('/cart/items', { productId, quantity });
    return response.data;
  }

  async updateCartItem(itemId: number, quantity: number) {
    const response = await this.api.put(`/cart/items/${itemId}`, { quantity });
    return response.data;
  }

  async removeFromCart(itemId: number) {
    const response = await this.api.delete(`/cart/items/${itemId}`);
    return response.data;
  }

  async clearCart() {
    const response = await this.api.delete('/cart');
    return response.data;
  }

  // Orders
  async getOrders(filters?: any) {
    const response = await this.api.get('/orders', { params: filters });
    return response.data;
  }

  async getOrder(id: number) {
    const response = await this.api.get(`/orders/${id}`);
    return response.data;
  }

  async createOrder(data: any) {
    const response = await this.api.post('/orders', data);
    return response.data;
  }

  async cancelOrder(id: number) {
    const response = await this.api.post(`/orders/${id}/cancel`);
    return response.data;
  }

  async updateOrderStatus(id: number, status: string) {
    const response = await this.api.put(`/orders/${id}/status`, { status });
    return response.data;
  }

  // Payments
  async createPayment(orderId: number, paymentMethod: string, transactionId?: string) {
    const response = await this.api.post('/payments', {
      orderId,
      paymentMethod,
      transactionId,
    });
    return response.data;
  }

  async processPayment(paymentId: number) {
    const response = await this.api.post(`/payments/${paymentId}/process`);
    return response.data;
  }

  async getPaymentByOrder(orderId: number) {
    const response = await this.api.get(`/payments/order/${orderId}`);
    return response.data;
  }

  // Discounts
  async validateDiscount(code: string, orderAmount: number) {
    const response = await this.api.post('/discounts/validate', {
      code,
      orderAmount,
    });
    return response.data;
  }

  async getDiscounts(filters?: any) {
    const response = await this.api.get('/discounts', { params: filters });
    return response.data;
  }

  async createDiscount(data: any) {
    const response = await this.api.post('/discounts', data);
    return response.data;
  }

  async updateDiscount(id: number, data: any) {
    const response = await this.api.put(`/discounts/${id}`, data);
    return response.data;
  }

  async deleteDiscount(id: number) {
    const response = await this.api.delete(`/discounts/${id}`);
    return response.data;
  }

  // Notifications
  async getNotifications(filters?: any) {
    const response = await this.api.get('/notifications', { params: filters });
    return response.data;
  }

  async getUnreadCount() {
    const response = await this.api.get('/notifications/unread-count');
    return response.data;
  }

  async markAsRead(id: number) {
    const response = await this.api.put(`/notifications/${id}/read`);
    return response.data;
  }

  async markAllAsRead() {
    const response = await this.api.put('/notifications/read-all');
    return response.data;
  }

  async deleteNotification(id: number) {
    const response = await this.api.delete(`/notifications/${id}`);
    return response.data;
  }

  // Admin
  async getDashboard() {
    const response = await this.api.get('/admin/dashboard');
    return response.data;
  }

  async getUsers(filters?: any) {
    const response = await this.api.get('/admin/users', { params: filters });
    return response.data;
  }

  async getAllOrders(filters?: any) {
    const response = await this.api.get('/admin/orders', { params: filters });
    return response.data;
  }

  async getSalesReport(startDate: string, endDate: string) {
    const response = await this.api.get('/admin/reports/sales', {
      params: { startDate, endDate },
    });
    return response.data;
  }

  async getTopProducts(limit?: number) {
    const response = await this.api.get('/admin/reports/top-products', {
      params: { limit },
    });
    return response.data;
  }

  async updateUserRole(id: number, role: string) {
    const response = await this.api.put(`/admin/users/${id}/role`, { role });
    return response.data;
  }

  async deactivateUser(id: number) {
    const response = await this.api.delete(`/admin/users/${id}`);
    return response.data;
  }
}

export default new ApiService();
