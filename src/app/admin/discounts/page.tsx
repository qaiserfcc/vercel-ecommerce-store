'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, Percent } from 'lucide-react';

export default function AdminDiscountsPage() {
  const [showAddModal, setShowAddModal] = useState(false);

  // Mock data
  const discounts = [
    { id: 1, code: 'SAVE10', name: '10% Off', type: 'percentage', value: 10, usageCount: 45, usageLimit: 100, isActive: true },
    { id: 2, code: 'FLAT50', name: '$50 Off', type: 'fixed', value: 50, usageCount: 12, usageLimit: 50, isActive: true },
    { id: 3, code: 'WELCOME', name: 'Welcome Discount', type: 'percentage', value: 15, usageCount: 234, usageLimit: null, isActive: true },
  ];

  const [formData, setFormData] = useState({
    code: '',
    name: '',
    discountType: 'percentage',
    discountValue: '',
    minPurchaseAmount: '',
    usageLimit: '',
    startDate: '',
    endDate: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating discount:', formData);
    setShowAddModal(false);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-dark mb-2">Discounts & Promotions</h1>
          <p className="text-gray-600">Manage discount codes and promotional campaigns</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          Create Discount
        </button>
      </div>

      {/* Discounts Table */}
      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4 font-semibold">Code</th>
              <th className="text-left p-4 font-semibold">Name</th>
              <th className="text-left p-4 font-semibold">Type</th>
              <th className="text-left p-4 font-semibold">Value</th>
              <th className="text-left p-4 font-semibold">Usage</th>
              <th className="text-left p-4 font-semibold">Status</th>
              <th className="text-left p-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {discounts.map((discount) => (
              <tr key={discount.id} className="border-b hover:bg-gray-50">
                <td className="p-4">
                  <code className="bg-gray-100 px-2 py-1 rounded font-mono text-sm">
                    {discount.code}
                  </code>
                </td>
                <td className="p-4 font-semibold">{discount.name}</td>
                <td className="p-4 capitalize text-gray-600">{discount.type}</td>
                <td className="p-4 font-semibold text-primary">
                  {discount.type === 'percentage' ? `${discount.value}%` : `$${discount.value}`}
                </td>
                <td className="p-4 text-gray-600">
                  {discount.usageCount} / {discount.usageLimit || '∞'}
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-sm ${
                    discount.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {discount.isActive ? 'Active' : 'Inactive'}
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

      {/* Add Discount Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b sticky top-0 bg-white">
              <h2 className="text-2xl font-bold text-dark flex items-center gap-2">
                <Percent className="text-primary" />
                Create New Discount
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Discount Code *</label>
                  <input
                    type="text"
                    name="code"
                    required
                    placeholder="e.g., SAVE10"
                    value={formData.code}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g., 10% Off Coupon"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Discount Type *</label>
                  <select
                    name="discountType"
                    required
                    value={formData.discountType}
                    onChange={handleInputChange}
                    className="input-field"
                  >
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed Amount</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Discount Value *</label>
                  <input
                    type="number"
                    name="discountValue"
                    required
                    step="0.01"
                    placeholder={formData.discountType === 'percentage' ? 'e.g., 10' : 'e.g., 50'}
                    value={formData.discountValue}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Min Purchase Amount</label>
                  <input
                    type="number"
                    name="minPurchaseAmount"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.minPurchaseAmount}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Usage Limit</label>
                  <input
                    type="number"
                    name="usageLimit"
                    placeholder="Leave empty for unlimited"
                    value={formData.usageLimit}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Start Date</label>
                  <input
                    type="datetime-local"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">End Date</label>
                  <input
                    type="datetime-local"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>
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
                  Create Discount
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
