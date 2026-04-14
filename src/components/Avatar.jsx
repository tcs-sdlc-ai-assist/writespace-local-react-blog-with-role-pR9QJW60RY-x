import React from 'react';
import PropTypes from 'prop-types';

export function getAvatar(role) {
  if (role === 'admin') {
    return (
      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-lg">
        A
      </span>
    );
  }
  if (role === 'user') {
    return (
      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-500 text-white font-bold text-lg">
        U
      </span>
    );
  }
  // Default avatar for unknown role
  return (
    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-400 text-white font-bold text-lg">
      ?
    </span>
  );
}

getAvatar.propTypes = {
  role: PropTypes.string.isRequired,
};