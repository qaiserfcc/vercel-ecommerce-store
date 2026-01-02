'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, Search, Upload } from 'lucide-react';

export default function AdminProductsPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - will be replaced with API calls
  const products = [
    { id: 1, name: 'Wireless Headphones', category: 'Electronics', brand: 'TechPro', price: 99.99, stock: 45, status: 'active' },
    { id: 2, name: 'Smart Watch', category: 'Electronics', brand: 'SmartGadgets', price: 199.99, stock: 23, status: 'active' },
    { id: 3, name: 'Laptop Stand', category: 'Home & Office', brand: 'EcoLife', price: 49.99, stock: 67, status: 'active' },
    { id: 4, name: 'USB-C Hub', category: 'Accessories', brand: 'TechPro', price: 39.99, stock: 89, status: 'active' },
  ];

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    basePrice: '',
    categoryId: '',
    brandId: '',
    stockQuantity: '',
    isBestseller: false,
    isNewArrival: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating product:', formData);
    setShowAddModal(false);
    // Reset form
    setFormData({
      name: '',
      slug: '',
      description: '',
      basePrice: '',
      categoryId: '',
      brandId: '',
      stockQuantity: '',
      isBestseller: false,
      isNewArrival: false,
    });
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-dark mb-2">Products Management</h1>
          <p className="text-gray-600">Manage your product catalog</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={20} />
            Add Product
          </button>
          <button className="btn-secondary flex items-center gap-2">
            <Upload size={20} />
            Bulk Upload
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="card mb-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 input-field"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg">
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Accessories</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg">
            <option>All Brands</option>
            <option>TechPro</option>
            <option>SmartGadgets</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4 font-semibold">Product</th>
              <th className="text-left p-4 font-semibold">Category</th>
              <th className="text-left p-4 font-semibold">Brand</th>
              <th className="text-left p-4 font-semibold">Price</th>
              <th className="text-left p-4 font-semibold">Stock</th>
              <th className="text-left p-4 font-semibold">Status</th>
              <th className="text-left p-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="p-4">
                  <div className="font-semibold">{product.name}</div>
                </td>
                <td className="p-4 text-gray-600">{product.category}</td>
                <td className="p-4 text-gray-600">{product.brand}</td>
                <td className="p-4 font-semibold text-primary">${product.price}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-sm ${
                    product.stock > 50 ? 'bg-green-100 text-green-700' :
                    product.stock > 20 ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {product.stock}
                  </span>
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm capitalize">
                    {product.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                      <Edit size={18} />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b sticky top-0 bg-white">
              <h2 className="text-2xl font-bold text-dark">Add New Product</h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Product Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Slug *</label>
                  <input
                    type="text"
                    name="slug"
                    required
                    value={formData.slug}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="input-field"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Price *</label>
                  <input
                    type="number"
                    name="basePrice"
                    required
                    step="0.01"
                    value={formData.basePrice}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Stock Quantity *</label>
                  <input
                    type="number"
                    name="stockQuantity"
                    required
                    value={formData.stockQuantity}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Category</label>
                  <select
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleInputChange}
                    className="input-field"
                  >
                    <option value="">Select Category</option>
                    <option value="1">Electronics</option>
                    <option value="2">Accessories</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Brand</label>
                  <select
                    name="brandId"
                    value={formData.brandId}
                    onChange={handleInputChange}
                    className="input-field"
                  >
                    <option value="">Select Brand</option>
                    <option value="1">TechPro</option>
                    <option value="2">SmartGadgets</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4 mb-6">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="isBestseller"
                    checked={formData.isBestseller}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-semibold">Bestseller</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="isNewArrival"
                    checked={formData.isNewArrival}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-semibold">New Arrival</span>
                </label>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 btn-outline"
                >
                  Cancel
                </button>
                <button type="submit" className="flex-1 btn-primary">
                  Create Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
