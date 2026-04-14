import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Avatar from './Avatar';
import { deleteUser } from '../auth';

export default function UserRow({ user, onDelete }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = async () => {
    if (!window.confirm(`Delete user "${user.name}"? This cannot be undone.`)) return;
    try {
      setLoading(true);
      setError('');
      await deleteUser(user.id);
      if (onDelete) onDelete(user.id);
    } catch (err) {
      setError(err.message || 'Failed to delete user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center px-4 py-3 border-b last:border-b-0 bg-white hover:bg-gray-50 transition">
      <Avatar src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full mr-4" />
      <div className="flex-1">
        <div className="font-semibold text-gray-900">{user.name}</div>
        <div className="text-sm text-gray-500">{user.email}</div>
        {user.role && (
          <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded bg-gray-100 text-gray-700">
            {user.role}
          </span>
        )}
      </div>
      <button
        disabled={loading}
        onClick={handleDelete}
        className={`ml-4 px-3 py-1.5 rounded text-white bg-red-500 hover:bg-red-600 transition ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Deleting...' : 'Delete'}
      </button>
      {error && (
        <div className="ml-4 text-sm text-red-500">{error}</div>
      )}
    </div>
  );
}

UserRow.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func,
};