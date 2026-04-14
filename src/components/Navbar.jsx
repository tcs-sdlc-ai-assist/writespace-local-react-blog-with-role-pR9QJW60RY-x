import React from 'react';
import PropTypes from 'prop-types';
import Avatar from './Avatar';
import { getCurrentUser } from '../auth';

export default function Navbar() {
  const user = getCurrentUser();

  // Role-aware links
  const links = [
    { name: 'Dashboard', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'Tasks', href: '/tasks' },
  ];

  if (user && user.role === 'admin') {
    links.push({ name: 'Admin', href: '/admin' });
  }

  return (
    <nav className="w-full bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <span className="text-xl font-bold text-blue-600">WriteSpace</span>
        <div className="hidden md:flex space-x-2">
          {links.map(link => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-700 hover:text-blue-600 px-2 py-1 rounded transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
      <div className="flex items-center space-x-3">
        {user && (
          <>
            <span className="text-sm font-medium text-gray-700 hidden md:block">
              {user.name}
            </span>
            <Avatar name={user.name} avatarUrl={user.avatarUrl} />
          </>
        )}
      </div>
    </nav>
  );
}

Navbar.propTypes = {};