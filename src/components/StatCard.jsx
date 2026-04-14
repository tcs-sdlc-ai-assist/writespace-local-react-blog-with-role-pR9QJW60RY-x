import React from 'react';
import PropTypes from 'prop-types';

export default function StatCard({ name, value, icon }) {
  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-md border border-gray-200 space-x-4">
      <div className="flex-shrink-0 text-blue-500 text-3xl">
        {icon}
      </div>
      <div>
        <div className="text-lg font-semibold text-gray-700">{name}</div>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
      </div>
    </div>
  );
}

StatCard.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.node.isRequired,
};