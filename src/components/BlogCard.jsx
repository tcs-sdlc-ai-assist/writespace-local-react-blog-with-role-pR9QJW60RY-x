import React from 'react';
import PropTypes from 'prop-types';
import Avatar from './Avatar';
import { getCurrentUser } from '../auth';

/**
 * BlogCard component displays a blog post summary with controls for editing/deleting
 * if the current user is the author or has admin role.
 */
export default function BlogCard({
  title,
  excerpt,
  date,
  author,
  onEdit,
  onDelete,
  showControls,
}) {
  const currentUser = getCurrentUser();

  // Determine if edit/delete controls should be shown
  const canEdit =
    showControls &&
    currentUser &&
    (currentUser.role === 'admin' || currentUser.id === author.id);

  return (
    <div className="bg-white rounded-lg shadow-md p-5 flex flex-col gap-4 border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-3">
        <Avatar src={author.avatar} alt={author.name} size={40} />
        <div>
          <div className="text-sm font-semibold text-gray-800">{author.name}</div>
          <div className="text-xs text-gray-500">{new Date(date).toLocaleDateString()}</div>
        </div>
        {canEdit && (
          <div className="ml-auto flex gap-2">
            <button
              className="text-blue-600 hover:text-blue-800 px-2 py-1 rounded transition-colors"
              onClick={onEdit}
              aria-label="Edit post"
              type="button"
            >
              Edit
            </button>
            <button
              className="text-red-600 hover:text-red-800 px-2 py-1 rounded transition-colors"
              onClick={onDelete}
              aria-label="Delete post"
              type="button"
            >
              Delete
            </button>
          </div>
        )}
      </div>
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
        <p className="text-gray-700 text-sm">{excerpt}</p>
      </div>
    </div>
  );
}

BlogCard.propTypes = {
  title: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  author: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  }).isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  showControls: PropTypes.bool,
};

BlogCard.defaultProps = {
  onEdit: () => {},
  onDelete: () => {},
  showControls: false,
};