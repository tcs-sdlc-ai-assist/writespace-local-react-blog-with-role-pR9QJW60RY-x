import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import UserRow from '../UserRow';
import { getSession, getUserRole } from '../auth';
import { getAllUsers, createUser, deleteUser } from '../storage';

const initialForm = {
  name: '',
  email: '',
  role: 'user',
  password: '',
};

export default function UserManagement() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const session = getSession();
    if (!session || getUserRole() !== 'admin') {
      navigate('/login');
      return;
    }
    try {
      setUsers(getAllUsers());
    } catch (err) {
      setUsers([]);
      setError('Failed to load users.');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreate = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      setError('All fields are required.');
      return;
    }
    try {
      createUser({
        ...form,
      });
      setUsers(getAllUsers());
      setForm(initialForm);
      setSuccess('User created successfully.');
    } catch (err) {
      setError('Failed to create user.');
    }
  };

  const handleDelete = (userId) => {
    if (window.confirm('Delete this user?')) {
      try {
        deleteUser(userId);
        setUsers(getAllUsers());
        setSuccess('User deleted.');
      } catch (err) {
        setError('Failed to delete user.');
      }
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div className="text-lg text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-6">User Management</h1>
        <form
          className="bg-white rounded-lg shadow p-6 mb-8"
          onSubmit={handleCreate}
        >
          <h2 className="text-xl font-semibold mb-4">Create New User</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block font-semibold mb-1" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-1" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-1" htmlFor="role">
                Role
              </label>
              <select
                id="role"
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
          </div>
          {error && <div className="text-red-500 mb-2">{error}</div>}
          {success && <div className="text-green-600 mb-2">{success}</div>}
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Create User
          </button>
        </form>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">All Users</h2>
          <div className="divide-y">
            {users.length === 0 ? (
              <div className="text-gray-500">No users found.</div>
            ) : (
              users.map((user) => (
                <UserRow
                  key={user.id}
                  user={user}
                  onDelete={() => handleDelete(user.id)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}