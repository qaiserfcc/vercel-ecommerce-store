'use client';

import { useState } from 'react';
import { User, MapPin, Phone, Mail, Save } from 'lucide-react';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
  });

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      addressLine1: '123 Main Street',
      addressLine2: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'United States',
      isDefault: true,
    },
  ]);

  const [newAddress, setNewAddress] = useState({
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States',
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const saveProfile = () => {
    console.log('Saving profile:', profileData);
    alert('Profile updated successfully!');
  };

  const addAddress = () => {
    const id = addresses.length + 1;
    setAddresses([...addresses, { ...newAddress, id, isDefault: false }]);
    setNewAddress({
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'United States',
    });
    alert('Address added successfully!');
  };

  const deleteAddress = (id: number) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-dark mb-2 flex items-center gap-3">
          <User className="text-primary" size={36} />
          My Profile
        </h1>
        <p className="text-gray-600">Manage your account settings and addresses</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="card">
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full text-left px-4 py-3 rounded-lg transition ${
                  activeTab === 'profile'
                    ? 'bg-primary text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                <User className="inline mr-2" size={20} />
                Profile Information
              </button>
              <button
                onClick={() => setActiveTab('addresses')}
                className={`w-full text-left px-4 py-3 rounded-lg transition ${
                  activeTab === 'addresses'
                    ? 'bg-primary text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                <MapPin className="inline mr-2" size={20} />
                Addresses
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="card">
              <h2 className="text-2xl font-bold text-dark mb-6">Profile Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    <User className="inline mr-1" size={16} />
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleProfileChange}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    <User className="inline mr-1" size={16} />
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={handleProfileChange}
                    className="input-field"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">
                  <Mail className="inline mr-1" size={16} />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                  className="input-field"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">
                  <Phone className="inline mr-1" size={16} />
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleProfileChange}
                  className="input-field"
                />
              </div>

              <button onClick={saveProfile} className="btn-primary">
                <Save className="inline mr-2" size={20} />
                Save Changes
              </button>
            </div>
          )}

          {/* Addresses Tab */}
          {activeTab === 'addresses' && (
            <div className="space-y-6">
              {/* Existing Addresses */}
              <div className="card">
                <h2 className="text-2xl font-bold text-dark mb-6">Saved Addresses</h2>

                <div className="space-y-4">
                  {addresses.map((address) => (
                    <div key={address.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          {address.isDefault && (
                            <span className="bg-primary text-white text-xs px-2 py-1 rounded mb-2 inline-block">
                              Default
                            </span>
                          )}
                          <p className="font-semibold">{address.addressLine1}</p>
                          {address.addressLine2 && <p>{address.addressLine2}</p>}
                          <p>
                            {address.city}, {address.state} {address.postalCode}
                          </p>
                          <p>{address.country}</p>
                        </div>
                        <button
                          onClick={() => deleteAddress(address.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add New Address */}
              <div className="card">
                <h2 className="text-2xl font-bold text-dark mb-6">Add New Address</h2>

                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2">Address Line 1 *</label>
                  <input
                    type="text"
                    name="addressLine1"
                    value={newAddress.addressLine1}
                    onChange={handleAddressChange}
                    className="input-field"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2">Address Line 2</label>
                  <input
                    type="text"
                    name="addressLine2"
                    value={newAddress.addressLine2}
                    onChange={handleAddressChange}
                    className="input-field"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={newAddress.city}
                      onChange={handleAddressChange}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">State *</label>
                    <input
                      type="text"
                      name="state"
                      value={newAddress.state}
                      onChange={handleAddressChange}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Postal Code *</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={newAddress.postalCode}
                      onChange={handleAddressChange}
                      className="input-field"
                    />
                  </div>
                </div>

                <button onClick={addAddress} className="btn-primary">
                  Add Address
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
