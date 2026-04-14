import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { getSession, getUserRole } from '../auth';

/**
 * ProtectedRoute component for guarding routes based on authentication and role.
 * 
 * @param {React.ReactNode} children - The component(s) to render if access is allowed.
 * @param {string[]} allowedRoles - Array of allowed roles for this route. If empty, any authenticated user is allowed.
 * @param {boolean} guestOnly - If true, only unauthenticated users can access this route.
 * @param {string} redirectTo - Path to redirect unauthorized users to. Defaults to "/".
 * @returns {React.ReactNode}
 */
function ProtectedRoute({ children, allowedRoles = [], guestOnly = false, redirectTo = '/' }) {
  const session = getSession();
  const userRole = getUserRole();

  // Guest-only route: redirect authenticated users
  if (guestOnly) {
    if (session) {
      return <Navigate to={redirectTo} replace />;
    }
    return children;
  }

  // Authenticated route: redirect guests
  if (!session) {
    return <Navigate to={redirectTo} replace />;
  }

  // Role-based route: check allowedRoles
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
  guestOnly: PropTypes.bool,
  redirectTo: PropTypes.string,
};

export default ProtectedRoute;