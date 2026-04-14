// src/auth.js

/**
 * Authentication/session utilities for writespace.
 * Provides getSession and getUserRole functions.
 * Session is stored in localStorage under 'writespace_session'.
 * User role is stored in session object as 'role'.
 */

/**
 * Retrieves the current session object from localStorage.
 * @returns {object|null} Session object if exists, otherwise null.
 */
export function getSession() {
  try {
    const sessionStr = window.localStorage.getItem('writespace_session');
    if (!sessionStr) return null;
    const session = JSON.parse(sessionStr);
    if (typeof session !== 'object' || session === null) return null;
    return session;
  } catch (error) {
    return null;
  }
}

/**
 * Retrieves the current user's role from session.
 * @returns {string|null} User role ('admin', 'author', 'reader'), or null if not logged in.
 */
export function getUserRole() {
  const session = getSession();
  if (!session || typeof session.role !== 'string') return null;
  return session.role;
}