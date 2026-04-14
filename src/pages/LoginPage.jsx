import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setSession } from '../auth';
import { getUserByUsername } from '../storage';

const ADMIN_USER = {
  username: 'admin',
  password: 'admin123',
  role: 'admin',
  name: 'Admin User',
};

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    if (!username.trim() || !password) {
      setError('Please enter both username and password.');
      return;
    }
    setLoading(true);
    try {
      // Check admin user
      if (
        username === ADMIN_USER.username &&
        password === ADMIN_USER.password
      ) {
        setSession({
          username: ADMIN_USER.username,
          role: ADMIN_USER.role,
          name: ADMIN_USER.name,
        });
        navigate('/blogs', { replace: true });
        return;
      }
      // Check localStorage users
      const user = getUserByUsername(username);
      if (!user) {
        setError('User not found.');
        return;
      }
      if (user.password !== password) {
        setError('Incorrect password.');
        return;
      }
      setSession({
        username: user.username,
        role: user.role,
        name: user.name,
      });
      navigate('/blogs', { replace: true });
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">Sign In to WriteSpace</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Username</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={username}
              onChange={e => setUsername(e.target.value)}
              autoFocus
              autoComplete="username"
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
              disabled={loading}
            />
          </div>
          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <div className="mt-6 text-center text-gray-600 text-sm">
          Don't have an account?{' '}
          <a href="/register" className="text-indigo-600 hover:underline">
            Register
          </a>
        </div>
      </div>
    </div>
  );
}