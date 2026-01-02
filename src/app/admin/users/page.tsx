'use client';

import { Users, Shield, User } from 'lucide-react';

export default function AdminUsersPage() {
  // Mock data
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user', orders: 5, joined: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user', orders: 12, joined: '2024-01-10' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'admin', orders: 0, joined: '2024-01-01' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'user', orders: 8, joined: '2024-01-20' },
  ];

  const changeRole = (userId: number, newRole: string) => {
    console.log(`Changing user ${userId} role to ${newRole}`);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-dark mb-2 flex items-center gap-3">
          <Users className="text-primary" size={36} />
          User Management
        </h1>
        <p className="text-gray-600">Manage users and their roles</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="flex items-center gap-4">
            <div className="bg-primary/20 p-3 rounded-lg">
              <Users className="text-primary" size={24} />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Total Users</p>
              <p className="text-3xl font-bold text-dark">{users.length}</p>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-secondary/10 to-secondary/5">
          <div className="flex items-center gap-4">
            <div className="bg-secondary/20 p-3 rounded-lg">
              <User className="text-secondary" size={24} />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Regular Users</p>
              <p className="text-3xl font-bold text-dark">
                {users.filter(u => u.role === 'user').length}
              </p>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="flex items-center gap-4">
            <div className="bg-primary/20 p-3 rounded-lg">
              <Shield className="text-primary" size={24} />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Administrators</p>
              <p className="text-3xl font-bold text-dark">
                {users.filter(u => u.role === 'admin').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4 font-semibold">User</th>
              <th className="text-left p-4 font-semibold">Email</th>
              <th className="text-left p-4 font-semibold">Role</th>
              <th className="text-left p-4 font-semibold">Orders</th>
              <th className="text-left p-4 font-semibold">Joined</th>
              <th className="text-left p-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                      <User className="text-primary" size={20} />
                    </div>
                    <span className="font-semibold">{user.name}</span>
                  </div>
                </td>
                <td className="p-4 text-gray-600">{user.email}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    user.role === 'admin' 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {user.role === 'admin' ? (
                      <><Shield className="inline mr-1" size={14} /> Admin</>
                    ) : (
                      <><User className="inline mr-1" size={14} /> User</>
                    )}
                  </span>
                </td>
                <td className="p-4 text-gray-600">{user.orders} orders</td>
                <td className="p-4 text-gray-600">
                  {new Date(user.joined).toLocaleDateString()}
                </td>
                <td className="p-4">
                  <select
                    value={user.role}
                    onChange={(e) => changeRole(user.id, e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
