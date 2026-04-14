import React from 'react';
import PropTypes from 'prop-types';

export default function PublicNavbar() {
  return (
    <nav className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl text-gray-900 tracking-tight">writespace</span>
        </a>
        {/* Links */}
        <div className="flex items-center space-x-4">
          <a
            href="/login"
            className="text-gray-700 hover:text-blue-600 transition font-medium px-3 py-2 rounded"
          >
            Log in
          </a>
          <a
            href="/register"
            className="bg-blue-600 text-white font-semibold px-4 py-2 rounded shadow hover:bg-blue-700 transition"
          >
            Get Started
          </a>
        </div>
      </div>
    </nav>
  );
}

PublicNavbar.propTypes = {};